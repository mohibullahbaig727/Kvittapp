import React from "react";
import { Image, Text, View } from "react-native";
import RectangularButton from "../components/RectangularButton";

const ReturnCreated = ({ navigation }) => {
  return (
    <View style>
      <Image
        style={{
          height: 134,
          width: 134,
          alignSelf: "center",
        }}
        source={require("../assets/icons/return_created.png")}
      />
      <Text>Retur Skapad</Text>
      <View>
        <Text>Returordernummer: 374749539281</Text>
        <Text>
          Du kan nu lämna dina varor till en av Postnords Serviceställen Du kan
          följa statusen på din retur i dina returer.
        </Text>
      </View>
      <RectangularButton
        text="See your returns"
        function={() => navigation.navigate("Returns")}
      />
      {/* <RectangularButton text="Karta över Postnords serviceställen" /> */}
      <Text>Visa denna QRkod till kassan för att ta emot din retu</Text>
    </View>
  );
};

export default ReturnCreated;
