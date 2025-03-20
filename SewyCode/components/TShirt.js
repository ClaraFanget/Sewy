import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import Svg, { Rect, Line, Path } from "react-native-svg";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import NumericInput from "react-native-numeric-input";

//Fonction permettant d'enregistrer un dessin SVG au format PDF. Elle prend en paramètre la largeur et la longueur du rectangle à dessiner.

export function TShirt() {
  const [taille, setTaille] = useState(0);
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
  console.log(largeurTotale);

  console.log(
    poitrine,
    longueurTShirt,
    largeurTShirt,
    carrure,
    buste,
    epaule,
    biceps,
    longueurManche
  );
  const saveAsPDF = async ({ longueurTotale, largeurTotale }) => {
    const svgWidth = 1180;
    const svgHeight = 1500;

    const numPagesWidth = Math.ceil(largeurTotale / svgWidth);
    console.log(numPagesWidth);
    const numPagesHeight = Math.ceil(longueurTotale / svgHeight);

    let htmlContent = "<html><body>";
    for (let i = 0; i < numPagesWidth; i++) {
      for (let j = 0; j < numPagesHeight; j++) {
        //Coordonnées des points
        let xA = -i * svgWidth + 10;
        let yA = -j * svgHeight + 10;

        let xB = xA + buste / 2 + 4;

        let yD = yA + longueurTShirt;

        let yE = yA + (1 / 48) * poitrine + 0.2;

        let xG = xA + (1 / 12) * poitrine;

        let xL1 = xG + (1 / 12) * poitrine;
        let yL1 = yA + 4.5;

        let xF1 = buste / 4 + 2;
        let yF1 = taille / 8 + poitrine / 48 + 1.7;

        let xD1 = xA + largeurTShirt / 2 + 2;
        let yD1 = yA + longueurTShirt;
        const svg = `
        <Svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}">
         
          <Rect x="0" y="0" width="${svgWidth}" height="${svgHeight}" stroke="red" stroke-width="5" fill="transparent"/>

        <!--- AB --->
          <line x1="${xA}" y1="${yA}" x2="${xB}" y2="${yA}" stroke="blue" stroke-width="2" "/>

        <!--- AD --->
          <line x1="${xA}" y1="${yA}" x2="${xA}" y2="${yD}" stroke="red" stroke-width="2" "/>

        <!--- EG  --->
        <line x1="${xA}" y1="${yE}" x2="${xG}" y2="${yA}" stroke="green" stroke-width="2" "/>

        <!--- GL1 --->
        <line x1="${xG}" y1="${yA}" x2="${xL1}" y2="${yL1}" stroke="red" stroke-width="2" "/>

        <!--- L1F1 --->
        <line x1="${xL1}" y1="${yL1}" x2="${xF1}" y2="${yF1}" stroke="brown" stroke-width="2" "/>

        <!--- F1D1 --->
        <line x1="${xF1}" y1="${yF1}" x2="${xD1}" y2="${yD1}" stroke="orange" stroke-width="2" "/>

        <!--- D1D --->
        <line x1="${xD1}" y1="${yD1}" x2="${xA}" y2="${yD}" stroke="grey" stroke-width="2" "/>
  
        </Svg>
      `;
        htmlContent += svg;
      }
    }
    htmlContent += "</body></html>";

    const file = await printToFileAsync({ html: htmlContent, base64: false });
    await shareAsync(file.uri);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Patron T-Shirt</Text>
        <TextInput
          style={styles.input}
          placeholder="Taille"
          keyboardType="numeric"
          value={taille}
          onChangeText={(text) => setTaille(Number(text))}
        />
        <TextInput
          style={styles.input}
          placeholder="Largeur T-shirt"
          keyboardType="numeric"
          value={largeurTShirt}
          onChangeText={(text) => setLargeurTShirt(Number(text))}
        />
        <TextInput
          style={styles.input}
          placeholder="Longueur T-shirt"
          keyboardType="numeric"
          value={longueurTShirt}
          onChangeText={(text) => setLongueurTShirt(Number(text))}
        />
        <TextInput
          style={styles.input}
          placeholder="Tour de biceps"
          keyboardType="numeric"
          value={biceps}
          onChangeText={(text) => setBiceps(Number(text))}
        />
        <TextInput
          style={styles.input}
          placeholder="Tour de poitrine"
          keyboardType="numeric"
          value={Number.parseInt(poitrine, 10)}
          onChangeText={(text) => setPoitrine(Number(text))}
        />
        <TextInput
          style={styles.input}
          placeholder="Carrure"
          keyboardType="numeric"
          value={Number.parseInt(carrure, 10)}
          onChangeText={(text) => setCarrure(Number(text))}
        />
        <TextInput
          style={styles.input}
          placeholder="Tour de Buste"
          keyboardType="numeric"
          value={Number.parseInt(buste, 10)}
          onChangeText={(text) => setBuste(Number(text))}
        />
        <TextInput
          style={styles.input}
          placeholder="Longueur de manche"
          keyboardType="numeric"
          value={epaule}
          onChangeText={(text) => {
            setEpaule(Number(text));
          }}
        />

        <TextInput
          style={styles.input}
          placeholder="Longueur de manche"
          keyboardType="numeric"
          value={longueurManche}
          onChangeText={(text) => {
            setLongueurManche(Number(text));
          }}
        />
        <Button
          title="Télécharger en PDF"
          onPress={() => {
            saveAsPDF({ longueurTotale, largeurTotale });
          }}
        />
      </View>
    </TouchableWithoutFeedback>
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
