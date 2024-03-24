import React, { useState, forwardRef, useImperativeHandle } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Geojson } from "react-native-maps";
import hrGeojson from "../assets/hr.json";
import pointInPolygon from "@turf/boolean-point-in-polygon";

const Map = forwardRef(({ onPress }, ref) => {
  const [region, setRegion] = useState({
    latitude: 45.815399,
    longitude: 15.966568,
    latitudeDelta: 8,
    longitudeDelta: 8,
  });

  // Handles map press and locates where each county is based on the coordinates in geojson file
  const handleMapPress = (e) => {
    const { coordinate } = e.nativeEvent;
    const point = [coordinate.longitude, coordinate.latitude];
    const clickedCounty = hrGeojson.features.find((feature) => {
      return pointInPolygon(point, feature.geometry);
    });
    if (clickedCounty) {
      const countyName = clickedCounty.properties.name;
      onPress(countyName);
    }
  };

  // Resets the map to its inital state
  useImperativeHandle(ref, () => ({
    resetMap: () => {
      const initialRegion = {
        latitude: 45.815399,
        longitude: 15.966568,
        latitudeDelta: 8,
        longitudeDelta: 8,
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
        <Geojson geojson={hrGeojson} strokeColor="#fff" fillColor="#FF6D6A" />
      </MapView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
