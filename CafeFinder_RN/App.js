import { NavigationContainer } from '@react-navigation/native';
import StackNavi from "./navigator/StackNavi";

export default function App() {
  return (
    <NavigationContainer>
      <StackNavi/>
    </NavigationContainer>
  );
}