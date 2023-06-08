import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabScreen from "../screens/Home";

const Stack = createNativeStackNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={TabScreen} />
    </Stack.Navigator>
  );
}
