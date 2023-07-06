import React, { useState } from "react";
import { Text } from "react-native";
import { TouchableOpacity, View } from "react-native";

const SquareRadioButton = ({ selected, onPress, label }) => {
  const [isSelected, setIsSelected] = useState(selected);

  const handlePress = () => {
    setIsSelected(!isSelected);
    onPress(!isSelected);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{ flexDirection: "row",  }}
    >
      <View
        style={{
          width: 16,
          height: 16,
          borderWidth: 2,
          borderRadius: 5,
          borderColor: "#81A7FF",
          alignContent: 'center',
          alignSelf:'center',
          backgroundColor: isSelected ? "#81A7FF" : "white",
        }}
      />

      <Text style={{ marginLeft: 8, fontFamily: "BalooChettan2-Bold" }}>
        {label ? label : "Select Card"}
      </Text>
    </TouchableOpacity>
  );
};

export default SquareRadioButton;
