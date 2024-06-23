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
        "green": "0 0 3px rgba(74, 222, 128, 0.5)",
        "orange": "0 0 3px rgba(251, 146, 60, 0.5)",
        "cyan": "0 0 3px rgba(34, 211, 238, 0.5)",
        "fuchsia": "0 0 3px rgba(232, 121, 249, 0.4)",
      },
    },
  },
  plugins: [],
};
export default config;
