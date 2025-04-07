import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  PixelRatio,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Svg, { Rect } from "react-native-svg";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";

const PDF = () => {
  // Stockez les valeurs sous forme de chaînes pour les champs de saisie
  const [largeurString, setLargeurString] = useState("");
  const [longueurString, setLongueurString] = useState("");

  const saveAsPDF = async () => {
    // Convertir les chaînes en nombres
    const largeur = parseFloat(largeurString);
    const longueur = parseFloat(longueurString);

    console.log("Dimensions en cm:", largeur, "x", longueur);

    let htmlContent = `
      <!DOCTYPE html>
      <html>
      <head >
        <meta charset="utf-8">
        <title>Rectangle PDF</title>
        
      </head>
      <body style="margin: 0 !important;
        padding: 0 !important;
        width: 210mm !important;
        height: 297mm !important; ">
        <svg 
             width="21cm" 
             height="29.7cm" 
             viewBox="0 0 21 29.7
             xmlns="http://www.w3.org/2000/svg"">
          <rect x="20" y="20" 
                width="${largeur}cm" 
                height="${longueur}cm" 
                stroke="black" 
                stroke-width="1" 
                fill="none"/>
        </svg>
      </body>
      </html>
    `;

    const file = await printToFileAsync({
      html: htmlContent,
      base64: false,
    });

    await shareAsync(file.uri);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Tracer un rectangle</Text>
        <TextInput
          style={styles.input}
          placeholder="Largeur (cm)"
          keyboardType="numeric"
          value={largeurString}
          onChangeText={setLargeurString}
        />
        <TextInput
          style={styles.input}
          placeholder="Longueur (cm)"
          keyboardType="numeric"
          value={longueurString}
          onChangeText={setLongueurString}
        />
        <Button title="Télécharger en PDF" onPress={saveAsPDF} />
      </View>
    </TouchableWithoutFeedback>
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
