import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Header({
  title,
  subtitle,
  language,
  points,
  hearts,
}) {
  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="menu-outline" size={28} color="#1A1A1A" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.languageBadge}>
          <Text style={styles.languageText}>{language}</Text>
          <Ionicons
            name="chevron-down"
            size={16}
            color="#1A1A1A"
            style={{ marginLeft: 4 }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.titleRow}>
        <View>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.subTitle}>{subtitle}</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Ionicons name="flash" size={24} color="#FFD580" />
            <Text style={styles.statValue}>{points}</Text>
          </View>

          <View style={styles.statItem}>
            <Ionicons name="heart" size={24} color="#D32F2F" />
            <Text style={styles.statValue}>{hearts}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom:-16,
    paddingTop: 8,
    backgroundColor: COLORS.white,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  iconButton: {
    width: 48,
    height: 48,
    backgroundColor: COLORS.background,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  languageBadge: {
    flexDirection: "row",
    backgroundColor: COLORS.background,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  languageText: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: "600",
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  subTitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
    gap: 4,
  },
  statValue: {
    fontWeight: "600",
    fontSize: 20,
    color: COLORS.textPrimary,
  },
});