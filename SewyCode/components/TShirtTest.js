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
import Svg, { Rect, Line, Path, Circle } from "react-native-svg";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import * as Print from "expo-print";

export function TShirtTest() {
  const [taille, setTaille] = useState(0); // Hauteur totale (tête aux pieds)
  const [poitrine, setPoitrine] = useState(0); // Tour de poitrine
  const [longueurDos, setLongueurDos] = useState(0); // Hauteur dos (base du cou à la taille)
  const [buste, setBuste] = useState(0); // Tour de buste
  const [distanceEpaules, setDistanceEpaules] = useState(0); // Distance entre les deux épaules
  const [carrure, setCarrure] = useState(0); // Largeur du dos sous les aisselles
  const [tourTaille, setTourTaille] = useState(0); // Tour de taille
  const [longueurDevant, setLongueurDevant] = useState(0);

  const saveAsPDF = async () => {
    // Définition de l'échelle pour le PDF
    const a4Width = 21; // largeur A4 en cm
    const a4Height = 29.7; // hauteur A4 en cm
    const ptsPerCm = 72 / 2.54; // conversion cm en points
    const a4WidthPts = a4Width * ptsPerCm;
    const a4HeightPts = a4Height * ptsPerCm;

    // ------ PARTIE DOS DU PATRON ------

    // Point A - Point de départ en haut à gauche
    let xA = 50;
    let yA = 50;

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
    // BF2 = AF (même hauteur d'emmanchure)
    let xF2 = xB;
    let yF2 = yF;

    // BC = AD (même hauteur du patron)
    let xC = xB;
    let yC = yD;

    // CB1 = longueur cou-taille mesurée devant
    let xB1 = xC;
    let yB1 = yB;

    // B1J = 1/12 tour de poitrine + 1 cm (profondeur d'encolure)
    let xJ = xB1 - (poitrine / 12 + 1) * ptsPerCm;
    let yJ = yB1;

    // B1K = 1/12 tour de poitrine (point de départ de l'épaule)
    let xK = xB1 - (poitrine / 12) * ptsPerCm;
    let yK = yB1;

    // B1N = 1/2 carrure – 1 cm
    let xN = xB1 - (carrure / 2 - 1) * ptsPerCm;
    let yN = yB1;

    // F2F3 = FF1 = 1/4 tour de buste + aisance (2cm)
    let xF3 = xF2 - (buste / 4 + 2) * ptsPerCm;
    let yF3 = yF2;

    // NL2 = descendre de 6,5 cm
    let xL2 = xN;
    let yL2 = yN + 6.5 * ptsPerCm;

    // CD2 = 1/4 tour de taille + aisance
    let xD2 = xC - (tourTaille / 4 + 2) * ptsPerCm;
    let yD2 = yC;

    // NP = perpendiculaire à F2F3, P étant le point d'intersection
    let xP = xN;
    let yP = yF2;

    // PQ = remonter de 5 cm
    let xQ = xP;
    let yQ = yP - 5 * ptsPerCm;

    // QQ1 = aller vers la gauche de 0,3 cm
    let xQ1 = xQ - 0.3 * ptsPerCm;
    let yQ1 = yQ;

    // KL3 = GL1 (même distance pour l'épaule avant que pour l'épaule arrière)
    let distanceGL1 = Math.sqrt(Math.pow(xG - xL1, 2) + Math.pow(yG - yL1, 2));
    let angle = Math.atan2(yL1 - yG, xL1 - xG);
    // Pour KL3, on utilisera l'angle mais dans la direction opposée (de K vers L3)
    let xL3 = xK + distanceGL1 * Math.cos(-angle);
    let yL3 = yK + distanceGL1 * Math.sin(-angle);

    // Points de contrôle pour la courbe d'encolure avant (KJ)
    let controlEncolureX = (xK + xJ) / 2;
    let controlEncolureY = yK + 5 * ptsPerCm;

    // Points de contrôle pour la courbe d'emmanchure avant (L3 à Q1 à F3)
    let controlAvantX1 = (xL3 + xQ1) / 2 + 4;
    let controlAvantY1 = yL3 + 150;

    let controlAvantX2 = xQ1 + 120;
    let controlAvantY2 = yQ1 + 60;

    // Calculer les dimensions totales du patron
    let minX = Math.min(xA, xD, xF, xF3, xD2);
    let maxX = Math.max(xB, xB1, xC, xF1, xD1);
    let minY = Math.min(yA, yB, yG, yK);
    let maxY = Math.max(yD, yC, yD1, yD2);

    let widthTotal = maxX - minX + 100; // Ajouter une marge
    let heightTotal = maxY - minY + 100; // Ajouter une marge

    // Calculer combien de pages sont nécessaires
    let pagesHorizontal = Math.ceil(widthTotal / a4WidthPts);
    let pagesVertical = Math.ceil(heightTotal / a4HeightPts);

    // Créer le contenu HTML pour toutes les pages
    let htmlContent = `
    <html>
    <head>
    </head>
    <body>`;

    htmlContent += `
       
            <svg xmlns="http://www.w3.org/2000/svg" width="${widthTotal}px" height="${heightTotal}px" viewBox="0 0 ${widthTotal} ${heightTotal}">
              <!-- Partie DOS du patron -->
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
              
              <!-- Points de référence du dos -->
              <circle cx="${xA}" cy="${yA}" r="3" fill="blue"/> <text x="${
      xA - 10
    }" y="${yA - 10}" fill="blue">A</text>
              <circle cx="${xB}" cy="${yB}" r="3" fill="blue"/> <text x="${
      xB + 10
    }" y="${yB - 10}" fill="blue">B</text>
              <circle cx="${xD}" cy="${yD}" r="3" fill="red"/> <text x="${
      xD - 20
    }" y="${yD + 10}" fill="red">D</text>
              <circle cx="${xD1}" cy="${yD1}" r="3" fill="blue"/> <text x="${
      xD1 + 10
    }" y="${yD1 + 10}" fill="blue">D1</text>
              <circle cx="${xE}" cy="${yE}" r="3" fill="green"/> <text x="${
      xE - 20
    }" y="${yE + 5}" fill="green">E</text>
              <circle cx="${xE1}" cy="${yE1}" r="3" fill="green"/> <text x="${
      xE1 - 20
    }" y="${yE1 + 5}" fill="green">E1</text>
              <circle cx="${xF}" cy="${yF}" r="3" fill="brown"/> <text x="${
      xF - 20
    }" y="${yF + 5}" fill="brown">F</text>
              <circle cx="${xF1}" cy="${yF1}" r="3" fill="brown"/> <text x="${
      xF1 + 10
    }" y="${yF1 + 5}" fill="brown">F1</text>
              <circle cx="${xG}" cy="${yG}" r="3" fill="orange"/> <text x="${xG}" y="${
      yG - 10
    }" fill="orange">G</text>
              <circle cx="${xH}" cy="${yH}" r="3" fill="purple"/> <text x="${
      xH - 5
    }" y="${yH - 10}" fill="purple">H</text>
              <circle cx="${xI}" cy="${yI}" r="3" fill="purple"/> <text x="${
      xI + 10
    }" y="${yI - 10}" fill="purple">I</text>
              <circle cx="${xL}" cy="${yL}" r="3" fill="purple"/> <text x="${
      xL - 20
    }" y="${yL + 5}" fill="purple">L</text>
              <circle cx="${xL1}" cy="${yL1}" r="3" fill="orange"/> <text x="${xL1}" y="${
      yL1 - 10
    }" fill="orange">L1</text>
              <circle cx="${xM}" cy="${yM}" r="3" fill="red"/> <text x="${
      xM + 10
    }" y="${yM + 5}" fill="red">M</text>
              
              <!-- PARTIE DEVANT du patron -->
              <!-- BC: Ligne verticale à droite -->
              <line x1="${xB}" y1="${yB}" x2="${xC}" y2="${yC}" stroke="red" stroke-width="2"/>
              
              <!-- CB1: Ligne verticale (normalement pas nécessaire car B1 = B) -->
              <line x1="${xC}" y1="${yC}" x2="${xB1}" y2="${yB1}" stroke="red" stroke-width="2" stroke-dasharray="5,5"/>
              
              <!-- Encolure avant: K à J -->
              <path d="M${xK} ${yK} Q${controlEncolureX} ${controlEncolureY}, ${xJ} ${yJ}" fill="none" stroke="purple" stroke-width="2"/>
              
              <!-- Ligne B1J -->
              <line x1="${xB1}" y1="${yB1}" x2="${xJ}" y2="${yJ}" stroke="green" stroke-width="2" stroke-dasharray="5,5"/>
              
              <!-- Ligne B1K -->
              <line x1="${xB1}" y1="${yB1}" x2="${xK}" y2="${yK}" stroke="green" stroke-width="2" stroke-dasharray="5,5"/>
              
              <!-- Ligne B1N -->
              <line x1="${xB1}" y1="${yB1}" x2="${xN}" y2="${yN}" stroke="purple" stroke-width="2" stroke-dasharray="5,5"/>
              
              <!-- Ligne NL2 -->
              <line x1="${xN}" y1="${yN}" x2="${xL2}" y2="${yL2}" stroke="purple" stroke-width="2" stroke-dasharray="5,5"/>
              
              <!-- Ligne d'épaule K à L3 -->
              <line x1="${xK}" y1="${yK}" x2="${xL3}" y2="${yL3}" stroke="orange" stroke-width="2"/>
              
              <!-- Ligne hauteur d'emmanchure B à F2 -->
              <line x1="${xB}" y1="${yB}" x2="${xF2}" y2="${yF2}" stroke="green" stroke-width="2" stroke-dasharray="5,5"/>
              
              <!-- Ligne F2 à F3 (largeur à hauteur d'emmanchure) -->
              <line x1="${xF2}" y1="${yF2}" x2="${xF3}" y2="${yF3}" stroke="brown" stroke-width="2"/>
              
              <!-- Ligne C à D2 (largeur en bas) -->
              <line x1="${xC}" y1="${yC}" x2="${xD2}" y2="${yD2}" stroke="blue" stroke-width="2"/>
              
              <!-- Ligne de côté F3 à D2 -->
              <line x1="${xF3}" y1="${yF3}" x2="${xD2}" y2="${yD2}" stroke="green" stroke-width="2"/>
              
              <!-- Ligne NP (perpendiculaire) -->
              <line x1="${xN}" y1="${yN}" x2="${xP}" y2="${yP}" stroke="purple" stroke-width="2" stroke-dasharray="5,5"/>
              
              <!-- Ligne PQ (remonter de 5cm) -->
              <line x1="${xP}" y1="${yP}" x2="${xQ}" y2="${yQ}" stroke="purple" stroke-width="2" stroke-dasharray="5,5"/>
              
              <!-- Ligne QQ1 (aller vers la gauche de 0.3cm) -->
              <line x1="${xQ}" y1="${yQ}" x2="${xQ1}" y2="${yQ1}" stroke="purple" stroke-width="2" stroke-dasharray="5,5"/>
              
              <!-- Emmanchure avant: courbe de L3 à Q1 à F3 -->
              <path d="M${xL3} ${yL3} C${controlAvantX1} ${controlAvantY1}, ${controlAvantX2} ${controlAvantY2}, ${xF3} ${yF3}" fill="none" stroke="red" stroke-width="2"/>
              
              <!-- Points de référence du devant -->
              <circle cx="${xB1}" cy="${yB1}" r="3" fill="blue"/> <text x="${
      xB1 + 10
    }" y="${yB1 - 10}" fill="blue">B1</text>
              <circle cx="${xC}" cy="${yC}" r="3" fill="red"/> <text x="${
      xC + 20
    }" y="${yC + 10}" fill="red">C</text>
              <circle cx="${xD2}" cy="${yD2}" r="3" fill="blue"/> <text x="${
      xD2 - 10
    }" y="${yD2 + 10}" fill="blue">D2</text>
              <circle cx="${xF2}" cy="${yF2}" r="3" fill="brown"/> <text x="${
      xF2 + 20
    }" y="${yF2 + 5}" fill="brown">F2</text>
              <circle cx="${xF3}" cy="${yF3}" r="3" fill="brown"/> <text x="${
      xF3 - 10
    }" y="${yF3 + 5}" fill="brown">F3</text>
              <circle cx="${xJ}" cy="${yJ}" r="3" fill="green"/> <text x="${
      xJ - 5
    }" y="${yJ - 10}" fill="green">J</text>
              <circle cx="${xK}" cy="${yK}" r="3" fill="orange"/> <text x="${
      xK - 5
    }" y="${yK - 10}" fill="orange">K</text>
              <circle cx="${xL2}" cy="${yL2}" r="3" fill="purple"/> <text x="${
      xL2 + 20
    }" y="${yL2 + 5}" fill="purple">L2</text>
              <circle cx="${xL3}" cy="${yL3}" r="3" fill="orange"/> <text x="${
      xL3 - 5
    }" y="${yL3 - 10}" fill="orange">L3</text>
              <circle cx="${xN}" cy="${yN}" r="3" fill="purple"/> <text x="${
      xN + 5
    }" y="${yN - 10}" fill="purple">N</text>
              <circle cx="${xP}" cy="${yP}" r="3" fill="purple"/> <text x="${
      xP + 10
    }" y="${yP + 5}" fill="purple">P</text>
              <circle cx="${xQ}" cy="${yQ}" r="3" fill="purple"/> <text x="${
      xQ + 10
    }" y="${yQ - 10}" fill="purple">Q</text>
              <circle cx="${xQ1}" cy="${yQ1}" r="3" fill="red"/> <text x="${
      xQ1 - 10
    }" y="${yQ1 - 10}" fill="red">Q1</text>
            </svg>
        `;

    `
    </body>
    </html>`;

    // Génération et partage du PDF
    const file = await printToFileAsync({
      html: htmlContent,
      base64: false,
      margins: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    });
    await shareAsync(file.uri);
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

export default TShirtTest;
