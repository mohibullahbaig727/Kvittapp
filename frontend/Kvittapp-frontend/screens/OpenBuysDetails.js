import { Camera } from "expo-camera";
import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AddImageContainer from "../components/AddImageContainer";
import { CameraModule } from "../components/CameraModule";
import RectangularButton from "../components/RectangularButton";
import TextContainer from "../components/TextContainer";
import { addReturn } from "../services/add";
import Dropdown from "../components/NewDropDown";

const OpenBuysDetails = ({ navigation, route }) => {
  const [image, setImage] = useState(null);
  const [camera, setShowCamera] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [reasonSelected, setReasonSelected] = useState("Return Reason");
  const [optionalReason, setOptionalReason] = useState(null);

  const data = route?.params?.data;

  console.log(optionalReason, "mooo");

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  // const returnResons = [
  //   { id: 1, title: "Bad Quality" },
  //   { id: 2, title: "Size too small" },
  //   { id: 3, title: "Size too big" },
  //   { id: 4, title: "Received wrong product" },
  //   { id: 5, title: "Did not meet expectations" },
  //   { id: 6, title: "I found a better product" },
  //   { id: 7, title: "I found a better price" },
  //   { id: 8, title: "Product is no longer needed" },
  // ];

  const dropdownItems = [
    {
      leftIcon: null,
      text: "Bad Quality",
      rightIcon: "md-checkmark",
      functions: () => setReasonSelected("Bad Quality"),
    },
    {
      leftIcon: null,
      text: "Size too small",
      rightIcon: "md-checkmark",
      functions: () => setReasonSelected("Size too small"),
    },
    {
      leftIcon: null,
      text: "Size too big",
      rightIcon: "md-checkmark",
      functions: () => setReasonSelected("Size too big"),
    },
    {
      leftIcon: null,
      text: "Received wrong product",
      rightIcon: "md-checkmark",
      functions: () => setReasonSelected("Received wrong product"),
    },
    {
      leftIcon: null,
      text: "Did not meet expectations",
      rightIcon: "md-checkmark",
      functions: () => setReasonSelected("Did not meet expectations"),
    },
    {
      leftIcon: null,
      text: "I found a better product",
      rightIcon: "md-checkmark",
      functions: () => setReasonSelected("I found a better product"),
    },
    {
      leftIcon: null,
      text: "I found a better price",
      rightIcon: "md-checkmark",
      functions: () => setReasonSelected("I found a better price"),
    },
    {
      leftIcon: null,
      text: "Product is no longer needed",
      rightIcon: "md-checkmark",
      functions: () => setReasonSelected("Product is no longer needed"),
    },
  ];

  // const renderItem = ({ item }) => {
  //   const isSelected = reasonSelected === item.title;
  //   return (
  //     <TouchableOpacity onPress={() => setReasonSelected(item.title)}>
  //       <View
  //         style={{
  //           backgroundColor: isSelected ? "#BEA83B" : "#2a2a2a",
  //           padding: 12,
  //           margin: 4,
  //           borderRadius: 12,
  //         }}
  //       >
  //         <Text style={{ color: "white", maxWidth: 100 }}>{item.title}</Text>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };

  return (
    <View
      style={{
        backgroundColor: "white",
        height: '100%'
        
      }}
    >
      <ScrollView>
        <View
          style={{
            alignItems: "center",
            paddingVertical: 18,
          }}
        >
          <Text style={styles.boldHeading}>
            Välj produkter du vill returnera
          </Text>
        </View>
        <View style={{ borderTopColor: "#e6e6e6", borderTopWidth: 1 }} />
        {/* <TextContainer title="Choose reason for return" /> */}
        <View style={{ paddingHorizontal: 32, marginTop: 16 }}>
          <View>
            {data.map((data) => (
              <View style={{paddingBottom:12}}>
                <Text style={styles.regularText}>{data.Product_name}</Text>
                {/* <FlatList
                data={returnResons}
                numColumns={3}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
              /> */}

                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: 6,
                  }}
                >
                  <Dropdown
                    leftIcon="md-arrow-dropdown"
                    text={reasonSelected}
                    rightIcon="../assets/icons/arrowDown.png"
                    dropDownHeight={259}
                    dropdownItems={dropdownItems}
                  />
                </View>

                
              </View>
            ))}
            <View style={{paddingVertical: 12}}>
                  <Text style={styles.regularText}>Kommentar (Valfritt):</Text>
                  <View
                    style={{
                      height: 100,
                      width: "100%",
                      borderRadius: 8,
                      borderWidth: 1,
                      backgroundColor: "white",
                      alignSelf: "center",
                      marginTop:6
                    }}
                  >
                    <TextInput
                      placeholder="(Optional) Describe the reason for return..."
                      onChangeText={(value) => setOptionalReason(value)}
                    />
                  </View>
                </View>

            {/* <TextContainer title="Pictures (Optional)" />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 20,
            }}
          >
            <AddImageContainer
              function={() => {
                setShowCamera(true);
              }}
              image={image}
            />
            <AddImageContainer
              function={() => {
                setShowCamera(true);
              }}
            />
            <AddImageContainer
              function={() => {
                setShowCamera(true);
              }}
            />
          </View> */}
            {/* <TextContainer title="Choose return Option" />
          <ReturnOption />
          <RectangularButton
            text="Create Return"
            function={() => navigation.navigate("ReturnCreated")}
          /> */}
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <RectangularButton
                smallButton={true}
                text="Cancel"
                function={async () => {
                  navigation.pop();
                }}
              />
              <RectangularButton
                smallButton={true}
                text="Next"
                function={async () => {
                  await addReturn(
                    1,
                    data[0].Store_Name,
                    "Pending",
                    1,
                    data[0].Product,
                    data[0].Product_name,
                    222,
                    reasonSelected,
                    optionalReason,
                    "Store"
                  );
                  navigation.navigate("ReturnOptions");
                }}
              />
            </View>
          </View>

          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            {camera && (
              <CameraModule
                showModal={camera}
                setModalVisible={() => setShowCamera(false)}
                setImage={(result) => setImage(result.uri)}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 28,
  },
  storeDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  openBuyDetailsContainer: {
    marginBottom: 8,
  },
  boldHeading: {
    fontSize: 16,
    fontFamily: "BalooChettan2-Bold",
  },
  boldText: {
    fontSize: 12,
    fontFamily: "BalooChettan2-Bold",
  },
  regularText: {
    fontSize: 14,
    fontFamily: "BalooChettan2-Regular",
  },
  columnHeadingText: {
    marginVertical: 8,
    fontFamily: "BalooChettan2-Bold",
  },
  storeHeading: {
    fontSize: 20,
    fontFamily: "BalooChettan2-Bold",
  },
});

export default OpenBuysDetails;
