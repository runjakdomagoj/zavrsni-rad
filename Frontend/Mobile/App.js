import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MapScreen from "./screens/MapScreen";
import CountyScreen from "./screens/CountyScreen";
import HomeScreen from "./screens/HomeScreen";
import CountryScreen from "./screens/CountryScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Početni zaslon">
        <Stack.Screen name="Početni zaslon" component={HomeScreen} />
        <Stack.Screen
          name="Podaci o državi"
          component={CountryScreen}
          options={{ headerBackTitle: "Natrag" }}
        />
        <Stack.Screen
          name="Podaci o županijama"
          component={MapScreen}
          options={{ headerBackTitle: "Natrag" }}
        />
        <Stack.Screen
          name="Županija"
          component={CountyScreen}
          options={{ headerBackTitle: "Natrag" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
