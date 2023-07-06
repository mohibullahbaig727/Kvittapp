import React, { useContext, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import RectangularButton from "../components/RectangularButton";
import { useState } from "react";
import { API_BASE_URL } from "../constants";
import CircularButton from "../components/CircularButton";
import { useNavigation } from "@react-navigation/native";
import SortButton from "../components/SortButton";
import CardContext from "../CardContext";

const Item = ({ item, onPress, folderId, isRemoveReciept, refreshFunction }) => (
  <TouchableOpacity onPress={onPress}>
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#e6e6e6",
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
        {isRemoveReciept ? (
          <CircularButton
            child={
              <Image
                style={{
                  height: 12,
                  width: 12,
                }}
                source={require("../assets/icons/cancelButtonIcon.png")}
              />
            }
            marginLeft={6}
            function={async () => {
              try {
                const response = await fetch(
                  `${API_BASE_URL}/deleteReceiptInFolder/1/${folderId}/${item.ID_Reciept}`,
                  {
                    method: "DELETE",
                  }
                );

                if (response.ok) {
                  console.log("receipt deleted successfully");
                  refreshFunction()
                  
                  // Handle success case here
                } else {
                  console.error(
                    "Error deleting folder receipt:",
                    response.status
                  );
                  // Handle error case here
                }
              } catch (error) {
                console.error("Error deleting folder receipt:", error);
                // Handle error case here
              }
            }}
          />
        ) : (
          <CircularButton
            child={
              <Image
                style={{
                  height: 12,
                  width: 12,
                }}
                source={require("../assets/icons/arrowRightIcon.png")}
              />
            }
            marginLeft={6}
          />
        )}
      </View>
    </View>
  </TouchableOpacity>
);

const ReceiptsInFolderScreen = ({ route }) => {
  const [folderData, setFolderData] = useState([]);
  const [isRemoveReciept, setisRemoveReciept] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const {
    isAddReceiptToFolder,
    updateIsAddReceiptToFolder,
    updateSelectedFolderId,
    selectedFolderId,
  } = useContext(CardContext);


  const folderDetails = route.params?.data;

  const navigation = useNavigation();

  const API_URL = `${API_BASE_URL}/ReceiptsInFolder/1/${folderDetails.ID_Folder}`;

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      setFolderData(json);
      setIsDataFetched(true);
      setRefreshing(false)
    } catch (error) {
      console.error(error);
      setIsDataFetched(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, [isDataFetched]);

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        isRemoveReciept={isRemoveReciept}
        folderId={route.params?.data.ID_Folder}
        onPress={() => navigation.navigate("KvittoDetails", { data: item })}
        refreshFunction={()=> handleRefresh()}
      />
    );
  };

  const handleRefresh = () => {
    // Set refreshing status to true and trigger fetch data function
    setRefreshing(true);
    fetchData();
  };

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      {isDataFetched ? (
        <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
          ListHeaderComponent={
            <View style={{}}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 32,
                  marginVertical: 12,
                }}
              >
                <View style={{ flexDirection: "row", alignSelf: "center" }}>
                  <Image
                    style={{ height: 32, width: 32, tintColor: route.params?.data?.Folder_color }}
                    source={require("../assets/icons/folderIcon.png")}
                  />
                  <Text
                    style={{
                      marginLeft: 12,
                      alignSelf: "center",
                      fontSize: 14,
                      fontFamily: "BalooChettan2-Bold",
                    }}
                  >
                    {folderDetails.Folder_name}
                  </Text>
                </View>
                <View>
                  <RectangularButton
                    smallButton={true}
                    text="Add Receipts"
                    function={() => {
                      updateSelectedFolderId({
                        selectedFolderId: folderDetails.ID_Folder,
                        selectedFolderName: folderDetails.Folder_name,
                        selectedFolderColor : folderDetails.Folder_color,
                      });
                      updateIsAddReceiptToFolder(true);
                      navigation.navigate("Home");
                    }}
                  />
                  <RectangularButton
                    smallButton={true}
                    text={isRemoveReciept ? "Cancel" : "Remove Receipts"}
                    function={() => setisRemoveReciept(!isRemoveReciept)}
                  />
                </View>
              </View>

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
                  //onPress={sortDataByDate}
                  child={<Text style={styles.whiteText}>Date</Text>}
                  //isAsc={isAscDate}
                />
                <SortButton
                  //onPress={sortDataByAmount}
                  child={<Text style={styles.whiteText}>Amount</Text>}
                  //isAsc={isAscAmount}
                />
              </View>
            </View>
          }
          data={folderData[0]}
          renderItem={renderItem}
        />
      ) : (
        <ActivityIndicator size="large" />
      )}
      {/* <View>
        <View></View>
        <TextInput
          placeholder="Reciept number"
          onChangeText={(value) => setReceiptAdded(value)}
        />

        <TouchableOpacity
          style={{ height: 20, width: 200, backgroundColor: "grey" }}
          onPress={async () => {
            try {
              const response = await fetch(`${API_BASE_URL}/addFolder/1`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  folderId,
                  folderName,
                  recId,
                }),
              });

              const data = await response.json();

              if (response.ok) {
                console.log("Success", "New folder added successfully", data);
              } else {
                console.log("Error", "Failed to add new folder");
              }
            } catch (error) {
              console.error("Error adding new folder:", error);
            }
          }}
        >
          <Text>Add receipt to folder</Text>
        </TouchableOpacity>
      </View> */}
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

export default ReceiptsInFolderScreen;
