import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LanguageSelectionScreen from "../screens/onboarding/LanguageSelectionScreen";
import LevelSelectionScreen from "../screens/onboarding/LevelSelectionScreen";
import GoalSelectionScreen from "../screens/onboarding/GoalSelectionScreen";

const Stack = createNativeStackNavigator();

export default function OnboardingRoute() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LanguageSelection" component={LanguageSelectionScreen} />
      <Stack.Screen name="LevelSelection" component={LevelSelectionScreen} />
      <Stack.Screen name="GoalSelection" component={GoalSelectionScreen} />
    </Stack.Navigator>
  );
}