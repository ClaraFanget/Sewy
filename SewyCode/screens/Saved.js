import React from "react";
import { View, Text, ScrollView } from "react-native";
import { TShirt } from "../components/TShirt";
import Header from "../components/Header";

export default function SavedScreen() {
  return (
    <ScrollView>
      <View>
        <Header />
        <Text>Page des éléments Enregistrés</Text>
        <TShirt />
      </View>
    </ScrollView>
  );
}
