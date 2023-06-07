// TEST입니다 TEST에요~~
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native"
import StackNavi from './navigator/StackNavi'

export default function App() {
  return (
    <NavigationContainer>
      <StackNavi />
    </NavigationContainer>
  );
}