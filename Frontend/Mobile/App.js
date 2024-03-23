import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { fetchData } from "./api/api";
import Map from "./components/Map";

export default function App() {
  const croatiaMap = require("./assets/hr.json");

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData()
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Map geojson={croatiaMap} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
