import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

const CircularButton = (props) => {
  return (
    <TouchableOpacity
      style={[styles.roundButton1, { marginLeft: props.marginLeft }]}
      onPress={props.function}
    >
      <Image
        style={{
          height: 12,
          width: 12,
        }}
        source={require("../assets/icons/arrowRightIcon.png")}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  roundButton1: {
    width: 20,
    height: 20,
    borderRadius: 100,
    justifyContent: "center",
  },
  textStyle: {
    color: "#BEA83B",
    alignSelf: "center",
  },
});

export default CircularButton;
