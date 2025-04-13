/**
 * Le composant PatternCard affiche une image représentant un patron de couture.
 */

import React from "react";
import { View, StyleSheet, Image } from "react-native";

const PatternCard = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/patrons/debardeur.png")}
        style={styles.coverImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  coverImage: {
    width: 195,
    height: 113,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default PatternCard;
