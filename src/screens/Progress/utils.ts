import { useGoals } from "@/src/stores/goals";
import { useHabits } from "@/src/stores/habits";

export function calcGoalProgress(goalId: number) {
  const habit = useHabits.getState().habits?.find((h) => h.goalId === goalId);
  const goal = useGoals.getState().goals?.find((g) => g.id === goalId);

  if (!goal) return { percentage: 0, completed: 0, total: 0 };

  const freq = Math.max(1, goal.habitType?.value ?? 1);
  const periodDays = goal.period?.value ?? 0;
  const total = periodDays > 0 ? Math.ceil(periodDays / freq) : 0;

  if (total === 0) return { percentage: 0, completed: 0, total: 0 };

  const completed = (habit?.instances ?? []).filter((i) => i.completed).length;

  return {
    percentage: Math.min(100, Math.round((completed / total) * 100)),
    completed,
    total,
  };
}
