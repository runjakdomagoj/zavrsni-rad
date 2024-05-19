import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";

const Graph = ({data}) => {
  return (
    <LineChart
      data={data}
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
      style={styles.chart}
    />
  );
};

const styles = StyleSheet.create({
    chart: {
        marginVertical: 16,
        borderRadius: 16,
    }
})

export default Graph;
