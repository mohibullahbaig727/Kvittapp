import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import InputField from "../components/InputField";
import RectangularButton from "../components/RectangularButton";
import { addCard } from "../services/add";
import { getCardType } from "../services/handleCardType";

const AddBankCard = ({ navigation }) => {
  const [cName, setcName] = useState("");
  const [cNum, setcNum] = useState("");
  const [cExp, setcExp] = useState("");

  const handleVerify = async () => {
    // Get the card type using the card number
    const cardType = getCardType(cNum);

    const cardDetails = {
      bank: cName,
      cardNumber: cNum,
      expirationDate: cExp,
      PO: cardType, // Update PO with the detected card type
    };

    await addCard(1, cardDetails); // Call the addCard function with appropriate parameters
    navigation.navigate("Cards");
  };
  return (
    <View style={{ flexDirection: "column", padding: 20 }}>
      <View style={{ alignItems: "flex-end" }}>
        <RectangularButton text="Skanna Kort" smallButton={true} />
      </View>

      <View style={{ padding: 8 }}>
        <Text style={styles.headingText}>Card Name</Text>
        <InputField
          value={cName}
          onTextChange={(value) => setcName(value)}
          keyboardType="default"
        />
      </View>

      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1, padding: 8 }}>
          <Text style={styles.headingText}>Card Number</Text>
          <InputField
            value={cNum}
            onTextChange={(value) => setcNum(value)}
            keyboardType="number-pad"
          />
        </View>
        <View style={{ flex: 1, padding: 8 }}>
          <Text style={styles.headingText}>Expiry</Text>
          <InputField
            value={cExp}
            onTextChange={(value) => setcExp(value)}
            keyboardType="default"
          />
        </View>
      </View>
      <View style={{ padding: 8 }}>
        <RectangularButton
          text="Verify"
          smallButton={false}
          function={handleVerify} // Update the Verify button's function prop
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headingText: {
    fontFamily: "BalooChettan2-Bold",
  },
});

export default AddBankCard;
