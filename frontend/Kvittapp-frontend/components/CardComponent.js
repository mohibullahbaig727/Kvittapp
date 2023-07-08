import React, { memo, useContext } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import SquareRadioButton from "./SquareRadioButton";
import CardContext from "../CardContext";

const CardComponent = (props) => {
  const cardData = props?.cardData;
  const { selectedCards, updateSelectedCards } = useContext(CardContext);


console.log(selectedCards)

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginRight: 16,
        }}
      >
        <View
          style={{
            backgroundColor: "#575757",
            flex: 1,
            marginVertical: 8,
            marginHorizontal: 32,
            borderRadius: 16,
          }}
        >
          <Image
            style={{
              width: 56,
              height: 40,
              borderRadius: 2,
              marginTop: 22,
              marginHorizontal: 22,
              tintColor: "white",
            }}
            source={
              cardData?.PO === "VISA"
                ? require("../assets/icons/visaIcon.png")
                : cardData?.PO === "Mastercard"
                ? require("../assets/icons/mastercard_icon.png")
                : null
            }
          />

          <View style={{ margin: 22 }}>
            <Text style={styles.cardText}>{cardData?.bank}</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ marginTop: 12 }}>
                <Text style={styles.headingText}>Card Number</Text>
                <Text style={styles.cardText}>{cardData?.cardNumber}</Text>
              </View>
              <View style={{ marginTop: 12 }}>
                <Text style={styles.headingText}>Expiry Date</Text>
                <Text style={styles.cardText}>{cardData?.expirationDates}</Text>
              </View>
            </View>
          </View>
        </View>
        {props.child}
      </View>
      {props.showRadioBtn ? (
        <View style={{paddingLeft:32}}>
          <SquareRadioButton
            selected={props.radioSelected}
            onPress={() => {
              // function to check if card with same values exists or not
              if (selectedCards.includes(cardData)) {
                updateSelectedCards(
                  selectedCards.filter((card) => card !== cardData)
                );
              } else {
                updateSelectedCards([...selectedCards, cardData]);
              }
              props.handleRadioPress;
            }
            }
          />
        </View>
      ) : null}

      <View
        style={{
          borderTopWidth: 1,
          marginVertical: 12,
          borderTopColor: "#E6E6E6",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardText: {
    fontFamily: "BalooChettan2-Bold",
    color: "white",
  },
  headingText: {
    fontFamily: "BalooChettan2-Bold",
    color: "white",
    fontSize: 8,
  },
});

export default memo(CardComponent);
