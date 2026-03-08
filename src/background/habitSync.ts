import { useGoals } from "@/src/stores/goals";
import { useHabits } from "@/src/stores/habits";
import { differenceInCalendarDays, format, parseISO } from "date-fns";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";

const TASK_NAME = "HABIT_SYNC_TASK";

async function performSync(): Promise<BackgroundFetch.BackgroundFetchResult> {
  try {
    const goals = useGoals.getState().goals || [];
    const habitsStore = useHabits.getState();
    const habits = habitsStore.habits || [];

    const todayKey = format(new Date(), "yyyy-MM-dd");
    let madeChanges = false;

    for (const goal of goals) {
      // parse start date (support multiple formats)
      let start = new Date(goal.startDate);
      if (isNaN(start.getTime())) {
        // try ISO parse
        try {
          start = parseISO(goal.startDate as string);
        } catch (e) {
          continue; // cannot parse start date
        }
      }

      const daysPassed = differenceInCalendarDays(new Date(), start);
      const periodDays = (goal.period && (goal.period as any).value) || 0;

      // check if goal is active today
      if (daysPassed >= 0 && daysPassed < periodDays) {
        // ensure habit exists for this goal
        let habit = habits.find((h) => h.goalId === goal.id);
        if (!habit) {
          habit = habitsStore.addHabit({
            goalId: goal.id,
            name: goal.habitName,
            instances: [],
          });
          madeChanges = true;
        }

        // ensure today's instance exists
        const hasToday = (habit.instances || []).some(
          (i) => i.date === todayKey,
        );
        if (!hasToday) {
          habitsStore.addInstance(habit.id);
          madeChanges = true;
        }
      } else if (daysPassed >= periodDays) {
        // goal has completed — mark its habit as inactive so it won't be shown on home screen
        // we keep the habit and its instances for progress/history
        const habit = habits.find((h) => h.goalId === goal.id);
        if (habit) {
          // use editHabit to set active = false
          if (typeof habitsStore.editHabit === "function") {
            habitsStore.editHabit(habit.id, { active: false });
            madeChanges = true;
          }
        }
      }
    }

    return madeChanges
      ? BackgroundFetch.BackgroundFetchResult.NewData
      : BackgroundFetch.BackgroundFetchResult.NoData;
  } catch (err) {
    console.error("habitSync error", err);
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
}

TaskManager.defineTask(TASK_NAME, async () => {
  const result = await performSync();
  return result;
});

export async function registerHabitSync() {
  try {
    const isRegistered = await TaskManager.isTaskRegisteredAsync(TASK_NAME);
    if (!isRegistered) {
      // minimumInterval in seconds. On many platforms this is a suggestion.
      await BackgroundFetch.registerTaskAsync(TASK_NAME, {
        minimumInterval: 24 * 60 * 60, // 24 hours
        stopOnTerminate: false,
        startOnBoot: true,
      });
      console.log("Habit sync task registered");
    }
  } catch (err) {
    console.error("Failed to register habit sync task", err);
  }
}

// helper to run sync immediately (useful for testing from UI)
export async function runHabitSyncNow() {
  return performSync();
}
