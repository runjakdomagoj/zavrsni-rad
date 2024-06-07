import React from "react";
import { Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MapScreen from "./screens/MapScreen";
import CountyScreen from "./screens/CountyScreen";
import CountryScreen from "./screens/CountryScreen";
import IntroScreen from "./screens/IntroScreen";
import HistoryScreen from "./screens/HistoryScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Uvodni zaslon">
        <Stack.Screen
          name="Uvodni zaslon"
          component={IntroScreen}
          options={{ headerTitle: "", headerShadowVisible: false }}
        />
        <Stack.Screen
          name="Povijest Hrvatske"
          component={HistoryScreen}
          options={({ navigation }) => ({
            headerBackTitle: "Natrag",
            headerTitle: "",
            headerShadowVisible: false,
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate("Podaci o državi")}
                title="Idi dalje"
              />
            ),
          })}
        />
        <Stack.Screen
          name="Podaci o državi"
          component={CountryScreen}
          options={({ navigation }) => ({
            headerBackTitle: "Natrag",
            headerTitle: "",
            headerShadowVisible: false,
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate("Podaci o županijama")}
                title="Idi dalje"
              />
            ),
          })}
        />
        <Stack.Screen
          name="Podaci o županijama"
          component={MapScreen}
          options={{
            headerBackTitle: "Natrag",
            headerTitle: "",
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="Županija"
          component={CountyScreen}
          options={{
            headerBackTitle: "Natrag",
            headerTitle: "",
            headerShadowVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
