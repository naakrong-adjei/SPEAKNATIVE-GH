import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { authStyles } from "../../styles/authStyles";
import Button from "../../components/Button";
import { Ionicons } from "@expo/vector-icons";
import { useSignIn, useAuth } from "@clerk/clerk-expo";

import GoogleSignIn from "../../components/GoogleSignIn";

export default function LoginScreen({ navigation }) {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { isSignedIn } = useAuth();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const [generalError, setGeneralError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (isSignedIn) {
      navigation.replace("MainTabs");
    }
  }, [isSignedIn]);

  const handleSubmit = async () => {
    if (!isLoaded) return;

    setGeneralError("");
    setEmailError("");
    setPasswordError("");

    let valid = true;
    if (!emailAddress.includes("@")) {
      setEmailError("Enter a valid email address.");
      valid = false;
    }
    if (!password) {
      setPasswordError("Enter your password.");
      valid = false;
    }
    if (!valid) return;

    try {
      setLoading(true);

      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        navigation.replace("MainTabs");
      } else {
        console.log("Login status not complete:", result.status);
        setGeneralError("Additional verification required. Please contact support.");
      }

    } catch (err) {
      console.log("Login error:", err);
      if (err?.errors?.length) {
        setGeneralError(err.errors[0].longMessage || err.errors[0].message);
      } else {
        setGeneralError("Invalid email or password.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={authStyles.container}>
      <Text style={authStyles.title}>Welcome Back</Text>
      <Text style={authStyles.subtitle}>Login to continue</Text>

      {generalError ? <Text style={authStyles.errorText}>{generalError}</Text> : null}

      <Text style={authStyles.label}>Email</Text>
      <TextInput
        placeholder="Enter your email"
        style={authStyles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        value={emailAddress}
        onChangeText={(text) => {
          setEmailAddress(text);
          setEmailError("");
          setGeneralError("");
        }}
      />
      {emailError ? <Text style={authStyles.fieldError}>{emailError}</Text> : null}

      <View style={authStyles.passwordRow}>
        <Text style={authStyles.label}>Password</Text>
        <TouchableOpacity>
          <Text style={authStyles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <View style={[authStyles.passwordContainer, passwordFocused && authStyles.inputFocused]}>
        <TextInput
          placeholder="Enter your password"
          secureTextEntry={secureText}
          style={authStyles.passwordInput}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setPasswordError("");
            setGeneralError("");
          }}
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => setPasswordFocused(false)}
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          <Ionicons
            name={secureText ? "eye-off-outline" : "eye-outline"}
            size={22}
            color="#9E9E9E"
          />
        </TouchableOpacity>
      </View>
      {passwordError ? <Text style={authStyles.fieldError}>{passwordError}</Text> : null}

      <Button
        title={loading ? "Logging in..." : "Login"}
        onPress={handleSubmit}
      />

      <View style={authStyles.orContainer}>
        <View style={authStyles.line} />
        <Text style={authStyles.or}>or</Text>
        <View style={authStyles.line} />
      </View>

      <GoogleSignIn />

      <Text style={authStyles.signupText}>
        Don't have an account?{" "}
        <Text style={authStyles.signupLink} onPress={() => navigation.navigate("Signup")}>
          Sign Up
        </Text>
      </Text>
    </View>
  );
}