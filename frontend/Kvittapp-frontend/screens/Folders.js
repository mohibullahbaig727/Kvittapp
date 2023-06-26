import React, { useContext, useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View, StyleSheet, RefreshControl } from "react-native";
import RectangularButton from "../components/RectangularButton";
import CreateFolderDialog from "../components/CreateFolderDialog";
import { API_BASE_URL } from "../constants";
import CardContext from "../CardContext";

const FoldersScreen = ({ navigation }) => {
  const [isDeleteSelected, setIsDeleteSelected] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [folderData, setFolderData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const ID_Folder = "7";

  const contextData = useContext(CardContext)
  const Folder_name = contextData.folderName

  const API_URL = `${API_BASE_URL}/folders/1`;

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      setFolderData(json);
      console.log(folderData);
      setRefreshing(false)
    } catch (error) {
      console.error(error);
      setDataFetched(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    // Set refreshing status to true and trigger fetch data function
    setRefreshing(true);
    fetchData();
  };

  return (
    <View style={styles.container}>
      <CreateFolderDialog
        visible={isDialogVisible}
        onClose={() => setIsDialogVisible(false)}
        onYes={async () => {
          //setisDialogVisible(false);
          try {
            const response = await fetch(`${API_BASE_URL}/addFolder/1`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ID_Folder,
                Folder_name,
              }),
            });

            const data = await response.json();

            if (response.ok) {
              console.log("Success", "New receipt successfully", data);
            } else {
              console.log("Error", "Failed to add new receipt");
            }

            setIsDialogVisible(false)
          } catch (error) {
            console.error("Error adding new folder:", error);
          }
        }}
      />

      <View style={styles.buttonContainer}>
        <RectangularButton
          smallButton={true}
          text="Skappa en mapp"
          function={() => setIsDialogVisible(!isDialogVisible)}
        />
        <RectangularButton
          smallButton={true}
          text={isDeleteSelected ? "Avbryt" : "Ta bort en mapp"}
          function={() => {
            setIsDeleteSelected(!isDeleteSelected);
          }}
        />
      </View>

      <ScrollView alwaysBounceVertical={true}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      >
        {folderData.map((data) => (
          <TouchableOpacity
            key={data.ID_Folder}
            onPress={() =>
              navigation.navigate("ReceiptsInFolder", {
                data: data,
              })
            }
          >
            <View>
              <View style={styles.folderItem}>
                <View style={styles.folderItemLeft}>
                  <Image
                    style={styles.folderIcon}
                    source={require("../assets/icons/folderIcon.png")}
                  />
                  
                  <Text style={styles.label}>{data.Folder_name}</Text>
                </View>
                <View style={styles.folderItemRight}>
                  <Text style={styles.label}>{data.ID_Folder} Receipt/s</Text>
                  {isDeleteSelected ? (
                    <TouchableOpacity
                      style={styles.cancelButtonIcon}
                      onPress={async () => {
                        try {
                          const response = await fetch(
                            `${API_BASE_URL}/deleteFolder/1/${data.ID_Folder}`,
                            {
                              method: "DELETE",
                            }
                          );

                          if (response.ok) {
                            console.log("Folder deleted successfully");
                            // Handle success case here
                          } else {
                            console.error(
                              "Error deleting folder:",
                              response.status
                            );
                            // Handle error case here
                          }
                        } catch (error) {
                          console.error("Error deleting folder:", error);
                          // Handle error case here
                        }
                      }}
                    >
                      <Image
                        style={{}}
                        resizeMode="contain"
                        source={require("../assets/icons/cancelButtonIcon.png")}
                      />
                    </TouchableOpacity>
                  ) : (
                    <Image
                        style={styles.arrowRightIcon}
                        resizeMode="contain"
                      source={require("../assets/icons/arrowRightIcon.png")}
                    />
                  )}
                </View>
              </View>
              
            </View>
          </TouchableOpacity>
        ))}
        <View style={styles.divider} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 18,
  },
  folderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderTopColor: '#e6e6e6'
  },
  folderItemLeft: {
    flexDirection: "row",
  },
  folderIcon: {
    height: 16,
    width: 16,
    marginHorizontal:8
  },
  folderItemRight: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButtonIcon: {
    marginLeft:12,
    alignSelf: 'center',
  },
  arrowRightIcon: {
    height: 12,
    width: 12,
    alignSelf: 'center',
    marginLeft:12,

  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: '#e6e6e6',
    width: "100%",
  },
  label: {
    fontSize: 14,
    fontFamily: "BalooChettan2-Regular",
  },
});

export default FoldersScreen;
