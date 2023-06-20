import React from "react";
import InputField from "../components/InputField";
import { StyleSheet, Text, View } from "react-native";
import RectangularButton from "../components/RectangularButton";

const CreateAccountScreen = () => {
  return (
    <View style={styles.container}>
      <View s>
        <Text style={styles.inputTextHeader}>Name</Text>
        <InputField placeholder="enter name" />
      </View>

      <View>
        <Text style={styles.inputTextHeader}>E-mail</Text>
        <InputField placeholder="enter name" />
      </View>

      <View>
        <Text style={styles.inputTextHeader}>Street Address</Text>
        <InputField placeholder="enter name" />
      </View>

      <View>
        <Text style={styles.inputTextHeader}>Post number</Text>
        <InputField placeholder="enter name" />
      </View>

      <View>
        <Text style={styles.inputTextHeader}>Post address</Text>
        <InputField placeholder="enter name" />
      </View>

      <View>
        <Text style={styles.inputTextHeader}>Telephone number</Text>
        <InputField placeholder="enter name" />
      </View>

      <View>
        <Text style={styles.inputTextHeader}>Gender</Text>
        <InputField placeholder="enter name" />
      </View>

      <View style={{ alignItems: "center" }}>
        <Text style={styles.policyTextRegular}>
          Genom att skapa konto godkänner du Kvittapps{" "}
          <Text style={styles.policyTextBold}>medlemsvillkor</Text>. Information
          kring vår hantering av personuppgifter hittar du i vår{" "}
          <Text style={styles.policyTextBold}>integritetspolicy</Text>.
        </Text>
      </View>

      <View style={{ alignItems: "center" }}>
        <RectangularButton smallButton={true} text="Next" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignSelf: "center",
    width: "80%",
    flex: 1,
  },
  inputTextHeader: {
    fontFamily: "BalooChettan2-Bold",
  },
  policyTextRegular: {
    fontSize: 12,
    fontFamily: "BalooChettan2-Regular",
  },
  policyTextBold: {
    fontSize: 12,
    fontFamily: "BalooChettan2-Bold",
  },
});

export default CreateAccountScreen;
