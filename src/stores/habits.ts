import { format } from "date-fns";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type HabitInstance = {
  id: number;
  date: string; // "yyyy-MM-dd"
  completed: boolean;
};

interface Habit {
  id: number;
  goalId: number;
  name: string;
  completed?: boolean;
  instances: HabitInstance[];
}

type HabitsState = {
  habits: Habit[];
  addHabit: (habit: Omit<Habit, "id">) => Habit;
  editHabit: (id: number, patch: Partial<Omit<Habit, "id">>) => Habit | null;
  deleteHabit: (id: number) => boolean;
  toggleComplete: (id: number, isComplete?: boolean) => Habit | null;
  addInstance: (habitId: number) => Habit | null;
  toggleInstance: (habitId: number) => HabitInstance | null;
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
      toggleComplete: (id, isComplete) => {
        const { habits } = get();
        const idx = habits.findIndex((h) => h.id === id);
        if (idx === -1) return null;
        const updated = { ...habits[idx], completed: isComplete != undefined ? isComplete : !habits[idx].completed };
        const newHabits = [...habits];
        newHabits[idx] = updated;
        set({ habits: newHabits });
        return updated;
      },
      addInstance: (habitId: number) => {
        const dateKey = format(new Date(), "yyyy-MM-dd");
        const habits = get().habits.slice();
        const idx = habits.findIndex((h) => h.id === habitId);

        if (idx === -1) return null;

        const instances = habits[idx].instances || [];
        instances.push({ id: Date.now(), date: dateKey, completed: false });

        habits[idx] = { ...habits[idx], instances };
        set({ habits });

        return habits[idx];
      },
      toggleInstance: (habitId: number) => {
        const dateKey = format(new Date(), "yyyy-MM-dd");
        const habits = get().habits.slice();
        const idx = habits.findIndex((h) => h.id === habitId);

        if (idx === -1) return null;

        const instances = (habits[idx].instances || []).slice();
        const iIdx = instances.findIndex((i) => i.date === dateKey);

        if (iIdx === -1) return null;

        instances[iIdx].completed = !instances[iIdx].completed;
        habits[idx] = { ...habits[idx], instances };
        set({ habits });

        return instances[iIdx];
      },
    }),
    {
      name: "habitual-habits",
      storage: createJSONStorage(() => secureStorage),
    }
  )
);
