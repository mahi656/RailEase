import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";

const SplashScreen = () => {
  return (
    <View style={styles.main}>
      <Image
        source={require("../photos/train.png")}
        style={styles.bgImage}
      />
    </View>
  );
};
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  bgImage: {
    width: width,
    height: height,
  },
});

export default SplashScreen;
