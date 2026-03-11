import { StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

export const authStyles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal:25,
    justifyContent:"center",
    backgroundColor:COLORS.white,
  },

  title:{
    fontSize:28,
    fontWeight:"700",
    marginBottom:2
  },

  subtitle:{
    fontSize:16,
    color:COLORS.textSecondary,
    marginBottom:30
  },

  label:{
    fontSize:14,
    fontWeight:"500",
    marginBottom:8,
    color: COLORS.textPrimary,
  },

  input:{
    borderWidth:1,
    borderColor:COLORS.divider,
    borderRadius:12,
    height:50,
    paddingHorizontal:15,
    marginBottom:15,
  },
  passwordRow:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  },

  forgot:{
    color:COLORS.primaryGreen,
    fontSize:13,
    fontWeight:500,
  },

  passwordContainer:{
    flexDirection:"row",
    alignItems:"center",
    borderWidth:1,
    borderColor:COLORS.divider,
    borderRadius:10,
    height:50,
    paddingHorizontal:15,
    marginBottom:16
  },

  passwordInput:{
    flex:1,
    borderWidth:0,
    outlineStyle:"none"
  },

  orContainer:{
    flexDirection:"row",
    alignItems:"center",
    marginVertical:25
  },

  line:{
    flex:1,
    height:1.1,
    backgroundColor:COLORS.divider,
  },

  or:{
    marginHorizontal:32,
    color:COLORS.grayLight,
    marginTop:16,
    marginBottom:16,
  },

  signupText: {
    color: COLORS.textSecondary,
    fontSize: 16,
    textAlign:"center",
    paddingTop:32
  },
  signupLink: {
    color: COLORS.primaryGreen,
    fontWeight: '500',
  },

  errorText: {
    color: COLORS.error,
    fontSize: 14,
    fontWeight:400,
    marginTop: 8,
    marginBottom: 8,
    textAlign: "center"
  }
});