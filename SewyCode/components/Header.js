/**
 * Le composant Header affiche le logo de l'application
 * centré à l'écran.
 */

import React from "react";
import { View, StyleSheet, Image } from "react-native";

const Header = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo/logo.png")}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 100,
    height: 200,
    resizeMode: "contain",
    margin: 0,
    alignContent: "center",
  },
});
export default Header;
