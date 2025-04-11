/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{html,js,jsx,ts,tsx}", // Esto cubre todos los archivos con las extensiones correctas
    ],
    theme: {
      extend: {
        colors: {
          white: "#FFFFFF",
          black: "#000000",
          "very-light-pink": "#C7C7C7",
          "text-input-field": "#F7F7F7",
          "hospital-green": "#ACD9B2",
          coral: "#e8796e",
          turquoise: "#7bc1c7",
          cream: "#f0eee1",
          "light-gray": "#f4d5d5", // Corregido el color
          sage: "#72847f",
          "dark-blue": "#1d313c",
        },
        fontSize: {
          sm: "14px",
          md: "16px",
          lg: "18px",
        },
      },
    },
    plugins: [],
  }
  