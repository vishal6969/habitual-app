import { differenceInCalendarDays, format, parseISO } from "date-fns";
import { HABIT_DAY_STATE } from "./constants";

export function parseGoalStartDate(raw: string | undefined | null): Date {
  if (!raw) return new Date();
  const d = new Date(raw);
  if (!isNaN(d.getTime())) return d;
  try {
    return parseISO(raw);
  } catch {
    return new Date();
  }
}

export function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) result.push(arr.slice(i, i + size));
  return result;
}

export function getDayState(
  date: Date,
  goalStartStr: string,
  goalEndStr: string,
  todayStr: string,
  goalStart: Date,
  freq: number,
  instanceMap: Record<string, { completed: boolean } | undefined>
): string | null {
  const dateStr = format(date, "yyyy-MM-dd");

  if (dateStr < goalStartStr || dateStr > goalEndStr) return HABIT_DAY_STATE.OUT_OF_RANGE;

  const daysSinceStart = differenceInCalendarDays(date, goalStart);
  if (daysSinceStart % freq !== 0) return null;

  if (dateStr > todayStr) return HABIT_DAY_STATE.FUTURE;

  return instanceMap[dateStr]?.completed
    ? HABIT_DAY_STATE.COMPLETED
    : HABIT_DAY_STATE.MISSED;
}
