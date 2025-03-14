import React from "react";
import { View, Text } from "react-native";
import AddUsers from "../components/AddUsers";

export default function ProfileScreen() {
  return (
    <View flex={1} justifyContent="center" alignItems="center">
      <Text>Page de Profil</Text>
      <AddUsers />
    </View>
  );
}
