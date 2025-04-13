import React, { useEffect, useState } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import AddUsers from "../components/AddUsers";
import Header from "../components/Header";
import { useUser } from "../context/UserContext";
import UpdateUsers from "./UpdateMail";
import { getUtilisateur, getUtilisateurs } from "../services/api";

export default function ProfileScreen({ navigation }) {
  const { user } = useUser();
  const [utilisateur, setUtilisateur] = useState();
  const handleLogout = async () => {
    setIsAuthenticated(false);
  };
  useEffect(() => {
    getUtilisateur(user.id).then((data) => {
      setUtilisateur(data);
    });
  }, [user]);

  return (
    <ScrollView>
      <View>
        <Header />
        <Text>
          Bienvenue {utilisateur ? utilisateur.pseudo : "Chargement..."}
        </Text>
        <Button
          title="Modifier mon adresse mail"
          onPress={() => navigation.navigate("EditMail")}
        />
        <Button
          title="Modifier mon mot de passe"
          onPress={() => navigation.navigate("EditPassword")}
        />
        <Button
          title="Modifier mes mensurations"
          onPress={() => navigation.navigate("EditMeasurements")}
        />
        <Button title="Déconnexion" onPress={handleLogout} />
      </View>
    </ScrollView>
  );
}
