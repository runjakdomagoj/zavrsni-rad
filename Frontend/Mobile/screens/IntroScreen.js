import React from "react";
import { View, Image } from "react-native";
import TitleButton from "../components/TitleButton";
import { LinearGradient } from "expo-linear-gradient";
import Logo from "../assets/images/Logo/logo.png";

const IntroScreen = ({ navigation }) => {
  return (
    <View>
      <LinearGradient
        colors={["#66f1a0", "#00b0d9"]}
        className="w-full h-full items-center"
      >
        <Image source={Logo} className="w-11/12 h-4/6" resizeMode="contain" />
        <TitleButton
          buttonTitle="Započni!"
          navigationTitle="Povijest Hrvatske"
          navigation={navigation}
        />
      </LinearGradient>
    </View>
  );
};

export default IntroScreen;
