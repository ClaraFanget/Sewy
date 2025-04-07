import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { logUser } from "../services/api";

const Connexion = ({ navigation, onLoginSuccess }) => {
  const [pseudo, setPseudo] = useState("");
  const [mot_de_passe, setMotDePasse] = useState("");

  const handleSignIn = async () => {
    if (pseudo && mot_de_passe) {
      onLoginSuccess();
      /*const isLogged = await logUser(pseudo, mot_de_passe); // <-- Ajouter await
      if (isLogged) {
        onLoginSuccess();
      } else {
        alert("Identifiants incorrects");
      }
      */
      onLoginSuccess();
    } else {
      alert("Veuillez entrer un pseudo et un mot de passe");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <TextInput
        style={styles.input}
        placeholder="Pseudo"
        onChangeText={setPseudo}
        value={pseudo}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry={true}
        onChangeText={setMotDePasse}
        value={mot_de_passe}
      />
      <Button title="Se connecter" onPress={handleSignIn} />
      <Button
        title="S'inscrire"
        onPress={() => navigation.navigate("Inscription")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default Connexion;
