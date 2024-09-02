import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "0 0 5rem -15px rgba(0, 0, 0, 0.3)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#669BBC",
          secondary: "#FDF0D5",
          accent: "#e879f9",
          neutral: "#201e24",
          "base-100": "#003049",
          info: "#67c6ff",
          success: "#66BC69",
          warning: "#C16612",
          error: "#780000",
        },
      },
    ],
  },

  plugins: [daisyui],
};
export default config;
