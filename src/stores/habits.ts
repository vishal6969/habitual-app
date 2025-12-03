import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Habit {
  id: number;
  goalId: number;
  name: string;
  completed: boolean;
}

type HabitsState = {
  habits: Habit[];
  addHabit: (habit: Omit<Habit, "id">) => Habit;
  editHabit: (id: number, patch: Partial<Omit<Habit, "id">>) => Habit | null;
  deleteHabit: (id: number) => boolean;
  toggleComplete: (id: number) => Habit | null;
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

export const useHabits = create<HabitsState>()(
  persist(
    (set, get) => ({
      habits: [],
      addHabit: (habit) => {
        const id = Date.now();
        const newHabit: Habit = { ...habit, id };
        set((state) => ({ habits: [...state.habits, newHabit] }));
        return newHabit;
      },
      editHabit: (id, patch) => {
        const habits = get().habits;
        const idx = habits.findIndex((h) => h.id === id);
        if (idx === -1) return null;
        const updated = { ...habits[idx], ...patch };
        const newHabits = [...habits];
        newHabits[idx] = updated;
        set({ habits: newHabits });
        return updated;
      },
      deleteHabit: (id) => {
        const { habits } = get();
        const exists = habits.some((h) => h.id === id);
        if (!exists) return false;
        set({ habits: habits.filter((h) => h.id !== id) });
        return true;
      },
      toggleComplete: (id) => {
        const { habits } = get();
        const idx = habits.findIndex((h) => h.id === id);
        if (idx === -1) return null;
        const updated = { ...habits[idx], completed: !habits[idx].completed };
        const newHabits = [...habits];
        newHabits[idx] = updated;
        set({ habits: newHabits });
        return updated;
      },
    }),
    {
      name: "habitual-habits",
      storage: createJSONStorage(() => secureStorage),
    }
  )
);
