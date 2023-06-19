import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Result = (props) => {
  const { searchResults } = props.route.params;
  const navigation = useNavigation();

  const handleItemClick = (item) => {
    console.log("Clicked item:", item);
    // 추가 작업 수행

    // 클릭된 항목의 데이터를 MarkerDistanceScreen으로 전달하여 이동
    navigation.navigate("MarkerDistanceScreen", { item });
  };

  const [loadingImages, setLoadingImages] = useState([]);

  useEffect(() => {
    setLoadingImages([]);
  }, [searchResults]);

  const handleImageLoadStart = (itemId) => {
    setLoadingImages((prevLoadingImages) => [...prevLoadingImages, itemId]);
  };

  const handleImageLoadEnd = (itemId) => {
    setLoadingImages((prevLoadingImages) =>
      prevLoadingImages.filter((id) => id !== itemId)
    );
  };

  const renderItem = ({ item }) => {
    const isLoading = loadingImages.includes(item.id);

    return (
      <TouchableOpacity onPress={() => handleItemClick(item)}>
        <View style={styles.container}>
          {item.image ? (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: item.image }}
                style={styles.image}
                onLoadStart={() => handleImageLoadStart(item.id)}
                onLoadEnd={() => handleImageLoadEnd(item.id)}
              />
              {isLoading && (
                <ActivityIndicator style={styles.loadingIndicator} />
              )}
            </View>
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
  };

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
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 50,
    height: 50,
  },
  textContainer: {
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
  loadingIndicator: {
    marginLeft: 5,
  },
});

export default Result;