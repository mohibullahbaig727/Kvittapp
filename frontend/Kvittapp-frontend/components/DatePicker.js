import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Text,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const MyDatePicker = (props) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Function to handle date change
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === "ios"); // Hide on iOS after selecting date
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  console.log(date[1]);

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
          {date == Date() ? props.label : date[0]}
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
