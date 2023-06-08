import React from "react";
import { Text, View } from "react-native";

const TextContainer = (props) => {
  return (
    <View
      style={{
        backgroundColor: "#2a2a2a",
        paddingVertical: 8,
        alignItems: "center",
        borderRadius: 8,
      }}
    >
      <Text style={{ color: "white" }}>{props.title}</Text>
    </View>
  );
};

export default TextContainer;
