import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { fetchData } from "../api/api";

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

  return (
    <View style={styles.container}>
      {countyData ? (
        <>
          <Text>{countyData.countyName}</Text>
          <Text>Gustoća naseljenosti: {countyData.populationDensity}</Text>
          <Text>Površina: {countyData.area}</Text>
          <Text>Sjedište županije: {countyData.countySeat}</Text>
          <Text>O županiji: {countyData.countyDescription}</Text>
          <LineChart
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
