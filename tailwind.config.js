/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'rale': ['Raleway', 'sans-serif']
      },
      colors: {
        primary: 'rgb(235, 169, 55)',
      }
    },
  },
  plugins: [],
}

