import React, { useMemo } from "react";

import { Image, ImageBackground, Text, View } from "react-native";

import styles from "./styles";
import ProgressComponent from "./ProgressComponent";
import { useHabits } from "@/src/stores/habits";

const Banner = () => {
  const { habits } = useHabits();
  const filteredHabits = useMemo(
    () => habits.filter((habit) => habit.active),
    [habits]
  );

  const completedHabitsCount = useMemo(() => {
    let count = 0;

    filteredHabits.forEach((habit) => {
      if (habit.completed) {
        count++;
      }
    });
    return count;
  }, [filteredHabits]);

  const progressPercentage = useMemo(
    () => (completedHabitsCount / filteredHabits.length) * 100,
    [completedHabitsCount, filteredHabits]
  );

  return (
    <ImageBackground
      style={styles.container}
      source={require("../../../../assets/images/home-banner-bg.png")}
    >
      <ProgressComponent progress={progressPercentage} />
      <View>
        <Text style={styles.infoTxt1}>
          {completedHabitsCount > 0
            ? `${completedHabitsCount} of ${filteredHabits.length} habits`
            : "No Habits"}
        </Text>
        <Text style={styles.infoTxt2}>completed today!</Text>
      </View>
      <Image
        style={styles.calendar}
        source={require("../../../../assets/images/home-calendar-icon.png")}
      />
    </ImageBackground>
  );
};

export default Banner;
