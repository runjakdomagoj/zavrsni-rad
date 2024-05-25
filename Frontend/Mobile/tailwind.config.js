/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./App.{js,jsx,ts,tsx}",
      "./components/**/*.{js,jsx,ts,tsx}",
      "./screens/**/*.{js,jsx,ts,tsx}",
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
