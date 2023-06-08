import React, { useRef, useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import InputField from "./InputField";
import RectangularButton from "./RectangularButton";
import DropDownField from "./DropDownField";
import MyDatePicker from "./DatePicker";

const BottomModalSheetFilter = ({ visible, onClose }) => {
  const modalRef = useRef(null);

  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    // Do something with the selected option, e.g. update state, make API call, etc.
  };

  const optionsTo = ["Option 1", "Option 2", "Option 3"]; // Array of options to display in the drop-down
  const optionsFrom = ["Option 1", "Option 2", "Option 3"];
  const optionsAmount = ["0 - 500", "500-1000", "1000-2000"];
  const optionsBankCard = ["Nordea", "Swed", "Handelsbanken"];
  return (
    <Modal
      ref={modalRef}
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => onClose()}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        {/* Content inside modal */}
        <View style={styles.modalContainer}>
          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <View style={{ flex: 1, padding: 8 }}>
              {/* <Text>From</Text> */}
              <MyDatePicker label="From" />
            </View>
            <View style={{ width: 24 }} />
            <View style={{ flex: 1, padding: 8 }}>
              {/* <Text>Bank Card</Text> */}
              <DropDownField
                label="Bank Card"
                options={optionsBankCard}
                onSelect={handleOptionSelect}
              />
            </View>
          </View>

          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <View style={{ flex: 1, padding: 8 }}>
              {/* <Text>To</Text> */}
              <MyDatePicker label="To" />
            </View>
            <View style={{ width: 24 }} />
            <View style={{ flex: 1, padding: 8 }}>
              {/* <Text>Amount</Text> */}
              <DropDownField
                label="Amount"
                options={optionsAmount}
                onSelect={handleOptionSelect}
              />
            </View>
          </View>

          <RectangularButton smallButton={true} text="Filter" />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 8,
  },
  closeButtonText: {
    fontSize: 16,
    color: "blue",
  },
});

export default BottomModalSheetFilter;
