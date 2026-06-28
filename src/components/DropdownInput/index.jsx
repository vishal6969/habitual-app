import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import ChevrownDown from "../../../assets/icons/ChevronDown";
import styles from "./styles";

const DropdownInput = ({
  containerStyle,
  dropdownStyle,
  dropdownListStyle,
  label,
  initialSelect,
  options = [],
  onSelect = () => null,
}) => {
  const [isVisible, setVisible] = useState(false);
  const [selectedItem, setSelected] = useState(options[0]);

  useEffect(() => {
    if (initialSelect) setSelected(initialSelect);
  }, [initialSelect]);

  const handleSelect = (option) => {
    setSelected(option);
    setVisible(false);
    onSelect(option);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.dropdownWrapper}>
        <TouchableOpacity
          onPress={() => setVisible((prev) => !prev)}
          style={[styles.dropdown, dropdownStyle]}
        >
          <Text style={styles.dropdownValue}>{selectedItem?.label}</Text>
          <ChevrownDown />
        </TouchableOpacity>
        {isVisible && (
          <View style={[styles.dropdownListContainer, dropdownListStyle]}>
            {options.map((option) => (
              <TouchableOpacity onPress={() => handleSelect(option)} key={option.id}>
                <Text
                  style={[
                    styles.dropdownListItem,
                    selectedItem?.id == option.id && styles.selectedItem,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

export default DropdownInput;
