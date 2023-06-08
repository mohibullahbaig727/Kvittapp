import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cards from "../screens/Cards";

import OpenBuys from "../screens/OpenBuys";
import OpenBuysDetails from "../screens/OpenBuysDetails";
import ReturnCreated from "../screens/ReturnCreated";
import Settings from "../screens/Settings";
import AddBankCard from "../screens/AddBankCard";
import ReturnOptionScreen from "../screens/ReturnOptionScreen";
import FoldersScreen from "../screens/Folders";
import ReceiptsInFolderScreen from "../screens/ReceiptsInFolder";

const Stack = createNativeStackNavigator();

export function OpenBuyStack() {
  return (
    <Stack.Navigator
      initialRouteName="OpenBuys"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="OpenBuys" component={OpenBuys} />
      <Stack.Screen name="ReturnCreated" component={ReturnCreated} />
      <Stack.Screen name="OpenBuysDetails" component={OpenBuysDetails} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="AddCards" component={AddBankCard} />
      <Stack.Screen name="Cards" component={Cards} />
      <Stack.Screen name="ReturnOptions" component={ReturnOptionScreen} />
      <Stack.Screen name="Folders" component={FoldersScreen} />
      <Stack.Screen
        name="ReceiptsInFolder"
        component={ReceiptsInFolderScreen}
      />
    </Stack.Navigator>
  );
}
