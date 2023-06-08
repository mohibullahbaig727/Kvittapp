import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { API_BASE_URL } from "../constants";

const StoreDetails = ({ route }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const API_URL = `${API_BASE_URL}/storeDetails/${route.params.data?.Store_Name}`;

    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const json = await response.json();
        setData(json[0]);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  console.log(data[0]?.Address_Street);
  const storeInfo = [
    { title: "Organization Name", value: data[0]?.Store_name },
    {
      title: "Address",
      value:
        data[0]?.Address_street +
        ", " +
        data[0]?.Adress_postarea +
        ", " +
        data[0]?.Address_postcode,
    },
    { title: "Phone Number", value: data[0]?.Phone_number },
    { title: "E-Mail", value: data[0]?.Mail_address },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require("../assets/bankid_logo.png")}
        />
        <Text style={styles.title}>Payment Details</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.storeInfo}>
        {storeInfo.map((storeInfo) => {
          return (
            <View style={styles.storeInfoItem}>
              <Text style={styles.storeInfoTitle}>{storeInfo.title}</Text>
              <Text style={styles.storeInfoValue}>{storeInfo.value}</Text>
            </View>
          );
        })}
      </View>
      <View style={styles.divider} />
      <Text style={styles.text}>
        To contact the store, you can use the above contact information. You can
        also reach customer service by clicking here.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  logo: {
    height: 20,
    width: 20,
  },
  title: {
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 18,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 10,
  },
  storeInfo: {
    marginBottom: 20,
  },
  storeInfoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  storeInfoTitle: {
    fontWeight: "bold",
  },
  storeInfoValue: {
    flex: 1,
    textAlign: "right",
  },
  text: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default StoreDetails;
