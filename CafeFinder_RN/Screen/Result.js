import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
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

    <View>
      <Text>
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            style={{ width: 50, height: 50 }}
          />
        ) : (
          <Text> No Image </Text>
        )}
        {item.brand} : {item.name} : {item.price}
      </Text>
    </View>
  );

  return (
    <View>
      <FlatList
        style={{
          backgroundColor: 'lavender',
        }}
        data={searchResults}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Result;