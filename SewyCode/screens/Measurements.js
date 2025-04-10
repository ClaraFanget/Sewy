import React from "react";
import { View, Text, ScrollView } from "react-native";
import Patron from "../components/Patron";
import Header from "../components/Header";

export default function MeasurementsScreen() {
  return (
    <ScrollView>
      <View>
        <Header />
        <Text>Page des Mensurations</Text>
        <Patron />
      </View>
    </ScrollView>
  );
}
