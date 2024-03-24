import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MapScreen from "./components/MapScreen";
import CountyScreen from "./components/CountyScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Karta Hrvatske">
        <Stack.Screen name="Karta Hrvatske" component={MapScreen} />
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
