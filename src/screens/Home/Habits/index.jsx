import React, { useCallback, useState } from "react";

import {
  TouchableOpacity,
  Text,
  View,
  FlatList,
  StatusBar,
  Pressable,
} from "react-native";
import { Shadow } from "react-native-shadow-2";
import Tooltip from "react-native-walkthrough-tooltip";

import styles from "./styles";
import CompleteTick from "../../../../assets/icons/CompleteTick";
import ThreeDotVertical from "../../../../assets/icons/ThreeDotVertical";
import CheckBox from "../../../../assets/icons/CheckBox";
import { useHabits } from "@/src/stores/habits";
import Delete from "../../../../assets/icons/Delete";
import Edit from "../../../../assets/icons/Edit";
import { showConfirm } from "@/src/components/Confirm";
import { useGoals } from "@/src/stores/goals";
import NoHabitState from "./NoHabitsState";

const Habits = ({ handleGoalEdit }) => {
  const {
    habits,
    toggleComplete,
    deleteHabit,
    toggleInstance: toggleHabitInstance,
  } = useHabits();
  const { deleteGoal } = useGoals();
  const [habitActionId, setHabitActionId] = useState();

  const handleItemPress = useCallback((habitId) => {
    toggleComplete(habitId);
    toggleHabitInstance(habitId);
  }, []);

  const handleEditPress = useCallback((item) => {
    handleGoalEdit(item);
    setHabitActionId(null);
  }, []);

  const handleDeleteGoal = useCallback(
    ({ habitId, goalId }) => {
      deleteHabit(habitId);
      deleteGoal(goalId);
    },
    [deleteGoal, deleteHabit]
  );

  const handleDeletePress = useCallback(
    (item) => {
      const confirmationModalOptions = {
        title: "Remove Habit Goal ?",
        subtitle:
          "This will permanently delete your habit goal and its progress",
        confirmText: "Remove",
        cancelText: "Cancel",
        destructive: true,
      };

      showConfirm(confirmationModalOptions).then((isConfirm) => {
        if (isConfirm) {
          handleDeleteGoal({ habitId: item.id, goalId: item.goalId });
        }
      });
      setHabitActionId(null);
    },
    [handleDeleteGoal, showConfirm]
  );

  const renderTooltip = (item) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => handleEditPress(item)}
          style={styles.edit}
        >
          <Edit size={14} />
          <Text style={styles.deleteTxt}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.delete}
          onPress={() => handleDeletePress(item)}
        >
          <Delete size={14} />
          <Text style={styles.deleteTxt}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    const isComplete = item?.completed;

    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => handleItemPress(item.id)}
        style={[styles.habitItem, !isComplete && styles.altHabitItem]}
      >
        <Text style={[styles.habitTitle, !isComplete && styles.altHabitTitle]}>
          {item.name}
        </Text>
        <View style={styles.row}>
          {isComplete ? <CompleteTick /> : <CheckBox />}
          <Tooltip
            content={renderTooltip(item)}
            contentStyle={styles.tooltip}
            closeOnBackgroundInteraction={true}
            parentWrapperStyle={styles.threeDotIcon}
            isVisible={habitActionId === item.id}
            placement="bottom"
            topAdjustment={-StatusBar.currentHeight}
            backgroundColor="rgba(0, 0, 0, 0)"
            arrowStyle={{ display: "none" }}
            onClose={() => setHabitActionId(null)}
          >
            <Pressable hitSlop={12} onPress={() => setHabitActionId(item.id)}>
              <ThreeDotVertical />
            </Pressable>
          </Tooltip>
        </View>
      </TouchableOpacity>
    );
  };

  if (!habits.length) {
    return <NoHabitState />;
  }

  return (
    <Shadow
      containerStyle={styles.shadowContainer}
      style={styles.shadow}
      distance={6}
      sides={{ top: true, bottom: true, start: true, end: true }}
      startColor="rgba(0, 0, 0, 0.02)"
      endColor="#fcfcff"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Today's Routine</Text>
        <FlatList
          data={habits}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Shadow>
  );
};

export default Habits;
