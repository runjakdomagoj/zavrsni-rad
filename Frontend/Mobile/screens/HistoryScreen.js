import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, ActivityIndicator } from "react-native";
import { fetchData } from "../api/api";
import TextBox from "../components/TextBox";

const HistoryScreen = () => {
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
    {
      title: "Kameno doba (1500000 pr. Kr. - 3000 pr. Kr.)",
      textKey: "stoneAge",
    },
    { title: "Metalno doba (3000 pr. Kr. - 100 pr.Kr.)", textKey: "metalAge" },
    {
      title: "Doba Grka, Ilira i Rimljana  (800 pr.Kr. - 476.)",
      textKey: "greekIllyrianRomanPeriod",
    },
    { title: "Dolazak Hrvata (7. st.)", textKey: "arrivalOfCroats" },
    {
      title: "Hrvatsko kraljevstvo (925. - 1102.)",
      textKey: "croatianKingdom",
    },
    {
      title: "Hrvatsko-ugarska unija (1102. - 1526.)",
      textKey: "croatianHungarianUnion",
    },
    { title: "Ratovi s Osmanlijama (15. st. - 1699.)", textKey: "ottomanWars" },
    {
      title: "Habsburška Monarhija (1527. - 1918.)",
      textKey: "habsburgMonarchy",
    },
    {
      title: "Oslobađanje od Osmanlija (1699. - 1718.)",
      textKey: "liberationFromOttomans",
    },
    {
      title: "Hrvatski narodni preporod (1835. - 1848.)",
      textKey: "croatianNationalRevival",
    },
    {
      title: "Hrvatsko-ugarska nagodba (1868. - 1918.)",
      textKey: "croatianHungarianSettlement",
    },
    { title: "Prva Jugoslavija (1918. - 1941.)", textKey: "firstYugoslavia" },
    {
      title: "Nezavisna Država Hrvatska (1941. - 1945.)",
      textKey: "independentStateOfCroatia",
    },
    { title: "SFR Jugoslavija (1945. - 1991.)", textKey: "sfrYugoslavia" },
    {
      title: "Neovisna Hrvatska (1991. - danas)",
      textKey: "independentCroatia",
    },
  ];

  return (
    <ScrollView>
      <View className="bg-white flex-1 p-4">
        {historyData ? (
          <>
            <Text className="text-3xl font-bold mb-8 text-center">
              Povijest Hrvatske
            </Text>
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
