import React, { memo, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import RectangularButton from "../components/RectangularButton";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import Receipt, {
  handleDownloadReceipt,
  handleEmailReceipt,
} from "../components/ReceiptAsPdf";
import { API_BASE_URL } from "../constants";
import Dropdown from "../components/NewDropDown";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

const ReturnDetails = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [daysDiff, setdaysDiff] = useState();
  const [daysDiffExchange, setdaysDiffExchange] = useState();
  const [isDialogVisible, setisDialogVisible] = useState(false);
  

  const [totalVat, settotalVat] = useState(0);
  const routeData = route.params.data;


  const dropdownItems = [
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
      text: "Cancel Return",
      rightIcon: "md-checkmark",
      functions: () => {
        updateReturnStatus(routeData.ID_Return, 'Canceled')
        handleRefresh()
      },
    },
    
  ];

  //console.log(routeData);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    sumOfVat();
  }, [data]);

  const API_URL = `${API_BASE_URL}/returns/${routeData.ID_Return}`;

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


  console.log(data, ' moooooooo')
  const handleRefresh = () => {
    // Set refreshing status to true and trigger fetch data function
    setisLoading(true);
    fetchData();
  };

  const updateReturnStatus = async (ID_Return, Return_status) => {
    const url = `${API_BASE_URL}/updateReturnStatus/${ID_Return}`;
  
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Return_status }),
      });
  
      if (response.ok) {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: 'Folder added successfully',
        })
        console.log('Return status updated successfully');
        // Handle success case
      } else {
        console.error('Failed to update return status');
        // Handle error case
      }
    } catch (error) {
      console.error('An error occurred while updating return status:', error);
      // Handle error case
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
      today.getFullYear() - 1,
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
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
          <ScrollView
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
          }>
             <View>
          <View style={styles.storeDetailsContainer}>
            <View>
              <Text style={[styles.boldText, {fontSize:20}]}>{routeData?.Store_name}</Text>
              <Text style={styles.boldText}>
                {routeData.Return_date_created.slice(0, 10)}
              </Text>
            </View>

            <Image
              resizeMode="contain"
              style={{
                height: 52,
                width: 52,
                marginRight: 6,
              }}
              source={{ uri: routeData?.Logo_URL }}
            />
          </View>
          <View>
            <View style={styles.openBuyDetailsContainer}>
              <Text style={styles.regularText}>
                Status: {data[0][0].Return_status}
                </Text>
                <Text style={styles.regularText}>
                Return ID: {routeData?.ID_Return}
              </Text>
            </View>

            {/* <View>
              <RectangularButton
                text="Go to original Reciept"
                function={() =>
                  navigation.navigate("KvittoDetails", {
                    data: routeData,
                  })
                }
              />

              {routeData?.Return_status == "Confirmed" ||
              routeData?.Return_status == "Canceled" ||
              routeData?.Return_status == "Declined" ? null : (
                <RectangularButton
                  text="Cancel Return"
                  function={handleShowDialog}
                />
              )}
              <TransparentDialogBox
                visible={isDialogVisible}
                onClose={handleCloseDialog}
                title="Cancel Return!"
                message="Are you sure you want to cancel your return?"
              />

              <RectangularButton
                text="Change Return Option"
                function={() => console.log("change return function")}
              />

             
              </View> */}
              
              <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: 6,
                  }}
                >
                  <Dropdown
                    leftIcon="md-arrow-dropdown"
                    text='Manage Receipt'
                    rightIcon="../assets/icons/arrowDown.png"
                    dropDownHeight={routeData.Return_status =='Pending' ?  97 : 64}
                    dropdownItems={dropdownItems}
                  />
                </View>

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

              <View style={{ borderTopWidth: 1, width: "100%",borderTopColor:'#e6e6e6' }} />
              <View style={{ width: "100%" }}>
                <ScrollView alwaysBounceVertical="true">
                  {routeData?.Return_status != null ? (
                    <View>
                      <View
                        style={{
                          marginVertical: 12,
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={styles.regularText}>
                          {routeData?.Return_quantity}
                        </Text>
                        <Text style={styles.regularText}>
                          {routeData?.Product_name}
                        </Text>

                        <Text style={styles.regularText}>
                          {routeData?.Return_Amount *
                            routeData?.Return_quantity}
                        </Text>
                      </View>
                      <View style={{ borderTopWidth: 1, width: "100%", borderTopColor:'#e6e6e6' }} />
                    </View>
                  ) : null}
                </ScrollView>

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
                    {routeData.Return_Amount} Kr
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
          </ScrollView>
       
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
    fontFamily: "BalooChettan2-Bold",
  },
  regularText: {
    fontFamily: "BalooChettan2-Regular",
  },
  columnHeadingText: {
    marginVertical: 8,
    fontFamily: "BalooChettan2-Bold",
  },
});

export default memo(ReturnDetails);
