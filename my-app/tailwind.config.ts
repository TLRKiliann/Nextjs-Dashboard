import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        upstart: {
          '0%': { 
            transform: 'translateY(200px)',
            opacity: "0"
          },
          '100%': { 
            transform: 'translateY(0px)',
            opacity: "1"
          }
        },
        sliceappear: {
          "0%": {
            opacity: "0"
          },
          "100%": {
            opacity: "1"
          }
        },
      },
      animation: {
        "up-start": "upstart 0.4s ease 1",
        "slice-appear": "sliceappear 0.5s ease-out 1",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      dropShadow: {
        "text": "2px 2px 1px rgba(0, 0, 0, 0.4)",
        "sm-text": "1px 1px 1px rgba(0, 0, 0, 0.4)",
      },
      boxShadow: {
        "xs-out": "0 0 5px rgba(0, 0, 0, 0.2)",
        "sm-graph": "0 0 3px rgba(100, 100, 100, 0.2)",
        "sm-out": "0 0 7px rgba(100, 100, 100, 0.4)",
        "out": "0 0 10px rgba(0, 0, 0, 1)",
        "md-out": "0 0 12px rgba(100, 100, 100, 0.4)",
        "medium-dark": "0 0 5px rgba(0, 0, 0, 0.7)",
        "out-dark": "0 0 7px rgba(0, 0, 0, 1)",
        "btn-dark": "0 0 10px rgba(0, 0, 0, 0.3)",
        "in": "inset 0 0 7px rgba(100, 100, 100, 0.4)",
        "indarker": "inset 0 0 7px rgba(0, 0, 0, 0.2)",
        "whitecustom": "0 0 7px rgba(255, 255, 255, 1)",
        "green": "0 0 3px rgba(74, 222, 128, 0.5)",
        "orange": "0 0 3px rgba(251, 146, 60, 0.5)",
        "cyan": "0 0 3px rgba(34, 211, 238, 0.5)",
        "fuchsia": "0 0 3px rgba(232, 121, 249, 0.4)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
