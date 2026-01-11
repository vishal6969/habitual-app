import { subDays, format } from "date-fns";
import { useHabits } from "@/src/stores/habits";


export function calcGoalProgressLastNDays(goalId: number, days: number) {
  const habit = useHabits.getState().habits?.find(h => h.goalId === goalId);

  const fromDate = format(subDays(new Date(), days - 1), "yyyy-MM-dd");
  const toDate = format(new Date(), "yyyy-MM-dd");

  const instancesInRange = habit?.instances?.filter(i => i.date >= fromDate && i.date <= toDate)

  if (!instancesInRange?.length) {
    return { percentage: 0, completed: 0, total: 0 };
  }

  const completed = instancesInRange.filter(i => i.completed).length;
  const total = instancesInRange.length;

  return {
    percentage: Math.round((completed / total) * 100),
    completed,
    total,
  };
}
