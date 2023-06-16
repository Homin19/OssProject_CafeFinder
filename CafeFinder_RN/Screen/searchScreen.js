import { db } from '../DB/FireBase';
import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SearchScreen = (props) => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const fetchedData = [];
      const snapshot = await db.collection('CafeFinder').get();

      snapshot.forEach((doc) => {
        fetchedData.push({ id: doc.id, ...doc.data() });
      });

      setData(fetchedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const searchFilter = (text) => {
    setSearchTerm(text);

    if (text) {
      const newData = data.filter((item) => {
        const itemName = item.name.toUpperCase();
        const itemBrand = item.brand.toUpperCase();
        const textData = text.toUpperCase();

        return (
          itemName.indexOf(textData) > -1 ||
          itemBrand.indexOf(textData) > -1
        );
      });
      setFilteredData(newData);
    } else {
      setFilteredData(data);
    }
  };

  const renderItem = ({ item }) => (
    <View>
      <Text>
        {item.image ? (
          <Image source={{ uri: item.image }} style={{ width: 30, height: 30 }} />
        ) : (
          <Text>No Image </Text>
        )}
        {item.brand} : {item.name} : {item.price}
      </Text>
    </View>
  );

  return (
    <View>
      <TextInput
        placeholder="Search"
        value={searchTerm}
        onChangeText={(text) => searchFilter(text)}
      />
      <Button
        title="Search"
        onPress={() => navigation.navigate('Result', { searchResults: filteredData })} // 검색 버튼 클릭 시, 검색 결과를 result 화면으로 전달
      />

    
    </View>
  );
};

export default SearchScreen;