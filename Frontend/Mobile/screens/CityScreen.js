import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, Image } from "react-native";
import { fetchData } from "../api/api";
import TextBox from "../components/TextBox";
import Graph from "../components/Graph";
import images from "../assets/images/Gradovi/images";

// Function for removing diacritics and making the cityName compatible with image names
const removeDiacritics = (str) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/š/g, "s")
    .replace(/Š/g, "S")
    .replace(/č/g, "c")
    .replace(/Č/g, "C")
    .replace(/ć/g, "c")
    .replace(/Ć/g, "C")
    .replace(/ž/g, "z")
    .replace(/Ž/g, "Z")
    .replace(/dž/g, "dz")
    .replace(/Dž/g, "Dz");
};

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

  // Makes cityName and image name compatible with each other
  const normalizedcityName = removeDiacritics(
    cityName.replace(/\s+/g, "_").replace(/-/g, "_").toLowerCase()
  );

  // Finds matching key in the images object
  const countyImagesKey = Object.keys(images).find((key) => {
    const normalizedKey = removeDiacritics(
      key.replace(/^\d+_/, "").toLowerCase()
    );
    return normalizedKey === normalizedcityName;
  });

  // If key is found, gets the images back, otherwise null
  const countyImages = countyImagesKey ? images[countyImagesKey] : null;

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
              {countyImages ? (
                <>
                  <Image
                    source={countyImages.grb}
                    className="w-24 h-32 mb-8"
                    resizeMode="contain"
                  />
                </>
              ) : (
                <Text className="text-base text-center">
                  Nema dostupnih slika za ovu županiju.
                </Text>
              )}
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
          <ActivityIndicator size="large" color="#00b0d9" />
        )}
      </View>
    </ScrollView>
  );
};

export default CityScreen;
