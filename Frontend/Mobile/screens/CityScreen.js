import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { fetchData } from "../api/api";
import TextBox from "../components/TextBox";
import Graph from "../components/Graph";

const CityScreen = ({ route }) => {
  const [cityData, setCityData] = useState(null);
  const { cityName } = route.params;

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const data = await fetchData();
        const cities = data[2];
        const selectedCityData = cities.find(
          (item) => item.cityName === cityName
        );
        setCityData(selectedCityData);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    fetchCityData();
  }, [cityName]);

  const textData = [
    { title: "Županija", textKey: "county" },
    { title: "Površina", textKey: "area" },
    { title: "Gustoća naseljenosti", textKey: "populationDensity" },
    { title: "Pozivni broj", textKey: "callNumber" },
    { title: "Poštanski broj", textKey: "zipCode" },
    { title: "Registracijska oznaka", textKey: "licensePlate" },
    { title: "Povijest", textKey: "history" },
  ];

  return (
    <ScrollView>
      <View className="bg-white flex-1 p-4">
        {cityData ? (
          <>
            <View className="justify-center items-center">
              <Text className="text-2xl font-bold mb-8">
                {cityData.cityName}
              </Text>
            </View>
            {textData.map((item, index) => (
              <TextBox
                key={index}
                title={item.title}
                text={
                  item.textKey === "area" ||
                  item.textKey === "populationDensity"
                    ? `${cityData[item.textKey]} km²`
                    : item.textKey === "callNumber"
                    ? `+${cityData[item.textKey]}`
                    : cityData[item.textKey]
                }
              />
            ))}
            <Graph
              data={{
                labels: cityData.populationData.map(({ year }) =>
                  year.toString()
                ),
                datasets: [
                  {
                    data: cityData.populationData.map(
                      ({ population }) => population
                    ),
                  },
                ],
              }}
            />
          </>
        ) : (
          <ActivityIndicator size="large" color="black" />
        )}
      </View>
    </ScrollView>
  );
};

export default CityScreen;
