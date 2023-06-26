import React, { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CircularButton from "../components/CircularButton";
import RoundedRectangularButton from "../components/RoundedRectangularButton";
import CardContext from "../CardContext";

const Settings = ({ navigation }) => {
  const { selectedCards, updateSelectedCards } = useContext(CardContext);

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Inställningar</Text>
          <View style={styles.sectionDivider} />
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.selectableText}>Add or Remove Bank Card</Text>
            <CircularButton
              function={() => navigation.navigate("AddCards")}
              text="+"
            />
          </View>
          <View style={styles.sectionDivider} />
          <View style={styles.rowContainer}>
            <Text style={styles.selectableText}>Byt språk</Text>
            <Image style={styles.languageImage} />
          </View>
          <View style={styles.sectionDivider} />
          <Text style={styles.goldenText}>Kontakta Kvittapp</Text>
          <View style={{ height: 20 }} />
          <Text style={styles.sectionText}>
            Kontakta Kvittapp För företag och affärsrelaterade frågor:
          </Text>
          <Text style={styles.sectionText}>Business@kvittapp.se</Text>
          <View style={{ height: 20 }} />
          <Text style={styles.sectionText}>För kundservice frågor:</Text>
          <Text style={styles.sectionText}>Info@kvittapp.se För mer</Text>
          <View style={{ height: 20 }} />
          <Text style={styles.sectionText}>
            information om Kvittapp kan du besöka vår hemsida:
          </Text>
          <Text style={styles.sectionText}>www.kvittapp.se</Text>
          <View style={styles.sectionDivider} />
        </View>
      </View>

      <RoundedRectangularButton title="Logga ut" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
    justifyContent: "space-between",
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    textAlign: "center",
    fontSize: 24,
    fontFamily: "BalooChettan2-Bold",
  },
  sectionDivider: {
    width: "100%",
    height: 1,
    borderTopWidth: 1,
    borderColor: "#000000",
    marginVertical: 8,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 14,
    fontFamily: "BalooChettan2-Regular",
  },
  languageImage: {
    // Add styles for the language image here
  },
  goldenText: {
    fontSize: 14,
    fontFamily: "BalooChettan2-Bold",
    color: "#BEA83B",
  },
  selectableText: {
    fontSize: 16,
    fontFamily: "BalooChettan2-Bold",
  },
});

export default Settings;
