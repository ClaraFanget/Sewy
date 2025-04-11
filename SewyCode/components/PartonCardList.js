//Ce composant est un formulaire qui permet d'ajouter un nouvel utilisateur. Il contient des champs pour le nom, le prénom, le pseudo, le mot de passe, l'e-mail et la taille de l'utilisateur. Lorsque l'utilisateur soumet le formulaire, les données sont envoyées à l'API pour créer un nouvel utilisateur. Si la création réussit, un message de succès est affiché à l'utilisateur. Sinon, un message d'erreur est affiché.
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import PatronCard from "./PatronCard";

const PatronCardList = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <PatronCard />
        <PatronCard />
        <PatronCard />
        <PatronCard />
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

export default PatronCardList;
