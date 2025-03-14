//Ce composant est un formulaire qui permet de dessiner un rectangle. Il contient des champs pour la largeur et la longueur du rectangle. Lorsque l'utilisateur soumet le formulaire, un rectangle est dessiné avec les dimensions spécifiées. L'utilisateur peut également sauvegarder le rectangle en tant que fichier SVG ou le télécharger en tant que fichier PDF.
import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  Keyboard,
} from "react-native";
import Svg, { Rect } from "react-native-svg";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";

//Fonction permettant d'enregistrer un dessin SVG au format PDF. Elle prend en paramètre la largeur et la longueur du rectangle à dessiner.
/*const saveAsPDF = async ({ largeur, longueur }) => {
  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${largeur + 11}" height="${
    longueur + 11
  }">
      <rect x="10" y="10" width="${largeur}" height="${longueur}" stroke="black" stroke-width="2" fill="transparent"/>
    </svg>
  `;

  const htmlContent = `
    <html>
      <body>
        ${svgContent}
      </body>
    </html>
  `;

  try {
    const { uri } = await Print.printToFileAsync({ html: htmlContent });
    await shareAsync(uri, {
      mimeType: "application/pdf",
      dialogTitle: "Partager PDF",
    });
    Alert.alert("Succès", "Fichier PDF enregistré !");
  } catch (error) {
    console.error("Erreur PDF :", error);
    Alert.alert("Erreur", "Impossible de générer le PDF.");
  }
};*/

//Fonction permettant d'enregistrer un dessin SVG au format PDF. Elle prend en paramètre la largeur et la longueur du rectangle à dessiner.
const saveAsPDF = async ({ largeur, longueur }) => {
  // Conversion de cm en pixels (1 cm = 37.8 pixels à 96 DPI)
  const pixelToCm = 37.8;

  // Dimensions A4 en cm
  const largeurA4Cm = 21.0; // 21 cm de large
  const hauteurA4Cm = 29.7; // 29.7 cm de haut

  // Conversion en pixels
  const largeurA4 = largeurA4Cm * pixelToCm;
  const hauteurA4 = hauteurA4Cm * pixelToCm;

  // Marges en cm converties en pixels
  const margeCM = 1;
  const marge = margeCM * pixelToCm;

  // Espace disponible pour le contenu
  const largeurContenu = largeurA4 - marge * 2;
  const hauteurContenu = hauteurA4 - marge * 2;

  // Conversion des dimensions d'entrée (cm) en pixels
  const largeurPixels = largeur * pixelToCm;
  const longueurPixels = longueur * pixelToCm;

  // Calculer combien de pages sont nécessaires
  const pagesHorizontal = Math.ceil(largeurPixels / largeurContenu);
  const pagesVertical = Math.ceil(longueurPixels / hauteurContenu);
  const totalPages = pagesHorizontal * pagesVertical;

  // Générer le HTML avec plusieurs pages
  let htmlContent = "";

  for (let y = 0; y < pagesVertical; y++) {
    for (let x = 0; x < pagesHorizontal; x++) {
      // Position de départ pour cette "tranche" du rectangle
      const startX = x * largeurContenu;
      const startY = y * hauteurContenu;

      // Dimensions de cette partie du rectangle en pixels
      const partWidth = Math.min(largeurContenu, largeurPixels - startX);
      const partHeight = Math.min(hauteurContenu, longueurPixels - startY);

      // Créer un SVG qui montre seulement cette partie du rectangle
      const svgContent = `
        <svg width="${partWidth}" height="${partHeight}" viewBox="0 0 ${partWidth} ${partHeight}" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="${partWidth}" height="${partHeight}" fill="none" stroke="black" stroke-width="1" />
        </svg>
      `;

      // Ajouter une page avec cette partie du SVG
      htmlContent += `
        <div style="width: $ largeurA4Cm
    }cm; height: ${hauteurA4Cm}cm; padding: ${margeCM}cm; page-break-after: always;">
          ${svgContent}
          <div style="text-align: center; marge-top: 10px;">
            Page ${y * pagesHorizontal + x + 1}/${totalPages}
          </div>
        </div>
      `;
    }
  }

  try {
    const { uri } = await Print.printToFileAsync({
      html: htmlContent,
      width: 21, // Ensure width is a number
      height: 29, // Ensure height is a number
      base64: false,
    });

    await shareAsync(uri, {
      mimeType: "application/pdf",
      dialogTitle: "Partager PDF",
    });

    Alert.alert(
      "Succès",
      `Fichier PDF de ${totalPages} pages enregistré ! Dimensions: ${largeur}cm × ${longueur}cm`
    );
  } catch (error) {
    console.error("Erreur PDF :", error);
    Alert.alert("Erreur", "Impossible de générer le PDF.");
  }
};



const SvgForm = () => {
  const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");
  const [largeur, setLargeur] = useState(0);
  const [longueur, setLongueur] = useState(0);
  const [isDrawn, setIsDrawn] = useState(false);
  const [svgElement, setSvgElement] = useState(null);

  const handleDrawRect = () => {
    if (!largeur || !longueur) {
      Alert.alert("Erreur", "Tous les champs doivent être remplis.");
      return;
    }
    if (largeur < 0 || longueur < 0) {
      Alert.alert("Erreur", "Les valeurs doivent être positives.");
      return;
    }

    const rectangleSvg = (
      <Svg height="200" width="200">
        <Rect
          x="10"
          y="10"
          width={largeur}
          height={longueur}
          stroke="black"
          strokeWidth="2"
          fill="transparent"
        />
      </Svg>
    );

    setSvgElement(rectangleSvg);
    setIsDrawn(true);
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
      <Button title="Tracer" onPress={handleDrawRect} />
      <Button
        title="Télécharger en PDF"
        onPress={() => saveAsPDF({ largeur, longueur })}
      />

      {isDrawn && svgElement}
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

export default SvgForm;
