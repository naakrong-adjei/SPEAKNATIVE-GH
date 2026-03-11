import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "@clerk/expo";
import AuthRoute from "./AuthRoute";
import AppRoute from "./AppRoute";

export default function RootNavigator() {
  const { isSignedIn } = useAuth();


  return (
    <NavigationContainer>
      {isSignedIn ? <AppRoute /> : <AuthRoute />}
    </NavigationContainer>
  );
}