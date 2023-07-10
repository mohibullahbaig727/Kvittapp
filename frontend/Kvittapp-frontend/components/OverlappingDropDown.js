import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, LayoutAnimation, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const OverlappingDropDown = ({ leftIcon, text, rightIcon, dropdownItems, dropDownHeight, onSelectOption}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownHeight = isOpen ? dropDownHeight : 0;
  const dropdownOpacity = isOpen ? 1 : 0;
  const animationDuration = 300;

  const toggleDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  };

  return (
    <View style={{ position: 'relative', width: '100%' }}>
      <TouchableOpacity onPress={toggleDropdown} style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', paddingHorizontal:12, paddingVertical:6 }}>
        <Text style={[styles.regularText ]}>{text}</Text>
        {rightIcon && <Image style={{ height: 12, width: 12, tintColor:'#81A7FF', resizeMode:'contain' }} source={require('../assets/icons/arrowDown.png')} />}
      </TouchableOpacity>

      {isOpen && (
        <Animated.View style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: dropDownHeight,
          opacity: dropdownOpacity,
          overflow: 'hidden',
          borderBottomLeftRadius: 6,
          borderBottomRightRadius: 6,
          backgroundColor: '#e6e6e6',
          paddingHorizontal: 12,
          zIndex: 20000, // Set a higher value for zIndex to make the dropdown overlap other components
        }}>
          {dropdownItems.map((item, index) => (
            <TouchableOpacity key={index} onPress={item.functions}>
              <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#81a7ff', paddingVertical:6 }}>
                {item.leftIcon}
                <Text style={[styles.regularText, { marginLeft: 8 }]}>{item.text}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  regularText: {
    fontSize: 14,
    fontFamily: 'BalooChettan2-Regular',
  },
  columnHeadingText: {
    marginVertical: 8,
    fontFamily: 'BalooChettan2-Bold',
  },
  storeHeading: {
    fontSize: 20,
    fontFamily: 'BalooChettan2-Bold',
  },
});

export default OverlappingDropDown ;
