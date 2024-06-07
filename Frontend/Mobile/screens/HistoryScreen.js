import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, ActivityIndicator } from "react-native";
import { fetchData } from "../api/api";

const HistoryScreen = ({ navigation }) => {
  const [countryData, setCountryData] = useState(null);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const data = await fetchData();
        const country = data[1];
        setCountryData(country);
      } catch (error) {
        console.error("Error fetching country data: ", error);
      }
    };

    fetchCountryData();
  }, []);

  return (
    <ScrollView className="bg-white flex-1 p-4">
      <View className="bg-white flex-1 p-4">
        {countryData ? (
          <>
            <Text className="text-2xl font-bold mb-4">
              Hrvatska Povijest
            </Text>
            <Text className="text-base leading-6">
              {countryData[0].history}
            </Text>
          </>
        ) : (
          <ActivityIndicator size="large" color="black" />
        )}
      </View>
    </ScrollView>
  );
};

export default HistoryScreen;
