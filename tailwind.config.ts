import type { Config } from "tailwindcss";
// import scrollbar from "tailwind-scrollbar";
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require('tailwind-scrollbar')],
};

export default config;
