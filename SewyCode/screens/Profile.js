import React from "react";
import { View, Text, Button } from "react-native";
import AddUsers from "../components/AddUsers";
import Patron from "../components/Patron";

export default function ProfileScreen() {
  const handleLogout = async () => {
    setIsAuthenticated(false);
  };

  return (
    <View flex={1} justifyContent="center" alignItems="center">
      <Text>Page de Profil</Text>
      
      <Patron />
      <Button title="Déconnexion" onPresse={handleLogout} />
    </View>
  );
}
