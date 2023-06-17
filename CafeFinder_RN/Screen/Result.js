import React, { useState } from "react";
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

    // 클릭된 항목의 데이터를 MapScreen으로 전달하여 이동
    navigation.navigate("MapScreen", { item });
  };

  const [loadingImages, setLoadingImages] = useState([]);

  const handleImageLoadStart = (itemId) => {
    setLoadingImages((prevLoadingImages) => [...prevLoadingImages, itemId]);
  }; // 이미지가 로딩중인지 추적하기 위한 배열
  // handleImageLoadStart 함수를 추가하여 이미지 로딩이 시작될때 해당 이미지의 ID를 loadingImages 배열에 추가

  const handleImageLoadEnd = (itemId) => {
    setLoadingImages((prevLoadingImages) =>
      prevLoadingImages.filter((id) => id !== itemId)
    );
  }; // handleImageLoadEnd 함수를 추가하여 이미지 로딩이 완료되었을 때 해당 이미지의 ID를 loadingImages 배열에서 제거

  const renderItem = ({ item }) => {
    const isLoading = loadingImages.includes(item.id);
    // renderItem 함수에서 이미지가 로딩중이면 ActivityIndicator를 표시

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
  flatList: {
    backgroundColor: "lavender",
  },
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
