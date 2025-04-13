/**
 * Le composant ProfileScreen affiche les informations de l'utilisateur connecté,
 * avec des options pour modifier l'adresse mail, le mot de passe et les mensurations.
 */

import React, { useEffect, useState } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import Header from "../components/Header";
import { useUser } from "../context/UserContext";
import { getUtilisateur } from "../services/api";

export default function ProfileScreen({ navigation }) {
  const { user } = useUser();
  const [utilisateur, setUtilisateur] = useState();

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
          Bienvenue {utilisateur ? utilisateur.prenom : "Chargement..."}
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
      </View>
    </ScrollView>
  );
}
