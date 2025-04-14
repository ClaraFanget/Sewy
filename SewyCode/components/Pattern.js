/**
 * Le composant Pattern permet de générer un patron de couture à partir
 * des mensurations de l'utilisateur. Il peut saisir ses mensurations
 * manuellement ou récupérer celles rentrées dans son profil automatiquement grâce à l'API.
 * Le patron est tracé en SVG en respectant les proportions réelles, puis
 * converti en fichier PDF côté backend afin d'être téléchargé ou imprimé par l'utilisateur.
 */

import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { convertSvgToPdf, getUtilisateur } from "../services/api";
import { useUser } from "../context/UserContext";

export function Pattern() {
  const { user } = useUser();
  const [taille, setTaille] = useState(0);
  const [poitrine, setPoitrine] = useState(0);
  const [longueurDos, setLongueurDos] = useState(0);
  const [buste, setBuste] = useState(0);
  const [distanceEpaules, setDistanceEpaules] = useState(0);
  const [carrure, setCarrure] = useState(0);
  const [tourTaille, setTourTaille] = useState(0);
  const [longueurDevant, setLongueurDevant] = useState(0);
  const [pdfReady, setPdfReady] = useState(false);

  useEffect(() => {
    if (pdfReady) {
      saveAsPDF();
      setPdfReady(false);
    }
  }, [pdfReady]);

  //setMensurations permet de récupérer les mensurations de l'utilisateur qu'il avait enregistré
  const setMensurations = async () => {
    try {
      const utilisateurData = await getUtilisateur(user.id);
      const mensurations = utilisateurData.mensurations;
      setTaille(String(mensurations.taille));
      setPoitrine(String(mensurations.poitrine));
      setLongueurDos(String(mensurations.longueurDos));
      setBuste(String(mensurations.buste));
      setDistanceEpaules(String(mensurations.distanceEpaules));
      setCarrure(String(mensurations.carrure));
      setTourTaille(String(mensurations.tourTaille));
      setLongueurDevant(String(mensurations.longueurDevant));
      setPdfReady(true);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };

  //TracerPatron permet de tracer le SVG du patron de couture
  const TracerPatron = async () => {
    //Afin de conserver l'échelle je converti les centimètres rentrés par l'utilisateurs en point d'impression
    const ptsPerCm = 72 / 2.54;

    let xDebut = 0;
    let yDebut = 0;

    // ------ PARTIE DOS DU PATRON ------

    let xA = 0;
    let yA = ((poitrine / 12 + 1) / 2) * ptsPerCm;

    let xB = xA + (buste / 2 + 4) * ptsPerCm;
    let yB = yA;

    let xD = xA;
    let yD = yA + longueurDos * ptsPerCm;

    let xE = xA;
    let yE = yA + (poitrine / 48 + 0.2) * ptsPerCm;

    let xE1 = xE;
    let yE1 = yE + 4.5 * ptsPerCm;

    let hauteurEmmanchure = (taille / 8 + poitrine / 48 + 1.7) * ptsPerCm;
    let xF = xA;
    let yF = yA + hauteurEmmanchure;

    let xG = xA + (poitrine / 12) * ptsPerCm;
    let yG = yA;

    let xH = xA + (carrure / 2) * ptsPerCm;
    let yH = yA;

    let xF1 = xF + (buste / 4 + 2) * ptsPerCm;
    let yF1 = yF;

    let xD1 = xD + (tourTaille / 4 + 2) * ptsPerCm;
    let yD1 = yD;

    let xI = xH;
    let yI = yF;

    let xL = xH;
    let yL = yE1;

    let xL1 = xE1 + (distanceEpaules / 2) * ptsPerCm;
    let yL1 = yE1;

    let xM = xI + 0.3 * ptsPerCm;
    let yM = yI - 5 * ptsPerCm;

    let controlX1 = (xL1 + xM) / 2 - 4;
    let controlY1 = yL1 + 150;

    let controlX2 = xM - 120;
    let controlY2 = yM + 60;

    // ------ PARTIE DEVANT DU PATRON ------

    let xC = xB;
    let yC = yD;

    let xB1 = xC;
    let yB1 = 0;

    let xJ = xB1;
    let yJ = yB + ((poitrine / 12 + 1) / 2) * ptsPerCm;

    let xK = xB1 - (poitrine / 12) * ptsPerCm;
    let yK = yB1;

    let xN = xB1 - (carrure / 2 - 1) * ptsPerCm;
    let yN = 0;

    let xF3 = xF1;
    let yF3 = yF1;

    let xL2 = xN;
    let yL2 = yN + 6.5 * ptsPerCm;

    let xD2 = xC - (tourTaille / 4 + 2) * ptsPerCm;
    let yD2 = yC;

    let xP = xN;
    let yP = yF1;

    let xQ = xP;
    let yQ = yP - 5 * ptsPerCm;

    let xQ1 = xQ - 0.3 * ptsPerCm;
    let yQ1 = yQ;

    let xL3 = xL2 - 2 * ptsPerCm;
    let yL3 = yL2;

    let controlX3 = (xL3 + xQ) / 2 - 4;
    let controlY3 = yL3 + 30;

    let controlX4 = xQ + 100;
    let controlY4 = yQ + 40;

    const widthMax =
      Math.max(xDebut, xA, xB, xD, xE, xF, xH, xI, xL, xM) / ptsPerCm + 3; //J'ai rajouté une marge de 3 afin que le trait à la limite soit bien visible
    const heightMax =
      Math.max(yDebut, yA, yB, yD, yE, yF, yH, yI, yK, yL, yM) / ptsPerCm + 3; //J'ai rajouté une marge de 3 afin que le trait à la limite soit bien visible

    let svg = `
    <svg xmlns="http://www.w3.org/2000/svg" 
        width="${widthMax}cm" 
        height="${heightMax}cm" 
        viewBox="0 0 21cm 29.7cm">
    

      <!-- **********************Partie DOS du patron********************** -->


      <!-- AB -->
      <line x1="${xA}" y1="${yA}" x2="${xB}" y2="${yB}" stroke="black" stroke-width="2"/>
      
      <!-- AD-->
      <line x1="${xA}" y1="${yA}" x2="${xD}" y2="${yD}" stroke="black" stroke-width="2"/>
      
      <!-- GE -->
      <path d="M${xG} ${yG} Q${
      (xG + xE) / 2
    } ${yE}, ${xE} ${yE}" fill="none" stroke="black" stroke-width="2"/>
      
      <!-- EE1 -->
      <line x1="${xE}" y1="${yE}" x2="${xE1}" y2="${yE1}" stroke="black" stroke-width="2"/>
      
      <!-- GL1 -->
      <line x1="${xG}" y1="${yG}" x2="${xL1}" y2="${yL1}" stroke="black" stroke-width="2"/>
      
      <!-- FF1 -->
      <line x1="${xF}" y1="${yF}" x2="${xF1}" y2="${yF1}" stroke="black" stroke-width="2"/>
      
      <!-- DD1 -->
      <line x1="${xD}" y1="${yD}" x2="${xD1}" y2="${yD1}" stroke="black" stroke-width="2"/>
      
      <!-- F1D1 -->
      <line x1="${xF1}" y1="${yF1}" x2="${xD1}" y2="${yD1}" stroke="black" stroke-width="2"/>
        
      <!-- L1F1 -->
      <path d="M${xL1} ${yL1} C${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${xF1} ${yF1}" fill="none" stroke="black" stroke-width="2"/>



      <!-- **********************PARTIE DEVANT du patron********************** -->


      <!-- JC -->
      <line x1="${xJ}" y1="${yJ}" x2="${xC}" y2="${yC}" stroke="black" stroke-width="2"/>
      
      <!-- KJ -->
      <path d="M${xK} ${yK} Q${xK} ${yJ}, ${xJ} ${yJ}" fill="none" stroke="black" stroke-width="2"/>
    
      <!-- KL3 -->
      <line x1="${xK}" y1="${yK}" x2="${xL3}" y2="${yL3}" stroke="black" stroke-width="2"/>
      
      <!-- CD2 -->
      <line x1="${xC}" y1="${yC}" x2="${xD2}" y2="${yD2}" stroke="black" stroke-width="2"/>
      
      <!-- F3D2 -->
      <line x1="${xF3}" y1="${yF3}" x2="${xD2}" y2="${yD2}" stroke="black" stroke-width="2"/>
      
      <!-- L3F3 -->
      <path d="M${xL3} ${yL3} C${controlX3} ${controlY3}, ${controlX4} ${controlY4}, ${xF3} ${yF3}" fill="none" stroke="black" stroke-width="2"/>
      
    </svg>
    `;

    return svg;
  };

  //generatePDFfromSVG permet de convertir le SVG généré dans TracerPatron grâce au backend
  const generatePDFfromSVG = async (svg) => {
    try {
      const responseBase64 = await convertSvgToPdf(svg);

      const fileUri = FileSystem.documentDirectory + "patron.pdf";

      await FileSystem.writeAsStringAsync(fileUri, responseBase64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      await Sharing.shareAsync(fileUri);
    } catch (error) {
      console.error("Erreur de génération du PDF", error);
    }
  };
  //saveAsPDF permet de télécharger et d'imprimer le patron au format PDF
  const saveAsPDF = async () => {
    const svg = await TracerPatron();
    await generatePDFfromSVG(svg);
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

export default Pattern;
