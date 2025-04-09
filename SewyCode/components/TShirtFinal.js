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
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { encode } from "base64-arraybuffer";

export function TShirtFinal() {
  const [taille, setTaille] = useState(0);
  const [poitrine, setPoitrine] = useState(0);
  const [longueurDos, setLongueurDos] = useState(0);
  const [buste, setBuste] = useState(0);
  const [distanceEpaules, setDistanceEpaules] = useState(0);
  const [carrure, setCarrure] = useState(0);
  const [tourTaille, setTourTaille] = useState(0);
  const [longueurDevant, setLongueurDevant] = useState(0);

  const setDefaultMeasurements = () => {
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

  const calculatePDFDimensions = () => {
    const a4Width = 21;
    const a4Height = 29.7;
    const ptsPerCm = 72 / 2.54;
    return {
      widthPts: a4Width * ptsPerCm,
      heightPts: a4Height * ptsPerCm,
    };
  };

  const drawLine = (
    pdfDoc,
    page,
    x1,
    y1,
    x2,
    y2,
    thickness,
    color,
    dimensions
  ) => {
    const { widthPts, heightPts } = dimensions;

    // Si la ligne dépasse en largeur ou hauteur
    const needsNewPageHorizontally = x2 > widthPts;
    const needsNewPageVertically = y2 > heightPts;

    if (!needsNewPageHorizontally && !needsNewPageVertically) {
      // Ligne normale
      page.drawLine({
        start: { x: x1, y: y1 },
        end: { x: x2, y: y2 },
        thickness,
        color,
      });
      return page;
    }

    // Tronquons la ligne sur la première page
    let finalX = Math.min(x2, widthPts);
    let finalY = Math.min(y2, heightPts);

    page.drawLine({
      start: { x: x1, y: y1 },
      end: { x: finalX, y: finalY },
      thickness,
      color,
    });

    // Créer une nouvelle page
    const newPage = pdfDoc.addPage([widthPts, heightPts]);

    // Calcul du point de reprise sur la nouvelle page
    const remainingX = needsNewPageHorizontally ? x2 - widthPts : x2;
    const remainingY = needsNewPageVertically ? y2 - heightPts : y2;

    // Tracer la suite sur la nouvelle page
    newPage.drawLine({
      start: { x: 0, y: 0 },
      end: {
        x: needsNewPageHorizontally ? remainingX : x2,
        y: needsNewPageVertically ? remainingY : y2,
      },
      thickness,
      color,
    });

    return newPage;
  };

  const drawPattern = (pdfDoc, page, dimensions) => {
    const { widthPts, heightPts } = dimensions;
    const ptsPerCm = 72 / 2.54; // Points par cm
    // Point A - Point de départ en haut à gauche
    let xA = 0;
    let yA = 0;

    // AB = tour de buste/2 + 4 cm d'aisance
    let xB = xA + (buste / 2 + 4) * ptsPerCm;
    let yB = yA;

    console.log("xB", xB);
    console.log("Buste", buste);

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

    // Add more drawing logic here...
    try {
      page = drawLine(
        pdfDoc,
        page,
        x1,
        y1,
        x2,
        y2,
        1,
        rgb(0, 0, 0),
        dimensions
      );
    } catch (error) {
      console.error("Error drawing line:", error);
    }
  };

  const saveAsPDF = async () => {
    const dimensions = calculatePDFDimensions();
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([dimensions.widthPts, dimensions.heightPts]);

    drawPattern(pdfDoc, page, dimensions);

    const pdfBytes = await pdfDoc.save();
    const pdfBase64 = encode(pdfBytes);
    const fileUri = FileSystem.cacheDirectory + "pattern.pdf";
    await FileSystem.writeAsStringAsync(fileUri, pdfBase64, {
      encoding: FileSystem.EncodingType.Base64,
    });

    await shareAsync(fileUri);
  };
  const drawSquareLib = async () => {
    const dimensions = calculatePDFDimensions();
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([dimensions.widthPts, dimensions.heightPts]);

    page.drawSquare({
      x: 20,
      y: 20,
      size: 141.73,
      borderWidth: 2,
      color: rgb(1, 1, 1),
    });

    const pdfBytes = await pdfDoc.save();
    const pdfBase64 = encode(pdfBytes);
    const fileUri = FileSystem.cacheDirectory + "pattern.pdf";
    await FileSystem.writeAsStringAsync(fileUri, pdfBase64, {
      encoding: FileSystem.EncodingType.Base64,
    });

    await shareAsync(fileUri);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>TShirtFinal</Text>
        <TextInput
          style={styles.input}
          placeholder="Hauteur totale (cm)"
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
          placeholder="Hauteur dos (cm)"
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
          onPress={setDefaultMeasurements}
        />
        <Button title="Carré PDF Lib" onPress={drawSquareLib} />
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

export default TShirtFinal;
