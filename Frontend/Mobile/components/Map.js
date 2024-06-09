import React, { useState, forwardRef, useImperativeHandle } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import MapView, { Geojson, Marker, Callout } from "react-native-maps";
import hrGeojson from "../assets/geojson/hr.json";
import pointInPolygon from "@turf/boolean-point-in-polygon";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Map = forwardRef(({ onPress, cities, showCities, onCityPress }, ref) => {
  const [region, setRegion] = useState({
    latitude: 44.4737849,
    longitude: 16.4688717,
    latitudeDelta: 5,
    longitudeDelta: 6,
  });

  // Handles map press and locates where each county is based on the coordinates in geojson file
  const handleMapPress = (e) => {
    if (!showCities) {
      const { coordinate } = e.nativeEvent;
      const point = [coordinate.longitude, coordinate.latitude];
      const clickedCounty = hrGeojson.features.find((feature) => {
        return pointInPolygon(point, feature.geometry);
      });
      if (clickedCounty) {
        const countyName = clickedCounty.properties.name;
        onPress(countyName);
      }
    }
  };

  // Resets the map to its inital state
  useImperativeHandle(ref, () => ({
    resetMap: () => {
      const initialRegion = {
        latitude: 44.4737849,
        longitude: 16.4688717,
        latitudeDelta: 5,
        longitudeDelta: 6,
      };
      mapRef.current.animateToRegion(initialRegion, 1000);
    },
  }));

  const mapRef = React.useRef(null);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        region={region}
        onRegionChangeComplete={(region) => setRegion(region)}
        onPress={handleMapPress}
      >
        <Geojson
          geojson={hrGeojson}
          strokeColor="#00b0d9"
          strokeWidth="3"
          fillColor="#66f1a0"
        />
        {showCities &&
          cities.map((city) => (
            <Marker
              key={city.cityName}
              coordinate={{
                latitude: city.latitude,
                longitude: city.longitude,
              }}
            >
              <MaterialCommunityIcons
                name="map-marker"
                size={30}
                color="white"
              />
              <Callout tooltip>
                <View className="w-40 p-2 bg-white text-center rounded shadow-2xl items-center">
                  <Text className="text-base font-bold">{city.cityName}</Text>
                  <Button
                    color="#00b0d9"
                    title="Detaljnije"
                    onPress={() => onCityPress(city.cityName)}
                  />
                </View>
              </Callout>
            </Marker>
          ))}
      </MapView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
