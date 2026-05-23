import React, { useState } from "react";

import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import HabitHeatmapModal from "./HabitHeatmapModal";
import ProgressComponent from "./ProgressComponent";
import { goalsListStyle } from "./styles";

const GoalsList = ({ goals }) => {
  const [heatmapGoalId, setHeatmapGoalId] = useState(null);

  const renderItem = ({ item }) => {
    const { percentage, totalDays, completedDays } = item;
    const isAchieved = totalDays === completedDays;

    return (
      <TouchableOpacity
        style={goalsListStyle.goalItem}
        onPress={() => setHeatmapGoalId(item.id)}
        activeOpacity={0.7}
      >
        <View style={goalsListStyle.row}>
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
            progress={percentage}
          />
          <View style={goalsListStyle.goalDetails}>
            <Text style={goalsListStyle.goalName}>{item.name}</Text>
            <Text
              style={goalsListStyle.goalTarget}
            >{`${completedDays} of ${totalDays} days target`}</Text>
          </View>
          <Ionicons name="grid-outline" size={18} color="#c8c8c8" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={goalsListStyle.container}
        data={goals}
        renderItem={renderItem}
      />

      <HabitHeatmapModal
        visible={heatmapGoalId !== null}
        goalId={heatmapGoalId}
        onClose={() => setHeatmapGoalId(null)}
      />
    </>
  );
};

export default GoalsList;
