/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        sidebar: "300px auto", //for sidebar layout
        "sidebar-collapsed": "64px auto", //for collapsed sidebar layout
      },
      backgroundColor: {
        primary: "#007BFF",
        secondary: "#2ECC71",
        accent: "#FF9F43",
        neutral: "#AAB0B6",
      },
      textColor: {
        primary: "#007BFF",
        secondary: "#2ECC71",
        accent: "#FF9F43",
        neutral: "#AAB0B6",
      },
    },
  },
  plugins: [],
};

module.exports = config;
