import React from "react";
import { View, Text, ScrollView } from "react-native";
import Header from "../components/Header";

export default function SavedScreen() {
  return (
    <ScrollView>
      <View>
        <Header />
        <Text>Page des éléments Enregistrés</Text>
      </View>
    </ScrollView>
  );
}
