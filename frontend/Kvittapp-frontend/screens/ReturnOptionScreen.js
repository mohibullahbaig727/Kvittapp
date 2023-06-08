import React from "react";
import { Image, Text, View } from "react-native";
import TextContainer from "../components/TextContainer";
import RoundedRectangularButton from "../components/RoundedRectangularButton";
import RectangularButton from "../components/RectangularButton";
import { useNavigation } from "@react-navigation/native";

const ReturnOptionScreen = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        paddingHorizontal: 32,
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 22,
          }}
        >
          <Image
            style={{
              width: 22,
              height: 22,
              overflow: "hidden",
              resizeMode: "contain",
              tintColor: "#BEA83D",
            }}
            source={require("../assets/icons/returnsIcon.png")}
          />
          <Text>Create a return</Text>
        </View>
        <View style={{ borderTopWidth: 1, marginBottom: 32 }} />
        <TextContainer title="Choose return option" />
        <View style={{ flexDirection: "row" }}>
          <Image
            style={{
              width: 50,
              height: 50,
              overflow: "hidden",
              resizeMode: "contain",
              tintColor: "#BEA83D",
              alignSelf: "center",
              marginRight: 12,
            }}
            source={require("../assets/icons/store_details_icon.png")}
          />
          <View style={{ marginRight: 32 }}>
            <Text style={{ textAlign: "center" }}>
              The only available option is to return the product at one of the
              stores the company owns.
            </Text>
            <View style={{ height: 20 }} />
            <Text style={{ textAlign: "center" }}>Address:</Text>
            <Text style={{ textAlign: "center" }}>
              Häsängsvägen 10, 691 42 Karlskoga, Stockholm, Sweden.
            </Text>
          </View>
        </View>
      </View>
      <View style={{ marginBottom: 30 }}>
        <RectangularButton
          text="Create a return"
          function={() => navigation.navigate("ReturnCreated")}
        />
      </View>
    </View>
  );
};

export default ReturnOptionScreen;
