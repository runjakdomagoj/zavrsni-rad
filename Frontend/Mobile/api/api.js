import axios from "axios";

const URL = "http://127.0.0.1:5000";

// Fetches the data from API
export const fetchData = async () => {
  try {
    const response = await axios.get(`${URL}`);
    const data = response.data;

    if (
      data &&
      "Županije" in data &&
      "Država" in data &&
      "Gradovi" in data &&
      "Povijest" in data
    ) {
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

      const cities = data["Gradovi"].map((item) => {
        const { "Naziv grada": cityName, ...rest } = item;
        const populationData = Object.entries(rest)
          .filter(([key]) => !isNaN(key)) // Filters out non-year keys
          .map(([year, population]) => ({ year: Number(year), population }));

        const populationDensity = item["Gustoća naseljenosti"];
        const area = item["Površina"];
        const county = item["Županija"];
        const callNumber = item["Pozivni broj"];
        const zipCode = item["Poštanski broj"];
        const licensePlate = item["Registracijska oznaka"];
        const history = item["Povijest"];
        const latitude = item["Zemljopisna širina"];
        const longitude = item["Zemljopisna visina"];

        return {
          cityName,
          populationData,
          populationDensity,
          area,
          county,
          callNumber,
          zipCode,
          licensePlate,
          history,
          latitude,
          longitude,
        };
      });

      const history = data["Povijest"].map((item) => {
        const stoneAge = item["Kameno doba"];
        const metalAge = item["Metalno doba"];
        const greekIllyrianRomanPeriod = item["Doba Grka, Ilira i Rimljana"];
        const arrivalOfCroats = item["Dolazak Hrvata"];
        const croatianKingdom = item["Hrvatsko kraljevstvo"];
        const croatianHungarianUnion = item["Hrvatsko-ugarska unija"];
        const ottomanWars = item["Ratovi s Osmanlijama"];
        const habsburgMonarchy = item["Habsburška Monarhija"];
        const liberationFromOttomans = item["Oslobađanje od Osmanlija"];
        const croatianNationalRevival = item["Hrvatski narodni preporod"];
        const croatianHungarianSettlement = item["Hrvatsko-ugarska nagodba"];
        const firstYugoslavia = item["Prva Jugoslavija"];
        const independentStateOfCroatia = item["Nezavisna Država Hrvatska"];
        const sfrYugoslavia = item["SFR Jugoslavija"];
        const independentCroatia = item["Neovisna Hrvatska"];

        return {
          stoneAge,
          metalAge,
          greekIllyrianRomanPeriod,
          arrivalOfCroats,
          croatianKingdom,
          croatianHungarianUnion,
          ottomanWars,
          habsburgMonarchy,
          liberationFromOttomans,
          croatianNationalRevival,
          croatianHungarianSettlement,
          firstYugoslavia,
          independentStateOfCroatia,
          sfrYugoslavia,
          independentCroatia,
        };
      });

      return [counties, country, cities, history];
    } else {
      throw new Error("Data structure doesn't match expected format.");
    }
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};
