import { View, Text, StyleSheet, Image} from 'react-native'
import React, { useEffect } from 'react'

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Onboarding");
    }, 5000);
    return () => clearTimeout(timer);
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
      <Text style={styles.title}>SpeakNative Gh</Text>
      <Image source={require("../../assets/images/flag-icon.png")} style={styles.logo} />
      </View>
      <Text style={styles.subTitle}>“Learn Ghanaian Languages with Confidence”</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#2E7D32",
  },
  logo: {
    width: 24,
    height: 24,
    top:4,
  },
  titleBox: {
    flexDirection: "row",
    gap:4,
  },
  title: {
    fontSize: 32,
    color: "#FFFFFF",
    fontWeight: "700",
    marginBottom: 4,
  },
  subTitle: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight:"300",
  }
});