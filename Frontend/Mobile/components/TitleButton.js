import React from "react";
import { TouchableOpacity, Text } from "react-native";

const TitleButton = ({ buttonTitle, navigationTitle, navigation }) => {
  return (
    <TouchableOpacity
      className="bg-buttonColor p-12 rounded-lg m-10 shadow-xl shadow-gray-500 w-5/6"
      onPress={() => navigation.navigate(navigationTitle)}
    >
      <Text className="text-white text-2xl font-bold text-center">
        {buttonTitle}
      </Text>
    </TouchableOpacity>
  );
};

export default TitleButton;
