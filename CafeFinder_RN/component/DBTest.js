import { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { db } from "../DB/FireBase";

const DBTest = () => {
  const [addName, setAddName] = useState("");
  const [addPrice, setAddPrice] = useState("");
  const [addBrand, setAddBrand] = useState("");
  const [users, setUsers] = useState("");

  const addtoDB = async () => {
    try {
      await db.collection("CafeFinder").doc();
      set({
        addName: addName,
        addPrice: addPrice,
        addBrand: addBrand,
        createdAt: new Date(),
      });

      alert("Added!!");
      setAddName("");
      setAddPrice("");
      setAddBrand("");
    } catch (error) {
      console.log(error.message);
    }
  };

  const readfromDB = async () => {
    try {
      const data = await db.collection("CafeFinder");
      let tempArray = [];
      data.get().then((snap) => {
        snap.forEach((doc) => {
          tempArray.push({ ...doc.data(), addName: doc.addName });
        });
        setAddName(tempArray);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={{ marginTop: 50 }}>
      <TextInput>
        placeholder='name' value={addName}
        onChangeText={setAddName}
      </TextInput>
      <TextInput>
        placeholder='Price' value={addPrice}
        onChangeText={setAddPrice}
      </TextInput>
      <TextInput>
        placeholder='brand' value={addBrand}
        onChangeText={setAddBrand}
      </TextInput>
    </View>
  );
};
export default DBTest;
