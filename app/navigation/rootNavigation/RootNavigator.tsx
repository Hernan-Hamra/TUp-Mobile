import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AuthStack from "../stackNavigation/AuthStack";
import MainStack from "../stackNavigation/MainStack";
import ManagementStack from "../stackNavigation/ManagementStack";
import OthersStack from "../stackNavigation/OtherStacks";
import TrainingStack from "../stackNavigation/TrainingStack";
import Layout from "../../_layout"; // Importa el Layout

const Tab = createBottomTabNavigator();

const RootNavigator = () => {
  const userIsAuthenticated = true; // Cambiar esto dependiendo de la lógica de autenticación

  return (
    <NavigationContainer>
      {userIsAuthenticated ? (
        <Layout>
          <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Main" component={MainStack} />
            <Tab.Screen name="Management" component={ManagementStack} />
            <Tab.Screen name="Others" component={OthersStack} />
            <Tab.Screen name="Training" component={TrainingStack} />
          </Tab.Navigator>
        </Layout>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default RootNavigator;
