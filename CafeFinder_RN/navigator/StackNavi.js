import { createStackNavigator } from "@react-navigation/stack";
import Main from "../Screen/Main";
import Result from "../Screen/Result";
import MapScreen from "../Screen/MapScreen";
import AdminLogin from "../Screen/AdminLogin";
import DataManager from "../Screen/DataManager";
import MarkerDistanceScreen from "../Screen/MarkerDistanceScreen"
const Stack = createStackNavigator();

const StackNavi = () => {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{ headerShown: true }}
    >
      <Stack.Screen
        name="Main"
        component={Main}
        options={{
          title: "메인 화면",
          headerShown: true,
          headerStyle: { backgroundColor: "#9acd32" },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
            color: "white",
          },
        }}
      />
      <Stack.Screen
        name="Result"
        component={Result}
        options={{
          title: "검색 결과",
          headerShown: true,
          headerStyle: { backgroundColor: "#9acd32" },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
            color: "white",
          },
        }}
      />
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          title: "지도",
          headerShown: true,
          headerStyle: { backgroundColor: "#9acd32" },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
            color: "white",
          },
        }}
      />
      <Stack.Screen
        name="AdminLogin"
        component={AdminLogin}
        options={{
          title: "관리자로 로그인",
          headerShown: true,
          headerStyle: { backgroundColor: "#9acd32" },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
            color: "white",
          },
        }}
      />
      <Stack.Screen
        name="DataManager"
        component={DataManager}
        options={{
          title: "데이터 관리",
          headerShown: true,
          headerStyle: { backgroundColor: "#9acd32" },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
            color: "white",
          },
        }}
      />


<Stack.Screen
    name="MarkerDistance"
    component={MarkerDistanceScreen}
    options={({ route }) => ({
      title: 'Marker Distance',
      currentLocation: route.params.currentLocation,
      markerLocation: route.params.markerLocation,
    })}
  />
    </Stack.Navigator>
  );
};

export default StackNavi;
