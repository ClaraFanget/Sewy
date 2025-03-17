import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import Svg, { Rect } from "react-native-svg";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";

//Fonction permettant d'enregistrer un dessin SVG au format PDF. Elle prend en paramètre la largeur et la longueur du rectangle à dessiner.

export function TShirt() {
  const [poitrine, setPoitrine] = useState(0);
  const [longueurTShirt, setLongueurTShirt] = useState(0);
  const [largeurTShirt, setLargeurTShirt] = useState(0);
  const [carrure, setCarrure] = useState(0);
  const [buste, setBuste] = useState(0);
  const [epaule, setEpaule] = useState(0);
  const [biceps, setBiceps] = useState(0);
  const [longueurManche, setLongueurManche] = useState(0);

  const longueurTotale = Math.max(longueurTShirt, longueurManche) + 10;
  const largeurTotale = 2 * largeurTShirt + biceps + 10;

  const saveAsPDF = async ({ largeurTotale, longueurTotale }) => {
    const svgWidth = 1180;
    const svgHeight = 1500;

    const numPagesWidth = Math.ceil(largeurTotale / svgWidth);
    const numPagesHeight = Math.ceil(longueurTotale / svgHeight);

    let htmlContent = "<html><body>";
    for (let i = 0; i < numPagesWidth; i++) {
      for (let j = 0; j < numPagesHeight; j++) {
        const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}">
          <rect x="0" y="0" width="${svgWidth}" height="${svgHeight}" stroke="red" stroke-width="5" fill="transparent"/>
          <rect x="${-i * svgWidth + 10}" y="${
          -j * svgHeight + 10
        }" width="${largeurTotale}" height="${longueurTotale}" stroke="black" stroke-width="2" fill="transparent"/>
        </svg>
      `;
        htmlContent += svg;
      }
    }
    htmlContent += "</body></html>";

    const file = await printToFileAsync({ html: htmlContent, base64: false });
    await shareAsync(file.uri);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patron T-Shirt</Text>
      <TextInput
        style={styles.input}
        placeholder="Largeur T-shirt"
        keyboardType="numeric"
        value={largeurTShirt}
        onChangeText={(text) => setLargeurTShirt(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Longueur T-shirt"
        keyboardType="numeric"
        value={longueurTShirt}
        onChangeText={(text) => setLongueurTShirt(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Tour de poitrine"
        keyboardType="numeric"
        value={poitrine}
        onChangeText={(text) => setPoitrine(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Carrure"
        keyboardType="numeric"
        value={carrure}
        onChangeText={(text) => setCarrure(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Tour de Buste"
        keyboardType="numeric"
        value={buste}
        onChangeText={(text) => setBuste(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Tour d'épaule"
        keyboardType="numeric"
        value={epaule}
        onChangeText={(text) => setEpaule(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Tour de biceps"
        keyboardType="numeric"
        value={biceps}
        onChangeText={(text) => setBiceps(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Longueur de manche"
        keyboardType="numeric"
        value={longueurManche}
        onChangeText={(text) => setLongueurManche(text)}
      />
      <Button
        title="Télécharger en PDF"
        onPress={() => saveAsPDF({ largeurTotale, longueurTotale })}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
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
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
});
