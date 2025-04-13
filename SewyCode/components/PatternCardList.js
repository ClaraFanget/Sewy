/**
 * Le composant PatternCardList affiche une liste horizontale de cartes PatternCard.
 */

import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import PatternCard from "./PatternCard";

const PatternCardList = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <PatternCard />
        <PatternCard />
        <PatternCard />
        <PatternCard />
      </ScrollView>
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

export default PatternCardList;
