import React, { useState } from "react";
import { View, StyleSheet, Platform, TouchableOpacity, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const MyDatePicker = (props) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Function to handle date change
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === "ios"); // Hide on iOS after selecting date
    if (selectedDate) {
      setDate(selectedDate);
      props.onDateChange(selectedDate); // Call the callback function with the selected date
    }
  };

  // Format date and time separately
  // const formatDate = (date) => {
  //   const formattedDate = date.toLocaleDateString("en-US", {
  //     year: "numeric",
  //     month: "2-digit",
  //     day: "2-digit",
  //   });
  //   return formattedDate.replace(/\//g, "-");
  // };

  // const formatTime = (date) => {
  //   const formattedTime = date.toLocaleTimeString("en-US", {
  //     hour: "2-digit",
  //     minute: "2-digit",
  //     second: "2-digit",
  //   });
  //   return formattedTime;
  // };

  return (
    <View>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.container}
      >
        <Text style={styles.label}>
          {`${props.label}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
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
});

export default MyDatePicker;
