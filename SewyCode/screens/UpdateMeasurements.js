//Ce composant est un formulaire qui permet d'ajouter un nouvel utilisateur. Il contient des champs pour le nom, le prénom, le pseudo, le mot de passe, l'e-mail et la taille de l'utilisateur. Lorsque l'utilisateur soumet le formulaire, les données sont envoyées à l'API pour créer un nouvel utilisateur. Si la création réussit, un message de succès est affiché à l'utilisateur. Sinon, un message d'erreur est affiché.
import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import { getUtilisateur, updateMeasurement } from "../services/api.js";
import { useUser } from "../context/UserContext.js";

const UpdateMeasurement = ({ navigation }) => {
  const [taille, setTaille] = useState(0);
  const [poitrine, setPoitrine] = useState(0);
  const [longueurDos, setLongueurDos] = useState(0);
  const [buste, setBuste] = useState(0);
  const [distanceEpaules, setDistanceEpaules] = useState(0);
  const [carrure, setCarrure] = useState(0);
  const [tourTaille, setTourTaille] = useState(0);
  const [longueurDevant, setLongueurDevant] = useState(0);
  const { user } = useUser();

  useEffect(() => {
    const getUtilisateurMeasurements = async () => {
      try {
        const utilisateurData = await getUtilisateur(user.id);
        const mensurations = utilisateurData.mensurations || {};
        setTaille(String(mensurations.taille || ""));
        setPoitrine(String(mensurations.poitrine || ""));
        setLongueurDos(String(mensurations.longueurDos || ""));
        setBuste(String(mensurations.buste || ""));
        setDistanceEpaules(String(mensurations.distanceEpaules || ""));
        setCarrure(String(mensurations.carrure || ""));
        setTourTaille(String(mensurations.tourTaille || ""));
        setLongueurDevant(String(mensurations.longueurDevant || ""));
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    if (user?.id) {
      getUtilisateurMeasurements();
    }
  }, [user]);

  const handleUpdateMeasurement = async () => {
    if (
      !taille ||
      !poitrine ||
      !longueurDos ||
      !buste ||
      !distanceEpaules ||
      !carrure ||
      !tourTaille ||
      !longueurDevant
    ) {
      Alert.alert("Erreur", "Tous les champs doivent être remplis.");
      return;
    }
    try {
      const response = await updateMeasurement(
        user.id,
        taille,
        poitrine,
        longueurDos,
        buste,
        distanceEpaules,
        carrure,
        tourTaille,
        longueurDevant
      );
      Alert.alert("Succès", "Vos mensurations ont été modifié avec succès !");
    } catch (error) {
      Alert.alert("Impossible de modifier les mensurations.", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modifier ses mensurations</Text>
      <TextInput
        style={styles.input}
        placeholder="Taille"
        value={taille}
        onChangeText={setTaille}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Poitrine"
        value={poitrine}
        onChangeText={setPoitrine}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Longueur du dos"
        value={longueurDos}
        onChangeText={setLongueurDos}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Buste"
        value={buste}
        onChangeText={setBuste}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Distance des épaules"
        value={distanceEpaules}
        onChangeText={setDistanceEpaules}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Carrure"
        value={carrure}
        onChangeText={setCarrure}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Tour de taille"
        value={tourTaille}
        onChangeText={setTourTaille}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Longueur devant"
        value={longueurDevant}
        onChangeText={setLongueurDevant}
        keyboardType="numeric"
      />
      <Button title="Modifier" onPress={handleUpdateMeasurement} />
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

export default UpdateMeasurement;
