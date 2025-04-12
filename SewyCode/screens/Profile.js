import React, { useEffect, useState } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import AddUsers from "../components/AddUsers";
import Header from "../components/Header";
import { useUser } from "../context/UserContext";
import UpdateUsers from "../components/UpdateUsers";
import { getUtilisateur, getUtilisateurs } from "../services/api";

export default function ProfileScreen() {
  const { user } = useUser();
  const [utilisateur, setUtilisateur] = useState();
  const handleLogout = async () => {
    setIsAuthenticated(false);
  };
  useEffect(() => {
    getUtilisateur(user.id).then((data) => {
      console.log(user.id);
      setUtilisateur(data);
      console.log(data);
    });
  }, [user]);

  return (
    <ScrollView>
      <View>
        <Header />
        <Text>
          Bienvenue {utilisateur ? utilisateur.pseudo : "Chargement..."}
        </Text>

        <UpdateUsers />
        <Button title="Déconnexion" onPress={handleLogout} />
      </View>
    </ScrollView>
  );
}
