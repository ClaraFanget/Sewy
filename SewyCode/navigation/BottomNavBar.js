//Ce composant est une barre de navigation en bas de l'écran. Le composant utilise la bibliothèque react-navigation pour gérer la navigation entre les écrans.
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHouse,
  faRuler,
  faBookmark,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import HomeScreen from "../screens/Home";
import SavedScreen from "../screens/Saved";
import ProfileScreen from "../screens/Profile";
import MeasurementsScreen from "../screens/Measurements";

const Tab = createBottomTabNavigator();

export default function BottomNavBar() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#648DCB", // <-- ici
        tabBarInactiveTintColor: "#aaa",
        tabBarIcon: ({ color, size }) => {
          let icon;
          switch (route.name) {
            case "Accueil":
              icon = faHouse;
              break;
            case "Mensurations":
              icon = faRuler;
              break;
            case "Enregistrés":
              icon = faBookmark;
              break;
            case "Profil":
              icon = faUser;
              break;
            default:
              icon = faHouse;
          }
          return <FontAwesomeIcon icon={icon} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Accueil" component={HomeScreen} />
      <Tab.Screen name="Mensurations" component={MeasurementsScreen} />
      <Tab.Screen name="Enregistrés" component={SavedScreen} />
      <Tab.Screen name="Profil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
