import React, { useCallback, useState } from "react";

import { format } from "date-fns";
import {
  FlatList,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Tooltip from "react-native-walkthrough-tooltip";

import { showConfirm } from "@/src/components/Confirm";
import { cancelHabitReminders } from "@/src/background/reminders";
import { useGoals } from "@/src/stores/goals";
import { useHabits } from "@/src/stores/habits";
import CheckBox from "../../../../assets/icons/CheckBox";
import CompleteTick from "../../../../assets/icons/CompleteTick";
import Delete from "../../../../assets/icons/Delete";
import Edit from "../../../../assets/icons/Edit";
import ThreeDotVertical from "../../../../assets/icons/ThreeDotVertical";
import NoHabitState from "./NoHabitsState";
import styles from "./styles";

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
    const instance = toggleHabitInstance(habitId);
    if (instance !== null) {
      toggleComplete(habitId);
    }
  }, []);

  const handleEditPress = useCallback((item) => {
    handleGoalEdit(item);
    setHabitActionId(null);
  }, []);

  const handleDeleteGoal = useCallback(
    ({ habitId, goalId }) => {
      cancelHabitReminders(habitId).catch(() => {});
      deleteHabit(habitId);
      deleteGoal(goalId);
    },
    [deleteGoal, deleteHabit],
  );

  const handleDeletePress = useCallback(
    (item) => {
      const confirmationModalOptions = {
        title: "Remove Habit Goal?",
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
    [handleDeleteGoal, showConfirm],
  );

  const renderTooltip = (item) => {
    return (
      <View>
        <TouchableOpacity onPress={() => handleEditPress(item)} style={styles.edit}>
          <Edit size={16} color="#2f2f2f" />
          <Text style={styles.editTxt}>Edit</Text>
        </TouchableOpacity>
        <View style={styles.menuDivider} />
        <TouchableOpacity style={styles.delete} onPress={() => handleDeletePress(item)}>
          <Delete size={16} color="#e03030" />
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

  const todayKey = format(new Date(), "yyyy-MM-dd");
  const filteredHabits = (habits || []).filter(
    (h) => h.instances?.some((i) => i.date === todayKey)
  );

  if (!filteredHabits.length) {
    return <NoHabitState />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{"Today's Routine"}</Text>
      <FlatList
        data={filteredHabits}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Habits;
