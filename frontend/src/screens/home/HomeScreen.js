// screens/HomeScreen.js
import React from "react";
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";

import Header from "../../components/Header";
import Button from "../../components/Button";
import LessonCard from "../../components/LessonCard";
import { LESSONS } from "../../data/lessonsData";
import { COLORS } from "../../constants/colors";

export default function HomeScreen() {
  const { user } = useUser();

  const name = user?.firstName || "Learner";
  const language = user?.unsafeMetadata?.language || "Akan (Asante Twi)";
  const level = user?.unsafeMetadata?.level || "beginner";


  const formattedLevel = level.charAt(0).toUpperCase() + level.slice(1);

  return (
    <View style={styles.container}>
      <Header
        title={`Hello ${name},`}
        subtitle="Ready to Learn?"
        language={language}
        points={120}
        hearts={5}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.progressCard}>
          <View style={styles.progressTop}>
            <View style={styles.iconCircle}>
              <Ionicons name="leaf-outline" size={26} color="#2E7D32" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.levelText}>{formattedLevel}</Text>

              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: "5%" }]} />
              </View>

              <Text style={styles.progressStats}>2/14 Lessons completed</Text>
            </View>
          </View>
        </View>


        <Button
          title="Start Learning"
          onPress={() => {}}
          style={styles.startBtn}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Preview Lessons</Text>
          <TouchableOpacity hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.lessonList}>
          {LESSONS.map((lesson, index) => (
            <LessonCard
              key={lesson.id || index}
              number={lesson.number}
              title={lesson.title}
              subtitle={lesson.subtitle}
              isLocked={lesson.isLocked}
              subLessons={lesson.subLessons}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 90
  },
  progressCard: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.divider,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  progressTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.divider,
    alignItems: "center",
    justifyContent: "center",
  },
  levelText: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.textPrimary,
    letterSpacing: -0.5
  },
  progressBarBg: {
    height: 8,
    backgroundColor: COLORS.divider,
    borderRadius: 5,
    marginVertical: 10,
    overflow: 'hidden'
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: COLORS.primaryGreen,
    borderRadius: 5
  },
  progressStats: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: "500"
  },
  startBtn: {
    marginBottom: 8
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 32,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: COLORS.textPrimary,
    letterSpacing: -0.5
  },
  viewAll: {
    color: "#2D7D32",
    fontWeight: "500",
    fontSize: 15,
    textDecorationLine: "underline"
  },
  lessonList: {
    gap: 4
  }
});