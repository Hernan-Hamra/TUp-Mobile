// src/navigation/stackNavigation/TrainingStack.tsx

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DailyTraining from "../../screens/training/daily-training";
import PlanDetails from "../../screens/training/plan-details";
import ExercisesDetails from "../../screens/training/exercises-details";

const Stack = createStackNavigator();

const TrainingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="DailyTraining" component={DailyTraining} />
      <Stack.Screen name="PlanDetails" component={PlanDetails} />
      <Stack.Screen name="ExercisesDetails" component={ExercisesDetails} />
    </Stack.Navigator>
  );
};

export default TrainingStack;
