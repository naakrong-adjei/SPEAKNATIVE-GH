import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import Button from "./Button";
import { COLORS } from "../constants/colors";


const BlinkingCaret = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return <Animated.View style={[styles.caret, { opacity: fadeAnim }]} />;
};

export default function Verification({ signUp, setLoading, onClose }) {
  const { isLoaded, setActive } = useSignUp();
  
  const [otp, setOtp] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState("");
  const [otpError, setOtpError] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);

  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const inputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 500);
    return () => clearTimeout(timer);
  }, []);

  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, { toValue: 10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]).start();
  };

  const handleChange = (text) => {
    const clean = text.replace(/\D/g, "").slice(0, 6);
    setOtp(clean);
    setError("");
    setOtpError(false);

    if (clean.length === 6) {
      handleVerify(clean);
    }
  };

  const handleVerify = async (manualCode) => {
    if (!isLoaded) return;
    
    const code = manualCode || otp;
    if (code.length !== 6) {
      setError("Enter the 6-digit code.");
      setOtpError(true);
      triggerShake();
      return;
    }

    try {
      setVerifying(true);
      setLoading(true);
      
      const result = await signUp.attemptEmailAddressVerification({ code });
      
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        onClose();
      }
      ;
    } catch (err) {
      console.log("Verification error:", err);
      
      if (err.errors?.[0]?.code === "already_signed_in" || err.message?.includes("signed in")) {
        onClose();
        return;
      }

      setError(err.errors?.[0]?.message || "Invalid or expired code.");
      setOtpError(true);
      triggerShake();
    } finally {
      setVerifying(false);
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setResending(true);
      setLoading(true);
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setOtp("");
      setError("");
      setOtpError(false);
    } catch (err) {
      console.log("Resend error:", err);
      if (err.message?.includes("signed in")) {
        setError("You are already verified. Please log in.");
      } else {
        setError("Failed to resend code.");
      }
    } finally {
      setResending(false);
      setLoading(false);
    }
  };

  const displayBoxes = Array(6).fill("");

  return (
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <Ionicons name="close" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.title}>Verify Email</Text>
        <Text style={styles.subtitle}>Enter the 6-digit code sent to your email</Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          activeOpacity={1}
          onPress={() => inputRef.current?.focus()}
        >
          <Animated.View style={[styles.otpContainer, { transform: [{ translateX: shakeAnimation }] }]}>
            {displayBoxes.map((_, index) => {
              const isCurrent = index === otp.length;
              const digit = otp[index] || "";

              return (
                <View
                  key={index}
                  style={[
                    styles.otpBox,
                    otpError && styles.otpError,
                    !otpError && isCurrent && isFocused && styles.activeOtpBox,
                  ]}
                >
                  <Text style={styles.otpText}>{digit}</Text>
                  {isCurrent && isFocused && <BlinkingCaret />}
                </View>
              );
            })}
          </Animated.View>
        </TouchableOpacity>

        <TextInput
          ref={inputRef}
          value={otp}
          onChangeText={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          keyboardType="number-pad"
          maxLength={6}
          textContentType="oneTimeCode"
          autoComplete="sms-otp"
          caretHidden={true}
          style={styles.hiddenInput}
        />

        <Button
          title={verifying ? "Verifying..." : "Verify Email"}
          onPress={() => handleVerify()}
          disabled={verifying}
        />

        <TouchableOpacity
          style={styles.resendContainer}
          onPress={handleResend}
          disabled={resending || verifying}
        >
          <Text style={styles.resendText}>
            {resending ? "Resending..." : "Didn't receive a code? Resend"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },
  modal: {
    width: "90%",
    backgroundColor: COLORS.white,
    padding: 30,
    borderRadius: 8,
    elevation: 10
  },
  closeBtn: {
    position: "absolute",
    top: 10,
    right: 10
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 5
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: 20
  },
  errorText: {
    color: COLORS.error,
    textAlign: "center",
    marginBottom: 10,
    fontSize: 13
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 25
  },
  otpBox: {
    width: 45,
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.divider,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    position: 'relative',
    backgroundColor: COLORS.white,
  },
  activeOtpBox: {
    borderColor: COLORS.softGold,
    borderWidth: 2
  },
  otpError: {
    borderColor: COLORS.error
  },
  otpText: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textPrimary
  },
  hiddenInput: {
    position: "absolute",
    width: "100%",
    height: 50,
    opacity: 0,
    zIndex: -1
  },
  resendContainer: {
    marginTop: 15,
    alignSelf: "center"
  },
  resendText: {
    color: COLORS.primaryGreen,
    fontWeight: "500"
  },
  caret: {
    position: 'absolute',
    width: 2,
    height: 20,
    backgroundColor: COLORS.softGold,
  }
});