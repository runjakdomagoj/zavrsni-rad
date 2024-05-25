import React, { useRef } from "react";
import { View, TouchableOpacity } from "react-native";
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
    <View className="flex-1">
      <Map ref={mapRef} onPress={handleCountyPress} />
      <TouchableOpacity
        className="absolute top-3 right-3"
        onPress={handleResetMap}
        activeOpacity={0.7}
      >
        <MaterialIcons name="zoom-out-map" size={48} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default MapScreen;
