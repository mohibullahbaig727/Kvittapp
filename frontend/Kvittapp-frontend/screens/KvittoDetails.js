import React, { memo, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import RectangularButton from "../components/RectangularButton";
import Receipt, {
  handleDownloadReceipt,
  handleEmailReceipt,
} from "../components/ReceiptAsPdf";
import { API_BASE_URL } from "../constants";
import Dropdown from "../components/NewDropDown";

const KvittoDetails = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [daysDiff, setdaysDiff] = useState();
  const [daysDiffExchange, setdaysDiffExchange] = useState();
  const [discount, setDiscount] = useState(0);
  const [tip, setTip] = useState(0.0);

  const [totalVat, settotalVat] = useState(0);

  const dropdownItems = [
    {
      leftIcon: <Image style={{height:12, width:12, tintColor:'black', resizeMode:'contain'}} source={require('../assets/icons/receipt_details_icon.png')} /> ,
      text: "Receipt Details",
      rightIcon: "md-checkmark",
      functions: () =>
        navigation.navigate("TransactionDetails", {
          data: data[0]
        }),
    },
    {
      leftIcon: <Image style={{height:12, width:12, tintColor:'black', resizeMode:'contain'}} source={require('../assets/icons/send_receipt_icon.png')} /> ,
      text: "Open Receipt as PDF",
      rightIcon: "md-checkmark",
      functions: () => 
        handleDownloadReceipt(data[0]),
    },
    {
      leftIcon: <Image style={{height:12, width:12, tintColor:'black', resizeMode:'contain'}} source={require('../assets/icons/folderIcon.png')} /> ,
      text: "Add to Folder",
      rightIcon: "md-checkmark",
      functions: () => navigation.navigate("Folders"),
    },
    {
      leftIcon: <Image style={{height:12, width:12, tintColor:'black', resizeMode:'contain'}} source={require('../assets/icons/returnsIcon.png')} /> ,
      text: "Create Return",
      rightIcon: "md-checkmark",
      functions: () =>
      navigation.navigate("ChooseProducts", { data: data[0] }),
    },
    
  ];

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    sumOfVat();

    let discount = 0;
    let tip = 0;
    data[0]?.forEach((item) => {
      discount += item?.Discount;
      tip += item?.Tip;
    });
    setDiscount(discount);
    setTip(tip);
  }, [data]);

  const API_URL = `${API_BASE_URL}/recieptdata/${route.params.data?.ID_Reciept.toString()}`;

  // fetching data from local host
  const fetchData = async () => {
    setisLoading(true);
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      setData(json);
      setisLoading(false);
      openBuysDays();
    } catch (error) {
      console.error(error);
    }
  };

  async function sumOfVat() {
    const totalVat = data[0]?.reduce((acc, item) => acc + item.VAT_Amount, 0);
    settotalVat(totalVat);
  }

  const openBuysDays = async () => {
    //comparing dates to find openbuy days
    // 1. Create a Date object for the target date "2022-03-10"
    const targetDate = new Date(route.params.data?.Datetime);

    // 2. Create a Date object for today's date
    const today = new Date();
    const lastYear = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    // 3. Calculate the time difference in milliseconds between the two dates
    const timeDiff = lastYear.getTime() - targetDate.getTime();

    // 4. Calculate the number of days in the time difference
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    const daysLeftOpenBuys = 30 - diffDays;
    const daysLeftExchange = 60 - diffDays;

    setdaysDiff(daysLeftOpenBuys);
    setdaysDiffExchange(daysLeftExchange);
  };
  return (
    <View style={styles.mainContainer}>
      {isLoading || totalVat === 0 ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          <View style={styles.storeDetailsContainer}>
            <View
              style={{
                alignSelf: "center",
              }}
            >
              <Text style={styles.storeHeading}>{data[0][0]?.Store_Name}</Text>
              <Text style={styles.boldText}>
                {data[0][0]?.Datetime.slice(0, 10)}
              </Text>
            </View>

            <Image
              resizeMode="contain"
              style={{
                height: 52,
                width: 52,
                marginRight: 6,
              }}
              source={{ uri: route.params.data?.Logo_URL }}
            />
          </View>
          <View>
            <View style={styles.openBuyDetailsContainer}>
              <Text style={styles.regularText}>
                Open Buy: {daysDiff <= 0 ? "expired" : daysDiff + " days left"}
              </Text>
              <Text style={styles.regularText}>
                Right of Exchange:{" "}
                {daysDiffExchange <= 0
                  ? "expired"
                  : daysDiffExchange + " days left"}
              </Text>
            </View>
            {/* <View>
              <RectangularButton
                text="Reciept Details"
                function={() =>
                  navigation.navigate("TransactionDetails", {
                    data: data[0],
                  })
                }
              />

              <RectangularButton
                text="Open Receipt as PDF"
                function={() => {
                  handleDownloadReceipt(data[0]);
                  //handleEmailReceipt(data[0]);
                }}
              />

            

              <RectangularButton
                text="Add to Folder"
                function={() => navigation.navigate("Folders")}
              />

              {daysDiff <= 0 ? null : (
                <RectangularButton
                  text="Create Return"
                  function={() =>
                    navigation.navigate("ChooseProducts", { data: data[0] })
                  }
                />
              )}
            </View> */}

            <Dropdown
              leftIcon="md-arrow-dropdown"
              text="Manage Receipts"
              rightIcon="../assets/icons/arrowDown.png"
              dropDownHeight={daysDiff <= 0 ? 96 : 129}
              dropdownItems={dropdownItems}
              onSelectOption={() => {
                setReasonSelected(item.title);
              }}
            />

            <View
              style={{
                alignItems: "center",
                marginTop: 4,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Text style={styles.columnHeadingText}>Qty</Text>
                <Text style={styles.columnHeadingText}>Product</Text>
                <Text style={styles.columnHeadingText}>Amount</Text>
              </View>
              <View
                style={{
                  borderTopWidth: 1,
                  width: "100%",
                  borderTopColor: "#e6e6e6",
                }}
              />
              <View style={{ width: "100%" }}>
                <ScrollView alwaysBounceVertical="true">
                  {data[0]?.map((data) => {
                    return (
                      <View>
                        <View
                          style={{
                            marginVertical: 12,
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text style={styles.regularText}>
                            {data?.Quantity}
                          </Text>

                          <View style={{ width: 180 }}>
                            <Text style={styles.regularText}>
                              {data?.Product_name}
                            </Text>
                          </View>
                          <Text style={styles.regularText}>
                            {(data?.Unit_price_excl_VAT + data?.VAT_Amount) *
                              data?.Quantity}{" "}
                            kr
                          </Text>
                        </View>
                        <View
                          style={{
                            borderTopWidth: 1,
                            borderTopColor: "#e6e6e6",
                            width: "100%",
                          }}
                        />
                      </View>
                    );
                  })}
                </ScrollView>
                {discount != 0 ? (
                  <View
                    style={{
                      marginVertical: 12,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Text style={styles.regularText}>Discount</Text>
                    </View>
                    <Text style={styles.regularText}>{discount}</Text>
                  </View>
                ) : null}
                {tip != 0 ? (
                  <View
                    style={{
                      marginVertical: 12,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Text style={styles.regularText}>Tip</Text>
                    </View>
                    <Text style={styles.regularText}>{tip}</Text>
                  </View>
                ) : null}
                <View
                  style={{
                    marginVertical: 12,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text style={styles.regularText}>Total Amount</Text>
                  </View>
                  <Text style={styles.regularText}>
                    {data[0][0]?.Total_Amount} Kr
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 28,
    backgroundColor: 'white',
    height:'100%'
  },
  storeDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  openBuyDetailsContainer: {
    marginBottom: 8,
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

export default memo(KvittoDetails);
