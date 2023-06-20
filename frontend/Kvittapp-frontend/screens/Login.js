import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Image, Text, View, StyleSheet } from "react-native";
import RectangularButton from "../components/RectangularButton";

const Login = ({ onLogin }) => {
  const [selectedUSer, setSelectedUSer] = useState("");

  const handleUserChange = (user) => {};

  const handleLoginButtonPress = () => {
    // Call the onLogin callback with the selectedUser value
    onLogin(selectedUSer, (isAuthenticated = true));
  };
  console.log(selectedUSer);

  return (
    <View style={styles.container}>
      <View>
        <Image
          resizeMode="contain"
          style={{
            height: 180,
            width: 180,
            alignSelf: "center",
            tintColor: "#81A7FF",
          }}
          source={require("../assets/kvitappPicture.png")}
        />
        <Image
          resizeMode="contain"
          style={{
            height: 60,
            width: 220,
            alignSelf: "center",
            tintColor: "#81A7FF",
          }}
          source={require("../assets/KvittappLogo.png")}
        />
      </View>
      <View style={styles.userContainer}>
        {/* <TouchableOpacity
          style={[
            styles.userButton,
            selectedUSer === "1" && styles.selectedUserButton,
          ]}
          onPress={() => {
            handleUserChange("1");
          }}
        >
          <Text style={styles.userButtonText}>User 1</Text>
          {selectedUSer === "1" && (
            <View style={styles.selectedUserIndicator} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.userButton,
            selectedUSer === "2" && styles.selectedUserButton,
          ]}
          onPress={() => handleUserChange("2")}
        >
          <Text style={styles.userButtonText}>User 2</Text>
          {selectedUSer === "2" && (
            <View style={styles.selectedUserIndicator} />
          )}
        </TouchableOpacity> */}

          <View style={{width:'100%'}}>
          <RectangularButton smallButton={false} text='Login using phone number' function={handleLoginButtonPress } />
        </View>
        <View style={{width:'100%'}}>
            <RectangularButton smallButton={false} text='Login using BankID' />
        </View>
        <View style={{width:'100%'}}>
            <RectangularButton smallButton={false} text='Create an Account' />
          </View>

        
      </View>
      {/* <TouchableOpacity onPress={handleLoginButtonPress}>
        <View style={styles.loginContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/bankid_logo.png")}
          />
          <Text style={styles.loginText}>Logga in med BankID</Text>
        </View>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignSelf: "center",
    flex: 1,
  },
  userContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  userButton: {
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  selectedUserButton: {
    backgroundColor: "#F1C40F",
    borderColor: "#F1C40F",
  },
  userButtonText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    fontFamily: "BalooChettan2-SemiBold",
  },
  selectedUserIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#333",
    alignSelf: "center",
    marginTop: 5,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 15,
    width: 220,
    height: 63,
    backgroundColor: "#C8C8C8",
  },
  logo: {
    height: 40,
    width: 40,
  },
  loginText: {
    alignSelf: "center",
    fontFamily: "BalooChettan2-Bold",
  },
});

export default Login;
