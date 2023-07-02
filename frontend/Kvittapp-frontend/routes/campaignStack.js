import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabScreen from "../screens/Home";
import CampaignScreen from "../screens/CampaignScreen";

const Stack = createNativeStackNavigator();

export function CampaignStack() {
  return (
    <Stack.Navigator
      initialRouteName="Campaign"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={CampaignScreen} />
    </Stack.Navigator>
  );
}
