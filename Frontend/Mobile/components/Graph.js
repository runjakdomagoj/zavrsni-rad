import React from "react";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const Graph = ({ data }) => {
  return (
    <LineChart
      className="my-4"
      data={data}
      width={Dimensions.get("window").width - 16}
      height={230}
      chartConfig={{
        backgroundColor: "#fff",
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
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
  );
};

export default Graph;
