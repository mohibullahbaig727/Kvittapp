import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cards from "../screens/Cards";
import Kvitton from "../screens/Kvitton";
import KvittoDetails from "../screens/KvittoDetails";
import TransactionDetails from "../screens/TransactionDetails";
import StoreDetails from "../screens/StoreDetails";
import LoginScreen from "../screens/Login";
import ChooseProducts from "../screens/ChooseProducts";

const Stack = createNativeStackNavigator();

export function KvittonStack() {
  return (
    <Stack.Navigator
      initialRouteName="Kvitton"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Kvitton" component={Kvitton} />
      <Stack.Screen name="StoreDetails" component={StoreDetails} />
      <Stack.Screen name="TransactionDetails" component={TransactionDetails} />
      <Stack.Screen name="KvittoDetails" component={KvittoDetails} />
      <Stack.Screen name="ChooseProducts" component={ChooseProducts} />
    </Stack.Navigator>
  );
}
