import React, { useContext, useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View, StyleSheet, RefreshControl, Alert } from "react-native";
import RectangularButton from "../components/RectangularButton";
import CreateFolderDialog from "../components/CreateFolderDialog";
import { API_BASE_URL } from "../constants";
import CardContext from "../CardContext";
import { ALERT_TYPE, AlertManager, AlertNotification, Toast } from 'react-native-alert-notification';
import TransparentDialogBox from "../components/DialogBox";


const FoldersScreen = ({ navigation }) => {
  const [isDeleteSelected, setIsDeleteSelected] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [folderData, setFolderData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [dialogId, setDialogId] = useState(null);


  const contextData = useContext(CardContext)
  const Folder_name = contextData.folderName
  const Folder_color = contextData.folderColor


  const API_URL = `${API_BASE_URL}/folders/1`;

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      setFolderData(json);
      setRefreshing(false)
    } catch (error) {
      console.error(error);
      setDataFetched(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  
  const handleCloseDialog = () => {
    setDialogId(null);
  };

  
  const handleShowDialog = (id) => {
    setDialogId(id);
  };

  const handleRefresh = () => {
    // Set refreshing status to true and trigger fetch data function
    setRefreshing(true);
    fetchData();
  };

  console.log(folderData)

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
                Folder_name,
                Folder_color
              }),
            });

            const data = await response.json();

            if (response.ok) {
              Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Success',
                textBody: 'Folder added successfully',
              })
              handleRefresh()
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
        {folderData.map((data) => {
          const isDialogVisible = dialogId === data.ID_Folder;
          return (<TouchableOpacity
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
                    style={[styles.folderIcon, { tintColor: data.Folder_color }]}
                    source={require("../assets/icons/folderIcon.png")}
                  />
                  
                  <Text style={styles.label}>{data.Folder_name}</Text>
                </View>
                <View style={styles.folderItemRight}>
                  <TransparentDialogBox
                    visible={isDialogVisible}
                    onClose={handleCloseDialog}
                    title="Remove Folder!"
                    message="Are you sure you want to remove the folders?"
                    onYes={ async () => {
                      handleCloseDialog();
                       try {
                          const response = await fetch(
                            `${API_BASE_URL}/deleteFolder/1/${data.ID_Folder}`,
                            {
                              method: "DELETE",
                            }
                          );

                          if (response.ok) {
                            Toast.show({
                              type: ALERT_TYPE.SUCCESS,
                              title: 'Success',
                              textBody: 'Folder deleted successfully',
                            })
                            handleRefresh()
                          } else {
                            console.error(
                              "Error deleting folder:",
                              response.status
                            );
                            // Handle error case here
                          }
                        } catch (error) {
                          Toast.show({
                            type: ALERT_TYPE.DANGER,
                            title: 'Failed',
                            textBody: 'Something went wrong',
                          })
                          console.error("Error deleting folder:", error);
                          // Handle error case here
                        }
                    }}
                  />
                  <Text style={styles.label}>{data.NumOfReceipts - 1} {data.NumOfReceipts == 2 ? 'Receipt' : 'Receipts'}</Text>
                  {isDeleteSelected ? (
                    <TouchableOpacity
                      style={styles.cancelButtonIcon}
                      onPress={async () => {
                        // try {
                        //   const response = await fetch(
                        //     `${API_BASE_URL}/deleteFolder/1/${data.ID_Folder}`,
                        //     {
                        //       method: "DELETE",
                        //     }
                        //   );

                        //   if (response.ok) {
                        //     Toast.show({
                        //       type: ALERT_TYPE.SUCCESS,
                        //       title: 'Success',
                        //       textBody: 'Folder deleted successfully',
                        //     })
                        //     handleRefresh()
                        //   } else {
                        //     console.error(
                        //       "Error deleting folder:",
                        //       response.status
                        //     );
                        //     // Handle error case here
                        //   }
                        // } catch (error) {
                        //   Toast.show({
                        //     type: ALERT_TYPE.DANGER,
                        //     title: 'Failed',
                        //     textBody: 'Something went wrong',
                        //   })
                        //   console.error("Error deleting folder:", error);
                        //   // Handle error case here
                        // }
                        handleShowDialog(data.ID_Folder)
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
          </TouchableOpacity>)
        })}
        <View style={styles.divider} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', 
    height:'100%'
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
