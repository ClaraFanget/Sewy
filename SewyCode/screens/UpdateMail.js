//Ce composant est un formulaire qui permet d'ajouter un nouvel utilisateur. Il contient des champs pour le nom, le prénom, le pseudo, le mot de passe, l'e-mail et la taille de l'utilisateur. Lorsque l'utilisateur soumet le formulaire, les données sont envoyées à l'API pour créer un nouvel utilisateur. Si la création réussit, un message de succès est affiché à l'utilisateur. Sinon, un message d'erreur est affiché.
import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import { getUtilisateur, updateMail } from "../services/api.js";
import { useUser } from "../context/UserContext.js";

const UpdateMail = ({ navigation }) => {
  const [mail, setMail] = useState("");
  const [previousMail, setPreviousMail] = useState("");
  const { user } = useUser();

  const handleUpdateMail = async () => {
    const dataActuelle = await getUtilisateur(user.id);
    if (!mail || !previousMail) {
      Alert.alert("Erreur", "Tous les champs doivent être remplis.");
      return;
    }
    if (dataActuelle.mail !== previousMail) {
      Alert.alert("Erreur", "L'email actuel est incorrect.");
      return;
    }
    try {
      const response = await updateMail(user.id, mail);
      Alert.alert("Succès", "Votre adresse mail a été modifiée avec succès !");
    } catch (error) {
      Alert.alert("Impossible de modifier l'adresse mail.", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modifier son adresse mail</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail actuel"
        value={previousMail}
        onChangeText={setPreviousMail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Nouvel e-mail"
        value={mail}
        onChangeText={setMail}
      />
      <Button title="Modifier" onPress={handleUpdateMail} />
      <Button title="Retour" onPress={() => navigation.goBack()} />
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

export default UpdateMail;
