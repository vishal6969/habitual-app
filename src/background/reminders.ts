import { differenceInCalendarDays, parseISO } from "date-fns";
import * as Notifications from "expo-notifications";

import { useGoals } from "@/src/stores/goals";
import { useHabits } from "@/src/stores/habits";

type DesiredNotification = {
  identifier: string;
  content: Notifications.NotificationContentInput;
  trigger: Notifications.DailyTriggerInput;
};

function computeDesiredNotifications(): DesiredNotification[] {
  const goals = useGoals.getState().goals || [];
  const habits = useHabits.getState().habits || [];
  const today = new Date();
  const result: DesiredNotification[] = [];

  for (const habit of habits) {
    if (!habit.reminder?.enabled || !habit.reminder.time) continue;

    const goal = goals.find((g) => g.id === habit.goalId);
    if (!goal) continue;

    // Phase 1: everyday habits only
    const freq = Math.max(1, Math.floor(Number(goal.habitType?.value) || 1));
    if (freq !== 1) continue;

    let start: Date;
    try {
      start = parseISO(goal.startDate as string);
      if (isNaN(start.getTime())) start = new Date(goal.startDate);
    } catch {
      continue;
    }

    const daysPassed = differenceInCalendarDays(today, start);
    const periodDays = (goal.period as any)?.value || 0;

    // Goal period has elapsed
    if (daysPassed >= periodDays) continue;

    const [hourStr, minuteStr] = habit.reminder.time.split(":");
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
    if (isNaN(hour) || isNaN(minute)) continue;

    result.push({
      identifier: `habit-${habit.id}-daily`,
      content: {
        title: habit.name,
        body: `Time to work on your goal: ${goal.name}`,
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute,
      },
    });
  }

  return result;
}

export async function reconcileReminders(): Promise<void> {
  try {
    const desired = computeDesiredNotifications();
    const desiredMap = new Map(desired.map((d) => [d.identifier, d]));

    const actual = await Notifications.getAllScheduledNotificationsAsync();
    const habitNotifIds = new Set(
      (useHabits.getState().habits || [])
        .filter((h) => h.reminder?.notificationIds?.length)
        .flatMap((h) => h.reminder!.notificationIds!)
    );

    // Cancel notifications we own that are no longer desired
    for (const notif of actual) {
      if (
        (notif.identifier.startsWith("habit-") || habitNotifIds.has(notif.identifier)) &&
        !desiredMap.has(notif.identifier)
      ) {
        await Notifications.cancelScheduledNotificationAsync(notif.identifier);
      }
    }

    // Schedule missing or rescheduled desired notifications
    const actualMap = new Map(actual.map((n) => [n.identifier, n]));
    const { setReminder } = useHabits.getState();

    for (const [id, d] of desiredMap) {
      const existing = actualMap.get(id);
      let needsSchedule = !existing;

      if (existing) {
        const t = existing.trigger as any;
        if (t?.hour !== d.trigger.hour || t?.minute !== d.trigger.minute) {
          await Notifications.cancelScheduledNotificationAsync(id);
          needsSchedule = true;
        }
      }

      if (needsSchedule) {
        await Notifications.scheduleNotificationAsync({
          identifier: id,
          content: d.content,
          trigger: d.trigger,
        });
      }

      // Persist notificationId back to the habit
      const habit = useHabits.getState().habits.find((h) => `habit-${h.id}-daily` === id);
      if (habit) {
        setReminder(habit.id, { ...habit.reminder!, notificationIds: [id] });
      }
    }
  } catch (err) {
    console.warn("reconcileReminders error", err);
  }
}

export async function cancelHabitReminders(habitId: number): Promise<void> {
  try {
    const id = `habit-${habitId}-daily`;
    await Notifications.cancelScheduledNotificationAsync(id);
  } catch {
    // ignore — notification may not exist
  }
}
