import React from "react";
import { Image, View } from "react-native";
import { Text } from "react-native";
import RoundedRectangularButton from "../components/RoundedRectangularButton";

const AddBankCardInfo = () => {
  return (
    <View style={{ justifyContent: "center", alignSelf: "center", flex: 1 }}>
      <Text>Välkommen till Kvittapp</Text>
      <Text>Koppla ditt bankkort för att börja spara kvitton.</Text>
      <RoundedRectangularButton
        title="mohib"
        image={
          <Image
            style={{ height: 40, width: 40 }}
            source={require("../assets/bankid_logo.png")}
          />
        }
      />
    </View>
  );
};

export default AddBankCardInfo;
