import React from "react";

import { TouchableOpacity, ScrollView, Text, View } from "react-native";
import { Shadow } from "react-native-shadow-2";

import styles from "./styles";
import CompleteTick from "../../../../assets/icons/CompleteTick";
import ThreeDotVertical from "../../../../assets/icons/ThreeDotVertical";
import CheckBox from "../../../../assets/icons/CheckBox";

const Habits = () => {
  const renderItem = ({ isComplete }) => {
    return (
      <TouchableOpacity
        style={[styles.habitItem, !isComplete && styles.altHabitItem]}
      >
        <Text style={[styles.habitTitle, !isComplete && styles.altHabitTitle]}>
          Meditation
        </Text>
        <View style={styles.row}>
          {isComplete ? <CompleteTick /> : <CheckBox />}
          <TouchableOpacity style={styles.threeDotIcon}>
            <ThreeDotVertical />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

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
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {renderItem({ isComplete: true })}
          {renderItem({ isComplete: true })}
          {renderItem({ isComplete: false })}
          {renderItem({ isComplete: true })}
          {renderItem({ isComplete: false })}
          {renderItem({ isComplete: true })}
          {renderItem({ isComplete: true })}
          {renderItem({ isComplete: true })}
          {renderItem({ isComplete: false })}
          {renderItem({ isComplete: true })}
          {renderItem({ isComplete: false })}
          {renderItem({ isComplete: false })}
        </ScrollView>
      </View>
    </Shadow>
  );
};

export default Habits;
