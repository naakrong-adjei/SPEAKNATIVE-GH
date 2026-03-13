import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home/HomeScreen";
import LessonsScreen from "../screens/lessons/LessonsScreen";
import PracticeScreen from "../screens/practice/PracticeScreen";
import ProgressScreen from "../screens/progress/ProgressScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";
import { Platform } from "react-native";

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primaryGreen,
        tabBarInactiveTintColor: COLORS.grayLight,
        
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopWidth: 1,
          borderTopColor: COLORS.background,
          height: Platform.OS === 'ios' ? 90 : 70,
          paddingBottom: Platform.OS === 'ios' ? 40 : 20,
          paddingTop: 10,
          elevation: 1,
          shadowOpacity: 0.02,
        },

        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: "600",
        },

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Lessons") {
            iconName = focused ? "book" : "book-outline";
          } else if (route.name === "Practice") {
            iconName = focused ? "school" : "school-outline";
          } else if (route.name === "Progress") {
            iconName = focused ? "stats-chart" : "stats-chart-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: "Home" }}
      />
      <Tab.Screen
        name="Lessons"
        component={LessonsScreen}
        options={{ tabBarLabel: "Lessons" }}
      />
      <Tab.Screen
        name="Practice"
        component={PracticeScreen}
        options={{ tabBarLabel: "Practice" }}
      />
      <Tab.Screen
        name="Progress"
        component={ProgressScreen}
        options={{ tabBarLabel: "Progress" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: "Profile" }}
      />
    </Tab.Navigator>
  );
}