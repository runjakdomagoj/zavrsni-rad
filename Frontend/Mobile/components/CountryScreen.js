import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { fetchData } from "../api/api";

const CountryScreen = () => {
  const [countryData, setCountryData] = useState(null);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const data = await fetchData();
        const country = data[1];
        setCountryData(country);
      } catch (error) {
        console.error("Error fetching country data: ", error);
      }
    };

    fetchCountryData();
  }, []);

  return (
    <View style={styles.container}>
      {countryData ? (
        <>
          <Text>{countryData.countryName}</Text>
        </>
      ) : (
        <ActivityIndicator size="large" color="black" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CountryScreen;

// Data not displaying for some reason and that needs to be fixed
