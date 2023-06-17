import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import StackNavi from './navigator/StackNavi'

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StackNavi />
    </NavigationContainer>
  )
}

export default App;
