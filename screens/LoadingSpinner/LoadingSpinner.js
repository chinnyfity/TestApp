import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Animated } from 'react-native';

const LoadingSpinner = () => {
  const [rotation] = useState(new Animated.Value(0));

  useEffect(() => {
    const rotateAnimation = Animated.timing(rotation, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
      isInteraction: false,
      easing: t => t,
    });

    const loopAnimation = Animated.loop(rotateAnimation);
    loopAnimation.start();

    return () => {
      loopAnimation.stop();
      // clearTimeout(timer); // Clean up the timer on component unmount
    };
  }, [rotation]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.loadingSpinner,
          {
            transform: [
              {
                rotate: rotation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          },
        ]}
      >
        <ActivityIndicator size="large" color="#404472" />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    position:'relative',
    zIndex:1,
  },
  loadingSpinner: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: '#ddd',
    borderStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingSpinner;
