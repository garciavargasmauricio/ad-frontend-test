import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        archivo: ["var(--font-archivo)", "sans-serif"],
      },
      colors: {
        border: {
          light: "#EFEDF3",
        },
        primary: "#EEEEEE",
        secondary: "#404040",
        accent: "#F97316",
        text: "#3B3B3B",
        new: "#F5F5F4",
        button: "#585660",
      },
    },
  },
  plugins: [],
};
export default config;
