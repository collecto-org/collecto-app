/** @type {import('tailwindcss').Config} */

export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {
        colors: {
          coral: '#e8796e',
          turquoise: '#7bc1c7',
          cream: '#f0eee1',
          sage: '#72847f',
          darkblue: '#1d313c',
          hospitalgreen: '#ACD9B2',
          lightgray: '#d2d4d5',
          pinklight: '#C7C7C7',
          fontSize:{
            xxs: '0.7rem'
          }
        },
        fontFamily: {
          quicksand: ['Quicksand', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }
  