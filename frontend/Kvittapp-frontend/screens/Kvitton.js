import React, { useContext, useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  RefreshControl,
} from "react-native";
import CircularButton from "../components/CircularButton";
import KvittoFlatListHeader from "../components/KvittoFlatListHeader";
import SortButton from "../components/SortButton";
import { API_BASE_URL } from "../constants";
import CardContext from "../CardContext";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import SquareRadioButton from "../components/SquareRadioButton";
import RectangularButton from "../components/RectangularButton";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

const Item = ({ item, onPress, icon, contextFunctions }) => (
  <TouchableOpacity onPress={onPress}>
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#E6E6E6",
        paddingVertical: 10,
        paddingHorizontal: 16,
        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          resizeMode="contain"
          style={{
            height: 32,
            width: 32,
            marginRight: 6,
            alignSelf: "center",
          }}
          source={{ uri: item.Logo_URL }}
        />
        <View>
          <Text style={{ fontFamily: "BalooChettan2-Regular" }}>
            {item.store_Name}
          </Text>
          <Text style={{ fontFamily: "BalooChettan2-Regular" }}>
            {item.Datetime}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text>{item.Total_Amount} kr</Text>
        {icon ? (
          <View style={{marginLeft: 8}}>
            <SquareRadioButton
            label=" "
            onPress={() => contextFunctions.updateReceiptToFolderParams(item.ID_Reciept)}
          />
            </View>
          
        ) : (
          <CircularButton marginLeft={6} text=">" />
        )}
      </View>
    </View>
  </TouchableOpacity>
);

const Kvitton = ({ route }) => {
  const [selectedId, setSelectedId] = useState();

  const [data, setData] = useState([]);

  const [sortedData, setSortedData] = useState([]);

  const [isAscDate, setIsAscDate] = useState(true);

  const [isAscAmount, setIsAscAmount] = useState(true);

  const [isDataFetched, setDataFetched] = useState(false);

  const [fltr, setfltr] = useState(null);

  const [refreshing, setRefreshing] = useState(false);

  const {
    selectedCards,
    isAddReceiptToFolder,
    receiptToFolderParams,
    selectedFolderId,
    updateIsAddReceiptToFolder,
  } = useContext(CardContext);

 console.log(receiptToFolderParams, 'mooo')

  const contextFunction = useContext(CardContext);

  const contextProvider = useContext(CardContext);

  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);

  const cardNumbersArray = selectedCards.map((card) => card.cardNumber);
  const API_URL = `${API_BASE_URL}/allReciepts/1?cardNumber=${cardNumbersArray}`;

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      setData(json);
      setDataFetched(true);
      setRefreshing(false);
      setSortedData(
        filterDataByAmountAndDatetimeRange(
          json[0],
          contextProvider.filterParams.selectedAmountRange?.from,
          contextProvider.filterParams.selectedAmountRange?.to,
          contextProvider.filterParams?.selectedStartDate,
          contextProvider.filterParams?.selectedEndDate
        )
      );
    } catch (error) {
      console.error(error);
      setDataFetched(false);
    }
  };

   const handleRefresh = () => {
    // Set refreshing status to true and trigger fetch data function
    setRefreshing(true);
    fetchData();
  };

 

  const filterDataByAmountAndDatetimeRange = (
    data,
    minAmount,
    maxAmount,
    startDatetime,
    endDatetime
  ) => {
    return data.filter((item) => {
      const itemDatetime = new Date(item.Datetime); // assuming Datetime is a string date 
      const isAmountInRange =
        item.Total_Amount >= minAmount && item.Total_Amount <= maxAmount;
      const isDatetimeInRange =
        item.Datetime >= startDatetime && item.Datetime <= endDatetime;
      return isAmountInRange && isDatetimeInRange;
    });
  };

  //sorting data by data in asc and desc order
  const sortDataByDate = () => {
    const sorted = data[0].sort((a, b) => {
      return isAscDate
        ? new Date(b.Datetime) - new Date(a.Datetime)
        : new Date(a.Datetime) - new Date(b.Datetime);
    });
    setSortedData(sorted);
    setIsAscDate(!isAscDate);
    setIsAscAmount(null);
  };

  //sorting data by data in asc and desc order
  const sortDataByAmount = () => {
    const sorted = data[0].sort((a, b) => {
      return isAscAmount
        ? b.Total_Amount - a.Total_Amount
        : a.Total_Amount - b.Total_Amount;
    });
    setSortedData(sorted);
    setIsAscAmount(!isAscAmount);
    setIsAscDate(null);
  };

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? "white" : "black";

    return (
      <Item
        item={item}
        onPress={() => navigation.navigate("KvittoDetails", { data: item })}
        backgroundColor={backgroundColor}
        textColor={color}
        icon={isAddReceiptToFolder}
        contextFunctions={contextFunction}
      />
    );
  };


  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListHeaderComponent={
          <View>
            <KvittoFlatListHeader
              navigation={() => navigation.navigate("Cards")}
            />

            <View
              style={{
                height: 30,
                borderWidth: 1,
                borderColor: "#E6E6E6",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                alignItems: "center",
              }}
            >
              <SortButton
                onPress={sortDataByDate}
                child={<Text style={styles.whiteText}>Date</Text>}
                isAsc={isAscDate}
              />
              <SortButton
                onPress={sortDataByAmount}
                child={<Text style={styles.whiteText}>Amount</Text>}
                isAsc={isAscAmount}
              />
            </View>
          </View>
        }
        data={sortedData.length == 0  ? data[0]: sortedData}
        renderItem={renderItem}
        extraData={selectedId}
      />

      {/* These buttons show up when you are adding a receipt to a folder */}
      <View>
        {isAddReceiptToFolder ? (
          <View
            style={{
              justifyContent: "space-around",
              flexDirection: "row",
              paddingVertical: 18,
              borderTopWidth: 2,
              borderTopColor: "#e6e6e6",
              backgroundColor: "#fafafa",
            }}
          >
            <RectangularButton
              smallButton={true}
              text="cancel"
              function={() => {
                updateIsAddReceiptToFolder(false);
                contextFunction.updateReceiptToFolderParams(null)
              }}
            />
            <RectangularButton
              smallButton={true}
              text="add receipt"
              function={async () => {
                const ID_Folder = selectedFolderId.selectedFolderId.toString();
                const Folder_name = selectedFolderId.selectedFolderName.toString();
                const Folder_color = selectedFolderId.selectedFolderColor.toString();
                const Receipt_Number = receiptToFolderParams;
                let response;
              
                try {
                  for (const recNumber of Receipt_Number) {
                     response = await fetch(`${API_BASE_URL}/addFolder/1`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        ID_Folder,
                        Folder_name,
                        Folder_color,
                        Reciept_Number: recNumber,
                      }),
                    });
              
                   
                  }
                  const data = await response.json();
              
                  if (response.ok) {
                    console.log("Success", "New folder added successfully", data);
                    updateIsAddReceiptToFolder(false);
            
                    Toast.show({
                      type: ALERT_TYPE.SUCCESS,
                      title: "Success",
                      textBody: "Receipt added to folder successfully",
                    });
            
                    contextFunction.updateReceiptToFolderParams(null);
                  } else {
                    Toast.show({
                      type: ALERT_TYPE.DANGER,
                      title: "Failed",
                      textBody: "Something went wrong",
                    });
            
                    console.log("Error", "Failed to add new folder");
                  }
                }
                catch (error) {
                  console.error("Error adding new folder:", error);
                }
              }
            }
            />
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  whiteText: {
    color: "black",
    marginRight: 4,
    fontFamily: "BalooChettan2-Bold",
  },
});

export default Kvitton;
