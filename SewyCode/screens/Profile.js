import React from "react";
import { View, Text, Button, ScrollView } from "react-native";
import AddUsers from "../components/AddUsers";
import Header from "../components/Header";
import { useUser } from "../context/UserContext";
import UpdateUsers from "../components/UpdateUsers";

export default function ProfileScreen() {
  const { user } = useUser();
  const handleLogout = async () => {
    setIsAuthenticated(false);
  };

  return (
    <ScrollView>
      <View>
        <Header />
        <Text>Bienvenue {user.pseudo}</Text>
        <UpdateUsers />
        <Button title="Déconnexion" onPresse={handleLogout} />
      </View>
    </ScrollView>
  );
}
