/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'primary': '#DB1471',
        'secondary': '#0F1C35',
        'muted': '#323232',
        'borders': "#D5D6D9",
        'background': "#f6f6f9",
        'sideLinksBg': '#E3EBFC'
      },
      fontFamily: {
        'manrope': ['Manrope', 'sans-serif']
      }
    },
  },
  plugins: [],
};
