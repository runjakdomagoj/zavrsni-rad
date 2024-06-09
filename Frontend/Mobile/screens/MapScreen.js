import React, { useRef, useState, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Map from "../components/Map";
import { MaterialIcons } from "@expo/vector-icons";
import { fetchData } from "../api/api";
import PillButton from "../components/PillButton";

const MapScreen = ({ navigation }) => {
  const mapRef = useRef(null);
  const [showCities, setShowCities] = useState(false);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const data = await fetchData();
        const cities = data[2];
        setCities(cities);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    fetchCities();
  }, []);

  const handleCountyPress = (countyName) => {
    navigation.navigate("Županija", { countyName });
  };

  const handleCityPress = (cityName) => {
    navigation.navigate("Grad", { cityName });
  };

  const handleResetMap = () => {
    if (mapRef.current) {
      mapRef.current.resetMap();
    }
  };

  return (
    <View className="flex-1">
      <Map
        ref={mapRef}
        onPress={handleCountyPress}
        cities={cities}
        showCities={showCities}
        onCityPress={handleCityPress}
      />
      <View className="absolute top-8 left-2 flex-row overflow-hidden">
        <PillButton
          active={!showCities}
          onPress={() => setShowCities(false)}
          text="Županije"
        />
        <PillButton
          active={showCities}
          onPress={() => setShowCities(true)}
          text="Gradovi"
        />
      </View>
      <TouchableOpacity
        className="absolute top-8 right-2"
        onPress={handleResetMap}
        activeOpacity={0.7}
      >
        <MaterialIcons name="zoom-out-map" size={48} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default MapScreen;
