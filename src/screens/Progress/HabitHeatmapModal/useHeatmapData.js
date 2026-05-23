import { useCallback, useEffect, useMemo, useState } from "react";
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  startOfMonth,
  subMonths,
} from "date-fns";

import { useGoals } from "@/src/stores/goals";
import { useHabits } from "@/src/stores/habits";
import { chunk, getDayState, parseGoalStartDate } from "./utils";

export function useHeatmapData(goalId, visible) {
  const { goals } = useGoals();
  const { habits } = useHabits();

  const goal = useMemo(() => goals.find((g) => g.id === goalId), [goals, goalId]);
  const habit = useMemo(() => habits.find((h) => h.goalId === goalId), [habits, goalId]);

  const { goalStart, goalEnd, freq, goalStartStr, goalEndStr } = useMemo(() => {
    if (!goal) {
      const today = new Date();
      const todayFmt = format(today, "yyyy-MM-dd");
      return { goalStart: today, goalEnd: today, freq: 1, goalStartStr: todayFmt, goalEndStr: todayFmt };
    }
    const start = parseGoalStartDate(goal.startDate);
    const end = addDays(start, (goal.period?.value ?? 7) - 1);
    return {
      goalStart: start,
      goalEnd: end,
      freq: Math.max(1, goal.habitType?.value ?? 1),
      goalStartStr: format(start, "yyyy-MM-dd"),
      goalEndStr: format(end, "yyyy-MM-dd"),
    };
  }, [goal]);

  const instanceMap = useMemo(() => {
    const map = {};
    (habit?.instances ?? []).forEach((inst) => {
      map[inst.date] = inst;
    });
    return map;
  }, [habit]);

  const defaultMonth = useMemo(() => {
    const today = new Date();
    if (today < goalStart) return goalStart;
    if (today > goalEnd) return goalEnd;
    return today;
  }, [goalStart, goalEnd]);

  const [viewMonth, setViewMonth] = useState(defaultMonth);

  useEffect(() => {
    if (visible) setViewMonth(defaultMonth);
  }, [visible, goalId]);

  const todayStr = format(new Date(), "yyyy-MM-dd");

  const canGoPrev = useMemo(
    () => format(endOfMonth(subMonths(viewMonth, 1)), "yyyy-MM-dd") >= goalStartStr,
    [viewMonth, goalStartStr]
  );

  const canGoNext = useMemo(
    () => format(startOfMonth(addMonths(viewMonth, 1)), "yyyy-MM-dd") <= goalEndStr,
    [viewMonth, goalEndStr]
  );

  const weeks = useMemo(() => {
    const monthStart = startOfMonth(viewMonth);
    const monthEnd = endOfMonth(viewMonth);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
    // Mon-first: JS getDay() is 0=Sun..6=Sat → (day+6)%7 gives 0=Mon..6=Sun
    const startOffset = (monthStart.getDay() + 6) % 7;
    const cells = [...Array(startOffset).fill(null), ...days];
    while (cells.length % 7 !== 0) cells.push(null);
    return chunk(cells, 7);
  }, [viewMonth]);

  const computeDayState = useCallback(
    (date) => getDayState(date, goalStartStr, goalEndStr, todayStr, goalStart, freq, instanceMap),
    [goalStartStr, goalEndStr, todayStr, goalStart, freq, instanceMap]
  );

  return {
    goal,
    viewMonth,
    setViewMonth,
    canGoPrev,
    canGoNext,
    weeks,
    getDayState: computeDayState,
    todayStr,
  };
}
