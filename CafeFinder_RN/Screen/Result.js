// lee ho min 0609
import React from "react";
import { View, Text, FlatList, Image } from "react-native";

const Result = ({ route }) => {
  const { searchResults } = route.params; // useRoute로 전달받은 searchResults

  const renderItem = ({ item }) => (
    <View>
      <Text>
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            style={{ width: 50, height: 50 }}
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
      <Text>뭐지 </Text>
      <FlatList
        data={searchResults}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Result;
