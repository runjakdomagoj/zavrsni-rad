import React from "react";
import { Dimensions, View, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";

const Graph = ({ data }) => {
  return (
    <View>
      <Text className="text-xl font-bold mb-1 p-4">Populacija</Text>
      <LineChart
        data={data}
        width={Dimensions.get("window").width - 42}
        height={250}
        chartConfig={{
          backgroundColor: "#FFF",
          backgroundGradientFrom: "#FFF",
          backgroundGradientTo: "#FFF",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "4",
            strokeWidth: "1",
            stroke: "#2E3551",
          },
        }}
        bezier
      />
    </View>
  );
};

export default Graph;
