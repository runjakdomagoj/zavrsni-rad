import React from "react";
import { View, Image } from "react-native";
import TitleButton from "../components/TitleButton";
import { LinearGradient } from "expo-linear-gradient";
import Swiper from "react-native-swiper";
import Logo from "../assets/images/Logo/logo.png";
import images from "../assets/images/PocetniEkran/images";

const IntroScreen = ({ navigation }) => {
  return (
    <View className="flex-1">
      <LinearGradient
        colors={["#66f1a0", "#00b0d9"]}
        className="flex-1 justify-center items-center"
      >
        <Image
          source={Logo}
          className="absolute top-0 w-2/3 h-36 rounded-xl z-10"
          resizeMode="cover"
        />
        <Swiper
          autoplay
          autoplayTimeout={5}
          showsPagination={false}
          scrollEnabled={false}
        >
          {images.map((image) => (
            <View key={image.id} className="justify-center items-center h-4/5 mt-10">
              <Image
                source={image.image}
                className="w-full h-full rounded-xl"
                resizeMode="cover"
              />
            </View>
          ))}
        </Swiper>
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
