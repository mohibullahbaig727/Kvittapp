import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  TextInput,
} from "react-native";
import InputField from "./InputField";
import CardContext from "../CardContext";
import Dropdown from "./NewDropDown";
import OverlappingDropDown from "./OverlappingDropDown";

const CreateFolderDialog = ({ visible, onClose, title, message, onYes }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const { updateFolderName, updateFolderColor, folderColor } = useContext(CardContext);

  const dropdownItems = [
    {
      leftIcon: null,
      text: "Black",
      rightIcon: null,
      functions: () => updateFolderColor("black") ,
    },
    {
      leftIcon: null,
      text: "Blue",
      rightIcon: null,
      functions: () => updateFolderColor("cyan"),
    },
    {
      leftIcon: null,
      text: "Red",
      rightIcon: null,
      functions: () => updateFolderColor("red"),
    },
    {
      leftIcon: null,
      text: "Green",
      rightIcon: null,
      functions: () => updateFolderColor("green"),
    },
    {
      leftIcon: null,
      text: "Pink",
      rightIcon: null,
      functions: () => updateFolderColor("pink"),
    },
    {
      leftIcon: null,
      text: "Gold",
      rightIcon: null,
      functions: () => updateFolderColor("gold"),
    },
   
  ];

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [fadeAnim, visible]);

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <Animated.View
          style={[
            styles.container,
            { opacity: fadeAnim, transform: [{ scale: fadeAnim }] },
          ]}
        >
          <View style={{ alignSelf: "flex-start" }}>
            <Text style={styles.label }>Namn</Text>
          </View>

          <View style={{ width: "100%" }}>
            <InputField placeholder={'Enter a folder name'} onTextChange={ name=> updateFolderName(name) } />
          </View>

          <View style={{ alignSelf: "flex-start" }}>
            <Text style={styles.label}>Color  <Text style={styles.labelGrey}>(Optional)</Text></Text>
          </View>

          {/* <View style={{ width: "100%" }}>
            <InputField placeholder={'Enter a folder color'} onTextChange={ color=> updateFolderColor(color) }/>
          </View> */}
          <OverlappingDropDown
                    leftIcon="md-arrow-dropdown"
                    text= {folderColor == '' ? 'Select Color' : folderColor}
                    rightIcon="../assets/icons/arrowDown.png"
                    dropDownHeight={195}
                    dropdownItems={dropdownItems}
                  />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
              paddingTop: 22
            }}
          >
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onYes}>
              <Text style={styles.buttonText}>Create Folder</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#81A7FF",
    borderRadius: 5,
    paddingVertical: 8,
    width: 120,
    zIndex:0
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "BalooChettan2-Bold",
    textAlign:'center'
  },
  label: {
    fontSize: 14,
    fontFamily: "BalooChettan2-Bold",
    textAlign: "center",
    padding:4
  },
  labelGrey: {
    fontSize: 14,
    fontFamily: "BalooChettan2-Bold",
    textAlign: "center",
    color: '#B7B7B7'
  },
});

export default CreateFolderDialog;
