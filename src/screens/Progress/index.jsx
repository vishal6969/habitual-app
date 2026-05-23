import React, { useMemo } from "react";

import { Text, View } from "react-native";

import { useGoals } from "@/src/stores/goals";
import { useHabits } from "@/src/stores/habits";
import GoalsList from "./GoalsList";
import ProgressComponent from "./ProgressComponent";
import styles from "./styles";
import { calcGoalProgress } from "./utils";
import NoHabitsState from "../Home/Habits/NoHabitsState";

const Progress = () => {
  const { goals } = useGoals();
  const { habits } = useHabits();

  const { computedGoals, overallProgress } = useMemo(() => {
    let totalHabitInstances = 0;
    let completedHabitInstances = 0;

    const updatedGoals = [...(goals ?? [])]
      .sort((a, b) => b.id - a.id)
      .map((goal) => {
        const { percentage, total, completed } = calcGoalProgress(goal.id);

        totalHabitInstances += total;
        completedHabitInstances += completed;

        return { ...goal, totalDays: total, completedDays: completed, percentage };
      });

    return {
      computedGoals: updatedGoals,
      overallProgress: totalHabitInstances > 0
        ? (completedHabitInstances / totalHabitInstances) * 100
        : 0,
    };
  }, [goals, habits]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progress</Text>
      {computedGoals.length > 0 ? (
        <View style={styles.content}>
          <ProgressComponent progress={overallProgress} />
          <GoalsList goals={computedGoals} />
        </View>
      ) : (
        <NoHabitsState containerStyle={styles.noGoalStateContainer} />
      )}
    </View>
  );
};

export default Progress;
