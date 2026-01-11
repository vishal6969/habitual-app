import React, { useMemo } from "react";

import { Image, ImageBackground, Text, View } from "react-native";

import styles from "./styles";
import ProgressComponent from "./ProgressComponent";
import { useHabits } from "@/src/stores/habits";

const Banner = () => {
  const { habits } = useHabits();

  const completedHabitsCount = useMemo(() => {
    let count = 0;

    habits.forEach((habit) => {
      if (habit.completed) {
        count++;
      }
    });
    return count;
  }, [habits]);

  const progressPercentage = useMemo(
    () => (completedHabitsCount / habits.length) * 100,
    [completedHabitsCount, habits]
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
            ? `${completedHabitsCount} of ${habits.length} habits`
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
