import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@clerk/clerk-expo";
import { COLORS } from "../../constants/colors";
import Button from "../../components/Button";
import { GOALS } from "../../data/goalsData";
import ProgressBar from "../../components/ProgressBar";


export default function GoalSelectionScreen({ navigation, route }) {
  const { user } = useUser();
  
  const { language, level } = route.params || { language: "Twi", level: "Beginner" };
  
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFinish = async () => {
    if (!selectedGoal || !user) return;

    try {
      setLoading(true);

      await user.update({
        unsafeMetadata: {
          language: language,
          level: level,
          dailyGoal: selectedGoal,
          onboardingCompleted: true,
        },
      });

      
    } catch (error) {
      console.error("Error saving onboarding data:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <ProgressBar
          progress={100}
          showBack={true}
          navigation={navigation}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Set your daily goal</Text>
        <Text style={styles.subtitle}>
          How much time do you want to spend learning each day?
        </Text>

        <FlatList
          data={GOALS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.goalCard,
                selectedGoal === item.id && styles.selectedCard,
              ]}
              onPress={() => setSelectedGoal(item.id)}
              disabled={loading}
            >
              <Ionicons
                name={item.icon}
                size={24}
                color={selectedGoal === item.id ? COLORS.primaryGreen : COLORS.textSecondary}
              />
              <View style={styles.textContainer}>
                <Text style={[styles.goalTitle, selectedGoal === item.id && styles.selectedText]}>
                  {item.title}
                </Text>
              </View>
              <Text style={styles.timeText}>{item.time}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.footer}>
        <Button
          title={loading ? <ActivityIndicator color="#fff" /> : "Finish"}
          onPress={handleFinish}
          disabled={!selectedGoal || loading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: 60,
  },
  headerContainer: {
    paddingHorizontal: 25,
  },
  content: {
    flex: 1,
    paddingHorizontal: 25
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.textPrimary,
    marginBottom: 4
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 24
  },
  goalCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"center",
    paddingHorizontal: 20,
    paddingVertical:25,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.divider,
    borderRadius: 8,
    marginBottom: 16,
    
  },
  selectedCard: {
    borderColor: COLORS.primaryGreen,
    backgroundColor: COLORS.activeGreenBg,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 15
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textPrimary
  },
  selectedText: {
    color: COLORS.primaryGreen
  },
  timeText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.textSecondary
  },
  footer: {
    paddingHorizontal: 25,
    paddingBottom: 50
  },
});