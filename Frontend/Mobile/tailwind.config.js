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
        lightBlue: "#00b0d9",
        lightGreen: "#66f1a0",
      }
    },
  },
  plugins: [],
};
