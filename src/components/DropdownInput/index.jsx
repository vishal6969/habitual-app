import React, { useEffect, useState } from "react";

import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import Tooltip from "react-native-walkthrough-tooltip";

import ChevrownDown from "../../../assets/icons/ChevronDown";
import styles from "./styles";

const DropdownInput = ({
  containerStyle,
  dropdownStyle,
  dropdownListStyle,
  label,
  topAdjustment,
  initialSelect,
  options = [],
  onSelect = () => null,
}) => {
  const [isVisible, setVisible] = useState(false);
  const [selectedItem, setSelected] = useState(options[0]);
  
  useEffect(() => {
    if (initialSelect) {
      setSelected(initialSelect);
    }
  }, [initialSelect])
  

  const handleSelect = (option) => {
    setSelected(option);
    setVisible(false);
    onSelect(option);
  };

  const renderDropdownContent = () => {
    return (
      <View>
        {options.map((option) => (
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
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <Tooltip
        isVisible={isVisible}
        allowChildInteraction={true}
        closeOnBackgroundInteraction={false}
        content={renderDropdownContent()}
        contentStyle={[styles.dropdownListContainer, dropdownListStyle]}
        backgroundColor="rgba(0, 0, 0, 0)"
        arrowStyle={{ display: "none" }}
        placement="bottom"
        onClose={() => null}
        topAdjustment={topAdjustment ? -StatusBar.currentHeight : 0}
      >
        <TouchableOpacity
          onPress={() => setVisible((prev) => !prev)}
          style={[styles.dropdown, dropdownStyle]}
        >
          <Text style={styles.dropdownValue}>{selectedItem.label}</Text>
          <ChevrownDown />
        </TouchableOpacity>
      </Tooltip>
    </View>
  );
};

export default DropdownInput;
