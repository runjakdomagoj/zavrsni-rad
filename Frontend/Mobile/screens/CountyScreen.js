import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import { fetchData } from "../api/api";
import images from "../assets/images/Zupanije/images";
import Graph from "../components/Graph";

// Function for removing diacritics and making the countyName compatible with image names
const removeDiacritics = (str) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/š/g, "s")
    .replace(/Š/g, "S")
    .replace(/č/g, "c")
    .replace(/Č/g, "C")
    .replace(/ć/g, "c")
    .replace(/Ć/g, "C")
    .replace(/ž/g, "z")
    .replace(/Ž/g, "Z")
    .replace(/dž/g, "dz")
    .replace(/Dž/g, "Dz");
};

const CountyScreen = ({ route }) => {
  const { countyName } = route.params;
  const [countyData, setCountyData] = useState(null);

  useEffect(() => {
    const fetchCountyData = async () => {
      try {
        const data = await fetchData();
        const counties = data[0];
        const selectedCountyData = counties.find(
          (item) => item.countyName === countyName
        );
        setCountyData(selectedCountyData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchCountyData();
  }, [countyName]);

  // Makes countyName and image name compatible with each other
  const normalizedCountyName = removeDiacritics(
    countyName.replace(/\s+/g, "_").replace(/-/g, "_").toLowerCase()
  );

  // Finds matching key in the images object
  const countyImagesKey = Object.keys(images).find((key) => {
    const normalizedKey = removeDiacritics(
      key.replace(/^\d+_/, "").toLowerCase()
    );
    return normalizedKey === normalizedCountyName;
  });

  // If key is found, gets the images back, otherwise null
  const countyImages = countyImagesKey ? images[countyImagesKey] : null;

  return (
    <ScrollView>
      <View className="bg-backgroundColor" style={styles.container}>
        {countyData ? (
          <>
            {countyImages ? (
              <>
                <Image source={countyImages.grb} style={styles.image} />
                <Image source={countyImages.zastava} style={styles.image} />
              </>
            ) : (
              <Text>Nema dostupnih slika za ovu županiju.</Text>
            )}
            <Text>{countyData.countyName}</Text>
            <Text>Gustoća naseljenosti: {countyData.populationDensity}</Text>
            <Text>Površina: {countyData.area}</Text>
            <Text>Sjedište županije: {countyData.countySeat}</Text>
            <Text>O županiji: {countyData.countyDescription}</Text>

            <Graph
              data={{
                labels: countyData.populationData.map(({ year }) =>
                  year.toString()
                ),
                datasets: [
                  {
                    data: countyData.populationData.map(
                      ({ population }) => population
                    ),
                  },
                ],
              }}
            />
          </>
        ) : (
          <ActivityIndicator size="large" color="black" />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
});

export default CountyScreen;
