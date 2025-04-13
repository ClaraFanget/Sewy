import React from "react";
import { View, Text, ScrollView } from "react-native";
import Pattern from "../components/Pattern";
import Header from "../components/Header";

export default function MeasurementsScreen() {
  return (
    <ScrollView>
      <View>
        <Header />
        <Text>Page des Mensurations</Text>
        <Pattern />
      </View>
    </ScrollView>
  );
}
