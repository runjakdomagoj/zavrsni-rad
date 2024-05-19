import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import { fetchData } from "../api/api";
import { ScrollView } from "react-native-gesture-handler";
import croatiaCrest from "../assets/images/Drzava/hrvatska_grb.png";
import croatiaFlag from "../assets/images/Drzava/hrvatska_zastava.png";
import Graph from "../components/Graph";

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
    <ScrollView>
      <View className="bg-backgroundColor" style={styles.container}>
        {countryData ? (
          <>
            <Image source={croatiaCrest} style={styles.imageCrest} />
            <Image source={croatiaFlag} style={styles.imageFlag} />
            <Text>{countryData[0].countryName}</Text>
            <Text>{countryData[0].populationDensity}</Text>
            <Text>{countryData[0].area}</Text>
            <Text>{countryData[0].countryDescription}</Text>
            <Text>{countryData[0].history}</Text>
            <Text>{countryData[0].politicalSystem}</Text>
            <Text>{countryData[0].nationalSymbols}</Text>
            <Text>{countryData[0].currency}</Text>
            <Text>{countryData[0].language}</Text>
            <Text>{countryData[0].religion}</Text>
            <Text>{countryData[0].climate}</Text>

            <Graph
              data={{
                labels: countryData[0].populationData.map(({ year }) =>
                  year.toString()
                ),
                datasets: [
                  {
                    data: countryData[0].populationData.map(
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
    justifyContent: "center",
    alignItems: "center",
  },
  imageCrest: {
    width: 100,
    height: 150,
    margin: 10,
  },
  imageFlag: {
    width: 150,
    height: 100,
    margin: 10,
  },
});

export default CountryScreen;
