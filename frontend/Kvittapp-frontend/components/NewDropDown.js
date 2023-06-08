import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, LayoutAnimation, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Dropdown = ({ leftIcon, text, rightIcon, dropdownItems, dropDownHeight, onSelectOption}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownHeight = isOpen ? dropDownHeight : 0;
  const dropdownOpacity = isOpen ? 1 : 0;
  const animationDuration = 300;

  const toggleDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  };

  return (
    <View style={{backgroundColor:'#e6e6e6', width:'100%', borderRadius:6}}>
      <TouchableOpacity onPress={toggleDropdown} style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', paddingHorizontal:12, paddingVertical:6 }}>
      
        <Text style={[styles.regularText ]}>{text}</Text>
        {rightIcon && <Image style={{height:12, width:12, tintColor:'#81A7FF', resizeMode:'contain'
    }} source={require('../assets/icons/arrowDown.png')}  />}
      </TouchableOpacity>

          <Animated.View style={{ height: dropdownHeight, opacity: dropdownOpacity, overflow: 'hidden', borderBottomLeftRadius: 6, borderBottomRightRadius: 6 }}>
              
        <View style={{ backgroundColor: '#e6e6e6', paddingHorizontal:12 }}>
                  {dropdownItems.map((item, index) => (
              <TouchableOpacity  onPress={item.functions}>
                   <View key={index} style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#81a7ff', paddingVertical:6 }}>
                  
                        {item.leftIcon}
              <Text style={[styles.regularText, {marginLeft:8}]}>{item.text}</Text>
              {/* {item.rightIcon && <Ionicons name={item.rightIcon} size={24} />} */}
            </View>       
              </TouchableOpacity>
              
          ))}
        </View>
      </Animated.View>

    </View>
  );
};

const styles = StyleSheet.create({
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

export default Dropdown;
