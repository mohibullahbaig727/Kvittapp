import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabScreen from "../screens/Home";
import ReturnCreated from "../screens/ReturnCreated";
import OpenBuysDetails from "../screens/OpenBuysDetails";
import Settings from "../screens/Settings";
import AddBankCard from "../screens/AddBankCard";
import Cards from "../screens/Cards";
import ReturnOptionScreen from "../screens/ReturnOptionScreen";
import FoldersScreen from "../screens/Folders";
import ReceiptsInFolderScreen from "../screens/ReceiptsInFolder";
import ReturnDetails from "../screens/ReturnDetails";
import StoreDetails from "../screens/StoreDetails";
import TransactionDetails from "../screens/TransactionDetails";
import KvittoDetails from "../screens/KvittoDetails";
import ChooseProducts from "../screens/ChooseProducts";

const Stack = createNativeStackNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={TabScreen} />
      <Stack.Screen name="ReturnCreated" component={ReturnCreated} />
      <Stack.Screen name="OpenBuysDetails" component={OpenBuysDetails} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="AddCards" component={AddBankCard} />
      <Stack.Screen name="Cards" component={Cards} />
      <Stack.Screen name="ReturnOptions" component={ReturnOptionScreen} />
      <Stack.Screen name="Folders" component={FoldersScreen} />
      <Stack.Screen name="ReceiptsInFolder" component={ReceiptsInFolderScreen} />
      <Stack.Screen name="ReturnDetails" component={ReturnDetails} />
      <Stack.Screen name="StoreDetails" component={StoreDetails} />
      <Stack.Screen name="TransactionDetails" component={TransactionDetails} />
      <Stack.Screen name="KvittoDetails" component={KvittoDetails} />
      <Stack.Screen name="ChooseProducts" component={ChooseProducts} />
    </Stack.Navigator>
  );
}
