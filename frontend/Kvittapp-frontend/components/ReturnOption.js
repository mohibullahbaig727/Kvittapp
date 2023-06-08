import React from "react";
import { Image, Text, View } from "react-native";
import CircularButton from "./CircularButton";

const ReturnOption = () => {
  return (
    <View style={{ flexDirection: "row" }}>
      <View>
        <Image
          style={{ height: 20, width: 20 }}
          source={require("../assets/bankid_logo.png")}
        />
        <Text>Company Name</Text>
      </View>
      <View>
        <Text>Choose store to return to</Text>
        <View
          style={{ width: 200, height: 20, borderRadius: 8, borderWidth: 1 }}
        ></View>
      </View>
      <CircularButton />
    </View>
  );
};

export default ReturnOption;
