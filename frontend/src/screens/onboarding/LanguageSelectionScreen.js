import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { COLORS } from "../../constants/colors";
import Button from "../../components/Button";
import { LANGUAGES } from "../../data/languages";
import ProgressBar from "../../components/ProgressBar";

export default function LanguageSelectionScreen({ navigation }) {
  const [selectedId, setSelectedId] = useState(null);

  const handleContinue = () => {
    const selectedLanguage = LANGUAGES.find(l => l.id === selectedId);

    navigation.navigate("LevelSelection", {
      language: selectedLanguage.label
    });
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedId === item.id;

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.card, isSelected && styles.selectedCard]}
        onPress={() => setSelectedId(item.id)}
      >
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.cardLabel,
              isSelected && { color: COLORS.primaryGreen }
            ]}
          >
            {item.label}
          </Text>

          <Text
            style={styles.cardSub}
            numberOfLines={2}
          >
            {item.sub}
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
      <ProgressBar progress={33} />

      <Text style={styles.title}>Start your Ghanaian language journey</Text>
      <Text style={styles.subTitle}>
        Learn Ghanaian languages step by step with interactive lessons.
      </Text>

      <FlatList
        data={LANGUAGES}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      />

      <View style={styles.footer}>
        <Button
          title="Continue"
          onPress={handleContinue}
          disabled={!selectedId}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 25,
    paddingTop: 60
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
    color: COLORS.textPrimary
  },

  subTitle: {
    fontSize: 14,
    marginBottom: 24,
    color: COLORS.textSecondary
  },

card: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 20,
  paddingVertical: 15,
  backgroundColor: COLORS.background,
  borderWidth:1,
  borderColor: COLORS.divider,
  borderRadius: 8,
  marginBottom: 16,
  height: 95,
},

  selectedCard: {
    borderColor: COLORS.primaryGreen,
    backgroundColor: COLORS.activeGreenBg,
  },

  textContainer: {
    flex: 1,
    justifyContent:"center",
    paddingRight: 15
  },

  cardLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textPrimary,
    lineHeight: 22,
  },

  cardSub: {
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
    alignItems: "center"
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primaryGreen
  },

  footer: {
    paddingBottom: 40
  }
});