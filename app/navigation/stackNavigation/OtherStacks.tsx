// src/navigation/stackNavigation/OthersStack.tsx

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Notification from "../../screens/others/Notification";
import Settings from "../../screens/others/Settings";
import Progress from "../../screens/others/Progress";

const Stack = createStackNavigator();

const OthersStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Progress" component={Progress} />
    </Stack.Navigator>
  );
};

export default OthersStack;
