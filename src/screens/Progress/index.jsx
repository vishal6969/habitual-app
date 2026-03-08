import React, { useCallback, useMemo, useState } from "react";

import { format, subDays } from "date-fns";
import { Text, View } from "react-native";

import DropdownInput from "@/src/components/DropdownInput";
import { useGoals } from "@/src/stores/goals";
import { useHabits } from "@/src/stores/habits";
import Close from "../../../assets/icons/Close";
import Tick from "../../../assets/icons/Tick";
import { PROGRESS_PERIOD } from "../../utils/progress";
import GoalsList from "./GoalsList";
import ProgressComponent from "./ProgressComponent";
import styles from "./styles";
import { calcGoalProgressLastNDays } from "./utils";
import NoHabitsState from "../Home/Habits/NoHabitsState";

const Progress = () => {
  const [progressInterval, setProgressInterval] = useState(30);
  const { goals } = useGoals();
  const { habits } = useHabits();
  const [goalsAchieved, setGoalsAchieved] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);

  const filteredGoals = useMemo(() => {
    const fromDate = format(
      subDays(new Date(), progressInterval - 1),
      "yyyy-MM-dd",
    );
    let goalsAchievedCount = 0;
    let totalHabitInstances = 0;
    let completedHabitInstances = 0;
    const filteredGoals = goals?.filter((goal) => goal.startDate >= fromDate);
    const updatedGoals = filteredGoals.map((goal) => {
      const { percentage, total, completed } = calcGoalProgressLastNDays(
        goal.id,
        progressInterval,
      );
      const isAchieved = total === completed;

      if (isAchieved) {
        goalsAchievedCount++;
      }

      totalHabitInstances += total;
      completedHabitInstances += completed;

      return {
        ...goal,
        totalDays: total,
        completedDays: completed,
        percentage,
      };
    });

    setGoalsAchieved(goalsAchievedCount);
    setOverallProgress((completedHabitInstances / totalHabitInstances) * 100);

    return updatedGoals;
  }, [goals, progressInterval, habits]);

  const goalsNotAchieved = useMemo(
    () => filteredGoals.length - goalsAchieved,
    [filteredGoals, goalsAchieved],
  );

  const handleProgressFilterSelect = useCallback((selectedInterval) => {
    setProgressInterval(selectedInterval.value);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Progress</Text>
        <DropdownInput
          dropdownListStyle={styles.filterList}
          dropdownStyle={styles.filterInput}
          containerStyle={styles.filterContainer}
          options={PROGRESS_PERIOD}
          onSelect={handleProgressFilterSelect}
        />
      </View>
      {filteredGoals?.length > 0 ? (
        <View style={styles.content}>
          <ProgressComponent progress={overallProgress} />
          <View style={styles.row1}>
            <Tick />
            <Text style={styles.goalAchievedTxt}>
              {goalsAchieved} Goals have been achieved
            </Text>
          </View>
          <View style={styles.row2}>
            <Close size={22} color="#a2a2a2" />
            <Text style={styles.goalNotAchievedTxt}>
              {goalsNotAchieved} Goals not achieved
            </Text>
          </View>
          <GoalsList
            goals={filteredGoals}
            progressInterval={progressInterval}
          />
        </View>
      ) : (
        <NoHabitsState containerStyle={styles.noGoalStateContainer} />
      )}
    </View>
  );
};

export default Progress;
