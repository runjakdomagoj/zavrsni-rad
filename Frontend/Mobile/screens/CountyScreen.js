import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Image, ScrollView } from "react-native";
import { fetchData } from "../api/api";
import images from "../assets/images/Zupanije/images";
import Graph from "../components/Graph";
import TextBox from "../components/TextBox";

// Function for removing diacritics and making the countyName compatible with image names
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

const CountyScreen = ({ route }) => {
  const { countyName } = route.params;
  const [countyData, setCountyData] = useState(null);

  useEffect(() => {
    const fetchCountyData = async () => {
      try {
        const data = await fetchData();
        const counties = data[0];
        const selectedCountyData = counties.find(
          (item) => item.countyName === countyName
        );
        setCountyData(selectedCountyData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchCountyData();
  }, [countyName]);

  // Makes countyName and image name compatible with each other
  const normalizedCountyName = removeDiacritics(
    countyName.replace(/\s+/g, "_").replace(/-/g, "_").toLowerCase()
  );

  // Finds matching key in the images object
  const countyImagesKey = Object.keys(images).find((key) => {
    const normalizedKey = removeDiacritics(
      key.replace(/^\d+_/, "").toLowerCase()
    );
    return normalizedKey === normalizedCountyName;
  });

  // If key is found, gets the images back, otherwise null
  const countyImages = countyImagesKey ? images[countyImagesKey] : null;

  const textData = [
    { title: "Gustoća naseljenosti", textKey: "populationDensity" },
    { title: "Površina", textKey: "area" },
    { title: "Sjedište županije", textKey: "countySeat" },
    { title: "O županiji", textKey: "countyDescription" },
  ];

  return (
    <ScrollView>
      <View className="bg-white flex-1  p-4">
        {countyData ? (
          <>
            <View className="justify-center items-center">
              <Text className="text-xl font-bold mb-2">
                {countyData.countyName} županija
              </Text>
              {countyImages ? (
                <>
                  <Image source={countyImages.grb} className="w-24 h-32 m-2" />
                  <Image
                    source={countyImages.zastava}
                    className="w-32 h-16 m-2"
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
                text={countyData[item.textKey]}
              />
            ))}

            <Graph
              data={{
                labels: countyData.populationData.map(({ year }) =>
                  year.toString()
                ),
                datasets: [
                  {
                    data: countyData.populationData.map(
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

export default CountyScreen;
