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
import RectangularButton from "./RectangularButton";
import { validateFolderName } from "../services/validation";
import { Dimensions } from "react-native";

const CreateFolderDialog = ({ visible, onClose, title, message, onYes }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const { updateFolderName, updateFolderColor, folderColor, folderName } =
    useContext(CardContext);
  
  const [folderNameError, setFolderNameError] = useState("")
  const [folderColorCaps, setfolderColorCaps] = useState("")

  const dropdownItems = [
    {
      leftIcon: null,
      text: "Black",
      rightIcon: null,
      functions: () => {
        updateFolderColor("black")
        setfolderColorCaps("Black")
      },
    },
    {
      leftIcon: null,
      text: "Blue",
      rightIcon: null,
      functions: () => {
        updateFolderColor("blue")
        setfolderColorCaps("Blue")
      },
    },
    {
      leftIcon: null,
      text: "Red",
      rightIcon: null,
      functions: () => {
        updateFolderColor("red")
        setfolderColorCaps("Red")
      },
    },
    {
      leftIcon: null,
      text: "Green",
      rightIcon: null,
      functions: () => {
        updateFolderColor("green")
        setfolderColorCaps("Green")
      },
    },
    {
      leftIcon: null,
      text: "Pink",
      rightIcon: null,
      functions: () => {
        updateFolderColor("pink")
        setfolderColorCaps("Pink")
      },
    },
    {
      leftIcon: null,
      text: "Gold",
      rightIcon: null,
      functions: () => {
        updateFolderColor("gold")
        setfolderColorCaps("Gold")
      },
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

  const handleSubmit = () => {
    if (folderNameError) {
      return;
    }
   onYes();
  };

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
          {/* <View style={{ alignSelf: "flex-start" }}>
            <Text style={styles.label}>Namn</Text>
          </View>

          <View style={{ width: "100%" }}>
            <InputField
              placeholder={"Enter a folder name"}
              onTextChange={(name) => updateFolderName(name)}
            />
          </View>
           */}
          
          <View style={{width: "100%"}}>
          <Text style={styles.headingText}>Namn</Text>
          <TextInput
            value={folderName}
            onChangeText={(value) => {
              updateFolderName(value);
              setFolderNameError(validateFolderName(value));
            }}
            style={styles.input}
          />
          {folderNameError ? <Text style={styles.errorText}>{folderNameError}</Text> : null}
        </View>
          

          <View style={{ alignSelf: "flex-start" }}>
            <Text style={styles.label}>
              Color <Text style={styles.labelGrey}>(Optional)</Text>
            </Text>
          </View>

          {/* <View style={{ width: "100%" }}>
            <InputField placeholder={'Enter a folder color'} onTextChange={ color=> updateFolderColor(color) }/>
          </View> */}
          <OverlappingDropDown
            leftIcon="md-arrow-dropdown"
            text={folderColorCaps == "" ? "Select Color" : folderColorCaps}
            rightIcon="../assets/icons/arrowDown.png"
            dropDownHeight={195}
            dropdownItems={dropdownItems}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
              paddingTop: 22,
              zIndex: -1,
            }}
          >
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: folderName =="" ? '#e6e6e6' : '#81A7FF'}]} onPress={folderName ==""? null : handleSubmit}>
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
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "BalooChettan2-Bold",
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    fontFamily: "BalooChettan2-Bold",
    textAlign: "center",
    padding: 4,
  },
  labelGrey: {
    fontSize: 14,
    fontFamily: "BalooChettan2-Bold",
    textAlign: "center",
    color: "#B7B7B7",
  },
  headingText: {
    fontFamily: "BalooChettan2-Bold",
  },
  formField: {
    padding: 8,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  input: {
    backgroundColor: "#E6E6E6",
    borderRadius: 6,
    paddingHorizontal: 8,
    justifyContent: "center",
    height: Dimensions.get("window").height * 0.035,
    fontSize: 14,
    fontFamily: "BalooChettan2-Regular",
    paddingHorizontal: 6,
  },
});

export default CreateFolderDialog;
