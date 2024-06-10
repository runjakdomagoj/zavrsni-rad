import React from "react";
import { TouchableOpacity, Text, View } from "react-native";

const PageButton = ({ buttonTitle, navigationTitle, navigation }) => {
  return (
    <View className="flex-1 items-center">
      <TouchableOpacity
        className="bg-white p-3 rounded-lg m-4 shadow-lg w-40 bg-lightGreen"
        onPress={() => navigation.navigate(navigationTitle)}
      >
        <Text className="text-white text-lg font-bold text-center">
          {buttonTitle}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PageButton;
