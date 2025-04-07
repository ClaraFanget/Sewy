import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  PixelRatio,
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

  const saveAsPDF = async () => {
    const svgWidth = 1180;
    const svgHeight = 1500;

    const ptsPerCm = 72 / 2.54;

    console.log("Taille : ", taille);
    // Calculer les dimensions en points pour le PDF
    const taillePoints = Math.trunc(taille * ptsPerCm);
    const poitrinePoints = Math.trunc(poitrine * ptsPerCm);
    const longueurTShirtPoints = Math.trunc(longueurTShirt * ptsPerCm);
    const largeurTShirtPoints = Math.trunc(largeurTShirt * ptsPerCm);
    const carrurePoints = Math.trunc(carrure * ptsPerCm);
    const bustePoints = Math.trunc(buste * ptsPerCm);
    const epaulePoints = Math.trunc(epaule * ptsPerCm);
    const bicepsPoints = Math.trunc(biceps * ptsPerCm);
    const longueurManchePoints = Math.trunc(longueurManche * ptsPerCm);

    console.log(taille);

    let htmlContent = "<html><body>";

    let xA = 10;
    let yA = 10;

    let xB = xA + bustePoints / 2 + 4;

    let yD = yA + longueurTShirtPoints;

    let yE = yA + (1 / 48) * poitrinePoints + 0.2;

    let xG = xA + (1 / 12) * poitrinePoints;

    let xL1 = xG + (1 / 12) * poitrinePoints;
    let yL1 = yA + 4.5;

    let xF1 = bustePoints / 4 + 2;
    let yF1 = taillePoints / 8 + poitrinePoints / 48 + 1.7;

    let xD1 = xA + largeurTShirtPoints / 2 + 2;
    let yD1 = yA + longueurTShirtPoints + 4;

    let xM = carrurePoints / 4;
    let yM = taillePoints / 8 + poitrinePoints / 48 + 1.7 - 5;

    let controMx = carrurePoints / 2 - 200;
    let controMy = taillePoints / 8 + poitrinePoints / 48 + 1.7 - 5;

    <Path
      d="M${xF1} ${yF1} C${controMx} ${controMy}, ${0} ${0}, ${xD1} ${yD1}"
      fill="none"
      stroke="orange"
      strokeWidth="2"
    />;

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

  

        <!--- F1L1 --->
      <Path d="M${xF1} ${yF1} C${controMx} ${controMy}, ${controMx} ${controMy}, ${xD1} ${yD1}" fill="none" stroke="orange" strokeWidth="2" />
      <Circle cx="${controMx}" cy="${controMy}" r="5" fill="red" />

        <!--- D1D --->
        <line x1="${xD1}" y1="${yD1}" x2="${xA}" y2="${yD}" stroke="grey" stroke-width="2" "/>
  
        </Svg>
      `;
    htmlContent += svg;

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
          value={poitrine}
          onChangeText={(text) => setPoitrine(Number(text))}
        />
        <TextInput
          style={styles.input}
          placeholder="Carrure"
          keyboardType="numeric"
          value={carrure}
          onChangeText={(text) => setCarrure(Number(text))}
        />
        <TextInput
          style={styles.input}
          placeholder="Tour de Buste"
          keyboardType="numeric"
          value={buste}
          onChangeText={(text) => setBuste(Number(text))}
        />
        <TextInput
          style={styles.input}
          placeholder="Longueur de manche"
          keyboardType="numeric"
          value={epaule}
          onChangeText={(text) => setEpaule(Number(text))}
        />

        <TextInput
          style={styles.input}
          placeholder="Longueur de manche"
          keyboardType="numeric"
          value={longueurManche}
          onChangeText={(text) => setLongueurManche(Number(text))}
        />
        <Button
          title="Télécharger en PDF"
          onPress={() => {
            saveAsPDF();
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

export default TShirt;
