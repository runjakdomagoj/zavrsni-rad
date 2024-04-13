import axios from "axios";

const URL = "http://127.0.0.1:5000";

// Fetches the data from API
export const fetchData = async () => {
  try {
    const response = await axios.get(`${URL}`);
    const data = response.data;
    const restructuredData = data.map((item) => {
      const { "Naziv županije": countyName, ...rest } = item;
      const populationData = Object.entries(rest)
        .filter(([key]) => !isNaN(key)) // Filters out non-year keys
        .map(([year, population]) => ({ year: Number(year), population }));

      const populationDensity = item["Gustoća naseljenosti"];
      const area = item["Površina"];
      const countySeat = item["Sjedište županije"];

      return {
        countyName,
        populationData,
        populationDensity,
        area,
        countySeat,
      };
    });
    return restructuredData;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};
