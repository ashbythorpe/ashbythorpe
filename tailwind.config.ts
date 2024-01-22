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
      colors: {
        "cerise-red": {
          "50": "#fdf2f7",
          "100": "#fce7f1",
          "200": "#fbcfe4",
          "300": "#f9a8cc",
          "400": "#f472aa",
          "500": "#ec488a",
          "600": "#dc2e6b", // default
          "700": "#be184d",
          "800": "#9d1740",
          "900": "#831839",
          "950": "#50071d",
        },
        "energy-yellow": {
          "50": "#fdfbe9",
          "100": "#fdf7c4",
          "200": "#fbeb8d",
          "300": "#f9dc5c", // default
          "400": "#f4c31b",
          "500": "#e4ab0e",
          "600": "#c58309",
          "700": "#9d5d0b",
          "800": "#824a11",
          "900": "#6f3d14",
          "950": "#401f08",
        },
        indigo: {
          "50": "#f0f4fd",
          "100": "#e4ecfb",
          "200": "#cfdbf6",
          "300": "#b1c3f0",
          "400": "#92a2e7",
          "500": "#7784dd",
          "600": "#6369d1", // default
          "700": "#4c50b6",
          "800": "#404493",
          "900": "#3a3f75",
          "950": "#222444",
        },
        jaffa: {
          "50": "#fff6ed",
          "100": "#ffebd5",
          "200": "#fed3aa",
          "300": "#fcb375",
          "400": "#fa8334", // default
          "500": "#f86717",
          "600": "#e94d0d",
          "700": "#c1380d",
          "800": "#992d13",
          "900": "#7c2812",
          "950": "#431107",
        },
        black: {
          "50": "#f6f6f6",
          "100": "#e7e7e7",
          "200": "#d1d1d1",
          "300": "#b0b0b0",
          "400": "#888888",
          "500": "#6d6d6d",
          "600": "#5d5d5d",
          "700": "#4f4f4f",
          "800": "#454545",
          "900": "#3d3d3d",
          "950": "#020202", // default
        },
      },
      keyframes: {
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    // ...
  ],
};
export default config;
