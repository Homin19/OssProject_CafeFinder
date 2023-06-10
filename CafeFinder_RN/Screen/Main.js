import { useState } from "react";
import {
  TouchableOpacity,
  Image,
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import MapScreen from "./MapScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Main = (props) => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    const fetchedData = await fetchData();

    const filteredData = fetchedData.filter((item) => {
      const textData = searchTerm.toUpperCase();

      for (const key in item) {
        if (typeof item[key] === 'string' && item[key].toUpperCase().includes(textData)) {
          return true;
        }
      }

      return false;
    });

    navigation.navigate('Result', { searchResults: filteredData });
  };

  const fetchData = async () => {
    const fetchedData = [];
    try {
      const jsonValue = await AsyncStorage.getItem('CafeFinder');
      if (jsonValue) {
        const data = JSON.parse(jsonValue);
        fetchedData.push(...data);
      }
    } catch (error) {
      console.log('Error fetching data from AsyncStorage:', error);
    }
    return fetchedData;
  };

  return (
    <View style={styles.container1}>
      <Text style={styles.text}> {"\n\n"} Cafe Finder </Text>
      <Text> </Text>
      <View style={styles.container2}>
        <TextInput
          style={styles.input}
          placeholder="검색어를 입력하시오 "
          onChangeText={(text) => setSearchTerm(text)}
          value={searchTerm}
        />
        <Text> </Text>
        <TouchableOpacity onPress={handleSearch}>
          <Image
            style={styles.imagebutton}
            source={require("../assets/search.png")}
          />
        </TouchableOpacity>
      </View>
      <MapScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    alignItems: "center",
  },
  container2: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: 250,
    height: 60,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  text: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  imagebutton: {
    width: 60,
    height: 60,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default Main;