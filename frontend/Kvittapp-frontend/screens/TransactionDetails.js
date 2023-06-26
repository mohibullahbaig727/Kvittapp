import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { API_BASE_URL } from "../constants";

const TransactionDetails = ({ route }) => {
  const { data } = route.params;

  const [storeData, setStoreData] = useState([]);

  const vat25 = data
    .filter((item) => item.VAT_Percentage === 25)
    .reduce((total, item) => total + item.VAT_Amount, 0);
  const vat12 = data
    .filter((item) => item.VAT_Percentage === 12)
    .reduce((total, item) => total + item.VAT_Amount, 0);
  const totalVat = vat12 + vat25;

  useEffect(() => {
    const API_URL = `${API_BASE_URL}/storeDetails/${data[0].Store_Name}`;

    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const json = await response.json();
        setStoreData(json[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const amountDetails = [
    { value: data[0].Total_Amount, title: "Total Amount" },
    { value: totalVat, title: "Total Moms" },
    { value: data[0].Total_Amount - totalVat, title: "Net Amount" },
    { value: data[0].Payment_method, title: "Payment Method" },
    {
      value:
        data[0].Card_number?.slice(0, 4) +
        " **** **** " +
        data[0].Card_number?.slice(15, 19),
      title: "Card Number",
    },
    { value: data[0].Datetime.slice(0, 10), title: "Date" },
    { value: data[0].ID_Reciept, title: "Receipt Number" },
    { value: "Sweden", title: "Country" },
    // { value: vat12, title: "Products with 12% VAT" },
    // { value: vat25, title: "Products with 25% VAT" },
  ];

  const transactionDetails = [
    {
      value: "129898-1234",
      title: "Organization Number",
    },
    {
      title: "Address",
      value:
        storeData[0]?.Address_street +
        ", " +
        storeData[0]?.Adress_postarea +
        ", " +
        storeData[0]?.Address_postcode,
    },
    { title: "Phone Number", value: storeData[0]?.Phone_number },
    { title: "E-Mail", value: storeData[0]?.Mail_address },
  ];

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.title}>Transaction Details</Text>
        </View>

        <View style={styles.detailsContainer}>
          {amountDetails.map((amount, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.label}>{amount.title}</Text>
              <Text style={styles.value}>{amount.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.logoContainer}>
          <Text style={styles.title}>Store Details</Text>
        </View>

        <View style={styles.detailsContainer}>
          {transactionDetails.map((transaction, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.label}>{transaction.title}</Text>
              <Text style={styles.value}>{transaction.value}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.value}>
          Kontakta butiken genom ovanstående kontakt-information för ärenden
          gällande ditt köp. Du kan även nå kundtjänst genom att <Text style={styles.label}>klicka här.</Text> 
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "#f2f2f2",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    justifyContent: "center",
  },
  logo: {
    height: 40,
    width: 40,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: "BalooChettan2-Bold",
  },
  detailsContainer: {
    borderBottomColor: "#e6e6e6",
    borderBottomWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontFamily: "BalooChettan2-Bold",
  },
  value: {
    fontSize: 14,
    fontFamily: "BalooChettan2-Regular",
  },
});

export default TransactionDetails;
