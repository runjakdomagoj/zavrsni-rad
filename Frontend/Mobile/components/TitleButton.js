import React from "react";
import { TouchableOpacity, Text, Image } from "react-native";

const TitleButton = ({
  buttonTitle,
  navigationTitle,
  navigation,
  imageTitle,
  imageStyle,
}) => {
  return (
    <TouchableOpacity
      className="bg-blue-700 rounded-lg m-4 shadow-lg w-full h-5/6 justify-center items-center"
      onPress={() => navigation.navigate(navigationTitle)}
    >
      <Text className="text-white text-3xl font-bold text-center absolute top-10">
        {buttonTitle}
      </Text>
      <Image className={imageStyle} source={imageTitle} />
    </TouchableOpacity>
  );
};

export default TitleButton;
