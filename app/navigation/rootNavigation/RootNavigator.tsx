import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../../screens/auth/Login";
import ForgotPass from "../../screens/auth/ForgotPass";
import Register from "../../screens/auth/Register";
import Tabs from "../Tabs"; // Importamos las pestañas

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      {/* Navegación de autenticación */}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPass" component={ForgotPass} />
      <Stack.Screen name="Register" component={Register} />

      {/* Navegación principal (pestañas) */}
      <Stack.Screen name="Main" component={Tabs} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
