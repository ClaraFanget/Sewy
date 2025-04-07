//Ce composant est un formulaire qui permet d'ajouter un nouvel utilisateur. Il contient des champs pour le nom, le prénom, le pseudo, le mot de passe, l'e-mail et la taille de l'utilisateur. Lorsque l'utilisateur soumet le formulaire, les données sont envoyées à l'API pour créer un nouvel utilisateur. Si la création réussit, un message de succès est affiché à l'utilisateur. Sinon, un message d'erreur est affiché.
import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import { creerUtilisateur } from "../services/api.js";

const AddUsers = () => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [mot_de_passe, setMotDePasse] = useState("");
  const [mail, setMail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddUser = async () => {
    if (!nom || !prenom || !pseudo || !mot_de_passe || !mail) {
      Alert.alert("Erreur", "Tous les champs doivent être remplis.");
      return;
    }

    setLoading(true);
    try {
      const response = await creerUtilisateur(
        nom,
        prenom,
        pseudo,
        mot_de_passe,
        mail
      );
      Alert.alert("Succès", "Utilisateur ajouté avec succès !");
      setNom("");
      setPrenom("");
      setPseudo("");
      setMotDePasse("");
      setMail("");
    } catch (error) {
      Alert.alert("Erreur", "Impossible d'ajouter l'utilisateur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter un utilisateur</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={nom}
        onChangeText={setNom}
      />
      <TextInput
        style={styles.input}
        placeholder="Prénom"
        value={prenom}
        onChangeText={setPrenom}
      />
      <TextInput
        style={styles.input}
        placeholder="Pseudo"
        value={pseudo}
        onChangeText={setPseudo}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={mot_de_passe}
        onChangeText={setMotDePasse}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={mail}
        onChangeText={setMail}
        keyboardType="email-address"
      />
      <Button
        title={loading ? "Chargement..." : "Ajouter"}
        onPress={handleAddUser}
      />
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

export default AddUsers;
