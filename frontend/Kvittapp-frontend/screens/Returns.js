import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CircularButton from "../components/CircularButton";
import KvittoFlatListHeader from "../components/KvittoFlatListHeader";
import { API_BASE_URL } from "../constants";
import SortButton from "../components/SortButton";

const Item = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.itemContainer}>
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            alignSelf: "center",
            color:
              item?.Return_status == "Confirmed"
                ? "green"
                : item?.Return_status == "Pending"
                ? "#BEA83B"
                : "red",
            marginRight: 12,
            fontFamily: "BalooChettan2-Regular",
          }}
        >
          {item?.Return_status}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Image
            style={styles.bankidLogo}
            source={{ uri: item?.Logo_URL }}
            resizeMode="contain"
          />
          <View>
            <Text style={{ fontFamily: "BalooChettan2-Regular" }}>
              {item?.Store_name}
            </Text>
            <Text style={{ fontFamily: "BalooChettan2-Regular" }}>
              {item?.Return_date_created.slice(0, 10)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.amountContainer}>
        <Text style={{ fontFamily: "BalooChettan2-Regular", marginRight: 4 }}>
          {/* {(item?.Unit_price_excl_VAT + item?.VAT_Amount) * item?.Quantity} */}
          {item?.Return_Amount} Kr
       </Text>
        <CircularButton text=">" />
      </View>
    </View>
  </TouchableOpacity>
);

const API_URL = `${API_BASE_URL}/allReturns/1`;

const Returns = ({ navigation }) => {
  const [selectedId, setSelectedId] = useState();

  const [sortedData, setSortedData] = useState([]);

  const [isAscDate, setIsAscDate] = useState(true);

  const [isAscAmount, setIsAscAmount] = useState(true);

  const [isAscStatus, setIsAscStatus] = useState(true);

  const [status, setStatus] = useState();

  const [data, setData] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      setData(json[0]);
      setStatus([]);
      setRefreshing(false)
    } catch (error) {
      console.error(error);
    }
  };

  const handleRefresh = () => {
    // Set refreshing status to true and trigger fetch data function
    setRefreshing(true);
    fetchData();
  };

  //sorting data by data in asc and desc order
  const sortDataByDate = () => {
    const sorted = data.sort((a, b) => {
      return isAscDate
        ? new Date(b.Return_date_created) - new Date(a.Return_date_created)
        : new Date(a.Return_date_created) - new Date(b.Return_date_created);
    });
    setSortedData(sorted);
    setIsAscDate(!isAscDate);
    setIsAscStatus(null);
    setIsAscAmount(null);
  };

  //sorting data by data in asc and desc order
  const sortDataByAmount = () => {
    const sorted = data.sort((a, b) => {
      return isAscAmount
        ? b.Return_Amount - a.Return_Amount
        : a.Return_Amount - b.Return_Amount;
    });
    setSortedData(sorted);
    setIsAscAmount(!isAscAmount);
    setIsAscStatus(null);
    setIsAscDate(null);
  };

  const sortReturnStatus = () => {
    // Define the sorting order based on the desired criteria
    const sortingOrder = ["Canceled", "Declined", "Pending", "Confirmed"];

    // Sort the API response data based on the sorting order
    const sortedData = data.sort((a, b) => {
      return isAscStatus
        ? sortingOrder.indexOf(a.Return_status) -
            sortingOrder.indexOf(b.Return_status)
        : sortingOrder.indexOf(b.Return_status) -
            sortingOrder.indexOf(a.Return_status);
    });

    // Print the sorted data
    setSortedData(sortedData);
    setIsAscStatus(!isAscStatus);
    setIsAscAmount(null);
    setIsAscDate(null);
  };

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => navigation.navigate("ReturnDetails", { data: item })}
      />
    );
  };

  return (
    <View style={styles.container}>
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
                onPress={sortReturnStatus}
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
                isAsc={isAscStatus}
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
        extraData={selectedId}
        keyExtractor={(item) => item.ID_return_row}
      />
    </View>
  );
};

export default Returns;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height:'100%'
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor:'#e6e6e6',
    paddingVertical: 10,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  bankidLogo: {
    height: 32,
    width: 32,
    alignSelf: "center",
    marginRight: 6,
  },
  amountContainer: {
    flexDirection: "row",
  },
  amountText: {
    marginRight: 6,
    fontFamily: "BalooChettan2-Bold",
  },
  whiteText: {
    color: "black",
    fontFamily: "BalooChettan2-Bold",
  },
});
