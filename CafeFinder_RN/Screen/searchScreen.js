//asyncstorage 추가한 코드
import { db } from "../DB/FireBase";
import React, { useState, useEffect } from "react";
import { View, TextInput, Text, Button, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const fetchedData = [];
      const snapshot = await db.collection("CafeFinder").get();

      snapshot.forEach((doc) => {
        fetchedData.push({ id: doc.id, ...doc.data() });
      });

      setData(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);
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
          itemName.indexOf(textData) > -1 || itemBrand.indexOf(textData) > -1
        );
      });
      setFilteredData(newData);
    } else {
      setFilteredData(data);
    }
  };

  const saveData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      console.log("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        console.log("Data retrieved successfully:", value);
      } else {
        console.log("No data found!");
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View>
      <Text>
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            style={{ width: 30, height: 30 }}
          />
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
        onPress={() => {
          saveData("searchTerm", searchTerm); // 검색어를 asyncStorage에 저장
          searchFilter(searchTerm);
          navigation.navigate("Result", { searchResults: filteredData });
        }}
      />
      <Button
        title="Retrieve Data"
        onPress={() => retrieveData("searchTerm")} // asyncStorage에서 검색어 데이터 검색
      />
      <Button
        title="Clear Data"
        onPress={() => AsyncStorage.removeItem("searchTerm")} // asyncStorage에서 검색어 데이터 제거
      />
    </View>
  );
};

export default SearchScreen;
