import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Login from "./screens/Login";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import AppHeader from "./components/AppHeader";
import { useEffect, useState } from "react";
import * as Font from "expo-font";
import SelectedCardsProvider from "./SelectedCardProvider";
import { HomeStack } from "./routes/homeStack";
import CreateAccountScreen from "./screens/CreateAccountScreen";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { CampaignStack } from "./routes/campaignStack";

const Tab = createBottomTabNavigator();

const customFonts = {
  "BalooChettan2-Regular": require("./assets/Baloo_Chettan_2/static/BalooChettan2-Regular.ttf"),
  "BalooChettan2-Bold": require("./assets/Baloo_Chettan_2/static/BalooChettan2-Bold.ttf"),
  "BalooChettan2-ExtraBold": require("./assets/Baloo_Chettan_2/static/BalooChettan2-ExtraBold.ttf"),
  "BalooChettan2-SemiBold": require("./assets/Baloo_Chettan_2/static/BalooChettan2-SemiBold.ttf"),
  "BalooChettan2-Medium": require("./assets/Baloo_Chettan_2/static/BalooChettan2-Medium.ttf"),
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedUser, setSelectedUSer] = useState("");
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const handleLogin = (selectedUser, isAuthenticated) => {
    // Handle the selectedUser value here in the parent component
    setSelectedUSer(selectedUser);
    setIsAuthenticated(isAuthenticated);
  };

  async function loadFonts() {
    await Font.loadAsync(customFonts);
    setFontsLoaded(true);
  }

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AlertNotificationRoot>
      <View style={{ height: "100%" }}>
        {isAuthenticated ? (
          <SelectedCardsProvider>
            <NavigationContainer>
              <Tab.Navigator
                initialRouteName="Kvitton"
                screenOptions={{
                  tabBarLabelStyle: styles.bottomNavigatorText,
                  tabBarStyle: {
                    paddingTop: 8,
                    height: Dimensions.get("window").height * 0.12,
                  },
                  tabBarActiveTintColor: "#81A7FF",
                  tabBarInactiveTintColor: "black",
                }}
              >
                <Tab.Screen
                  name="Home"
                  component={HomeStack}
                  options={({ navigation }) => {
                    const showBackButton = navigation.canGoBack();
                    return {tabBarIcon: () => (
                      <Image
                        style={{ tintColor: "#81A7FF" }}
                        source={require("./assets/icons/openbuysIcon.png")}
                      />
                    ),
                    tabBarItemStyle: {
                      marginBottom: 8,
                    },
                    headerTitle: () => (
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                          paddingHorizontal: 12,
                        }}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            navigation.dispatch(StackActions.pop(1))
                          } // Handles the back button action
                        >
                          <Image
                            style={{ tintColor: "#81A7FF" }}
                            source={require("./assets/icons/backIcon.png")}
                          />
                        </TouchableOpacity>
                        <Image
                          style={{ tintColor: "#81A7FF" }}
                          source={require("./assets/KvittappLogo.png")}
                        />
                        {/*extra view added to center the logo  */}
                        <View />
                      </View>
                    ),
                    headerStyle: { backgroundColor: "white" },}
                    
                    // headerRight: () => (
                    //   <TouchableOpacity
                    //     onPress={() => navigation.navigate("Settings")}
                    //   >
                    //     <Image
                    //       style={{ marginRight: 8 }}
                    //       source={require("./assets/icons/settingsIcon.png")}
                    //     />
                    //   </TouchableOpacity>
                    // ),
                  }}
                />
                <Tab.Screen
                  name="Campaigns"
                  component={CampaignStack}
                  options={({ navigation }) => ({
                    tabBarIcon: () => (
                      <Image
                        style={{ tintColor: "#81A7FF", height: 40, width: 40 }}
                        source={require("./assets/icons/campaignIcon2.png")}
                      />
                    ),
                    tabBarItemStyle: {
                      marginBottom: 8,
                    },
                    headerTitle: () => <AppHeader />,
                    headerStyle: { backgroundColor: "white" },
                    // headerRight: () => (
                    //   <TouchableOpacity
                    //     onPress={() => navigation.navigate("Settings")}
                    //   >
                    //     <Image
                    //       style={{ marginRight: 8 }}
                    //       source={require("./assets/icons/settingsIcon.png")}
                    //     />
                    //   </TouchableOpacity>
                    // ),
                  })}
                />
                {/* <Tab.Screen
                name="Receipts"
                component={KvittonStack}
                options={({ navigation }) => ({
                  tabBarIcon: () => (
                    <Image
                      style={{ tintColor: "#81A7FF" }}
                      source={require("./assets/icons/kvittoIcon.png")}
                    />
                  ),
                  tabBarItemStyle: {
                    marginBottom: 8,
                    borderLeftWidth: 1,
                    borderColor: "#979797",
                  },
                  headerTitle: () => <AppHeader name="Home" />,
                  headerStyle: { backgroundColor: "#2a2a2a" },
                  headerRight: () => (
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Settings")}
                    >
                      <Image
                        style={{ marginRight: 8 }}
                        source={require("./assets/icons/settingsIcon.png")}
                      />
                    </TouchableOpacity>
                  ),
                })}
              /> */}
                {/* <Tab.Screen
                name="Returns"
                component={ReturnStack}
                options={({ navigation }) => ({
                  tabBarIcon: () => (
                    <Image
                      style={{}}
                      source={require("./assets/icons/returnsIcon.png")}
                    />
                  ),
                  tabBarItemStyle: {
                    marginBottom: 8,
                  },
                  headerTitle: () => <AppHeader name="Returns" />,
                  headerStyle: { backgroundColor: "#2a2a2a" },
                  headerRight: () => (
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Settings")}
                    >
                      <Image
                        style={{ marginRight: 8 }}
                        source={require("./assets/icons/settingsIcon.png")}
                      />
                    </TouchableOpacity>
                  ),
                })}
              />
              <Tab.Screen
                name="Folders"
                component={FoldersStack}
                options={({ navigation }) => ({
                  tabBarIcon: () => (
                    <Image
                      style={{}}
                      source={require("./assets/icons/returnsIcon.png")}
                    />
                  ),
                  tabBarItemStyle: {
                    marginBottom: 8,
                  },
                  headerTitle: () => <AppHeader name="Returns" />,
                  headerStyle: { backgroundColor: "#2a2a2a" },
                  headerRight: () => (
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Settings")}
                    >
                      <Image
                        style={{ marginRight: 8 }}
                        source={require("./assets/icons/settingsIcon.png")}
                      />
                    </TouchableOpacity>
                  ),
                })}
              /> */}
              </Tab.Navigator>
            </NavigationContainer>
          </SelectedCardsProvider>
        ) : (
          <Login onLogin={handleLogin} />
          //<CreateAccountScreen/>
        )}
      </View>
    </AlertNotificationRoot>
  );
  //<Navigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomNavigatorText: {
    fontFamily: "BalooChettan2-Bold",
    fontSize: 12,
  },
});
