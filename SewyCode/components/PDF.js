//Ce composant est un formulaire qui permet de dessiner un rectangle. Il contient des champs pour la largeur et la longueur du rectangle. Lorsque l'utilisateur soumet le formulaire, un rectangle est dessiné avec les dimensions spécifiées. L'utilisateur peut également sauvegarder le rectangle en tant que fichier SVG ou le télécharger en tant que fichier PDF.
import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import Svg, { Rect } from "react-native-svg";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";

//Fonction permettant d'enregistrer un dessin SVG au format PDF. Elle prend en paramètre la largeur et la longueur du rectangle à dessiner.

const PDF = () => {
  const [largeur, setLargeur] = useState(0);
  const [longueur, setLongueur] = useState(0);

  const saveAsPDF = async ({ largeur, longueur }) => {
    const svgWidth = 1180;
    const svgHeight = 1500;

    const numPagesWidth = Math.ceil(largeur / svgWidth);
    const numPagesHeight = Math.ceil(longueur / svgHeight);

    let htmlContent = "<html><body>";
    for (let i = 0; i < numPagesWidth; i++) {
      for (let j = 0; j < numPagesHeight; j++) {
        const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}">
          <rect x="0" y="0" width="${svgWidth}" height="${svgHeight}" stroke="red" stroke-width="5" fill="transparent"/>
          <rect x="${-i * svgWidth + 10}" y="${
          -j * svgHeight + 10
        }" width="${largeur}" height="${longueur}" stroke="black" stroke-width="2" fill="transparent"/>
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
      <Text style={styles.title}>Tracer un rectangle</Text>
      <TextInput
        style={styles.input}
        placeholder="Largeur"
        keyboardType="numeric"
        value={largeur}
        onChangeText={(text) => setLargeur(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Longueur"
        keyboardType="numeric"
        value={longueur}
        onChangeText={(text) => setLongueur(text)}
      />
      <Button
        title="Télécharger en PDF"
        onPress={() => saveAsPDF({ largeur, longueur })}
      />
    </View>
  );
};

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
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default PDF;
