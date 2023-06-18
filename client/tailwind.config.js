module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        black: "#000",
        white: "#fff",
        primary: "#E5F5E8", // Soft greenish-white color
        secondary: "#007678", // Deep teal color
        tertiary: "#C0FCF9", // Light aqua color
        accent: "#619B98", // Cool grayish-green color
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
