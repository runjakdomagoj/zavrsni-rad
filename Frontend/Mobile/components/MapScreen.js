import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Map from "./Map";
import { fetchData } from "../api/api";

const MapScreen = ({ navigation }) => {
  const croatiaMap = require("../assets/hr.json");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData()
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleCountyPress = (countyName) => {
    navigation.navigate("Županija", { countyName });
  };

  return (
    <View style={styles.container}>
      <Map
        geojson={croatiaMap}
        navigation={navigation}
        onPress={handleCountyPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MapScreen;
