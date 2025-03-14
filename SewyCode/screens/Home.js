import React from "react";
import { ScrollView, Text } from "react-native";
import { TestSvg } from "../components/TestSvg";

export default function HomeScreen() {
  return (
    <ScrollView>
      <Text>Bienvenue sur l'accueil !</Text>
      <TestSvg x={131} y={130} largeur={130} hauteur={130} />
      <TestSvg x={131} y={130} largeur={130} hauteur={130} />
      <TestSvg x={131} y={130} largeur={130} hauteur={130} />
      <TestSvg x={131} y={130} largeur={130} hauteur={130} />
    </ScrollView>
  );
}
