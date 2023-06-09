import { createStackNavigator } from '@react-navigation/stack'
import Main from '../Screen/Main'
import MapScreen from '../Screen/MapScreen';
import Result from '../Screen/Result';

const Stack = createStackNavigator();


const StackNavi = () => {
    return (
        <Stack.Navigator
            initialRouteName='Main'
            screenOptions={{ headerShown: true }}
        >
             <Stack.Screen name="Main" component={Main}
                options={{
                    title: '메인 화면',
                    headerShown: true,
                    headerStyle: { backgroundColor: '#9acd32' },
                    headerTintColor: 'white',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        color: 'white'
                    }
                }}
            />
            <Stack.Screen name="MapScreen" component={MapScreen}
                options={{
                    title: '지도',
                    headerShown: true,
                    headerStyle: { backgroundColor: '#9acd32' },
                    headerTintColor: 'white',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        color: 'white'
                    }
                }}
            />
            <Stack.Screen name="Result" component={Result} />
        </Stack.Navigator>
    )
}

export default StackNavi