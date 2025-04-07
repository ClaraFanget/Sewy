//Ce composant est un formulaire qui permet de dessiner un rectangle. Il contient des champs pour la largeur et la longueur du rectangle. Lorsque l'utilisateur soumet le formulaire, un rectangle est dessiné avec les dimensions spécifiées. L'utilisateur peut également sauvegarder le rectangle en tant que fichier SVG ou le télécharger en tant que fichier PDF.
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  PixelRatio,
} from "react-native";
import Svg, { Rect } from "react-native-svg";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";

//Fonction permettant d'enregistrer un dessin SVG au format PDF. Elle prend en paramètre la largeur et la longueur du rectangle à dessiner.

const saveAsPDF = async () => {
  console.log("saveAsPDF called");
  const svgContent = `
    <svg width="${largeur + 11}" height="${longueur + 11}">
      <rect x="10" y="10" width="${largeur}" height="${longueur}" stroke="black" stroke-width="2" fill="black"/>
    </svg>
  `;

  const htmlContent = `
    <html>
      <body>
      <h1>Rectangle SVG</h1>
        ${svgContent}
      </body>
    </html>
  `;
  try {
    /*const { uri } = await Print.printToFileAsync({ html: htmlContent });
    await shareAsync(uri, {
      mimeType: "application/pdf",
      dialogTitle: "Partager PDF",
    });*/
    const file = await printToFileAsync({ html: htmlContent, base64: false });
    await shareAsync(file.uri);
    Alert.alert("Succès", "Fichier PDF enregistré !");
  } catch (error) {
    console.error("Erreur PDF :", error);
    Alert.alert("Erreur", "Impossible de générer le PDF.");
  }
};

/*//Fonction permettant d'enregistrer un dessin SVG au format PDF. Elle prend en paramètre la largeur et la longueur du rectangle à dessiner.
const saveAsPDF = async ({ largeur, longueur }) => {

  // Calculer combien de pages sont nécessaires
  const pagesHorizontal = Math.ceil(largeur / largeurContenu);
  const pagesVertical = Math.ceil(longueur / hauteurCo);
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
*/

const SvgForm = () => {
  const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");
  const [largeur, setLargeur] = useState(0);
  const [longueur, setLongueur] = useState(0);
  const [isDrawn, setIsDrawn] = useState(false);
  const [svgElement, setSvgElement] = useState(null);

  const cmToPx = (cm) => {
    // Densité de pixels de l'appareil
    const pixelRatio = PixelRatio.get();

    // On considère qu'une valeur de 1 cm = 37.8 pixels à une densité de 1
    // (Cette valeur est basée sur le standard CSS de 96 DPI où 1 pouce = 2.54 cm)
    const pxPerCm = 37.8;

    // Conversion finale en tenant compte de la densité
    return cm * pxPerCm * pixelRatio;
  };

  const handleDrawRect = () => {
    if (!largeur || !longueur) {
      Alert.alert("Erreur", "Tous les champs doivent être remplis.");
      return;
    }
    if (largeur < 0 || longueur < 0) {
      Alert.alert("Erreur", "Les valeurs doivent être positives.");
      return;
    }
    console.log("Largeur:", largeur, "Longueur:", longueur);
    const rectangleSvg = (
      <Svg height="200" width="200">
        <Rect
          x="10"
          y="10"
          width={largeur}
          height={longueur}
          stroke="black"
          strokeWidth="2"
          fill="red"
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
        onChangeText={(text) => setLargeur(cmToPx(text))}
      />
      <TextInput
        style={styles.input}
        placeholder="Longueur"
        keyboardType="numeric"
        value={longueur}
        onChangeText={(text) => setLongueur(cmToPx(text))}
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
