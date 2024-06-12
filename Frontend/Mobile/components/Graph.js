import React from "react";
import { Dimensions, View, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";

const Graph = ({ data }) => {
  let filteredData = data;
  // Filters the x-axis names and displays every other name, but only if the data length is greater than 8
  if (data.labels.length > 8) {
    const filteredLabels = data.labels.filter((_, index) => index % 2 === 0);

    // Filters the data to use only the every other data
    filteredData = {
      datasets: data.datasets.map((dataset) => ({
        ...dataset,
        data: dataset.data.filter((_, index) => index % 2 === 0),
      })),
      labels: filteredLabels,
    };
  }

  return (
    <View>
      <Text className="text-xl text-lightBlue font-bold mb-1 p-4">Populacija</Text>
      <LineChart
        data={filteredData}
        width={Dimensions.get("window").width - 42}
        height={250}
        chartConfig={{
          backgroundColor: "#FFF",
          backgroundGradientFrom: "#FFF",
          backgroundGradientTo: "#FFF",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 176, 217, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "4",
            strokeWidth: "1",
          },
        }}
        bezier
      />
    </View>
  );
};

export default Graph;
