// 오류나는부분 -> 검색창 asyncstorage 계속 뜸 수정하라는대로 다 수정했는데도 안돼..
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SearchScreen from "./Screen/searchScreen";
import Result from "./Screen/Result";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={SearchScreen} />
        <Stack.Screen name="Result" component={Result} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
