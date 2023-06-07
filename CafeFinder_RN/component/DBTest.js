import { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { db } from "../DB/FireBase";

const DBTest = () => {
  const [addName, setAddName] = useState("");
  const [addAge, setAddAge] = useState("");
  const [id, setID] = useState("");
  const [users, setUsers] = useState();

  const addtoDB = async () => {
    try {
      await db.collection("CafeFinder").doc().set({
        Name: addName,
        Age: addAge,
        createdAt: new Date(),
      });
      alert("Added");
      setAddName("");
      setAddAge("");
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
          tempArray.push({ ...doc.data(), id: doc.id });
        });
        setUsers(tempArray);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateDB = async () => {
    try {
      db.collection("CafeFinder")
        .doc(id)
        .update({
          Name: addName,
          Age: addAge,
        })
        .then(() => {
          alert("UPDATED!!");
          readfromDB();
        });
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteDB = async () => {
    db.collection("CafeFinder")
      .doc(id)
      .delete()
      .then(() => {
        alert("Deleted");
        readfromDB;
      });
  };

  return (
    <View>
      <TextInput placeholder="name" value={addName} onChangeText={setAddName} />
      <TextInput placeholder="age" value={addAge} onChangeText={setAddAge} />
      <Button title="Create" onPress={addtoDB} />
      <Button title="Read" onPress={readfromDB} />
      {users?.map((row, idx) => {
        return (
          <>
            <Text> User - {idx}</Text>
            <Text> {row.id} </Text>
            <Text> {row.Name} </Text>
            <Text> {row.Age} </Text>
          </>
        );
      })}
      <Button title="Update" onPress={updateDB} />
      <TextInput placeholder="Doc ID" value={id} onChangeText={setID} />
      <TextInput placeholder="name" value={addName} onChangeText={setAddName} />
      <TextInput placeholder="Age" value={addAge} onChangeText={setAddAge} />

      <Button title="Delete" onPress={deleteDB} />
      <TextInput placeholder="Delete Doc ID" value={id} onChangeText={setID} />
    </View>
  );
};

export default DBTest;
