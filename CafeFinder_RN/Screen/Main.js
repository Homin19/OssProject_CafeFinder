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
import MapScreen from "./MapScreen";

const Main = (props) => {
  const [text, setText] = useState("");

  const handleInputChange = (inputText) => {
    setText(inputText);
  };

  const handleButtonClick = () => {
    Alert.alert("팝업 알림입니다.");
    // 여기에서 텍스트 검색 처리 기능을 구현해야함( 네이게이터 사용해서 다른창 넘어가게 )
  };

  return (
    <View style={styles.container1}>
      <Text style={styles.text}> {"\n\n"} Cafe Finder </Text>
      <Text> </Text>
      <View style={styles.container2}>
        <TextInput
          style={styles.input}
          placeholder="검색어를 입력하시오 "
          onChangeText={handleInputChange}
          value={text}
        />
        <Text> </Text>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("MapScreen")
          }}
        >
          <Image
            style={styles.imagebutton}
            source={require("../assets/search.png")}
          />
        </TouchableOpacity>
      </View>
      <View>
      <MapScreen />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    /* View 스타일*/
    alignItems: "center",
  },
  container2: {
    /* View 스타일*/
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    /*검색창*/
    width: 250,
    height: 60,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  text: {
    /*검색어*/
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  imagebutton: {
    /*검색버튼*/
    width: 60,
    height: 60,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default Main;
