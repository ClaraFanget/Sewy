import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomNavBar from "./navigation/BottomNavBar.js";
import Connexion from "./screens/Connexion.js";
import Inscription from "./screens/Inscription.js";

const Stack = createStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };
  
  // Si l'utilisateur est authentifié, afficher BottomNavBar (qui contient Home)
  // Sinon, afficher les écrans de connexion et d'inscription
  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <BottomNavBar />
      ) : (
        <Stack.Navigator initialRouteName="Connexion" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Connexion">
            {props => <Connexion {...props} onLoginSuccess={handleLoginSuccess} />}
          </Stack.Screen>
          <Stack.Screen name="Inscription" component={Inscription} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}