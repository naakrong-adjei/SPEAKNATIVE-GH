import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

export default function Button({ title, onPress, style, textStyle }) {
  return (
    <TouchableOpacity style={[btnStyles.button, style]} onPress={onPress}>
      <Text style={[btnStyles.btnText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

export const btnStyles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primaryGreen,
    paddingVertical: 12,
    borderRadius: 8,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
  secBtn:{
    flexDirection:"row",
    borderWidth:1,
    borderColor:COLORS.primaryGreen,
    paddingVertical: 12,
    borderRadius: 8,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:COLORS.white,
  },
  secBtnText: {
    color: COLORS.primaryGreen,
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
});