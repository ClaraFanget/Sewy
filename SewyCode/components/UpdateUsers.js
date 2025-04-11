//Ce composant est un formulaire qui permet d'ajouter un nouvel utilisateur. Il contient des champs pour le nom, le prénom, le pseudo, le mot de passe, l'e-mail et la taille de l'utilisateur. Lorsque l'utilisateur soumet le formulaire, les données sont envoyées à l'API pour créer un nouvel utilisateur. Si la création réussit, un message de succès est affiché à l'utilisateur. Sinon, un message d'erreur est affiché.
import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import { creerUtilisateur, modifierUtilisateur } from "../services/api.js";
import { useUser } from "../context/UserContext";

const UpdateUsers = () => {
  const [mot_de_passe, setMotDePasse] = useState("");
  const [mail, setMail] = useState("");
  const { user } = useUser();

  const handleUpdateUser = async () => {
    if (!mot_de_passe || !mail) {
      Alert.alert("Erreur", "Tous les champs doivent être remplis.");
      return;
    }
    console.log(user.id);
    try {
      const response = await modifierUtilisateur(user.id, mail, mot_de_passe);
      Alert.alert("Succès", "Utilisateur modifié avec succès !");
    } catch (error) {
      Alert.alert("Impossible de modifier l'utilisateur.", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modifier un utilisateur</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={mail}
        onChangeText={setMail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={mot_de_passe}
        onChangeText={setMotDePasse}
        secureTextEntry={true}
      />
      <Button title="Modifier" onPress={handleUpdateUser} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default UpdateUsers;
