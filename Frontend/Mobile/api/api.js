import axios from "axios";

const URL = "http://127.0.0.1:5000";

// Fetches the data from API
export const fetchData = async () => {
  try {
    const response = await axios.get(`${URL}`);
    const data = response.data;

    if (data && "Županije" in data && "Država" in data) {
      const counties = data["Županije"].map((item) => {
        const { "Naziv županije": countyName, ...rest } = item;
        const populationData = Object.entries(rest)
          .filter(([key]) => !isNaN(key)) // Filters out non-year keys
          .map(([year, population]) => ({ year: Number(year), population }));

        const populationDensity = item["Gustoća naseljenosti"];
        const area = item["Površina"];
        const countySeat = item["Sjedište županije"];
        const countyDescription = item["O županiji"];

        return {
          countyName,
          populationData,
          populationDensity,
          area,
          countySeat,
          countyDescription,
        };
      });

      const country = data["Država"].map((item) => {
        const { "Naziv države": countryName, ...rest } = item;
        const populationData = Object.entries(rest)
          .filter(([key]) => !isNaN(key)) // Filters out non-year keys
          .map(([year, population]) => ({ year: Number(year), population }));

        const populationDensity = item["Gustoća naseljenosti"];
        const area = item["Površina"];
        const countryDescription = item["O državi"];
        const history = item["Povijest"];
        const politicalSystem = item["Politički ustroj"];
        const nationalSymbols = item["Državni simboli"];
        const currency = item["Valuta"];
        const language = item["Jezik"];
        const religion = item["Religija"];
        const climate = item["Klima"];

        return {
          countryName,
          populationData,
          populationDensity,
          area,
          countryDescription,
          history,
          politicalSystem,
          nationalSymbols,
          currency,
          language,
          religion,
          climate,
        };
      });

      return [counties, country];
    } else {
      throw new Error("Data structure doesn't match expected format.");
    }
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};
