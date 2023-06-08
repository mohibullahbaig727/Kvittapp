import React, { memo } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const InputField = (props) => {
  return (
    <View
      style={{
        backgroundColor: "#E6E6E6",
        borderRadius: 12,
        paddingHorizontal: 8,
        justifyContent: "center",
        height: Dimensions.get("window").height * 0.035,
      }}
    >
      <TextInput
        style={styles.inputText}
        onChangeText={props.onTextChange}
        keyboardType={props.keyboardType}
        placeholder={props.placeholder}
      
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputText: {
    fontSize: 14,
    fontFamily: "BalooChettan2-Regular",
    paddingHorizontal:6
  },
  labelGrey: {
    fontSize: 14,
    fontFamily: "BalooChettan2-Bold",
    textAlign: "center",
    color: '#B7B7B7'
  },
});


export default memo(InputField);
