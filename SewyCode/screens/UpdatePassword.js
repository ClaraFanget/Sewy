/**
 * Le composant UpdatePassword permettant à l'utilisateur de modifier son mot d epasse
 */
import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import { getUtilisateur, updatePassword } from "../services/api.js";
import { useUser } from "../context/UserContext.js";

const UpdatePassword = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [previousPassword, setPreviousPassword] = useState("");
  const { user } = useUser();

  //handleUpdatePassword vérifie que les champs sont bien remplis. Grâce à une requête à l'API elle vérifie aussi que l'ancien mot de passe correspond bien à celui enregistré dans la base de données. Enfin si tout est bon elle modifie le mot de passe de l'utilisateur
  const handleUpdatePassword = async () => {
    const dataActuelle = await getUtilisateur(user.id);
    if (!password || !previousPassword) {
      Alert.alert("Erreur", "Tous les champs doivent être remplis.");
      return;
    }
    if (dataActuelle.mot_de_passe !== previousPassword) {
      Alert.alert("Erreur", "Le mot de passe actuel est incorrect.");
      return;
    }
    try {
      const response = await updatePassword(user.id, password);
      Alert.alert("Succès", "Votre mot de passe a été modifié avec succès !");
    } catch (error) {
      Alert.alert("Impossible de modifier le mot de passe.", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modifier son mot de passe</Text>
      <TextInput
        style={styles.input}
        placeholder="Mot de passe actuel"
        value={previousPassword}
        onChangeText={setPreviousPassword}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Nouveau mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <Button title="Modifier" onPress={handleUpdatePassword} />
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

export default UpdatePassword;
