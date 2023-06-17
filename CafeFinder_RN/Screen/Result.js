import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Result = (props) => {
  const { searchResults } = props.route.params;
  const navigation = useNavigation();

  const handleItemClick = (item) => {
    console.log("Clicked item:", item);
    // 추가 작업 수행

    // 클릭된 항목의 데이터를 MapScreen으로 전달하여 이동
    navigation.navigate("MapScreen", { item });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemClick(item)}>
      <View style={styles.container}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.image} />
        ) : (
          <Text>No Image</Text>
        )}
        <View style={styles.textContainer}>
          <View style={styles.textWrapper}>
            <Text style={styles.brand}>{item.brand} :</Text>
            <Text style={styles.name}>{item.name} : </Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        style={{
          backgroundColor: "lavender",
        }}
        data={searchResults}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
  },
  textContainer: {
    marginLeft: 10, // 이미지와 텍스트 사이의 간격
    flex: 1,
  },
  textWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  brand: {
    fontSize: 16,
    fontWeight: "bold",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 7,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default Result;
