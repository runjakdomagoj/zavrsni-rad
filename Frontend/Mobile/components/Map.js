import { useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Geojson } from "react-native-maps";

const Map = ({ geojson }) => {
  const [county, SetCounty] = useState({
    latitude: 45.815399,
    longitude: 15.966568,
    latitudeDelta: 8,
    longitudeDelta: 8,
  });

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        county={county}
        onCountyChangeComplete={(county) => SetCounty(county)}
      >
        <Geojson geojson={geojson} strokeColor="#fff" fillColor="#FF6D6A" />
      </MapView>
    </View>
  );
};

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
