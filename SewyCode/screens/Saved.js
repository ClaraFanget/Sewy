import React from "react";
import { View, Text } from "react-native";
import { TShirt } from "../components/TShirt";

export default function SavedScreen() {
  return (
    <View>
      <Text>Page des éléments Enregistrés</Text>
      <TShirt />
    </View>
  );
}
