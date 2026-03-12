import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { authStyles } from "../../styles/authStyles";
import Button from "../../components/Button";
import { Ionicons } from "@expo/vector-icons";
import { useSignUp, useSignIn } from "@clerk/clerk-expo";

import GoogleSignIn from "../../components/GoogleSignIn";
import Verification from "../../components/Verification";

export default function SignupScreen({ navigation }) {
  const { signUp, isLoaded: signUpLoaded } = useSignUp();
  const { signIn, isLoaded: signInLoaded } = useSignIn();

  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const [generalError, setGeneralError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [loading, setLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);


  const [signupPassword, setSignupPassword] = useState("");


  const handleSubmit = async () => {
    if (!signUpLoaded) return;

    setGeneralError("");
    setNameError("");
    setEmailError("");
    setPasswordError("");

    let valid = true;
    if (!fullName.trim()) { setNameError("Please enter your full name."); valid = false; }
    if (!emailAddress.includes("@")) { setEmailError("Please enter a valid email address."); valid = false; }
    if (password.length < 6) { setPasswordError("Password must be at least 6 characters."); valid = false; }
    if (!valid) return;

    try {
      setLoading(true);

      const [firstName, ...rest] = fullName.trim().split(" ");
      const lastName = rest.join(" ");

      await signUp.create({ emailAddress, password, firstName, lastName });

      
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setSignupPassword(password);
      setPendingVerification(true);

    } catch (err) {
      console.log("Signup error:", err);
      if (err?.errors?.length) {
        setGeneralError(err.errors[0].longMessage || err.errors[0].message);
      } else {
        setGeneralError("Something went wrong creating your account.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCloseVerification = () => {
    setPendingVerification(false);
  };

  return (
    <View style={authStyles.container}>
      <Text style={authStyles.title}>Create an Account</Text>
      <Text style={authStyles.subtitle}>Start learning Ghanaian languages today</Text>

      {generalError ? <Text style={authStyles.errorText}>{generalError}</Text> : null}

      <Text style={authStyles.label}>Full Name</Text>
      <TextInput
        placeholder="Enter your name"
        style={authStyles.input}
        value={fullName}
        onChangeText={(text) => { setFullName(text); setNameError(""); setGeneralError(""); }}
      />
      {nameError ? <Text style={authStyles.fieldError}>{nameError}</Text> : null}

      <Text style={authStyles.label}>Email</Text>
      <TextInput
        placeholder="Enter your email"
        style={authStyles.input}
        autoCapitalize="none"
        value={emailAddress}
        onChangeText={(text) => { setEmailAddress(text); setEmailError(""); setGeneralError(""); }}
      />
      {emailError ? <Text style={authStyles.fieldError}>{emailError}</Text> : null}

      <Text style={authStyles.label}>Password</Text>
      <View style={[authStyles.passwordContainer, passwordFocused && authStyles.inputFocused]}>
        <TextInput
          placeholder="Enter your password"
          secureTextEntry={secureText}
          style={authStyles.passwordInput}
          value={password}
          onChangeText={(text) => { setPassword(text); setPasswordError(""); setGeneralError(""); }}
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
        title={loading ? "Creating account..." : "Sign Up"}
        onPress={handleSubmit}
      />

      <View style={authStyles.orContainer}>
        <View style={authStyles.line}/>
        <Text style={authStyles.or}>or</Text>
        <View style={authStyles.line}/>
      </View>

      <GoogleSignIn />

      <Text style={authStyles.signupText}>
        Already have an account?{" "}
        <Text style={authStyles.signupLink} onPress={() => navigation.navigate("Login")}>
          Login
        </Text>
      </Text>

      {pendingVerification && (
        <Verification
          signUp={signUp}
          setLoading={setLoading}
          navigation={navigation}
          onClose={handleCloseVerification}
        />
      )}
    </View>
  );
}