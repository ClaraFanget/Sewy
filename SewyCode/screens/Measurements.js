import React from "react";
import { View, Text } from "react-native";
import TShirtFinal from "../components/TShirtFinal";

export default function MeasurementsScreen() {
  return (
    <View flex={1} justifyContent="center" alignItems="center">
      <Text>Page des Mensurations</Text>
      <TShirtFinal />
    </View>
  );
}
