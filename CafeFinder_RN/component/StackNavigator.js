//일단 스택 네비게이터 사용해야되서 여기에다가 올려둘테니까 알아서 추가 ㄱㄱ

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AdminLogin from './AdminLogin';

const Stack = createStackNavigator();



const StackNavigator = () =>{
  return(
      <Stack.Navigator>
        <Stack.Screen name="AdminLogin" component={AdminLogin} options={{ headerShown: false }} />
      </Stack.Navigator>
  )
}

export default StackNavigator