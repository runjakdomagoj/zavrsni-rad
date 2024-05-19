import React, { useRef } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Map from "../components/Map";
import { MaterialIcons } from "@expo/vector-icons";

const MapScreen = ({ navigation }) => {
  const mapRef = useRef(null);

  // Handles county press and navigates to the county screen
  const handleCountyPress = (countyName) => {
    navigation.navigate("Županija", { countyName });
  };

  // Handles map resetting with useRef
  const handleResetMap = () => {
    if (mapRef.current) {
      mapRef.current.resetMap();
    }
  };

  return (
    <View style={styles.container}>
      <Map
        ref={mapRef}
        onPress={handleCountyPress}
      />
      <TouchableOpacity
        style={styles.resetButton}
        onPress={handleResetMap}
        activeOpacity={0.7}
      >
        <MaterialIcons name="zoom-out-map" size={48} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  resetButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default MapScreen;
