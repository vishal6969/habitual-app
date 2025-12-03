import React from "react";

import { Text, View } from "react-native";

import styles from "./styles";
import DropdownInput from "@/src/components/DropdownInput";
import { PROGRESS_PERIOD } from "../../utils/progress";
import ProgressComponent from "./ProgressComponent";
import Tick from "../../../assets/icons/Tick";
import Close from "../../../assets/icons/Close";
import GoalsList from "./GoalsList";

const Progress = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Progress</Text>
        <DropdownInput
          dropdownListStyle={styles.filterList}
          dropdownStyle={styles.filterInput}
          containerStyle={styles.filterContainer}
          options={PROGRESS_PERIOD}
          topAdjustment={true}
        />
      </View>
      <View style={styles.content}>
        <ProgressComponent />
        <View style={styles.row1}>
          <Tick />
          <Text style={styles.goalAchievedTxt}>
            11 Goals have been achieved
          </Text>
        </View>
        <View style={styles.row2}>
          <Close size={22} color="#a2a2a2" />
          <Text style={styles.goalNotAchievedTxt}>6 Goals not achieved</Text>
        </View>
        <GoalsList />
      </View>
    </View>
  );
};

export default Progress;
