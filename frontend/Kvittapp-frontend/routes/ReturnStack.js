import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Returns from "../screens/Returns";
import ReturnDetails from "../screens/ReturnDetails";

const Stack = createNativeStackNavigator();

export function ReturnStack() {
  return (
    <Stack.Navigator
      initialRouteName="Returns"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Returns" component={Returns} />
      <Stack.Screen name="ReturnDetails" component={ReturnDetails} />
    </Stack.Navigator>
  );
}
