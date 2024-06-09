import React from "react";
import { TouchableOpacity, Text } from "react-native";

const TitleButton = ({ buttonTitle, navigationTitle, navigation }) => {
  return (
    <TouchableOpacity
      className="bg-white p-6 rounded-lg m-4 shadow-lg w-11/12"
      onPress={() => navigation.navigate(navigationTitle)}
    >
      <Text className="text-lightBlue text-2xl font-bold text-center">
        {buttonTitle}
      </Text>
    </TouchableOpacity>
  );
};

export default TitleButton;
