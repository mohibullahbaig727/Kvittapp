import React, { useContext, useRef, useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import RectangularButton from "./RectangularButton";
import DropDownField from "./DropDownField";
import MyDatePicker from "./DatePicker";
import CardContext from "../CardContext";

const BottomModalSheetFilter = ({ visible, onClose, onFilter }) => {
  const modalRef = useRef(null);

  const [selectedAmountRange, setSelectedAmountRange] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");

  const handleOptionSelect = (option) => {
    setSelectedAmountRange(option);
  };

  const optionsAmount = [{from:0 , to:500 }, {from:500 , to:1000 }, {from:1000 , to:2000 }, {from:2000 , to:5000 }, {from:5000 , to:10000 }, {from:10000 , to:50000 }, {from:50000 , to:100000 }];

  const { updateFilterParams } = useContext(CardContext);

  const handleStartDateChange = (date) => {
    const formattedDate = formatDate(date)
    setSelectedStartDate(formattedDate);
  };

  const handleEndDateChange = (date) => {
    const formattedDate = formatDate(date)
    setSelectedEndDate(formattedDate);
  };


  const formatDate = (date) => {
    const formattedDate = date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // Set to false to use 24-hour clock format
    });
  
    const [dateString, timeString] = formattedDate.split(", ");
    const [month, day, year] = dateString.split("/");
    const [hour, minute, second] = timeString.split(":");
  
    const formattedDateTime = `${year}-${month}-${day}`;
    // ${hour}:${minute}:${second};
    return formattedDateTime;
  };

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
          <TouchableOpacity onPress={onClose} style={{ alignSelf: "flex-end" }}>
            <Image
              style={{ height: 16, width: 16 }}
              resizeMode="contain"
              source={require("../assets/icons/cancelButtonIcon.png")}
            />
          </TouchableOpacity>

          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <View style={{ flex: 1, padding: 8 }}>
              {/* <Text>From</Text> */}
              <MyDatePicker label={selectedStartDate =='' ? "From" : selectedStartDate} onDateChange={handleStartDateChange} />
            </View>
            <View style={{ width: 24 }} />
        
            <View style={{ flex: 1, padding: 8 }}>
              <DropDownField
                label={
                  selectedAmountRange == "" ? "Amount" : `${selectedAmountRange.from} - ${selectedAmountRange.to} `
                }
                options={optionsAmount}
                onSelect={handleOptionSelect}
              />
            </View>
          </View>

          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <View style={{ flex: 1, padding: 8 }}>
              {/* <Text>To</Text> */}
              <MyDatePicker label={selectedEndDate =='' ? "To" : selectedEndDate} onDateChange={handleEndDateChange} />
            </View>
            <View style={{ width: 24 }} />
            <View style={{ flex: 1, padding: 8 }} />
          </View>

          <RectangularButton
            smallButton={true}
            text="Filter"
            function={() => {
              updateFilterParams({ selectedStartDate, selectedEndDate, selectedAmountRange })
            onClose()
            }}
          />
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
