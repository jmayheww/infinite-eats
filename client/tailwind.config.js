module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        black: "#000",
        white: "#fff",
        primary: "#47A36A", // A bolder, vibrant green
        secondary: "#FFA43D", // A bolder, warmer orange
        tertiary: "#E5F5E8", // A slightly more saturated light greenish white
        accent: "#00796B", // A deeper, bolder teal
        darkaccent: "#2E3E48", // A darker, more saturated gray-blue
      },
      fontFamily: {
        opensans: ["Open Sans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
