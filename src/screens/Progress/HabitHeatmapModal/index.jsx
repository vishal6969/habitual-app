import React from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import { addMonths, format, subMonths } from "date-fns";

import ChevronLeft from "../../../../assets/icons/ChevronLeft";
import ChevronRight from "../../../../assets/icons/ChevronRight";
import Close from "../../../../assets/icons/Close";
import { HABIT_DAY_STATE, LEGEND_STATES, STATE_META, WEEK_DAYS } from "./constants";
import { useHeatmapData } from "./useHeatmapData";
import styles from "./styles";

const HabitHeatmapModal = ({ visible, onClose, goalId }) => {
  const { goal, viewMonth, setViewMonth, canGoPrev, canGoNext, weeks, getDayState, todayStr } =
    useHeatmapData(goalId, visible);

  if (!goal) return null;

  return (
    <Modal visible={visible} animationType="fade" backdropColor={"rgba(255, 255, 255, 0.1)"} onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.goalTitle} numberOfLines={2}>
              {goal.name}
            </Text>
            <TouchableOpacity onPress={onClose} hitSlop={8}>
              <Close size={20} color="#a2a2a2" />
            </TouchableOpacity>
          </View>

          <View style={styles.separator} />

          {/* Month navigation */}
          <View style={styles.monthNav}>
            <TouchableOpacity
              onPress={() => setViewMonth((m) => subMonths(m, 1))}
              hitSlop={12}
              disabled={!canGoPrev}
              style={!canGoPrev && styles.navDisabled}
            >
              <ChevronLeft size={22} color={canGoPrev ? "#ff5c00" : "#c8c8c8"} />
            </TouchableOpacity>

            <Text style={styles.monthLabel}>{format(viewMonth, "MMMM yyyy")}</Text>

            <TouchableOpacity
              onPress={() => setViewMonth((m) => addMonths(m, 1))}
              hitSlop={12}
              disabled={!canGoNext}
              style={!canGoNext && styles.navDisabled}
            >
              <ChevronRight size={22} color={canGoNext ? "#ff5c00" : "#c8c8c8"} />
            </TouchableOpacity>
          </View>

          {/* Week day headers */}
          <View style={styles.weekDayRow}>
            {WEEK_DAYS.map((d) => (
              <Text key={d} style={styles.weekDayLabel}>
                {d}
              </Text>
            ))}
          </View>

          {/* Calendar grid */}
          <View style={styles.grid}>
            {weeks.map((week, wi) => (
              <View key={wi} style={styles.weekRow}>
                {week.map((day, di) => {
                  if (!day) return <View key={di} style={styles.cell} />;

                  const state = getDayState(day);
                  const dateStr = format(day, "yyyy-MM-dd");
                  const isToday = dateStr === todayStr;
                  const isHidden = state === HABIT_DAY_STATE.OUT_OF_RANGE;
                  const hasDarkBg =
                    state === HABIT_DAY_STATE.COMPLETED || state === HABIT_DAY_STATE.MISSED;

                  return (
                    <View
                      key={di}
                      style={[
                        styles.cell,
                        state && !isHidden && { backgroundColor: STATE_META[state].color },
                        isToday && !isHidden && styles.todayCell,
                      ]}
                    >
                      <Text
                        style={[
                          styles.dayNumber,
                          isHidden && styles.outOfRangeDayNum,
                          hasDarkBg && styles.lightDayNum,
                        ]}
                      >
                        {day.getDate()}
                      </Text>
                    </View>
                  );
                })}
              </View>
            ))}
          </View>

          {/* Legend */}
          <View style={styles.legendContainer}>
            {LEGEND_STATES.map((state) => (
              <View key={state} style={styles.legendItem}>
                <View
                  style={[styles.legendSwatch, { backgroundColor: STATE_META[state].color }]}
                />
                <Text style={styles.legendLabel}>{STATE_META[state].label}</Text>
              </View>
            ))}
          </View>

        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default HabitHeatmapModal;
