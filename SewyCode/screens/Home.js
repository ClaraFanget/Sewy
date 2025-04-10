import React from "react";
import { ScrollView, Text, Image, StyleSheet, View } from "react-native";
import { TShirtTest } from "../components/TShirtTest";
import Header from "../components/Header";

export default function HomeScreen() {
  return (
    <ScrollView>
      <View>
        <Header />
        <Text>Bienvenue sur l'accueil !</Text>
        <Text>Voici un aperçu de l'application :</Text>
        <TShirtTest />
      </View>
    </ScrollView>
  );
}
