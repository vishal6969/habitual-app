import React, { useCallback, useEffect, useMemo, useState } from "react";

import { Modal, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import styles from "./styles";
import CustomTextInput from "./CustomTextInput";
import DropdownInput from "@/src/components/DropdownInput";
import { GOAL_DURATION, HABIT_REGULARITY } from "../../../utils/goal";
import Close from "../../../../assets/icons/Close";
import { useGoals } from "@/src/stores/goals";
import { useHabits } from "@/src/stores/habits";
import { useGlobal } from "@/src/stores/global";

const AddGoalModal = ({ isVisible = true, onClose }) => {
  const { goalEditData } = useGlobal();
  const [habitName, setHabitName] = useState();
  const [goalName, setGoalName] = useState();
  const [goalPeriod, setGoalPeriod] = useState(GOAL_DURATION[0]);
  const [habitType, setHabitType] = useState(HABIT_REGULARITY[0]);
  const { addGoal, editGoal } = useGoals();
  const { addHabit, editHabit, addInstance: addHabitInstance } = useHabits();

  useEffect(() => {
    if (goalEditData && isVisible) {
      setHabitName(goalEditData?.habitName);
      setGoalName(goalEditData?.name);
      setGoalPeriod(goalEditData?.period);
      setHabitType(goalEditData?.habitType);
    }

    return () => {};
  }, [isVisible, goalEditData]);

  const handleHabitName = useCallback((txt) => {
    setHabitName(txt);
  });

  const handleGoalName = useCallback((txt) => {
    setGoalName(txt);
  });

  const handleGoalPeriod = useCallback((obj) => {
    setGoalPeriod(obj);
  });

  const handleHabitType = useCallback((obj) => {
    setHabitType(obj);
  });

  const resetFormData = useCallback(() => {
    setHabitName(undefined);
    setGoalName(undefined);
    setGoalPeriod(GOAL_DURATION[0]);
    setHabitType(HABIT_REGULARITY[0]);
  });

  const handleClose = useCallback(() => {
    onClose();
    resetFormData();
  }, []);

  const handleSubmit = useCallback(() => {
    const newGoalData = {
      name: goalName,
      habitName,
      habitType: habitType,
      period: goalPeriod,
    };

    if (goalEditData) {
      const goal = editGoal(goalEditData?.id, newGoalData);
      editHabit(goalEditData?.habitId, {
        name: goal.habitName,
        goalId: goal.id,
      });
    } else {
      const goal = addGoal(newGoalData);
      const habit = addHabit({
        name: goal.habitName,
        goalId: goal.id,
      });
      addHabitInstance(habit.id);
    }

    onClose();
    resetFormData();
  }, [
    habitName,
    goalName,
    goalPeriod,
    habitType,
    goalEditData,
    addGoal,
    addHabit,
    addHabitInstance,
  ]);

  const isFormValid = useMemo(
    () => habitName && goalName,
    [goalName, habitName],
  );

  return (
    <Modal
      animationType="fade"
      visible={isVisible}
      backdropColor={"rgba(255, 255, 255, 0.1)"}
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        <View style={styles.rowSpaceBtw}>
          <Text style={styles.title}>Create New Goal</Text>
          <TouchableOpacity onPress={handleClose}>
            <Close />
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />
        <CustomTextInput
          onChangeText={handleGoalName}
          label={"Your Goal"}
          placeholder={"Build a Physique"}
          initialValue={goalName}
        />
        <CustomTextInput
          onChangeText={handleHabitName}
          label={"Habit Name"}
          placeholder={"Go Gym"}
          initialValue={habitName}
        />
        <DropdownInput
          onSelect={handleGoalPeriod}
          options={GOAL_DURATION}
          label={"Duration"}
          initialSelect={goalPeriod}
        />
        <DropdownInput
          onSelect={handleHabitType}
          options={HABIT_REGULARITY}
          label={"Regularity"}
          initialSelect={habitType}
        />
        <TouchableOpacity
          style={[
            styles.actionBtnContainer,
            !isFormValid && styles.disabledActiveBtnContainer,
          ]}
          onPress={handleSubmit}
          disabled={!isFormValid}
        >
          <LinearGradient
            colors={["#ffa450", "#ff5c00"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={styles.actionBtn}
          >
            <Text style={styles.actionBtnTxt}>Create</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default AddGoalModal;
