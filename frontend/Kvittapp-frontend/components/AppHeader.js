import { View, Text, Image } from "react-native";
import React from "react";

const AppHeader = (props) => {
  return (
    <View>
      <Image
        style={{ tintColor: "#81A7FF" }}
        source={require("../assets/KvittappLogo.png")}
      />
    </View>
  );
};

export default AppHeader;
