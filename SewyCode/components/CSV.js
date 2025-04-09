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
  Alert,
} from "react-native";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import * as FileSystem from "expo-file-system";
import Papa from "papaparse";

// Position Y fixe de chaque ligne
const yPositions = [3, 10, 40, 60];

const CSV = () => {
  const [longueurs, setLongueurs] = useState(["", "", "", ""]);

  const handleChange = (index, value) => {
    const newLongueurs = [...longueurs];
    newLongueurs[index] = value;
    setLongueurs(newLongueurs);
  };

  const enregistrerEtExporter = async () => {
    try {
      
      if (longueurs.some((l) => l.trim() === "")) {
        Alert.alert("Erreur", "Merci de remplir les 4 longueurs");
        return;
      }

      const valeursNum = longueurs.map((v) => parseFloat(v));

      
      const csvContent =
        "id,longueur\n" + valeursNum.map((l, i) => `${i + 1},${l}`).join("\n");
      const path = FileSystem.documentDirectory + "Lignes.csv";
      await FileSystem.writeAsStringAsync(path, csvContent, {
        encoding: FileSystem.EncodingType.UTF8,
      });

   
      const contenu = await FileSystem.readAsStringAsync(path);
      const result = Papa.parse(contenu, { header: true });
      const longueursLues = result.data.map((row) => parseFloat(row.longueur));

      
      const lignesSVG = longueursLues
        .map((longueur, index) => {
          const y = yPositions[index];
          return `<line x1="0" y1="${y}" x2="${longueur}" y2="${y}" stroke="black" stroke-width="0.1" />`;
        })
        .join("\n");

  
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"><title>Lignes PDF</title></head>
        <body style="margin:0;padding:0;width:210mm;height:297mm;">
          <svg width="21cm" height="29.7cm" viewBox="0 0 210 297" xmlns="http://www.w3.org/2000/svg">
            ${lignesSVG}
          </svg>
        </body>
        </html>
      `;

    
      const file = await printToFileAsync({ html: htmlContent, base64: false });
      await shareAsync(file.uri);
    } catch (error) {
      console.error("Erreur : ", error);
      Alert.alert("Erreur", "Une erreur est survenue lors de l'export.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Tracer 4 lignes</Text>

        {longueurs.map((val, i) => (
          <TextInput
            key={i}
            style={styles.input}
            placeholder={`Longueur ligne ${i + 1}`}
            keyboardType="numeric"
            value={val}
            onChangeText={(text) => handleChange(i, text)}
          />
        ))}

        <Button title="Télécharger en PDF" onPress={enregistrerEtExporter} />
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

export default CSV;
