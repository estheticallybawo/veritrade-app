import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Image
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface OnboardingScreen {
  id: number;
  title: string;
  description: string;
  icon: string;
  iconFamily: 'ionicons' | 'material';
  image: any;
  imageResizeMode: 'cover' | 'contain';
  imageScale?: number;
  imageOffsetX?: number;
  imageOffsetY?: number;
}

const ONBOARDING_SCREENS: OnboardingScreen[] = [
  {
    id: 1,
    title: 'Protect Your Business',
    description: 'Manual legitimacy checks are slow and risky for growing businesses in Africa.',
    icon: 'shield-alert-outline',
    iconFamily: 'material',
    image: require('../assets/Container (1).png'),
    imageResizeMode: 'cover',
    imageScale: 1.1,
    imageOffsetY: 4
  },
  {
    id: 2,
    title: 'Instant Verification',
    description: 'Instant CAC verification and Trust scores in real-time. Verify businesses in seconds.',
    icon: 'lightning-bolt',
    iconFamily: 'material',
    image: require('../assets/Container (2).png'),
    imageResizeMode: 'cover',
    imageScale: 1.08,
    imageOffsetY: -2
  },
  {
    id: 3,
    title: 'Start Verifying Today',
    description: 'Join thousands of businesses building trust through Veritrade verification.',
    icon: 'rocket',
    iconFamily: 'material',
    image: require('../assets/IMAGE.png'),
    imageResizeMode: 'cover',
    imageScale: 1.1,
    imageOffsetX: -6
  }
];

export default function OnboardingScreen() {
  const [currentScreen, setCurrentScreen] = useState(0);

  const handleNext = () => {
    if (currentScreen < ONBOARDING_SCREENS.length - 1) {
      setCurrentScreen(currentScreen + 1);
    } else {
      // Navigate to login on final screen
      router.replace('/login');
    }
  };

  const handlePrevious = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  const handleSkip = () => {
    router.replace('/login');
  };

  const screen = ONBOARDING_SCREENS[currentScreen];
  const imageTransform = [
    { scale: screen.imageScale ?? 1 },
    { translateX: screen.imageOffsetX ?? 0 },
    { translateY: screen.imageOffsetY ?? 0 }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Skip Button */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Main Content */}
      <ScrollView
        contentContainerStyle={styles.content}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      >
        {/* Onboarding Image */}
        <View style={styles.imagePlaceholderContainer}>
          <Image
            source={screen.image}
            style={[styles.imagePlaceholderImage, { transform: imageTransform }]}
            resizeMode={screen.imageResizeMode}
          />
        </View>

        {/* Icon Circle */}
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            {screen.iconFamily === 'ionicons' ? (
              <Ionicons name={screen.icon as any} size={32} color="#1E3A5F" />
            ) : (
              <MaterialCommunityIcons name={screen.icon as any} size={32} color="#1E3A5F" />
            )}
          </View>
        </View>

        {/* Text Content */}
        <Text style={styles.title}>{screen.title}</Text>
        <Text style={styles.description}>{screen.description}</Text>
      </ScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        {/* Progress Indicators */}
        <View style={styles.progressContainer}>
          {ONBOARDING_SCREENS.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                {
                  backgroundColor: index === currentScreen ? '#1E3A5F' : '#E5E7EB',
                  width: index === currentScreen ? 24 : 8
                }
              ]}
            />
          ))}
        </View>

        {/* Navigation Buttons */}
        <View style={styles.buttonContainer}>
          {currentScreen > 0 ? (
            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={handlePrevious}
            >
              <Text style={styles.secondaryButtonText}>Back</Text>
            </TouchableOpacity>
          ) : (
            <View style={[styles.button, styles.placeholder]} />
          )}

          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={handleNext}
          >
            <Text style={styles.primaryButtonText}>
              {currentScreen === ONBOARDING_SCREENS.length - 1 ? 'Get Started' : 'Next'}
            </Text>
            <Ionicons
              name="arrow-forward"
              size={18}
              color="#fff"
              style={styles.buttonIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  skipButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  skipText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  imagePlaceholderContainer: {
    width: width - 40,
    height: height * 0.25,
    marginBottom: 32,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  imagePlaceholderImage: {
    width: '100%',
    height: '100%',
  },
  iconContainer: {
    marginBottom: 24,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F0F5FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: '90%',
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 24,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 32,
  },
  progressDot: {
    height: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#1E3A5F',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#F3F4F6',
  },
  secondaryButtonText: {
    color: '#4B5563',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonIcon: {
    marginLeft: 8,
  },
  placeholder: {
    backgroundColor: 'transparent',
  },


});
