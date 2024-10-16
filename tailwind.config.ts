import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 2xl:max-w-screen-2xl xl:max-w-screen-xl mx-auto
      container: {
        center: true,
        screens: {
          "2xl": "1536px",
          xl: "1280px",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#DB1471",
        primaryHover: "#FF0077",
        secondary: "#0F1C35",
        muted: "#323232",
        accent: "#007B99",
        borders: "#D5D6D9",
        inputBorder: "#D9D9D9",
        background: "#f6f6f9",
        sideLinksBg: "#E3EBFC",
        grayArea: "#667085",
        tryGray: "#8C8C8C",
      },
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
