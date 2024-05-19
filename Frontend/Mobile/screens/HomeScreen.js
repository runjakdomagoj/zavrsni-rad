import React from "react";
import { View, StyleSheet } from "react-native";
import TitleButton from "../components/TitleButton";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TitleButton
        buttonTitle="Podaci o državi"
        navigationTitle="Podaci o državi"
        navigation={navigation}
      />
      <TitleButton
        buttonTitle="Interaktivna karta"
        navigationTitle="Podaci o županijama"
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
