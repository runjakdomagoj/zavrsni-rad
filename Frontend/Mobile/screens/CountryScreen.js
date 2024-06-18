import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Image, ScrollView } from "react-native";
import { fetchData } from "../api/api";
import croatiaCoatOfArms from "../assets/images/Drzava/hrvatska_grb.png";
import croatiaFlag from "../assets/images/Drzava/hrvatska_zastava.png";
import Graph from "../components/Graph";
import TextBox from "../components/TextBox";

const CountryScreen = ({ navigation }) => {
  const [countryData, setCountryData] = useState(null);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const data = await fetchData();
        const country = data[1];
        setCountryData(country[0]);
      } catch (error) {
        console.error("Error fetching country data: ", error);
      }
    };

    fetchCountryData();
  }, []);

  const textData = [
    { title: "Gustoća naseljenosti", textKey: "populationDensity" },
    { title: "Površina", textKey: "area" },
    { title: "Valuta", textKey: "currency" },
    { title: "O državi", textKey: "countryDescription" },
    { title: "Politički ustroj", textKey: "politicalSystem" },
    { title: "Državni simboli", textKey: "nationalSymbols" },
    { title: "Jezik", textKey: "language" },
    { title: "Religija", textKey: "religion" },
    { title: "Klima", textKey: "climate" },
  ];

  return (
    <ScrollView>
      <View className="bg-white flex-1 p-4">
        {countryData ? (
          <>
            <View className="justify-center items-center">
              <Text className="text-3xl font-bold mb-8">
                {countryData.countryName}
              </Text>
              <Image
                source={croatiaCoatOfArms}
                className="w-24 h-32 mb-8"
                resizeMode="contain"
              />
              <Image
                source={croatiaFlag}
                className="w-3/5 h-24 mb-8"
                resizeMode="cover"
              />
            </View>
            {textData.map((item, index) => (
              <TextBox
                key={index}
                title={item.title}
                text={
                  item.textKey === "area" ||
                  item.textKey === "populationDensity"
                    ? `${countryData[item.textKey]} km²`
                    : countryData[item.textKey]
                }
              />
            ))}

            <Graph
              data={{
                labels: countryData.populationData.map(({ year }) =>
                  year.toString()
                ),
                datasets: [
                  {
                    data: countryData.populationData.map(
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

export default CountryScreen;
