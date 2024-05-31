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
      className="bg-blue-700 p-6 rounded-lg m-4 shadow-lg w-11/12 h-64 items-center shadow"
      onPress={() => navigation.navigate(navigationTitle)}
    >
      <Text className="text-white text-2xl font-bold text-center">
        {buttonTitle}
      </Text>
      <Image className={imageStyle} source={imageTitle} />
    </TouchableOpacity>
  );
};

export default TitleButton;
