import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { COLORS } from "../../constants/colors";
import { onboardingData } from "../../data/onboardingData";
import Button, { btnStyles } from "../../components/Button";

const { width, height } = Dimensions.get("window");

export default function OnboardingScreen({ navigation }) {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex =
        currentIndex + 1 < onboardingData.length ? currentIndex + 1 : 0;

      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });

      setCurrentIndex(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={item.image}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>

          {/* Pagination */}
          <View style={styles.dotsContainer}>
            {onboardingData.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      index === currentIndex
                        ? COLORS.primaryGreen
                        : COLORS.grayLight,
                  },
                ]}
              />
            ))}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Language Button */}
      <TouchableOpacity style={styles.langBtn}>
        <Text style={styles.langText}>English</Text>
      </TouchableOpacity>

      {/* Carousel */}
      <View style={styles.sliderContainer}>
        <FlatList
          ref={flatListRef}
          data={onboardingData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          snapToAlignment="center"
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
        />
      </View>

      {/* Login / Signup */}
      <View style={styles.authContainer}>
        <Button
          title="Login"
          style={btnStyles.primaryBtn}
          onPress={() => navigation.navigate("Login")}
        />

        <Text style={styles.signupText}>
          Don't have an account?{" "}
          <Text
            style={styles.signupLink}
            onPress={() => navigation.navigate("Signup")}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingBottom:"15%",
  },

  sliderContainer : {
    flex:1
  },

  itemContainer: {
    width: width,
    flex:1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "20%",
    paddingHorizontal:20
  },

  imageContainer: {
    width: "100%",
    height: height * 0.45,
    maxHeight: 380,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: "90%",
    height: "100%",
  },

  textContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: 8,
  },

  description: {
    fontSize: 15,
    color: COLORS.textSecondary,
    textAlign: "center",
    paddingHorizontal: 10,
    marginBottom: 20,
  },

  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 6,
  },

  authContainer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 25,
  },

  signupText: {
    marginTop: 10,
    textAlign: "center",
    color: COLORS.textSecondary,
    fontSize: 16,
  },

  signupLink: {
    color: COLORS.primaryGreen,
    fontWeight: "600",
  },

  langBtn: {
    position: "absolute",
    top: 40,
    right: 20,
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 8,
    backgroundColor: COLORS.background,
    alignItems: "center",
    zIndex: 10,
  },

  langText: {
    color: COLORS.textSecondary,
    fontWeight: "500",
    fontSize: 14,
  },
});