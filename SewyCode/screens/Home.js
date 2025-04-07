import React from "react";
import { ScrollView, Text } from "react-native";
import { TShirtTest } from "../components/TShirtTest";

export default function HomeScreen() {
  return (
    <ScrollView>
      <Text>Bienvenue sur l'accueil !</Text>
      <TShirtTest />
    </ScrollView>
  );
}
