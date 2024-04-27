import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MapScreen from "./components/MapScreen";
import CountyScreen from "./components/CountyScreen";
import HomeScreen from "./components/HomeScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Početni zaslon">
        <Stack.Screen name="Početni zaslon" component={HomeScreen} />
        <Stack.Screen
          name="Karta Hrvatske"
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
