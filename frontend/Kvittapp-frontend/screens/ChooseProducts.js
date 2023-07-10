import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import RectangularButtonBlack from "../components/RectangularButtonBlack";
import { ScrollView } from "react-native";
import RectangularButton from "../components/RectangularButton";
import SquareRadioButton from "../components/SquareRadioButton";

const ChooseProducts = ({ navigation, route }) => {
  // const navigation = useNavigation();

  const returnItems = route?.params?.data;

  const [selectedReturnItems, setSelectedReturnItems] = useState([]);

  console.log(selectedReturnItems, "moooo");
  return (
    <View
      style={{
        height: "100%",
        justifyContent: "space-between",
        paddingVertical: 16,
        backgroundColor: "white",
      }}
    >
      <View style={{ paddingHorizontal: 32 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 22,
          }}
        >
          <Text style={styles.boldHeading}>
            Välj produkter du vill returnera
          </Text>
        </View>
        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: "#e6e6e6",
            marginBottom: 32,
          }}
        />
        {/* <RectangularButtonBlack text="Choose Products to return" /> */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        ></View>
        {/* <View style={{ borderTopWidth: 1, width: "100%" }} /> */}

        {returnItems?.map((returnItem) => {
          return (
            <View>
              <View
                style={{
                  marginVertical: 12,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.regularText}>{returnItem?.Quantity}</Text>
                <View>
                  <Text style={styles.regularText}>
                    {returnItem?.Product_name}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 90,
                  }}
                >
                  <Text style={styles.regularText}>
                    {returnItem?.Unit_price_excl_VAT + returnItem?.VAT_Amount } Kr
                  </Text>
                  <SquareRadioButton
                    label=" "
                    onPress={() => {
                      // Check if the returnItem already exists in selectedReturnItems
                      const itemIndex = selectedReturnItems.findIndex(
                        (item) => item === returnItem
                      );

                      if (itemIndex !== -1) {
                        // If the returnItem exists, remove it from selectedReturnItems
                        const updatedItems = [...selectedReturnItems];
                        updatedItems.splice(itemIndex, 1);
                        setSelectedReturnItems(updatedItems);
                      } else {
                        // If the returnItem doesn't exist, add it to selectedReturnItems
                        setSelectedReturnItems([
                          ...selectedReturnItems,
                          returnItem,
                        ]);
                      }
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  borderTopWidth: 1,
                  width: "100%",
                  borderTopColor: "#e6e6e6",
                }}
              />
            </View>
          );
        })}

        <View
          style={{
            marginVertical: 12,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 70,
            paddingRight: 45,
          }}
        >
          <View>
            <Text style={styles.regularText}>Total Amount</Text>
          </View>
          <Text style={styles.regularText}>{returnItems[0].Total_Amount} Kr</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
         <RectangularButton
          smallButton={true}
          text="Cancel"
          function={() => navigation.pop()}
        />
        <RectangularButton
          smallButton={true}
          inactiveButton={selectedReturnItems.length == 0}
          text="Next"
          function={() =>
            navigation.navigate("OpenBuysDetails", {
              data: selectedReturnItems,
            })
          }
        />
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 28,
  },
  storeDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  openBuyDetailsContainer: {
    marginBottom: 8,
  },
  boldHeading: {
    fontSize: 16,
    fontFamily: "BalooChettan2-Bold",
  },
  boldText: {
    fontSize: 12,
    fontFamily: "BalooChettan2-Bold",
  },
  regularText: {
    fontSize: 14,
    fontFamily: "BalooChettan2-Regular",
  },
  columnHeadingText: {
    marginVertical: 8,
    fontFamily: "BalooChettan2-Bold",
  },
  storeHeading: {
    fontSize: 20,
    fontFamily: "BalooChettan2-Bold",
  },
});

export default ChooseProducts;
