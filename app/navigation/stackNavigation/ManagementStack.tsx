// src/navigation/stackNavigation/ManagementStack.tsx

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CreateExercise from "../screens/management/create-exercise";
import CreatePlan from "../screens/management/create-plan";
import EditPlan from "../screens/management/edit-plan";

const Stack = createStackNavigator();

const ManagementStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CreateExercise" component={CreateExercise} />
      <Stack.Screen name="CreatePlan" component={CreatePlan} />
      <Stack.Screen name="EditPlan" component={EditPlan} />
    </Stack.Navigator>
  );
};

export default ManagementStack;
