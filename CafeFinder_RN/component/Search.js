import { useState } from 'react';
import {TouchableOpacity, Image, Text, View, TextInput, Button, StyleSheet, Alert } from 'react-native';

const Search = () => {
  const [text, setText] = useState('');

  const handleInputChange = (inputText) => {
    setText(inputText);
  };

  const handleButtonClick = () => {
    Alert.alert('팝업 알림입니다.')
    // 여기에서 텍스트 검색 처리 기능을 구현해야함 근데 알람창은 왜안뜨지
  };

  return (
    <View style={styles.container1}>
      <Text style={styles.text}> Cafe Finder </Text>
      <Text>  </Text>
    <View style ={styles.container2}>
       <TextInput
        style={styles.input}
        placeholder="검색어를 입력하시오 "
        onChangeText={handleInputChange}
        value={text}
      />
      <Text>  </Text>
      <TouchableOpacity
        onPress={handleButtonClick}
      >
      <Image
          style={styles.imagebutton}
          source={require('../images/search.png')}
      />
      </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {  /* View 스타일*/
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
    container2: {  /* View 스타일*/
    flex: 1,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {   /*검색창*/
    width: 250,
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  text: {  /*검색어*/
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imagebutton:{   /*검색버튼*/
    width: 60 ,
    height: 60,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default Search;