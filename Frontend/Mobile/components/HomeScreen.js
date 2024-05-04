import React from "react";
import { View, Button, StyleSheet } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Podaci o državi"
        onPress={() => navigation.navigate("Podaci o državi")}
      />
      <Button
        title="Interaktivna karta sa županijama"
        onPress={() => navigation.navigate("Podaci o županijama")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default HomeScreen;
