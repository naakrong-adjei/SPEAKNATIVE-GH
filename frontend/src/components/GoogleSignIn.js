import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, View, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { useOAuth } from "@clerk/clerk-expo";
import { btnStyles } from "../components/Button";
import { COLORS } from "../constants/colors";


const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

const GoogleSignIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  useWarmUpBrowser();

  const onGoogleSignInPress = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL("/"),
      });

      if (createdSessionId) {
        await setActive({ session: createdSessionId });
      } else {
        setError("Google Sign-In incomplete. Please try again.");
      }
    } catch (err) {
      console.log("Error", err);
      setError("An error occurred during Google Sign-In.");
    } finally {
      setLoading(false);
    }
  }, [startOAuthFlow]);

  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      {error ? <Text style={{ color:"#D32F2F", fontSize: 14, textAlign: "center", marginBottom: 12 }}>{error}</Text> : null}

      <View style={{ width: "100%" }}>
        <TouchableOpacity
          style={[btnStyles.secBtn, loading && { opacity: 0.7 }]}
          onPress={onGoogleSignInPress}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.primaryGreen}/>
          ) : (
            <>
              <Image
                source={require("../assets/images/google.png")}
                style={{ width: 20, height: 20, marginRight: 8 }}
              />
              <Text style={btnStyles.secBtnText}>Continue with Google</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GoogleSignIn;