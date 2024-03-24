import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CountyScreen = ({ route }) => {
  const { countyName } = route.params;

  return (
    <View style={styles.container}>
      <Text>{countyName}</Text>
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
