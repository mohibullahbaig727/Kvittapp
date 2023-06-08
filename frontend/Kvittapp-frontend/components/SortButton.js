import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const SortButton = ({ onPress, child, isAsc }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        {child}
        <Image
          resizeMode="contain"
          style={[
            styles.arrow,
            { tintColor: isAsc == null ? "grey" : isAsc ? "black" : "grey" },
          ]}
          source={require("../assets/icons/arrowDown.png")}
        />
        <Image
          resizeMode="contain"
          style={[
            styles.arrow,
            { tintColor: isAsc == null ? "grey" : isAsc ? "grey" : "black" },
          ]}
          source={require("../assets/icons/arrowUp.png")}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  arrow: {
    height: 12,
    width: 12,
    marginRight: 6,
    alignSelf: "center",
  },
});

export default SortButton;
