/** @type {import('tailwindcss').Config} */

import plugin from "tailwindcss/plugin";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        coral: "#e8796e",
        turquoise: "#7bc1c7",
        cream: "#f0eee1",
        sage: "#72847f",
        darkblue: "#1d313c",
        greengrey: "#72847f",
        lightgrey: "#d2d4d5",
        pinklight: "#C7C7C7",
      },
      fontSize: {
        xxs: "0.7rem",
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
      },
      boxShadow: {
        "solid-darkblue": "0 4px 0 0 #1d313c", // eje X, eje Y, blur, spread, color
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          "&::-webkit-scrollbar": {
            display: "none",
          },
          "scrollbar-width": "none",
          "-ms-overflow-style": "none",
        },
        ".text-shadow-darkblue": {
          "text-shadow": "2px 2px 0 #1d313c",
        },
        ".text-shadow-turquoise": {
          "text-shadow": "2px 2px 0 #7bc1c7",
        },
      });
    }),
  ],
};
