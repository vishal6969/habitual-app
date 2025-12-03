import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Goal {
  id: number;
  name: string;
  habitName: string;
  period: { id: number; label: string; value: number };
  startDate: string;
  habitType: { id: number; label: string; value: number };
}

type GoalState = {
  goals: Goal[];
  addGoal: (goal: Omit<Goal, "id" | "startDate">) => Goal;
  editGoal: (id: number, patch: Partial<Omit<Goal, "id">>) => Goal | null;
  deleteGoal: (id: number) => boolean;
  getGoalById: (id: number) => Goal | undefined;
  clearGoals: () => void;
};

const secureStorage = {
  getItem: async (name: string) => {
    const value = await SecureStore.getItemAsync(name);
    return value ?? null;
  },
  setItem: async (name: string, value: string) => {
    await SecureStore.setItemAsync(name, value);
  },
  removeItem: async (name: string) => {
    await SecureStore.deleteItemAsync(name);
  },
};

export const useGoals = create<GoalState>()(
  persist(
    (set, get) => ({
      goals: [],
      addGoal: (goal) => {
        const id = Date.now();
        const newGoal = { ...goal, id, startDate: new Date().toDateString() };
        set((s) => ({ goals: [...s.goals, newGoal] }));
        return newGoal;
      },
      editGoal: (id, patch) => {
        const goals = get().goals;
        const idx = goals.findIndex((g) => g.id === id);
        if (idx === -1) return null;
        const updated = { ...goals[idx], ...patch };
        const newGoals = [...goals];
        newGoals[idx] = updated;
        set({ goals: newGoals });
        return updated;
      },
      deleteGoal: (id) => {
        const goals = get().goals;
        if (!goals.some((g) => g.id === id)) return false;
        set({ goals: goals.filter((g) => g.id !== id) });
        return true;
      },
      getGoalById: (id) => get().goals.find((g) => g.id === id),
      clearGoals: () => set({ goals: [] }),
    }),
    {
      name: "habitual-goals",
      storage: createJSONStorage(() => secureStorage),
    }
  )
);
