import React from "react";

import { Modal, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import styles from "./styles";
import CustomTextInput from "./CustomTextInput";
import DropdownInput from "./DropdownInput";
import { GOAL_DURATION, HABIT_REGULARITY } from "../../../utils/goal";
import Close from "../../../../assets/icons/Close";

const AddGoalModal = ({ isVisible = true, onClose }) => {
  const handleClose = () => {
    onClose();
  };

  const handleSubmit = () => {
    onClose();
  };
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
        <CustomTextInput label={"Your Goal"} placeholder={"Build a Physique"} />
        <CustomTextInput label={"Habit Name"} placeholder={"Go Gym"} />
        <DropdownInput options={GOAL_DURATION} label={"Duration"} />
        <DropdownInput options={HABIT_REGULARITY} label={"Regularity"} />
        <TouchableOpacity onPress={handleSubmit}>
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
