import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";

export default function LessonCard({ number, title, subtitle, isLocked, subLessons }) {
  return (
    <View style={styles.lessonCard}>
      <View style={styles.lessonHeader}>
        {/* Lesson Number Indicator */}
        <View style={[ 
          styles.lessonNumber, 
          { backgroundColor: isLocked ? COLORS.divider : COLORS.primaryGreen } 
        ]}>
          <Text style={[ 
            styles.lessonNumberText, 
            { color: isLocked ? COLORS.grayLight : COLORS.white } 
          ]}>
            {number}
          </Text>
        </View>

        {/* Title Section with Fixed Width Logic */}
        <View style={styles.lessonInfo}>
          <Text 
            style={styles.lessonTitle} 
            numberOfLines={1} 
            ellipsizeMode="tail"
          >
            {title}
          </Text>
          <Text style={styles.lessonSubtitle}>{subtitle}</Text>
        </View>

        {/* Status Icon (Far Right) */}
        <View style={styles.statusIcon}>
          <Ionicons
            name={isLocked ? "lock-closed" : "book-outline"}
            size={20}
            color={isLocked ? COLORS.grayLight : COLORS.primaryGreen}
          />
        </View>
      </View>

      {/* Sub-lessons and Quiz Pills */}
      <View style={styles.subLessonContainer}>
        {subLessons.map((item, index) => {
          const isQuiz = item === "quiz";
          
          return (
            <View key={index} style={styles.pill}>
              <Ionicons
                name={isLocked ? "lock-closed" : "play-circle"}
                size={12}
                color={isLocked ? COLORS.grayLight : COLORS.textSecondary}
              />
              
              {isQuiz && (
                <Ionicons
                  name="document-text"
                  size={12}
                  color={isLocked ? COLORS.grayLight : COLORS.textSecondary}
                />
              )}


              

              {!isQuiz && (
                <Text style={styles.pillText}>
                  {item}
                </Text>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  lessonCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.background, // Using background color as a subtle border
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  lessonHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  lessonNumber: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  lessonNumberText: {
    fontWeight: "800",
    fontSize: 18,
  },
  lessonInfo: {
    flex: 1,
    paddingHorizontal: 12,
    // maxWidth ensures title truncates before hitting the right-side icon
    maxWidth: '85%', 
  },
  lessonTitle: {
    fontWeight: "700",
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  lessonSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  statusIcon: {
    width: 30,
    alignItems: "flex-end",
  },
  subLessonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.background,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 5, // Tightened gap for the dual-icon look
  },
  pillText: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.textSecondary,
  },
});