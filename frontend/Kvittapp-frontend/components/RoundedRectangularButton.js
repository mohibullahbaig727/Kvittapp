import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const RoundedRectangularButton = (props) => {
  return (
    <TouchableOpacity onPress={props.function}>
      <View
        style={{
          backgroundColor: "#2a2a2a",
          margin: 40,
          paddingHorizontal: 16,
          paddingVertical: 8,
          flexDirection: "row",
          borderRadius: 6,
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: "white" }}>{props.title}</Text>
        <View>{props.image}</View>
      </View>
    </TouchableOpacity>
  );
};

export default RoundedRectangularButton;
