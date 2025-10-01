import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../photos/train.png')}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Black background in case image doesn't cover entire screen
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default SplashScreen;