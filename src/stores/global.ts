import { create } from "zustand";

interface Goal {
  id: number;
  habitId: number;
  name: string;
  habitName: string;
  period: { id: number; label: string; value: number };
  startDate: string;
  habitType: { id: number; label: string; value: number };
}

type GlobalState = {
  goalEditData: Goal | undefined | null;
  setGoalEditData: (goal: Goal | null) => void;
};

export const useGlobal = create<GlobalState>()((set) => ({
  goalEditData: null,
  setGoalEditData(goal) {
    set({ goalEditData: goal });
  },
}));
