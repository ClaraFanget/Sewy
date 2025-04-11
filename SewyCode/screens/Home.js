import React from "react";
import { ScrollView, Text, Image, StyleSheet, View } from "react-native";
import Header from "../components/Header";
import PatronCard from "../components/PatronCard";
import PatronCardList from "../components/PartonCardList";

export default function HomeScreen() {
  return (
    <ScrollView>
      <View>
        <Header />
        <PatronCardList />
      </View>
    </ScrollView>
  );
}
