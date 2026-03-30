import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        savanna: "#2D5A27", // Deep African Green
        solar: "#FFD700",   // Kenyan Sun Yellow
        earth: "#4B3621",   // Soil Brown
      },
    },
  },
  plugins: [],
};
export default config;
