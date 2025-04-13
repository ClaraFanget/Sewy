
import React from "react";
import { ScrollView, View } from "react-native";
import Header from "../components/Header";
import PatternCardList from "../components/PatternCardList";

export default function HomeScreen() {
  return (
    <ScrollView>
      <View>
        <Header />
        <PatternCardList />
      </View>
    </ScrollView>
  );
}
