import React from "react";

import { FlatList, StyleSheet, Text, View } from "react-native";

import ProgressComponent from "./ProgressComponent";

const GoalsList = () => {
  const renderItem = ({ item }) => {
    let isAchieved = item % 2 == 0;

    return (
      <View style={styles.goalItem} key={item}>
        <View style={styles.row}>
          <ProgressComponent
            size={49}
            strokeWidth={3}
            color1={isAchieved ? "#37c871" : "#b0b0b0"}
            color2={isAchieved ? "#5fe394" : "#b0b0b0"}
            fontStyle={{
              color: isAchieved ? "#37c871" : "#b0b0b0",
              fontSize: 11,
              fontFamily: "Nunito-Bold",
            }}
            bgCircleColor="#dbdbdb"
          />
          <View style={styles.goalDetails}>
            <Text style={styles.goalName}>Journaling everyday</Text>
            <Text style={styles.goalTarget}>7 from 7 days target</Text>
          </View>
        </View>
        <View
          style={[
            styles.goalStatusPill,
            !isAchieved && styles.altGoalStatusPill,
          ]}
        >
          <Text
            style={[
              styles.goalStatusTxt,
              !isAchieved && styles.altGoalStatusTxt,
            ]}
          >
            {isAchieved ? "Achieved" : "Unachieved"}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      style={styles.container}
      data={[1, 2, 3, 4, 5, 6, 7, 8]}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 22,
  },
  goalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  goalDetails: {
    marginLeft: 16,
  },
  goalName: {
    fontFamily: "Nunito-Bold",
    fontSize: 16,
    color: "#2f2f2f",
  },
  goalTarget: {
    fontFamily: "Nunito-Medium",
    fontSize: 14,
    color: "#2f2f2f",
    marginTop: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  goalStatusPill: {
    backgroundColor: "#d7ffe7",
    borderRadius: 32,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  altGoalStatusPill: {
    backgroundColor: "none",
  },
  goalStatusTxt: {
    fontFamily: "Nunito-Medium",
    fontSize: 14,
    color: "#37c871",
  },
  altGoalStatusTxt: {
    color: "#959595",
  },
});

export default GoalsList;
