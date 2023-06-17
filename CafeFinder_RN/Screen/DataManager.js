import { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { collection, addDoc, updateDoc, deleteDoc, getDocs } from "firebase/firestore";
import { db } from '../DB/FireBase';

const DataManager = (props) => {
  const [addBrand, setAddBrand] = useState("");
  const [addImage, setAddImage] = useState("");
  const [addLatitude, setAddLatitude] = useState("");
  const [addLongitude, setAddLongitude] = useState("");
  const [addName, setAddName] = useState("");
  const [addPrice, setAddPrice] = useState("");
  const [id, setID] = useState("");
  const [users, setUsers] = useState([]);

  const addtoDB = async () => {
    try {
      const docRef = await addDoc(collection(db, "CafeFinder"), {
        brand: addBrand,
        image: addImage,
        latitude: addLatitude,
        longitude: addLongitude,
        name: addName,
        price: addPrice,
      });
      alert("Added");
      setAddBrand("");
      setAddImage("");
      setAddLatitude("");
      setAddLongitude("");
      setAddName("");
      setAddPrice("");
    } catch (error) {
      console.log(error.message);
    }
  };

  const readfromDB = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "CafeFinder"));
      let tempArray = [];
      querySnapshot.forEach((doc) => {
        tempArray.push({ ...doc.data(), id: doc.id });
      });
      setUsers(tempArray);
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateDB = async () => {
    try {
      await updateDoc(collection(db, "CafeFinder", id), {
        brand: addBrand,
        image: addImage,
        latitude: addLatitude,
        longitude: addLongitude,
        name: addName,
        price: addPrice,
      });
      alert("UPDATED!!");
      readfromDB();
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteDB = async () => {
    try {
      await deleteDoc(collection(db, "CafeFinder", id));
      alert("Deleted");
      readfromDB();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.headerText}> Admin </Text>
        <View style={styles.bodyContainer}>
          <TextInput style={styles.textInput} placeholder="Brand" value={addBrand} onChangeText={setAddBrand} />
          <TextInput style={styles.textInput} placeholder="Image" value={addImage} onChangeText={setAddImage} />
          <TextInput style={styles.textInput} placeholder="Latitude" value={addLatitude} onChangeText={setAddLatitude} />
          <TextInput style={styles.textInput} placeholder="Longitude" value={addLongitude} onChangeText={setAddLongitude} />
          <TextInput style={styles.textInput} placeholder="Name" value={addName} onChangeText={setAddName} />
          <TextInput style={styles.textInput} placeholder="Price" value={addPrice} onChangeText={setAddPrice} />
          <TouchableOpacity style={styles.button} onPress={addtoDB}>
            <Text style={styles.buttonText}>Create ↑ </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={readfromDB}>
            <Text style={styles.buttonText}>Read ↓ </Text>
          </TouchableOpacity>
          {users.map((row, idx) => {
            return (
              <View key={idx}>
                <Text style = {styles.text}> User - {idx}</Text>
                <Text style = {styles.text}> 브랜드 - {row.brand} </Text>
                <Text style = {styles.text}> 이미지 - {row.image} </Text>
                <Text style = {styles.text}> 위도 - {row.latitude} </Text>
                <Text style = {styles.text}> 경도 - {row.longitude} </Text>
                <Text style = {styles.text}> 메뉴명 - {row.name} </Text>
                <Text style = {styles.text}> 가격 - {row.price}</Text>
                <Text> </Text>
              </View>
            );
          })}
          <TouchableOpacity style={styles.button} onPress={updateDB}>
            <Text style={styles.buttonText}>Update ↓ </Text>
          </TouchableOpacity>
          <TextInput style={styles.textInput} placeholder="Doc ID" value={id} onChangeText={setID} />
          <TextInput style={styles.textInput} placeholder="Brand" value={addBrand} onChangeText={setAddBrand} />
          <TextInput style={styles.textInput} placeholder="Image" value={addImage} onChangeText={setAddImage} />
          <TextInput style={styles.textInput} placeholder="Latitude" value={addLatitude} onChangeText={setAddLatitude} />
          <TextInput style={styles.textInput} placeholder="Longitude" value={addLongitude} onChangeText={setAddLongitude} />
          <TextInput style={styles.textInput} placeholder="Name" value={addName} onChangeText={setAddName} />
          <TextInput style={styles.textInput} placeholder="Price" value={addPrice} onChangeText={setAddPrice} />
          <TouchableOpacity style={styles.button} onPress={deleteDB}>
            <Text style={styles.buttonText}>Delete ↓ </Text>
          </TouchableOpacity>
          <TextInput style={styles.textInput} placeholder="Delete Doc ID" value={id} onChangeText={setID} />
        </View>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFEAD0',
    paddingHorizontal: 30,
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    paddingTop: 50,
    alignItems: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: "Arial",
  },
  bodyContainer: {
    backgroundColor: '#FDF5DC',
    paddingHorizontal: 20,
    marginVertical: 30,
    flex: 1
  },
  textInput: {
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1
  },
  button:{
    marginTop: 5,
    padding: 5,
    alignItems: 'center',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'lightgreen',
  },
  text:{
    color: "#7c795d", // 색상
    fontSize: 10, // 폰트 크기
    fontWeight: "normal", // 폰트 굵기
    lineHeight: 20, // 줄 간격
  }
})

export default DataManager;