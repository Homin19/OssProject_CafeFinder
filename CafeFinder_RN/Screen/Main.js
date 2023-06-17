import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../DB/FireBase";
import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Main = (props) => {
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
      const q = query(collection(db, "CafeFinder"));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
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
    <View style={styles.container1}>
      <Text style={styles.text}> {"\n\n"} Cafe Finder </Text>
      <Text> </Text>
      <View style={styles.container2}>
        <TextInput
          style={styles.input}
          placeholder="검색어를 입력하시오 "
          value={searchTerm}
          onChangeText={(text) => searchFilter(text)}
        />
        <Text> </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Result", { searchResults: filteredData })
          }
        >
          <Image
            style={styles.imagebutton}
            source={require("../assets/search.png")}
          />
        </TouchableOpacity>
      </View>
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
    width: 300,
    height: 60,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 25,
  },
  text: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "left",
  },
  imagebutton: {
    width: 60,
    height: 60,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default Main;
