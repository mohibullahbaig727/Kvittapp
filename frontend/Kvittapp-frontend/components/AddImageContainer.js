import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import CircularButton from "./CircularButton";

const AddImageContainer = (props) => {
  return (
    <TouchableOpacity onPress={props.function}>
      <View
        style={{
          backgroundColor: "black",
          width: 80,
          height: 80,
          borderRadius: 8,

          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {props.image ? (
          <Image
            style={{ height: 80, width: 80, borderRadius: 8 }}
            source={{ uri: props.image }}
          />
        ) : (
          <CircularButton text="+" />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default AddImageContainer;
