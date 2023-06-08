import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FoldersScreen from "../screens/Folders";
import ReceiptsInFolderScreen from "../screens/ReceiptsInFolder";

const Stack = createNativeStackNavigator();

export function FoldersStack() {
  return (
    <Stack.Navigator
      initialRouteName="Folders"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Folders" component={FoldersScreen} />
      <Stack.Screen
        name="ReceiptsInFolder"
        component={ReceiptsInFolderScreen}
      />

    </Stack.Navigator>
  );
}
