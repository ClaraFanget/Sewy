import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";

const Header = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo/logo.png")} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // occupe tout l'écran
    justifyContent: "center", // centre verticalement
    alignItems: "center", // centre horizontalement
    backgroundColor: "#fff", // facultatif, pour voir le fond
  },
  logo: {
    width: 100,
    height: 200,
    resizeMode: "contain", // ou 'cover' selon ton besoin
    margin: 0,
    alignContent: "center",
  },
});
export default Header;
