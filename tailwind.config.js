/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      avenirBlack: ["Avenir Black", "sans-serif"],
      avenirBook: ["Avenir Book", "sans-serif"],
      avenirHeavy: ["Avenir Heavy", "sans-serif"],
    },
    colors: {
      grayLight: "#f9f9f9",
      grayMedium: "#e2e4e5",
      gray: "#b6babd",
      graySlate: "#6e7a83",
      grayDark: "#36426a",
      primaryBlue: "#3b90fd",
      babyBlue: "#b5dde8",
      paleCyan: "#9dc1cb",
      white: "#ffffff",
      black: "#000000",
    },
    extend: {
      boxShadow: {
        custom: '0 14px 36px 0 rgba(75, 80, 94, 0.05)'
      }
    },
  },
  plugins: [],
}
