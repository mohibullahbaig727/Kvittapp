import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, TextInput, View, Platform, TouchableOpacity } from "react-native";
import RectangularButton from "../components/RectangularButton";
import { addCard } from "../services/add";
import { getCardType } from "../services/handleCardType";
import { validateCardName, validateCardNumber } from "../services/validation";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddBankCard = ({ navigation }) => {
  const [cName, setcName] = useState("");
  const [cNameError, setcNameError] = useState("");
  const [cNum, setcNum] = useState("");
  const [cNumberError, setcNumberError] = useState("");
  const [cExp, setcExp] = useState("");
  const [cExpError, setcExpError] = useState("");
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  console.log(cNum, cName, cExp, 'mooo')

  const handleVerify = async () => {
    // Get the card type using the card number
    const cardType = getCardType(cNum);

    const cardDetails = {
      bank: cName,
      cardNumber: cNum,
      expirationDate: cExp,
      PO: cardType,
    };

    await addCard(3, cardDetails);
    navigation.navigate("Cards");
  };

  const handleSubmit = () => {
    if (cNameError) {
      return;
    }
    handleVerify();
  };

  const showDatePicker = () => {
    setShow(true);
  };

  const handleDateChange = (event, selected) => {
    const currentDate = selected || new Date();
    setShow(Platform.OS === "ios");
    setSelectedDate(currentDate);
    const formattedDate = formatDate(currentDate);
    setcExp(formattedDate);
  };

  const formatDate = (date) => {
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(2);
    return `${month < 10 ? "0" + month : month}/${year}`;
  };

  return (
    <View style={{ flexDirection: "column", padding: 20, backgroundColor: "white", height: "100%" }}>
      <View style={{ alignItems: "flex-end" }}>
        <RectangularButton text="Skanna Kort" smallButton={true} />
      </View>

      <View style={styles.formField}>
        <Text style={styles.headingText}>Card Name</Text>
        <TextInput
          value={cName}
          onChangeText={(value) => {
            setcName(value);
            setcNameError(validateCardName(value));
          }}
          style={styles.input}
          keyboardType="default"
        />
        {cNameError ? <Text style={styles.errorText}>{cNameError}</Text> : null}
      </View>

      <View style={{ flexDirection: "row" }}>
        <View style={[styles.formField, { flex: 1 }]}>
          <Text style={styles.headingText}>Card Number</Text>
          <TextInput
            value={cNum}
            onChangeText={(value) => {
              setcNum(value);
              setcNumberError(validateCardNumber(value));
            }}
            style={styles.input}
            keyboardType="number-pad"
          />
          {cNumberError ? <Text style={styles.errorText}>{cNumberError}</Text> : null}
        </View>
        <View style={[styles.formField, { flex: 1 }]}>
          <Text style={styles.headingText}>Expiry</Text>
          <TouchableOpacity onPress={showDatePicker}>
            <Text style={styles.dateText}>{cExp ? cExp : "Select Expiry Date"}</Text>
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
          {cExpError ? <Text style={styles.errorText}>{cExpError}</Text> : null}
        </View>
      </View>
      <View style={{ padding: 8 }}>
        <RectangularButton
          text="Verify"
          inactiveButton={cName == "" || cNum == "" || cExp == ""}
          smallButton={false}
          onPress={()=>handleVerify} // Update the Verify button's onPress prop
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headingText: {
    fontFamily: "BalooChettan2-Bold",
  },
  formField: {
    padding: 8,
  },
  input: {
    backgroundColor: "#E6E6E6",
    borderRadius: 6,
    paddingHorizontal: 8,
    justifyContent: "center",
    height: Dimensions.get("window").height * 0.035,
    fontSize: 14,
    fontFamily: "BalooChettan2-Regular",
    paddingHorizontal: 6,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  dateText: {
    fontSize: 14,
    fontFamily: "BalooChettan2-Regular",
    paddingVertical: 8,
  },
});

export default AddBankCard;
