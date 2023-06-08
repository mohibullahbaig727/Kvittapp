import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const RectangularButtonBlack = (props) => {
  return (
    <TouchableOpacity onPress={props.function}>
      <View
        style={{
          borderRadius: 4,
          backgroundColor: "#2a2a2a",
          width: props.smallButton ? 120 : "100%",
          height: 30,
          marginVertical: 4,
          alignItems: "center",
          justifyContent: "space-around",
          flexDirection: "row",
        }}
      >
        <Text style={{ color: "white", fontFamily: "BalooChettan2-Bold" }}>
          {props.text}
        </Text>
        {props.child}
      </View>
    </TouchableOpacity>
  );
};

export default RectangularButtonBlack;
