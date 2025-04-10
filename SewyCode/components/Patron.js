import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import Svg, { Rect, Line, Path, Circle } from "react-native-svg";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import * as Print from "expo-print";
import { error, PDFDocument, rgb, StandardFonts } from "pdf-lib";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { encode } from "base64-arraybuffer";
import { convertSvgToPdf } from "../services/api";

export function Patron() {
  const [taille, setTaille] = useState(0); // Hauteur totale (tête aux pieds)
  const [poitrine, setPoitrine] = useState(0); // Tour de poitrine
  const [longueurDos, setLongueurDos] = useState(0); // Hauteur dos (base du cou à la taille)
  const [buste, setBuste] = useState(0); // Tour de buste
  const [distanceEpaules, setDistanceEpaules] = useState(0); // Distance entre les deux épaules
  const [carrure, setCarrure] = useState(0); // Largeur du dos sous les aisselles
  const [tourTaille, setTourTaille] = useState(0); // Tour de taille
  const [longueurDevant, setLongueurDevant] = useState(0);

  const setMensurations = () => {
    setTaille(165);
    setPoitrine(88);
    setLongueurDos(42);
    setBuste(86);
    setDistanceEpaules(38);
    setCarrure(34);
    setTourTaille(72);
    setLongueurDevant(48);
    saveAsPDF();
  };

  const TracerPatron = async () => {
    const ptsPerCm = 72 / 2.54; // conversion cm en points

    // ------ PARTIE DOS DU PATRON ------

    // Point A - Point de départ en haut à gauche
    let xA = 0;
    let yA = 0;

    // AB = tour de buste/2 + 4 cm d'aisance
    let xB = xA + (buste / 2 + 4) * ptsPerCm;
    let yB = yA;

    // AD = hauteur dos (base du cou à la taille)
    let xD = xA;
    let yD = yA + longueurDos * ptsPerCm;

    // AE = 1/48 tour de poitrine + 0.2 cm
    let xE = xA;
    let yE = yA + (poitrine / 48 + 0.2) * ptsPerCm;

    // AE1 = descendre de 4.5 cm
    let xE1 = xE;
    let yE1 = yE + 4.5 * ptsPerCm;

    // AF = 1/8 hauteur + 1/48 tour de poitrine + 1.7 cm (hauteur d'emmanchure)
    let hauteurEmmanchure = (taille / 8 + poitrine / 48 + 1.7) * ptsPerCm;
    let xF = xA;
    let yF = yA + hauteurEmmanchure;

    // AG = 1/12 tour de poitrine
    let xG = xA + (poitrine / 12) * ptsPerCm;
    let yG = yA;

    // AH = 1/2 carrure (largeur du dos)
    let xH = xA + (carrure / 2) * ptsPerCm;
    let yH = yA; // H est au même niveau que F (hauteur d'emmanchure)

    // FF1 = 1/4 tour de buste + 2 cm d'aisance
    let xF1 = xF + (buste / 4 + 2) * ptsPerCm;
    let yF1 = yF;

    // DD1 = 1/4 tour de taille + 2 cm d'aisance
    let xD1 = xD + (tourTaille / 4 + 2) * ptsPerCm;
    let yD1 = yD;

    // HI = perpendiculaire à FF1 (I est au même x que F1)
    let xI = xH;
    let yI = yF;

    // HL = descendre de 4.5 cm
    let xL = xH;
    let yL = yE1;

    // E1L1 = 1/2 distance entre les deux épaules
    let xL1 = xE1 + (distanceEpaules / 2) * ptsPerCm;
    let yL1 = yE1;

    // IM = remonter de 5 cm et aller vers la droite de 0.3 cm
    let xM = xI + 0.3 * ptsPerCm;
    let yM = yI - 5 * ptsPerCm;

    // Point de contrôle pour la courbe d'emmanchure
    let controlX1 = (xL1 + xM) / 2 - 4;
    let controlY1 = yL1 + 150;

    let controlX2 = xM - 120;
    let controlY2 = yM + 60;

    // ------ PARTIE DEVANT DU PATRON ------

    // BC = AD (même hauteur du patron)
    let xC = xB;
    let yC = yD;

    // CB1 = longueur cou-taille mesurée devant
    let xB1 = xC;
    let yB1 = yB - ((poitrine / 12 + 1) / 2) * ptsPerCm;

    // B1J = 1/12 tour de poitrine + 1 cm (profondeur d'encolure)
    let xJ = xB1;
    let yJ = yB + ((poitrine / 12 + 1) / 2) * ptsPerCm;

    // B1K = 1/12 tour de poitrine (point de départ de l'épaule)
    let xK = xB1 - (poitrine / 12) * ptsPerCm;
    let yK = yB1;

    // B1N = 1/2 carrure – 1 cm
    let xN = xB1 - (carrure / 2 - 1) * ptsPerCm;
    let yN = yB1;

    // F2F3 = FF1 = 1/4 tour de buste + aisance (2cm)
    let xF3 = xF1;
    let yF3 = yF1;

    // NL2 = descendre de 6,5 cm
    let xL2 = xN;
    let yL2 = yN + 6.5 * ptsPerCm;

    // CD2 = 1/4 tour de taille + aisance
    let xD2 = xC - (tourTaille / 4 + 2) * ptsPerCm;
    let yD2 = yC;

    // NP = perpendiculaire à F2F3, P étant le point d'intersection
    let xP = xN;
    let yP = yF1;

    // PQ = remonter de 5 cm
    let xQ = xP;
    let yQ = yP - 5 * ptsPerCm;

    // QQ1 = aller vers la gauche de 0,3 cm
    let xQ1 = xQ - 0.3 * ptsPerCm;
    let yQ1 = yQ;

    let xL3 = xL2 - 2 * ptsPerCm;
    let yL3 = yL2;

    // Point de contrôle pour la courbe d'emmanchure
    let controlX3 = (xL3 + xQ) / 2 - 4;
    let controlY3 = yL3 + 30;

    let controlX4 = xQ + 100;
    let controlY4 = yQ + 40;

    const widthMax = Math.max(xA, xB, xD, xE, xF, xH, xI, xL, xM) / ptsPerCm;
    console.log("widthMax en points:", widthMax);
    const heightMax =
      Math.max(yA, yB, yD, yE, yF, yH, yI, yK, yL, yM) / ptsPerCm;

    console.log("heightMax :", heightMax, yK);

    let svg = `
    <svg xmlns="http://www.w3.org/2000/svg" 
        width="${widthMax}cm" 
        height="${heightMax}cm" 
        viewBox="0 0 21cm 29.7cm">
    

      <!-- **********************Partie DOS du patron********************** -->


      <!-- AB: Ligne horizontale en haut -->
      <line x1="${xA}" y1="${yA}" x2="${xB}" y2="${yB}" stroke="blue" stroke-width="2"/>
      
      <!-- AD: Ligne verticale à gauche -->
      <line x1="${xA}" y1="${yA}" x2="${xD}" y2="${yD}" stroke="red" stroke-width="2"/>
      
      <!-- Encolure: G à E -->
      <path d="M${xG} ${yG} Q${
      (xG + xE) / 2
    } ${yE}, ${xE} ${yE}" fill="none" stroke="purple" stroke-width="2"/>
      
      <!-- Ligne AE -->
      <line x1="${xA}" y1="${yA}" x2="${xE}" y2="${yE}" stroke="green" stroke-width="2" stroke-dasharray="5,5"/>
      
      <!-- Ligne E jusqu'à E1 -->
      <line x1="${xE}" y1="${yE}" x2="${xE1}" y2="${yE1}" stroke="green" stroke-width="2"/>
      
      <!-- Ligne d'épaule G à L1 -->
      <line x1="${xG}" y1="${yG}" x2="${xL1}" y2="${yL1}" stroke="orange" stroke-width="2"/>
      
      <!-- Ligne hauteur d'emmanchure A à F -->
      <line x1="${xA}" y1="${yA}" x2="${xF}" y2="${yF}" stroke="green" stroke-width="2" stroke-dasharray="5,5"/>
      
      <!-- Ligne F à F1 (largeur à hauteur d'emmanchure) -->
      <line x1="${xF}" y1="${yF}" x2="${xF1}" y2="${yF1}" stroke="brown" stroke-width="2"/>
      
      <!-- Ligne D à D1 (largeur en bas) -->
      <line x1="${xD}" y1="${yD}" x2="${xD1}" y2="${yD1}" stroke="blue" stroke-width="2"/>
      
      <!-- Ligne de côté F1 à D1 -->
      <line x1="${xF1}" y1="${yF1}" x2="${xD1}" y2="${yD1}" stroke="green" stroke-width="2"/>
      
      <!-- Ligne H à L (descente de 4.5cm) -->
      <line x1="${xH}" y1="${yH}" x2="${xL}" y2="${yL}" stroke="purple" stroke-width="2" stroke-dasharray="5,5"/>
      
      <!-- Ligne H à I (perpendiculaire) -->
      <line x1="${xH}" y1="${yH}" x2="${xI}" y2="${yI}" stroke="purple" stroke-width="2" stroke-dasharray="5,5"/>
      
      <!-- Point M (à partir de I) -->
      <circle cx="${xM}" cy="${yM}" r="3" fill="red"/>
      
      <!-- Emmanchure: courbe de L1 à F1 -->
      <path d="M${xL1} ${yL1} C${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${xF1} ${yF1}" fill="none" stroke="red" stroke-width="2"/>



      <!-- **********************PARTIE DEVANT du patron********************** -->


      <!-- JC: Ligne verticale à droite -->
      <line x1="${xJ}" y1="${yJ}" x2="${xC}" y2="${yC}" stroke="red" stroke-width="2"/>
      
      <!-- CB1: Ligne verticale (normalement pas nécessaire car B1 = B) -->
      <line x1="${xC}" y1="${yC}" x2="${xB1}" y2="${yB1}" stroke="red" stroke-width="2" stroke-dasharray="5,5"/>
      
      <!-- Encolure avant: K à J -->
      <path d="M${xK} ${yK} Q${xK + 3} ${
      yK + 3
    }, ${xJ} ${yJ}" fill="none" stroke="purple" stroke-width="2"/>
      
      <!-- Ligne NL2 -->
      <line x1="${xN}" y1="${yN}" x2="${xL2}" y2="${yL2}" stroke="purple" stroke-width="2" stroke-dasharray="5,5"/>
      
      <!-- Ligne d'épaule K à L3 -->
      <line x1="${xK}" y1="${yK}" x2="${xL3}" y2="${yL3}" stroke="orange" stroke-width="2"/>
      
      <!-- Ligne C à D2 (largeur en bas) -->
      <line x1="${xC}" y1="${yC}" x2="${xD2}" y2="${yD2}" stroke="blue" stroke-width="2"/>
      
      <!-- Ligne de côté F3 à D2 -->
      <line x1="${xF3}" y1="${yF3}" x2="${xD2}" y2="${yD2}" stroke="green" stroke-width="2"/>
  
      
      <!-- Emmanchure avant: courbe de L3 à Q1 à F3 -->
      <path d="M${xL3} ${yL3} C${controlX3} ${controlY3}, ${controlX4} ${controlY4}, ${xF3} ${yF3}" fill="none" stroke="red" stroke-width="2"/>
      <!-- Point M (à partir de I) -->
      <circle cx="${controlX3}" cy="${controlY3}" r="3" fill="black"/>
      <circle cx="${controlX4}" cy="${controlY4}" r="3" fill="brown"/>
      
    </svg>
    `;

    return svg;
  };
  // Ancien nom : SVGToJPG
  const generatePDFfromSVG = async (svg) => {
    try {
      const responseBase64 = await convertSvgToPdf(svg); // Appelle ton backend

      const fileUri = FileSystem.documentDirectory + "patron.pdf";

      await FileSystem.writeAsStringAsync(fileUri, responseBase64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      await Sharing.shareAsync(fileUri);
    } catch (error) {
      console.error("Erreur de génération du PDF", error);
    }
  };

  const saveAsPDF = async () => {
    console.log("saveAsPDF called");
    const svg = await TracerPatron();
    //console.log("SVG généré", svg);
    await generatePDFfromSVG(svg); // nouveau nom de fonction
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Patron T-Shirt</Text>

        <TextInput
          style={styles.input}
          placeholder="Taille (hauteur totale en cm)"
          keyboardType="numeric"
          value={taille ? taille.toString() : ""}
          onChangeText={(text) => setTaille(Number(text))}
        />

        <TextInput
          style={styles.input}
          placeholder="Tour de poitrine (cm)"
          keyboardType="numeric"
          value={poitrine ? poitrine.toString() : ""}
          onChangeText={(text) => setPoitrine(Number(text))}
        />

        <TextInput
          style={styles.input}
          placeholder="Hauteur dos (base du cou à la taille en cm)"
          keyboardType="numeric"
          value={longueurDos ? longueurDos.toString() : ""}
          onChangeText={(text) => setLongueurDos(Number(text))}
        />

        <TextInput
          style={styles.input}
          placeholder="Tour de buste (cm)"
          keyboardType="numeric"
          value={buste ? buste.toString() : ""}
          onChangeText={(text) => setBuste(Number(text))}
        />

        <TextInput
          style={styles.input}
          placeholder="Distance entre les épaules (cm)"
          keyboardType="numeric"
          value={distanceEpaules ? distanceEpaules.toString() : ""}
          onChangeText={(text) => setDistanceEpaules(Number(text))}
        />

        <TextInput
          style={styles.input}
          placeholder="Carrure - largeur du dos (cm)"
          keyboardType="numeric"
          value={carrure ? carrure.toString() : ""}
          onChangeText={(text) => setCarrure(Number(text))}
        />

        <TextInput
          style={styles.input}
          placeholder="Tour de taille (cm)"
          keyboardType="numeric"
          value={tourTaille ? tourTaille.toString() : ""}
          onChangeText={(text) => setTourTaille(Number(text))}
        />
        <TextInput
          style={styles.input}
          placeholder="Longueur cou taille (cm)"
          keyboardType="numeric"
          value={longueurDevant ? longueurDevant.toString() : ""}
          onChangeText={(text) => setLongueurDevant(Number(text))}
        />
        <Button title="Télécharger en PDF" onPress={saveAsPDF} />
        <Button
          title="Télécharger Avec Mensurations"
          onPress={setMensurations}
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

export default Patron;
