import React, { useEffect, useState } from "react";
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
import { API_BASE_URL } from "../constants";
import SortButton from "../components/SortButton";
import { useContext } from "react";
import CardContext from "../CardContext";

const Item = ({ item, onPress, daysDiff }) => (
  <View>
    {daysDiff > 0 && (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.row}>
            <Text
              style={[
                styles.daysLeftText,
                {
                  color:
                    daysDiff > 20
                      ? "green"
                      : daysDiff < 20 && daysDiff > 10
                      ? "#BEA83B"
                      : "red",
                  fontFamily: "BalooChettan2-Regular",
                },
              ]}
            >
              {daysDiff} days left
            </Text>
            <View style={styles.row}>
              <Image
                style={styles.companyLogo}
                source={{ uri: item.Logo_URL }}
                resizeMode="contain"
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
          </View>

          <View style={styles.row}>
            <Text style={{ fontFamily: "BalooChettan2-Regular" }}>
              {item.Total_Amount} kr
            </Text>
            <CircularButton marginLeft={6} text=">" />
          </View>
        </View>
      </TouchableOpacity>
    )}
  </View>
);

const OpenBuys = ({ navigation }) => {
  const [data, setData] = useState([]);

  const [sortedData, setSortedData] = useState([]);

  const [isAscDate, setIsAscDate] = useState(true);

  const [isAscAmount, setIsAscAmount] = useState(true);

  const [isAscDaysLeft, setIsAscDaysLeft] = useState(true);

  const { selectedCards, updateSelectedCards } = useContext(CardContext);

  const cardNumbersArray = selectedCards.map((card) => card.cardNumber);

  const [refreshing, setRefreshing] = useState(false);

  const API_URL = `${API_BASE_URL}/allReciepts/1?cardNumber=${cardNumbersArray}`;
  
  useEffect(() => {
      fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      setData(json[0]);
      console.log(data);
      setRefreshing(false);
    } catch (error) {
      console.error(error);
    }
  };
  

  //sorting data by data in asc and desc order
  const sortDataByDate = () => {
    const sorted = data.sort((a, b) => {
      return isAscDate
        ? new Date(b.Datetime) - new Date(a.Datetime)
        : new Date(a.Datetime) - new Date(b.Datetime);
    });
    setSortedData(sorted);
    setIsAscDate(!isAscDate);
    setIsAscAmount(null);
    setIsAscDaysLeft(null);
  };

  //sorting data by openbuy days in asc and desc order
  const sortDataByDaysRemaining = () => {
    const sorted = data.sort((a, b) => {
      return isAscDaysLeft
        ? new Date(b.Datetime) - new Date(a.Datetime)
        : new Date(a.Datetime) - new Date(b.Datetime);
    });
    setSortedData(sorted);
    setIsAscDaysLeft(!isAscDaysLeft);
    setIsAscAmount(null);
    setIsAscDate(null);
  };

  //sorting data by data in asc and desc order
  const sortDataByAmount = () => {
    const sorted = data.sort((a, b) => {
      return isAscAmount
        ? b.Total_Amount - a.Total_Amount
        : a.Total_Amount - b.Total_Amount;
    });
    setSortedData(sorted);
    setIsAscAmount(!isAscAmount);
    setIsAscDate(null);
    setIsAscDaysLeft(null);
  };

  const openBuysDays = (item) => {
    const targetDate = new Date(item.Datetime);
    const today = new Date();
    const lastYear = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const timeDiff = lastYear.getTime() - targetDate.getTime();
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const daysLeft = 30 - diffDays;
    return daysLeft;
  };

  const renderItem = ({ item }) => {
    const daysDiff = openBuysDays(item);

    return (
      <Item
        item={item}
        onPress={() => navigation.navigate("KvittoDetails", { data: item })}
        daysDiff={daysDiff}
      />
    );
  };

  const handleRefresh = () => {
    // Set refreshing status to true and trigger fetch data function
    setRefreshing(true);
    fetchData();
  };

  return (
    <View style={{backgroundColor:'white', height:'100%'}}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListHeaderComponent={
          <View>
            <KvittoFlatListHeader
              navigation={() => navigation.navigate("Cards")}
            />
            {/* <TouchableOpacity onPress={() => dispatch(setSelectedUser("1"))}>
              <Text>touch me </Text>
            </TouchableOpacity> */}
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
                onPress={sortDataByDaysRemaining}
                child={
                  <Image
                    resizeMode="contain"
                    style={{
                      height: 16,
                      width: 12,
                      marginRight: 6,
                      tintColor: "black",
                    }}
                    source={require("../assets/icons/time_icon.png")}
                  />
                }
                isAsc={isAscDaysLeft}
              />

              <SortButton
                onPress={sortDataByDate}
                child={
                  <Text style={[styles.whiteText, { marginRight: 4 }]}>
                    Date
                  </Text>
                }
                isAsc={isAscDate}
              />
              <SortButton
                onPress={sortDataByAmount}
                child={
                  <Text style={[styles.whiteText, { marginRight: 4 }]}>
                    Amount
                  </Text>
                }
                isAsc={isAscAmount}
              />
            </View>
          </View>
        }
        data={sortedData == [] ? sortedData : data}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#E6E6E6",
    paddingVertical: 10,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  daysLeftText: {
    textAlign: "center",
    width: 50,
    color: "red",
    marginRight: 12,
  },
  companyLogo: { height: 32, width: 32, alignSelf: "center", marginRight: 6 },
  filterLogo: {
    height: 12,
    width: 12,
    alignSelf: "center",
    marginRight: 6,
    tintColor: "white",
  },
  whiteText: {
    color: "black",
    fontFamily: "BalooChettan2-Bold",
  },
});

export default OpenBuys;
