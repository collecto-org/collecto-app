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
        lightgray: "#d2d4d5",
        pinklight: "#C7C7C7",
        fontSize: {
          xxs: "0.7rem",
        },
      },
      fontFamily: {
        quicksand: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          /* Webkit */
          "&::-webkit-scrollbar": {
            display: "none",
          },
          /* Firefox */
          "scrollbar-width": "none",
          /* IE/Edge */
          "-ms-overflow-style": "none",
        },
      });
    }),
  ],
};
