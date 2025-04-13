import React from "react";
import { View, Button, StyleSheet } from "react-native";
import AddUsers from "../components/AddUsers";

const Inscription = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <AddUsers />
      <Button title="Retour" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default Inscription;
