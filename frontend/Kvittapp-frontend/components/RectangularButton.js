import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const RectangularButton = (props) => {
  return (
    <TouchableOpacity onPress={props.function}>
      <View
        style={{
          borderRadius: 4,
          backgroundColor: "#81A7FF",
          width: props.smallButton ? 120 : "100%",
          height: 30,
          marginVertical: 4,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image />
        <Text style={{ color: "white", fontFamily: "BalooChettan2-Bold" }}>
          {props.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default RectangularButton;
