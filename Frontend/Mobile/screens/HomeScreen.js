import React from "react";
import { View, Text } from "react-native";
import TitleButton from "../components/TitleButton";
import croatiaFlag from "../assets/images/Drzava/hrvatska_zastava.png";
import croatiaOutline from "../assets/images/croatia_outline_colored.png";
import Swiper from "react-native-swiper";

const HomeScreen = ({ navigation }) => {
  return (
    <View className="bg-white flex-1 p-4">
      <Text className="text-3xl font-bold ml-4 mb-10">Dobro došli!</Text>
      <Swiper loop={false}>
        <View className="items-center">
          <TitleButton
            buttonTitle="Opći podatci"
            navigationTitle="Podaci o državi"
            navigation={navigation}
            imageTitle={croatiaFlag}
            imageStyle="w-64 h-32 m-4"
          />
        </View>
        <View className="items-center">
          <TitleButton
            buttonTitle="Interaktivna karta"
            navigationTitle="Podaci o županijama"
            navigation={navigation}
            imageTitle={croatiaOutline}
            imageStyle="w-32 h-36 m-4"
          />
        </View>
      </Swiper>
    </View>
  );
};

export default HomeScreen;
