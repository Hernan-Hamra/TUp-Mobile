// app/navigation/rootNavigation/RootNavigator.tsx

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; // O DrawerNavigator si prefieres un menú lateral
import AuthStack from "./stackNavigation/AuthStack"; // Stack de autenticación
import MainStack from "./stackNavigation/MainStack"; // Principal stack
import ManagementStack from "./stackNavigation/ManagementStack";
import OthersStack from "./stackNavigation/OtherStacks";
import TrainingStack from "./stackNavigation/TrainingStack";

// Crear el Tab Navigator
const Tab = createBottomTabNavigator();

const RootNavigator = () => {
  const userIsAuthenticated = false; // Cambiar esto dependiendo de la lógica de autenticación

  return (
    <NavigationContainer>
      {userIsAuthenticated ? (
        <Tab.Navigator>
          <Tab.Screen name="Main" component={MainStack} />
          <Tab.Screen name="Management" component={ManagementStack} />
          <Tab.Screen name="Others" component={OthersStack} />
          <Tab.Screen name="Training" component={TrainingStack} />
        </Tab.Navigator>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default RootNavigator;
