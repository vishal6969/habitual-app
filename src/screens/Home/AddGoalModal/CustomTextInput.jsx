import React, { useEffect, useState } from "react";
import { TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";

const CustomTextInput = ({
  label,
  onChangeText,
  placeholder,
  initialValue,
}) => {
  const [value, setValue] = useState();

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
    }
  }, [initialValue]);

  const handleTextChange = (txt) => {
    onChangeText?.(txt);
    setValue(txt);
  };

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        style={styles.input}
        onChangeText={handleTextChange}
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
    color: "#2f2f2f",
    marginTop: 22,
  },
  input: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ededed",
    marginTop: 8,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: "Nunito-Medium",
    fontSize: 14,
    color: "#2f2f2f",
  },
});
export default CustomTextInput;
