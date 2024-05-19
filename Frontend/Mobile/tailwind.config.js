/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/TitleButton.{js,jsx,ts,tsx}",
    "./components/Graph.{js,jsx,ts,tsx}",
    "./components/Map.{js,jsx,ts,tsx}",
    "./MapScreen/Map.{js,jsx,ts,tsx}",
    "./HomeScreen/Map.{js,jsx,ts,tsx}",
    "./CountryScreen/Map.{js,jsx,ts,tsx}",
    "./CountyScreen/Map.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        backgroundColor: "#F2F0F0",
        buttonColor: "#2E3551",
      }
    },
  },
  plugins: [],
};
