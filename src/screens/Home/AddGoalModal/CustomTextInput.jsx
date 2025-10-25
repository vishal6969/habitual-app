import React from "react";
import { TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";

const CustomTextInput = ({ label, onChangeText, placeholder }) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={"rgba(47, 47, 47, 0.4)"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 14,
    marginTop: 22,
  },
  input: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ededed",
    marginTop: 8,
    backgroundColor: "#fff",
    paddingLeft: 12,
  },
});
export default CustomTextInput;
