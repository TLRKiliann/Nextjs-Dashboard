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
        "sm-out": "0 0 7px rgba(100, 100, 100, 0.2)",
        "out": "0 0 10px rgba(0, 0, 0, 1)",
        "outdarker": "0 0 7px rgba(0, 0, 0, 1)",
        "whitecustom": "0 0 7px rgba(255, 255, 255, 1)",
        "in": "inset 0 0 10px rgba(0, 0, 0, 0.2)",
        "indarker": "inset 0 0 7px rgba(0, 0, 0, 0.2)",
        "green": "0 0 3px rgba(74, 222, 128, 0.5)",
        "orange": "0 0 3px rgba(251, 146, 60, 0.5)",
        "cyan": "0 0 3px rgba(34, 211, 238, 0.5)",
        "fuchsia": "0 0 3px rgba(232, 121, 249, 0.4)",
        "square-green": "0 0 7px rgba(74, 222, 128, 0.8)",
        "square-orange": "0 0 7px rgba(251, 146, 60, 0.8)",
        "square-cyan": "0 0 7px rgba(34, 211, 238, 0.8)",
        "square-fuchsia": "0 0 7px rgba(232, 121, 249, 0.8)",
      },
    },
  },
  plugins: [],
};
export default config;
