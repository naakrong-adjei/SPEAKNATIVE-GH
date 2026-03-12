import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import AuthRoute from "./AuthRoute";
import AppRoute from "./AppRoute";
import OnboardingRoute from "./OnboardingRoute";

export default function RootNavigator() {
  const { isSignedIn, isLoaded: authLoaded } = useAuth();
  const { user, isLoaded: userLoaded } = useUser();


  if (!authLoaded || (isSignedIn && !userLoaded)) {
    return null;
  }

  const needsOnboarding = isSignedIn && !user?.unsafeMetadata?.language;

  return (
    <NavigationContainer>
      {isSignedIn ? (
        needsOnboarding ? (
          <OnboardingRoute />
        ) : (
          <AppRoute />
        )
      ) : (
        <AuthRoute />
      )}
    </NavigationContainer>
  );
}
