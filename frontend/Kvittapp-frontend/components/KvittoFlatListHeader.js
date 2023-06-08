import React, { useContext, useState } from "react";
import { Image, Text, View, StyleSheet } from "react-native";

import BottomModalSheetFilter from "./BottomModalSheetFilter";
import CardContext from "../CardContext";
import RectangularButtonBlack from "./RectangularButtonBlack";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

const KvittoFlatListHeader = (props) => {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const { selectedCards, updateSelectedCards } = useContext(CardContext);
  const [selectedValue, setSelectedValue] = useState("");
  const navigation = useNavigation();

  const options = [
    {
      label: "Menu",
      value: "menu",
      image: require("../assets/icons/bank_card_icon.png"),
      function: () => console.log("Do Nothing"),
    },
    {
      label: "Filters",
      value: "option1",
      image: require("../assets/icons/bank_card_icon.png"),
      function: () => console.log("Function for Option 1"),
    },
    {
      label: "Folders",
      value: "option2",
      image: require("../assets/icons/bank_card_icon.png"),
      function: () => console.log("Function for Option 2"),
    },
    {
      label: "Add receipt manually",
      value: "option3",
      image: require("../assets/icons/bank_card_icon.png"),
      function: () => console.log("Function for Option 3"),
    },
    {
      label: "Cards",
      value: "option4",
      image: require("../assets/icons/bank_card_icon.png"),
      function: () => navigation.navigate("Cards"),
    },
    {
      label: "Create a return",
      image: require("../assets/icons/bank_card_icon.png"),
      value: "option5",
      function: () => navigation.navigate("OpenBuysDetails"),
    },
  ];
  //value change function for dropdown
  const onValueChange = (itemValue, itemIndex) => {
    const selectedOption = options.find((option) => option.value === itemValue);
    selectedOption.function();
    setSelectedValue(itemValue);
  };

  const renderPickerItem = (option) => (
    <Picker.Item
      label={option.label}
      value={option.value}
      key={option.value}
      style={{
        backgroundColor: "#2a2a2a",
        color: "white",
        fontFamily: "BalooChettan2-Regular",
        borderWidth: 1,
        borderColor: "white",
      }}
      onPress={() => option.action()}
    >
      <View style={{ width: 20 }}>
        <Image
          source={option.image}
          style={{ height: 12, width: 12, marginLeft: 10 }}
        />
      </View>
    </Picker.Item>
  );

  return (
    <View style={styles.container}>
      <BottomModalSheetFilter
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
      />
      {/* <View style={styles.cardContainer}>
        <Image
          style={styles.cardImage}
          source={
            selectedCards.length >= 2 || selectedCards.length == 0
              ? require("../assets/icons/bank_card_icon.png")
              : selectedCards[0]?.PO == "VISA"
              ? require("../assets/icons/visa_icon.png")
              : require("../assets/icons/mastercard_icon.png")
          }
        />

        {selectedCards.length == 1 ? (
          <View style={styles.cardInfoContainer}>
            <Text style={styles.cardLabel}>{selectedCards[0]?.bank}</Text>
            <Text style={styles.cardNumber}>
              {selectedCards[0]?.cardNumber == [] ||
              selectedCards[0]?.cardNumber == null
                ? "No card selected"
                : selectedCards[0]?.cardNumber}
            </Text>
          </View>
        ) : selectedCards.length >= 2 ? (
          <View style={styles.cardInfoContainer}>
            <Text style={styles.cardNumber}>
              {selectedCards.length} Cards selected
            </Text>
          </View>
        ) : (
          <View style={styles.cardInfoContainer}>
            <Text style={styles.cardNumber}>No cards selected</Text>
          </View>
        )}
      </View> */}
      {/* <View style={styles.divider} /> */}
      {/* <View style={styles.filterButtonContainer}>
        <RectangularButtonBlack
          text="Search"
          smallButton={true}
          function={() => setFilterModalVisible(true)}
          child={
            <Image
              style={styles.buttonImage}
              source={require("../assets/icons/bank_card_icon.png")}
            />
          }
        />

        <View style={styles.containerDropDown}>
          <Picker
            mode="dropdown"
            onValueChange={onValueChange}
            placeholder="Menu"
            style={{
              backgroundColor: "#2a2a2a",
              color: "white",
              height: 30,
            }}
            dropdownIconColor="#BEA83D"
          >
            {options.map(renderPickerItem)}
          </Picker>
        </View>
      </View> */}
      <View style={{ flexDirection: "row", flex: 1 }}>
        <Image
          style={styles.cardImage}
          source={require("../assets/icons/bank_card_icon.png")}
        />
        <View style={styles.cardInfoContainer}>
          {selectedCards.length == 1 ? (
            <View style={styles.cardInfoContainer}>
              <Text style={styles.cardLabel}>{selectedCards[0]?.bank}</Text>
              <Text style={styles.cardNumber}>
                {selectedCards[0]?.cardNumber == [] ||
                selectedCards[0]?.cardNumber == null
                  ? "No card selected"
                  : selectedCards[0]?.cardNumber}
              </Text>
            </View>
          ) : selectedCards.length >= 2 ? (
            <View style={styles.cardInfoContainer}>
              <Text style={styles.cardLabel}>
                {selectedCards.length} Cards selected
              </Text>
            </View>
          ) : (
            <View style={styles.cardInfoContainer}>
              <Text style={styles.cardLabel}>No cards selected</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  cardImage: {
    width: 140,
    height: 70,
    resizeMode: "contain",
    flex: 1,
  },
  buttonImage: {
    width: 22,
    height: 22,
    overflow: "hidden",
    resizeMode: "contain",
    tintColor: "#BEA83D",
  },
  cardInfoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  cardLabel: {
    fontFamily: "BalooChettan2-Bold",
    fontSize: 20,
    textAlign: "center",
  },
  cardNumber: {
    fontFamily: "BalooChettan2-Regular",
    fontSize: 12,
    textAlign: "center",
  },
  divider: {
    height: 60,
    width: 0,
    borderLeftWidth: 1,
  },
  filterButtonContainer: {
    justifyContent: "center",
  },

  containerDropDown: {},
  picker: {
    height: 30,
    width: "100%",
  },
  itemStyle: {
    fontSize: 2,
    color: "#000",
    backgroundColor: "red",
  },
});

export default KvittoFlatListHeader;
