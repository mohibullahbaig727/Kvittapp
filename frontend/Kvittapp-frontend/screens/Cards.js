import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  View,
  StyleSheet,
  RefreshControl,
} from "react-native";
import CardComponent from "../components/CardComponent";
import RoundedRectangularButton from "../components/RoundedRectangularButton";
import RectangularButton from "../components/RectangularButton";
import CircularButton from "../components/CircularButton";
import { API_BASE_URL } from "../constants";
import TransparentDialogBox from "../components/DialogBox";
import RemoveCard from "../services/delete";
import { createState } from 'state-pool';


const selected = createState(false);

const API_URL = `${API_BASE_URL}/userDetails/1`;
const Cards = ({ route, navigation }) => {
  const [removeCards, setRemoveCards] = useState(false);
  const [data, setData] = useState();
  const [cardData, setcardData] = useState();
  const [isDialogVisible, setisDialogVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [radioSelected, setRadioSelected] = selected.useState();

  const handleRadioPress = (value) => {
    setRadioSelected(value);
  };

  const handleShowDialog = (id) => {
    setisDialogVisible((prevState) => ({
      ...prevState,
      [id]: true,
    }));
  };

  const handleCloseDialog = (id) => {
    setisDialogVisible((prevState) => ({
      ...prevState,
      [id]: false,
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const cards = [];
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      setData(json);
      setRefreshing(false);
      for (let i = 1; i <= 5; i++) {
        const id = i;
        const cardPO = json[0][0][`Card${i}_PO`];
        const cardBank = json[0][0][`Card${i}_bank`];
        const cardNumber = json[0][0][`Card${i}_cardnumber`];
        const expirationDates = json[0][0][`Card${i}_expiration_date`];

        if (cardPO && cardBank && cardNumber && expirationDates) {
          cards.push({
            id: id,
            PO: cardPO,
            bank: cardBank,
            cardNumber,
            expirationDates,
          });
        }
      }
      setcardData(cards);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRefresh = () => {
    // Set refreshing status to true and trigger fetch data function
    setRefreshing(true);
    fetchData();
  };

  return (
    <View>
      {cardData?.length > 0 ? (
        <ScrollView
          style={{ height: "100%" }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              padding: 16,
            }}
          >
            <RectangularButton
              text="Add Card"
              smallButton={true}
              function={() => navigation.navigate("AddCards")}
            />
            <RectangularButton
              text={removeCards ? "Cancel" : "Remove Cards"}
              smallButton={true}
              function={() => setRemoveCards(!removeCards)}
            />
          </View>

          <View>
            {cardData.map((data) => {
              return (
                <View key={data.id}>
                  <CardComponent
                    showRadioBtn={!removeCards}
                    cardData={data}
                    handleRadioPress={() => handleRadioPress(true)}
                    radioSelected={radioSelected}
                    child={
                      <View>
                        {removeCards ? (
                          <CircularButton
                            text="X"
                            function={() => handleShowDialog(data.id)}
                          />
                        ) : null}
                        <TransparentDialogBox
                          visible={isDialogVisible[data.id]}
                          onClose={() => handleCloseDialog(data.id)}
                          title="Remove Card!"
                          message="Are you sure you want to remove this card?"
                          onYes={() => {
                            handleCloseDialog(data.id);
                            RemoveCard(1, parseInt(data.id));
                          }}
                        />
                      </View>
                    }
                  />
                </View>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <ScrollView
          style={{ height: "100%" }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          <View style={styles.noCardContainer}>
            <Text style={styles.noCardsHeadingText}>
              Du har inget bankkort kopplat
            </Text>
            <Text style={styles.noCardsText}>
              Koppla ditt bankkort för att börja spara kvitton.
            </Text>
            <Image
              style={styles.cardImage}
              source={require("../assets/icons/no_card_icon.png")}
            />
            <RoundedRectangularButton
              title="Koppla ett bankkort"
              function={() => navigation.navigate("AddCards")}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  noCardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontFamily: "BalooChettan2-Bold",
    textAlign: "center",
  },
  modalText: {
    fontFamily: "BalooChettan2-Bold",
    marginBottom: 15,
    textAlign: "center",
  },
  noCardsHeadingText: {
    fontFamily: "BalooChettan2-Bold",
    fontSize: 42,
    textAlign: "center",
  },
  noCardsText: {
    fontFamily: "BalooChettan2-Bold",
    textAlign: "center",
    fontSize: 16,
  },
  cardImage: {
    height: 180,
    width: 220,
  },
});

export default Cards;
