import React from "react";
import { View, Text } from "react-native";

const TextBox = ({ title, text }) => {
  return (
    <View>
      <Text className="text-xl font-bold mb-2">{title}</Text>
      <Text className="text-base mb-2">{text}</Text>
    </View>
  );
};

export default TextBox;
