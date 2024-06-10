import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MapScreen from "../screens/MapScreen";
import CountyScreen from "../screens/CountyScreen";
import CountryScreen from "../screens/CountryScreen";
import IntroScreen from "../screens/IntroScreen";
import HistoryScreen from "../screens/HistoryScreen";
import CityScreen from "../screens/CityScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator
    initialRouteName="Početni zaslon"
    screenOptions={{
      headerStyle: {
        backgroundColor: "#66f1a0",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
      drawerActiveTintColor: "#66f1a0",
      drawerInactiveTintColor: "#fff",
      drawerStyle: {
        backgroundColor: "#00b0d9",
      },
      drawerLabelStyle: {
        fontSize: 16,
      },
    }}
  >
    <Drawer.Screen
      name="Početni zaslon"
      component={IntroScreen}
      options={{
        headerBackTitle: "Natrag",
        headerTitle: "",
        headerShadowVisible: false,
      }}
    />
    <Drawer.Screen
      name="Povijest Hrvatske"
      component={HistoryScreen}
      options={{
        headerBackTitle: "Natrag",
        headerTitle: "",
        headerShadowVisible: false,
      }}
    />
    <Drawer.Screen
      name="Podaci o državi"
      component={CountryScreen}
      options={{
        headerBackTitle: "Natrag",
        headerTitle: "",
        headerShadowVisible: false,
      }}
    />
    <Drawer.Screen
      name="Interaktivna karta"
      component={MapScreen}
      options={{
        headerBackTitle: "Natrag",
        headerTitle: "",
        headerShadowVisible: false,
      }}
    />
  </Drawer.Navigator>
);

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Drawer"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#66f1a0",
          },
        }}
      >
        <Stack.Screen
          name="Drawer"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Početni zaslon" component={IntroScreen} />
        <Stack.Screen name="Povijest Hrvatske" component={HistoryScreen} />
        <Stack.Screen name="Podaci o državi" component={CountryScreen} />
        <Stack.Screen name="Interaktivna karta" component={MapScreen} />
        <Stack.Screen
          name="Županija"
          component={CountyScreen}
          options={{
            headerBackTitle: "Natrag",
            headerTitle: "",
            headerShadowVisible: false,
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="Grad"
          component={CityScreen}
          options={{
            headerBackTitle: "Natrag",
            headerTitle: "",
            headerShadowVisible: false,
            headerTintColor: "#fff",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
