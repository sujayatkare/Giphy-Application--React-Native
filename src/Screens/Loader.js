import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

import { COLORS } from '../Colors/Colors';

const LoaderScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <LottieView
        source={require('../Assets/loader.json')}
        style={styles.animation}
        autoPlay
      />
    </View>
  );
};

export default LoaderScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 100,
    height: 200,
  },
});
