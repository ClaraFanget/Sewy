import React from "react";
import { View, Text } from "react-native";
import PDF from "../components/PDF";

export default function MeasurementsScreen() {
  return (
    <View flex={1} justifyContent="center" alignItems="center">
      <Text>Page des Mensurations</Text>
      <PDF />
    </View>
  );
}
