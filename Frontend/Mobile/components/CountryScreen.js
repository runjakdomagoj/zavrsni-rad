import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { fetchData } from "../api/api";
import { ScrollView } from "react-native-gesture-handler";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

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
      <View style={styles.container}>
        {countryData ? (
          <>
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

            <LineChart
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
              width={Dimensions.get("window").width - 16}
              height={230}
              chartConfig={{
                backgroundColor: "#fff",
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "4",
                  strokeWidth: "1",
                  stroke: "blue",
                },
              }}
              bezier
              style={{
                marginVertical: 16,
                borderRadius: 16,
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
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CountryScreen;
