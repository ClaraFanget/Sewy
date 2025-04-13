import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomNavBar from "./navigation/BottomNavBar.js";
import Connexion from "./screens/Connexion.js";
import Inscription from "./screens/Inscription.js";
import { UserProvider } from "./context/UserContext";

const Stack = createStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <UserProvider>
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
    </UserProvider>
  );
}