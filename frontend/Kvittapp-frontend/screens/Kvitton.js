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
import { useNavigation } from "@react-navigation/native";
import SquareRadioButton from "../components/SquareRadioButton";

const Item = ({ item, onPress, icon}) => (
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
        {icon ? <SquareRadioButton label = ' '/> :   <CircularButton marginLeft={6} text=">" /> }
      </View>
    </View>
  </TouchableOpacity>
);

const Kvitton = ({ route }) => {
  const [selectedId, setSelectedId] = useState();

  const [data, setData] = useState([]);

  const [sortedData, setSortedData] = useState(null);

  const [isAscDate, setIsAscDate] = useState(true);

  const [isAscAmount, setIsAscAmount] = useState(true);

  const [isDataFetched, setDataFetched] = useState(false);

  const { selectedCards, isAddReceiptToFolder, updateIsAddReceiptToFolder } = useContext(CardContext);

  const contextProvider = useContext(CardContext);

  const [fltr, setfltr] = useState(null);


  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []); 

  const cardNumbersArray = selectedCards.map((card) => card.cardNumber);
  const API_URL = `${API_BASE_URL}/allReciepts/1?cardNumber=${cardNumbersArray}`;

  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      setData( json);
      setDataFetched(true);
      setRefreshing(false);
      setfltr(
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

  const filterDataByAmountAndDatetimeRange = (
    data,
    minAmount,
    maxAmount,
    startDatetime,
    endDatetime
  ) => {
    return data.filter((item) => {
      const itemDatetime = new Date(item.Datetime); // assuming Datetime is a string date in ISO 8601 format
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
        
      />
    );
  };

  const handleRefresh = () => {
    // Set refreshing status to true and trigger fetch data function
    setRefreshing(true);
    fetchData();
  };

  return (
    <View style={{backgroundColor:'white'}}>
      <FlatList
         refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListHeaderComponent={
          <View>
            <KvittoFlatListHeader
              navigation={() => navigation.navigate("Cards")}
            />

            {/* should make this a reuseable component */}
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
            {/* ....................................... */}
          </View>
        }
      data={sortedData == [] ? sortedData : data[0]}
        //data={fltr !== [] ? fltr : sortedData !== [s] ? sortedData : data[0]}
        renderItem={renderItem}
        extraData={selectedId}
      />
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
