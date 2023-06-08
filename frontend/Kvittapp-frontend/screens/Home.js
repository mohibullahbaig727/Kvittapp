import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Sidebar from "../components/SideBarMenu";
import { useNavigation } from "@react-navigation/native";
import { KvittonStack } from "../routes/KvittonStack";
import { OpenBuyStack } from "../routes/OpenBuysStack";
import { ReturnStack } from "../routes/ReturnStack";
import SearchBar from "../components/SearchBar";

const Tab = createMaterialTopTabNavigator();

const TabScreen = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const navigation = useNavigation();

  const options = [
    {
      label: "Home",
      value: "home",
      image: require("../assets/icons/home_icon.png"),
      function: () => console.log("Do Nothing"),
    },
    {
      label: "Filters",
      value: "filters",
      image: require("../assets/icons/filter_icon.png"),
      function: () => console.log("Function for Option 1"),
    },
    {
      label: "Folders",
      value: "folders",
      image: require("../assets/icons/folderIcon.png"),
      function: () => navigation.navigate("Folders"),
    },
    {
      label: "Scan Receipt",
      value: "scanReceipt",
      image: require("../assets/icons/scan_receipt_icon.png"),
      function: () => console.log('scan kvitto'),
    },
    {
      label: "Cards",
      value: "cards",
      image: require("../assets/icons/bank_card_icon.png"),
      function: () => {
        navigation.navigate("Cards")
    
       },
    },
    {
      label: "Create a return",
      image: require("../assets/icons/returnsIcon.png"),
      value: "createReturn",
      function: () => navigation.navigate("OpenBuysDetails"),
    },
    {
      label: "Account",
      image: require("../assets/icons/profile_icon.png"),
      value: "account",
      function: () => navigation.navigate("OpenBuysDetails"),
    },
  ];

  const toggleSidebar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flexDirection: "row", justifyContent: "space-around",}}>
        <View style={{ flex: 3, marginLeft:16 }}>
        <SearchBar />
        </View>

        <TouchableOpacity
          onPress={toggleSidebar}
          style={{ flex: 1, alignItems: "center" ,alignSelf:'center'}}
        >
          <Image
            source={require("../assets/icons/menu_icon.png")}
            style={{
              height: 30,
              width: 30,
              resizeMode: "contain",
            }}
          />
        </TouchableOpacity>
      </View>
      <Tab.Navigator  tabBarOptions={{
        activeTintColor: '#81A7FF', // Color of the active tab
        inactiveTintColor: 'black',
        labelStyle: { fontSize: 16,
          fontFamily: "BalooChettan2-Bold",}, // Styling for the tab labels
      }}>
        
        <Tab.Screen name="Receipts" component={KvittonStack} />
        <Tab.Screen name="Open Buys" component={OpenBuyStack} />
        <Tab.Screen name="Returns" component={ReturnStack} />
      </Tab.Navigator>
      {isSideBarOpen && (
        <View
          style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}
        >
          <Sidebar isOpen={isSideBarOpen} onClose={toggleSidebar}>
            {options.map((options) => {
              return (
                <TouchableOpacity onPress={options.function}>
                  <View style={{ flexDirection: "row", paddingBottom: 18 }}>
                    <Image
                      resizeMode="contain"
                      source={options.image}
                      style={{
                        height: 18,
                        width: 18,
                        alignSelf: "center",
                        tintColor: '#81A7FF'
                      }}
                    />
                    <Text style={styles.label}>{options.label}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </Sidebar>
        </View>
      )}
    </View>
  );
};

const Tab3Screen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Tab 3 Content</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    overflow: "hidden",
  },
  sidebar: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: 150,
    backgroundColor: "#fff",
    borderLeftWidth: 3,
    borderTopWidth:1,
    borderLeftColor: "#e6e6e6",
    padding: 20,
    zIndex: 2,
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    zIndex: 1,
  },
  label: {
    fontSize: 14,
    fontFamily: "BalooChettan2-Bold",
    marginLeft: 8
  },
});


export default TabScreen;
