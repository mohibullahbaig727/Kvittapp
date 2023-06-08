import React, { useState } from 'react';
import { View, TextInput, Button, TouchableOpacity, Image } from 'react-native';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <View style={{flexDirection:'row', borderWidth:2, borderRadius:6, alignContent:'center',alignItems:'center',}}>
      <TextInput
        style={{ height: 32, borderColor: 'gray', paddingHorizontal: 10 , flex:1}}
        onChangeText={text => setSearchQuery(text)}
        value={searchQuery}
        placeholder="Search..."
      />
          <TouchableOpacity style={{paddingHorizontal:8}}>
              <Image style={{height:20, width:20, }} source={require('../assets/icons/search_icon.png')} />
                  
              
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
