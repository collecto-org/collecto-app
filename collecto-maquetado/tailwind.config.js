/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        coral: "#e8796e",
        turquoise: "#7bc1c7",
        cream: "#f0eee1",
        lightgray: "#d2d4d5",
        sage: "#72847f",
        darkblue: "#1d313c",
        white: "#ffffff",
      },
    },
  },
  plugins: [],
};
