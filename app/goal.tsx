import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import ChevronLeft from "../assets/icons/ChevronLeft";
import CustomTextInput from "../src/screens/Home/AddGoalModal/CustomTextInput";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DropdownInput = require("../src/components/DropdownInput").default as any;
import { reconcileReminders } from "../src/background/reminders";
import { useGlobal } from "../src/stores/global";
import { useGoals } from "../src/stores/goals";
import { useHabits } from "../src/stores/habits";
import { GOAL_DURATION, HABIT_REGULARITY } from "../src/utils/goal";

const DEFAULT_REMINDER_TIME = "09:00";

function formatReminderTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, "0")} ${period}`;
}

function parseTimeToDate(time: string): Date {
  const [h, m] = time.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d;
}

export default function GoalScreen() {
  const insets = useSafeAreaInsets();
  const { goalEditData, setGoalEditData } = useGlobal();
  const { addGoal, editGoal } = useGoals();
  const { addHabit, editHabit, addInstance, setReminder, habits } = useHabits();

  const existingHabit = goalEditData?.habitId
    ? habits.find((h) => h.id === goalEditData.habitId)
    : null;

  const [habitName, setHabitName] = useState<string | undefined>(
    goalEditData?.habitName
  );
  const [goalName, setGoalName] = useState<string | undefined>(
    goalEditData?.name
  );
  const [goalPeriod, setGoalPeriod] = useState(
    goalEditData?.period ?? GOAL_DURATION[0]
  );
  const [habitType, setHabitType] = useState(
    goalEditData?.habitType ?? HABIT_REGULARITY[0]
  );
  const [reminderEnabled, setReminderEnabled] = useState(
    existingHabit?.reminder?.enabled ?? false
  );
  const [reminderTime, setReminderTime] = useState(
    existingHabit?.reminder?.time ?? DEFAULT_REMINDER_TIME
  );
  const [pickerOpen, setPickerOpen] = useState(false);

  useEffect(() => {
    return () => {
      setGoalEditData(null);
    };
  }, []);

  const handleClose = useCallback(() => {
    router.back();
  }, []);

  const handleReminderToggle = useCallback(async (enabled: boolean) => {
    setReminderEnabled(enabled);
    if (enabled) {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        setReminderEnabled(false);
        Alert.alert(
          "Notifications disabled",
          "Enable notifications in Settings to receive reminders.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Open Settings", onPress: () => Linking.openSettings() },
          ]
        );
      }
    }
  }, []);

  const handleTimeConfirm = useCallback((date: Date) => {
    const h = date.getHours().toString().padStart(2, "0");
    const m = date.getMinutes().toString().padStart(2, "0");
    setReminderTime(`${h}:${m}`);
    setPickerOpen(false);
  }, []);

  const handleSubmit = useCallback(() => {
    const newGoalData = {
      name: goalName!,
      habitName: habitName!,
      habitType,
      period: goalPeriod,
    };

    const reminder = reminderEnabled
      ? { enabled: true, time: reminderTime }
      : undefined;

    if (goalEditData) {
      const goal = editGoal(goalEditData.id, newGoalData);
      const updatedHabit = editHabit(goalEditData.habitId, {
        name: goal!.habitName,
        goalId: goal!.id,
      });
      if (updatedHabit) {
        setReminder(updatedHabit.id, reminder);
      }
    } else {
      const goal = addGoal(newGoalData);
      const habit = addHabit({ name: goal.habitName, goalId: goal.id, instances: [] });
      addInstance(habit.id);
      setReminder(habit.id, reminder);
    }

    reconcileReminders().catch((e) => console.warn("reconcileReminders failed:", e));
    router.back();
  }, [
    habitName,
    goalName,
    goalPeriod,
    habitType,
    reminderEnabled,
    reminderTime,
    goalEditData,
  ]);

  const isFormValid = useMemo(
    () => Boolean(habitName && goalName),
    [goalName, habitName]
  );

  const isEdit = Boolean(goalEditData);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose} hitSlop={12} style={styles.backBtn}>
          <ChevronLeft size={22} color="#2f2f2f" />
        </TouchableOpacity>
        <Text style={styles.title}>{isEdit ? "Edit Goal" : "New Goal"}</Text>
      </View>

      {/* Scrollable form */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <CustomTextInput
          onChangeText={setGoalName}
          label="Your Goal"
          placeholder="Build a Physique"
          initialValue={goalName}
        />
        <CustomTextInput
          onChangeText={setHabitName}
          label="Habit Name"
          placeholder="Go Gym"
          initialValue={habitName}
        />
        <DropdownInput
          onSelect={setGoalPeriod}
          options={GOAL_DURATION}
          label="Duration"
          initialSelect={goalPeriod}
        />
        <DropdownInput
          onSelect={setHabitType}
          options={HABIT_REGULARITY}
          label="Regularity"
          initialSelect={habitType}
        />

        {/* Reminder section */}
        <View style={styles.reminderSection}>
          <View style={styles.divider} />
          <View style={styles.reminderRow}>
            <View>
              <Text style={styles.reminderLabel}>Remind me</Text>
              {reminderEnabled && (
                <Text style={styles.reminderSub}>Daily notification</Text>
              )}
            </View>
            <Switch
              value={reminderEnabled}
              onValueChange={handleReminderToggle}
              trackColor={{ false: "#e0e0e0", true: "#ff5c00" }}
              thumbColor="#fff"
            />
          </View>

          {reminderEnabled && (
            <Pressable onPress={() => setPickerOpen(true)} style={styles.timeRow}>
              <Text style={styles.timeLabel}>Time</Text>
              <Text style={styles.timeValue}>{formatReminderTime(reminderTime)}</Text>
            </Pressable>
          )}
        </View>
      </ScrollView>

      {/* Pinned submit button */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity
          style={[styles.actionBtnContainer, !isFormValid && styles.disabled]}
          onPress={handleSubmit}
          disabled={!isFormValid}
        >
          <LinearGradient
            colors={["#ffa450", "#ff5c00"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={styles.actionBtn}
          >
            <Text style={styles.actionBtnTxt}>{isEdit ? "Update" : "Create"}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={pickerOpen}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={() => setPickerOpen(false)}
        date={parseTimeToDate(reminderTime)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcfcff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  backBtn: {
    marginRight: 10,
  },
  title: {
    fontFamily: "Nunito-ExtraBold",
    fontSize: 22,
    color: "#2f2f2f",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingBottom: 24,
  },
  reminderSection: {
    marginTop: 28,
  },
  divider: {
    height: 0.5,
    backgroundColor: "#e8e8e8",
    marginBottom: 20,
  },
  reminderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reminderLabel: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 14,
    color: "#2f2f2f",
  },
  reminderSub: {
    fontFamily: "Nunito-Medium",
    fontSize: 12,
    color: "rgba(47, 47, 47, 0.5)",
    marginTop: 2,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ededed",
    backgroundColor: "#fff",
  },
  timeLabel: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 14,
    color: "#2f2f2f",
  },
  timeValue: {
    fontFamily: "Nunito-Medium",
    fontSize: 14,
    color: "#ff5c00",
  },
  footer: {
    paddingHorizontal: 22,
    paddingTop: 12,
    backgroundColor: "#fcfcff",
  },
  actionBtnContainer: {
    width: "100%",
  },
  disabled: {
    opacity: 0.5,
  },
  actionBtn: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 6,
  },
  actionBtnTxt: {
    fontFamily: "Nunito-ExtraBold",
    fontSize: 16,
    color: "#fbfbfb",
  },
});
