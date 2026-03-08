import React from "react";

import { FlatList, Text, View } from "react-native";

import ProgressComponent from "./ProgressComponent";
import { goalsListStyle } from "./styles";

const GoalsList = ({ goals }) => {
  const renderItem = ({ item }) => {
    const { percentage, totalDays, completedDays } = item;
    const isAchieved = totalDays === completedDays;

    return (
      <View style={goalsListStyle.goalItem} key={item}>
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
            >{`${completedDays} from ${totalDays} days target`}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      style={goalsListStyle.container}
      data={goals}
      renderItem={renderItem}
    />
  );
};

export default GoalsList;
