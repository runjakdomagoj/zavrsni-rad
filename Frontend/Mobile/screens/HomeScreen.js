import React from "react";
import { View } from "react-native";
import TitleButton from "../components/TitleButton";

const HomeScreen = ({ navigation }) => {
  return (
    <View className="bg-white flex-1 justify-center items-center p-4">
      <TitleButton
        buttonTitle="Hrvatska"
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

export default HomeScreen;
