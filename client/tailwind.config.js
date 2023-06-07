module.exports = {
  purge: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        black: "#000",
        white: "#fff",
        primary: "#f04c23",
        secondary: "#6610f2",
        red: "#f04c23",
        beige: "#e8d6c6",
        yellow: "#ffcb05",
        blue: "#12a296",
        gray: {
          100: "#f7fafc",
          400: "#cbd5e0",
          700: "#4a5568",
          900: "#1a202c",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
