// TEST입니다 TEST에요~
import {StyleSheet,
  ScrollView,
  Button,
  View,
  Text,
  TextInput
  } from 'react-native'

import {useState} from 'react'

export default function App() {
  const [myTextInput, setmyTextInput] = useState ("")
  const [alphabet,setalphabet] = useState ([
    'a','b','c','d'
  ])
  const onChangeInput = (event) => {
    setmyTextInput(event)
  }
  const onAddTextInput = () => {
    setalphabet([...alphabet,myTextInput])
    setmyTextInput("") // ADD TEXT LIST 하면 textfield가 ""으로됨
}

return(
  <View>
    <TextInput
      style = {styles.input}
      value = {myTextInput}
      onChangeText = {onChangeInput}
      multiline = {true}
    />
    <Button
      title = "ADD TEXT LIST"
      onPress = {onAddTextInput}>
    </Button>
    <ScrollView>
    {
      alphabet.map((item,idx) =>
        
          <Text
            style = {styles.mainText}
          > {item}</Text>
        
      )
    }
    </ScrollView>
  </View>
)}

const styles = StyleSheet.create({
  input:{
    width:"100%",
    backgroundColor:"gray",
    fontSize:25,
    padding:10,
    color:"white"
  },
  mainText:{
    fontSize:20,
    padding:10,
    margin:10,
    backgroundColor:"green"
  }
})