import { useGoals } from "@/src/stores/goals";
import { useHabits } from "@/src/stores/habits";
import * as Sentry from "@sentry/react-native";
import { differenceInCalendarDays, format, parseISO } from "date-fns";

async function performSync(): Promise<boolean> {
  try {
    const goals = useGoals.getState().goals || [];
    const habitsStore = useHabits.getState();
    const habits = habitsStore.habits || [];

    const todayKey = format(new Date(), "yyyy-MM-dd");
    let madeChanges = false;

    for (const goal of goals) {
      let start = new Date(goal.startDate);
      if (isNaN(start.getTime())) {
        try {
          start = parseISO(goal.startDate as string);
        } catch (e) {
          continue;
        }
      }

      const daysPassed = differenceInCalendarDays(new Date(), start);
      const periodDays = (goal.period && (goal.period as any).value) || 0;

      if (daysPassed >= 0 && daysPassed < periodDays) {
        let habit = habits.find((h) => h.goalId === goal.id);
        if (!habit) {
          habit = habitsStore.addHabit({
            goalId: goal.id,
            name: goal.habitName,
            instances: [],
          });
          madeChanges = true;
        }

        const freq = Math.max(1, Math.floor(Number((goal as any)?.habitType?.value) || 1));
        const isScheduledToday = daysPassed % freq === 0;

        if (isScheduledToday) {
          const hasToday = (habit.instances || []).some((i) => i.date === todayKey);
          if (!hasToday) {
            habitsStore.addInstance(habit.id);
            habitsStore.toggleComplete(habit.id, false);
            madeChanges = true;
          }
        }
      }
    }

    return madeChanges;
  } catch (err) {
    console.error("habitSync error", err);
    Sentry.logger.error("habitSync error", { err, failed: true });
    return false;
  }
}

let _isSyncRunning = false;
let _lastSyncAt = 0;

export async function runHabitSyncNow() {
  const now = Date.now();
  if (now - _lastSyncAt < 5000 || _isSyncRunning) return false;

  _isSyncRunning = true;
  try {
    const res = await performSync();
    _lastSyncAt = Date.now();
    return res;
  } finally {
    _isSyncRunning = false;
  }
}
