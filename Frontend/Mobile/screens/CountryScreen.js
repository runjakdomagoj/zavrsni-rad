import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Image } from "react-native";
import { fetchData } from "../api/api";
import { ScrollView } from "react-native-gesture-handler";
import croatiaCrest from "../assets/images/Drzava/hrvatska_grb.png";
import croatiaFlag from "../assets/images/Drzava/hrvatska_zastava.png";
import Graph from "../components/Graph";
import TextBox from "../components/TextBox";

const CountryScreen = () => {
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

  const textData = [
    { title: "Gustoća naseljenosti", textKey: "populationDensity" },
    { title: "Površina", textKey: "area" },
    { title: "Valuta", textKey: "currency" },
    { title: "O državi", textKey: "countryDescription" },
    { title: "Povijest", textKey: "history" },
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
              <Text className="text-xl font-bold mb-2">
                {countryData[0].countryName}
              </Text>
              <Image source={croatiaCrest} className="w-24 h-32 m-2" />
              <Image source={croatiaFlag} className="w-32 h-16 m-2" />
            </View>
            {textData.map((item, index) => (
              <TextBox
                key={index}
                title={item.title}
                text={countryData[0][item.textKey]}
              />
            ))}

            <Graph
              data={{
                labels: countryData[0].populationData.map(({ year }) =>
                  year.toString()
                ),
                datasets: [
                  {
                    data: countryData[0].populationData.map(
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

export default CountryScreen;
