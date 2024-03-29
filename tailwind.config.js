/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
   
    extend: {
      fontFamily: {
        'rale': ['Raleway', 'sans-serif'],
        'header': ['DM Serif Display', 'serif']
      },
      colors: {
        primary: 'rgb(235, 169, 55)',
      },
      screens: {
        'xl': '1440px',
      },
      height: {
        'calc': 'calc(100vh - 1px)',
      },
    },
  },
  plugins: [],
}

