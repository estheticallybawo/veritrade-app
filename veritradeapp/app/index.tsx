import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Image,
  Dimensions
} from 'react-native';
import { router } from 'expo-router';

// Import your frame images
const frames = [
  require('../assets/splash/frame1.png'),
  require('../assets/splash/frame2.png'),
  require('../assets/splash/frame3.png'),
  require('../assets/splash/frame4.png'),
  require('../assets/splash/frame5.png'),
];

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const [currentFrame, setCurrentFrame] = useState(0);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const scaleAnim = useState(new Animated.Value(0.8))[0];

  useEffect(() => {
    // Frame animation - change image every 100ms
    const frameInterval = setInterval(() => {
      setCurrentFrame((prev) => {
        if (prev < frames.length - 1) {
          return prev + 1;
        }
        clearInterval(frameInterval);
        return prev;
      });
    }, 1000);

    // Fade in and scale animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        useNativeDriver: true,
      })
    ]).start();

    // Navigate to home after 6 seconds
    const timer = setTimeout(() => {
      router.replace('/home'); // Navigate to home screen
    }, 6000);

    return () => {
      clearInterval(frameInterval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.imageContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        <Image 
          source={frames[currentFrame]}
          style={styles.image}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: width * 1,
    height: height * 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});