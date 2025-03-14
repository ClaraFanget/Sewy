import React from "react";
import { View, Text } from "react-native";
import SvgForm from "../components/SvgForm";

export default function MeasurementsScreen() {
  return (
    <View flex={1} justifyContent="center" alignItems="center">
      <Text>Page des Mensurations</Text>
      <SvgForm />
    </View>
  );
}
