import React from "react";
import { TouchableOpacity, Text } from "react-native";

const PillButton = ({ active, onPress, text }) => {
  return (
    <TouchableOpacity
      className={`px-4 py-2 rounded ${
        active ? "bg-lightGreen" : "bg-lightBlue"
      }`}
      onPress={onPress}
    >
      <Text className="text-xl font-bold text-white">{text}</Text>
    </TouchableOpacity>
  );
};

export default PillButton;
