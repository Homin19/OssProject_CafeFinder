import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';


const Result = ({ route }) => {
  const { searchResults } = route.params;

  const renderItem = ({ item }) => (
    <View>
      <Text>
        {item.brand} : {item.name} : {item.price}원
      </Text>
    </View>
  );

  return (
    <FlatList
      data={searchResults}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resultText: {
    fontSize: 18,
  },
});

export default Result;
