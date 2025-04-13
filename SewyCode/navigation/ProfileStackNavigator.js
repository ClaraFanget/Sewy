// navigation/ProfileStackNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/Profile";
import UpdatePassword from "../screens/UpdatePassword";
import UpdateMail from "../screens/UpdateMail";
import UpdateMeasurement from "../screens/UpdateMeasurements";

const Stack = createStackNavigator();

export default function ProfileStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditMail" component={UpdateMail} />
      <Stack.Screen name="EditPassword" component={UpdatePassword} />
      <Stack.Screen name="EditMeasurements" component={UpdateMeasurement} />
    </Stack.Navigator>
  );
}
