import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const DropDownField = ({ label, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropDownButton} onPress={toggleDropDown}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.selectedOption}>{selectedOption}</Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.optionsContainer}>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.optionButton}
              onPress={() => handleOptionSelect(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  dropDownButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedOption: {
    fontSize: 16,
    color: "#666",
  },
  optionsContainer: {
    marginTop: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  optionButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  optionText: {
    fontSize: 16,
  },
});

export default DropDownField;
