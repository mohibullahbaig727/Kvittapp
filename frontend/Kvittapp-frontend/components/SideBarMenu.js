import React, { useState, useRef } from "react";
import { View, StyleSheet, Animated, PanResponder, Image, TouchableOpacity } from "react-native";

const Sidebar = ({ isOpen, onClose, children }) => {
  const [isDragging, setIsDragging] = useState(false);
  const translateX = useRef(new Animated.Value(isOpen ? 0 : 300)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setIsDragging(true);
      },
      onPanResponderMove: (_, { dx }) => {
        translateX.setValue(Math.max(0, Math.min(dx, 300)));
      },
      onPanResponderRelease: (_, { dx }) => {
        setIsDragging(false);

        if (dx > 50) {
          onClose();
        } else {
          Animated.spring(translateX, {
            toValue: isOpen ? 0 : 300,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  React.useEffect(() => {
    Animated.spring(translateX, {
      toValue: isOpen ? 0 : 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.sidebar,
          {
            transform: [{ translateX }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity onPress={() => onClose()} style={{alignItems: 'flex-end', paddingBottom:32}}>
          <Image style={{height:16, width:16}}
          source={require('../assets/icons/cancelButtonIcon.png')}/>
        </TouchableOpacity>
        {children}
      </Animated.View>
     
        <View style={styles.overlay} onTouchEnd={() => onClose()} />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    overflow: "hidden",
  },
  sidebar: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: 180,
    backgroundColor: "#fff",
    borderLeftWidth: 3,
    borderTopWidth: 1,
    borderTopColor: '#E6E6E6',
    borderLeftColor: "#e6e6e6",
    padding: 20,
    zIndex: 2,
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0,0, 0, 0.3)",
    zIndex: 1,
  },
  label: {
    fontSize: 14,
    fontFamily: "BalooChettan2-Bold",
  },
});

export default Sidebar;
