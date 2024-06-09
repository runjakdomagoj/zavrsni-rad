import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ChevronDownIcon, ChevronUpIcon } from "react-native-heroicons/outline";

const TextBox = ({ title, text }) => {
  const [showText, setShowText] = useState(true);

  const toggleText = () => {
    setShowText(!showText);
  };

  return (
    <View className="p-4 mb-5 bg-white rounded-lg shadow">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-xl font-bold">{title}</Text>
        <TouchableOpacity onPress={toggleText} className="ml-2">
          {showText ? (
            <ChevronUpIcon color="#00b0d9" className="w-5 h-5 text-black" />
          ) : (
            <ChevronDownIcon color="#00b0d9" className="w-5 h-5 text-black" />
          )}
        </TouchableOpacity>
      </View>
      {showText && <Text className="text-base font-medium">{text}</Text>}
    </View>
  );
};

export default TextBox;
