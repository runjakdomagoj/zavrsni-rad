import React from "react";
import { View } from "react-native";
import TitleButton from "../components/TitleButton";
import { LinearGradient } from "expo-linear-gradient";

const IntroScreen = ({ navigation }) => {
  return (
    <View className="flex-1 justify-center items-center">
      <LinearGradient
        colors={["#66f1a0", "#00b0d9"]}
        className="w-full h-full justify-center items-center"
      >
        <TitleButton
          buttonTitle="Započni put kroz Hrvatsku"
          navigationTitle="Povijest Hrvatske"
          navigation={navigation}
        />
      </LinearGradient>
    </View>
  );
};

export default IntroScreen;
