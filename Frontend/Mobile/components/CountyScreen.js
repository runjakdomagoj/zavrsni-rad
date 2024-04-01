import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { fetchData } from "../api/api";

const CountyScreen = ({ route }) => {
  const { countyName } = route.params;
  const [populationData, setPopulationData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopulationData = async () => {
      try {
        const data = await fetchData();
        // Finds data for the selected county
        const countyData = data.find(
          (item) => item["Naziv županije"] === countyName
        );
        // Converts data to an array consisting of year and population pairs
        const countyPopulationData = Object.entries(countyData)
          .filter(([key]) => !isNaN(key)) // Filters out non-year keys
          .map(([year, population]) => ({ year: Number(year), population }));
        setPopulationData(countyPopulationData);
        // Sets loading to false once data is fetched
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchPopulationData();
  }, [countyName]);

  return (
    <View style={styles.container}>
      <Text>{countyName}</Text>
      {loading ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <LineChart
          data={{
            labels: populationData.map(({ year }) => year.toString()),
            datasets: [
              {
                data: populationData.map(({ population }) => population),
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
      )}
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

export default CountyScreen;
