import React, { useState, forwardRef, useImperativeHandle } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Geojson } from "react-native-maps";
import hrGeojson from "../assets/geojson/hr.json";
import pointInPolygon from "@turf/boolean-point-in-polygon";

const Map = forwardRef(({ onPress }, ref) => {
  const [region, setRegion] = useState({
    latitude: 44.4737849,
    longitude: 16.4688717,
    latitudeDelta: 5,
    longitudeDelta: 6,
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
        <Geojson geojson={hrGeojson} strokeColor="#fff" fillColor="#ff6d6a" />
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
