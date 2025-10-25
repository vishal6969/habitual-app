import React, { useState } from "react";

import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import Tooltip from "react-native-walkthrough-tooltip";

import ChevrownDown from "../../../../assets/icons/ChevronDown";

const DropdownInput = ({ label, options, onSelect }) => {
  const [isVisible, setVisible] = useState(false);
  const [selectedItem, setSelected] = useState(options[0]);

  const handleSelect = (option) => {
    setSelected(option);
    setVisible(false);
  };

  const renderDropdownContent = () => {
    return (
      <View>
        {options.map((option, index) => (
          <TouchableOpacity
            onPress={() => handleSelect(option)}
            key={option.id}
          >
            <Text
              style={[
                styles.dropdownListItem,
                selectedItem.id == option.id && styles.selectedItem,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Tooltip
        isVisible={isVisible}
        allowChildInteraction={true}
        closeOnBackgroundInteraction={false}
        content={renderDropdownContent()}
        contentStyle={styles.dropdownListContainer}
        backgroundColor="rgba(0, 0, 0, 0)"
        arrowStyle={{ display: "none" }}
        placement="bottom"
        onClose={() => null}
      >
        <TouchableOpacity
          onPress={() => setVisible((prev) => !prev)}
          style={styles.dropdown}
        >
          <Text style={styles.dropdownValue}>{selectedItem.label}</Text>
          <ChevrownDown />
        </TouchableOpacity>
      </Tooltip>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 14,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 22,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 182,
    borderRadius: 4,
    backgroundColor: "#e7e7e7",
    paddingVertical: 6,
    paddingLeft: 12,
    paddingRight: 6,
  },
  dropdownValue: {
    fontFamily: "Nunito-Bold",
    fontSize: 14,
  },
  dropdownListContainer: {
    width: 182,
    height: "auto",
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderWidth: 0.5,
    borderColor: "rgba(0, 0, 0, 0.2)",
    left: -14,
    top: -6,
  },
  dropdownListItem: {
    fontFamily: "Nunito-Bold",
    color: "rgba(0, 0, 0, 0.5)",
    fontSize: 14,
    paddingLeft: 12,
    paddingVertical: 3,
  },
  selectedItem: {
    backgroundColor: "#e7e7e7",
    color: "#2f2f2f",
  },
});

export default DropdownInput;
