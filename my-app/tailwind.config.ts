import type { Config } from "tailwindcss";

const config: Config = {
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
      boxShadow: {
        "out": "0 0 10px rgba(0, 0, 0, 0.2)",
        "in": "inset 0 0 10px rgba(0, 0, 0, 0.3)",
        "green": "0 0 2px rgba(22, 163, 74, 0.3)",
        "orange": "0 0 2px rgba(253, 186, 116, 0.3)",
        "cyan": "0 0 2px rgba(103, 232, 249, 1)",
        "fuchsia": "0 0 2px rgba(232, 121, 249, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
