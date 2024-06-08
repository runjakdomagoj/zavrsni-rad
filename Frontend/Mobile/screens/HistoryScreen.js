import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, ActivityIndicator } from "react-native";
import { fetchData } from "../api/api";
import TextBox from "../components/TextBox";

const HistoryScreen = ({ navigation }) => {
  const [historyData, setHistoryData] = useState(null);

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const data = await fetchData();
        const history = data[3];
        setHistoryData(history[0]);
      } catch (error) {
        console.error("Error fetching history data: ", error);
      }
    };

    fetchHistoryData();
  }, []);

  const textData = [
    { title: "Kameno doba", textKey: "stoneAge" },
    { title: "Metalno doba", textKey: "metalAge" },
    {
      title: "Doba Grka, Ilira i Rimljana",
      textKey: "greekIllyrianRomanPeriod",
    },
    { title: "Dolazak Hrvata", textKey: "arrivalOfCroats" },
    { title: "Hrvatsko kraljevstvo", textKey: "croatianKingdom" },
    { title: "Hrvatsko-ugarska unija", textKey: "croatianHungarianUnion" },
    { title: "Ratovi s Osmanlijama", textKey: "ottomanWars" },
    { title: "Habsburška Monarhija", textKey: "habsburgMonarchy" },
    { title: "Oslobađanje od Osmanlija", textKey: "liberationFromOttomans" },
    { title: "Hrvatski narodni preporod", textKey: "croatianNationalRevival" },
    {
      title: "Hrvatsko-ugarska nagodba",
      textKey: "croatianHungarianSettlement",
    },
    { title: "Prva Jugoslavija", textKey: "firstYugoslavia" },
    {
      title: "Nezavisna Država Hrvatska",
      textKey: "independentStateOfCroatia",
    },
    { title: "SFR Jugoslavija", textKey: "sfrYugoslavia" },
    { title: "Neovisna Hrvatska", textKey: "independentCroatia" },
  ];

  return (
    <ScrollView>
      <View className="bg-white flex-1 p-4">
        {historyData ? (
          <>
            <Text className="text-2xl font-bold mb-4">Povijest Hrvatske</Text>
            {textData.map((item, index) => (
              <TextBox
                key={index}
                title={item.title}
                text={historyData[item.textKey]}
              />
            ))}
          </>
        ) : (
          <ActivityIndicator size="large" color="black" />
        )}
      </View>
    </ScrollView>
  );
};

export default HistoryScreen;
