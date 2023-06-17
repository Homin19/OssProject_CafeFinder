import React from "react";
import { View, Text, FlatList, Image } from "react-native";

const Result = (props) => {
  const { searchResults } = props.route.params; // useRoute로 전달받은 searchResults

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
        data={searchResults}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Result;
