import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import Button from "../../components/Button";
import { LEVELS } from "../../data/levelsData";
import ProgressBar from "../../components/ProgressBar";

export default function LevelSelectionScreen({ navigation, route }) {
  const { language } = route.params || { language: "Unknown" };
  const [selectedLevel, setSelectedLevel] = useState(null);

  const handleNext = () => {
    if (selectedLevel) {
      navigation.navigate("GoalSelection", {
        language: language,
        level: selectedLevel,
      });
    }
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedLevel === item.id;

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.levelCard, isSelected && styles.selectedCard]}
        onPress={() => setSelectedLevel(item.id)}
      >
        <View style={styles.iconContainer}>
          <Ionicons
            name={item.icon}
            size={28}
            color={isSelected ? COLORS.primaryGreen : COLORS.textSecondary}
          />
        </View>

        <View style={styles.textContainer}>
          <Text
            style={[
              styles.levelTitle,
              isSelected && { color: COLORS.primaryGreen }
            ]}
          >
            {item.title}
          </Text>

          <Text style={styles.levelDesc} numberOfLines={2}>
            {item.description}
          </Text>
        </View>

        <View
          style={[
            styles.radioOuter,
            isSelected && { borderColor: COLORS.primaryGreen }
          ]}
        >
          {isSelected && <View style={styles.radioInner} />}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <ProgressBar
          progress={66}
          showBack={true}
          navigation={navigation}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>What is your level in {language}?</Text>
        <Text style={styles.subtitle}>
          This helps us tailor the lessons to your current knowledge.
        </Text>

        <FlatList
          data={LEVELS}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      </View>

      <View style={styles.footer}>
        <Button
          title="Continue"
          onPress={handleNext}
          disabled={!selectedLevel}
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
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 24,
    lineHeight: 20,
  },
  levelCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.divider,
    borderRadius: 8,
    marginBottom: 16,
    height: 100,
    
  },
  selectedCard: {
    borderColor: COLORS.primaryGreen,
    backgroundColor: COLORS.activeGreenBg,
  },
  iconContainer: {
    marginRight: 15,
    width: 32,
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    paddingRight: 15,
  },
  levelTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textPrimary,
    lineHeight: 22,
  },
  levelDesc: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
    flexWrap: "wrap",
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.grayLight,
    justifyContent: "center",
    alignItems: "center",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primaryGreen,
  },
  footer: {
    paddingHorizontal: 25,
    paddingBottom: 50,
  },
});