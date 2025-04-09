import React from "react";
import { ScrollView, Text } from "react-native";
import { TShirtTest } from "../components/TShirtTest";

export default function HomeScreen() {
  return (
    <ScrollView>
      <Text>Bienvenue sur l'accueil !</Text>
      <Text>Voici un aperçu de l'application :</Text>
      <TShirtTest />
    </ScrollView>
  );
}
