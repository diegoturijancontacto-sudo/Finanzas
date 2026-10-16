/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./app.js",        // si ya separaste el JSX
    "./**/*.html",     // por si tienes mobile.html u otros
  ],
  theme: {
    extend: {
      animation: {
        'bounce-custom': 'bounce-custom 1s infinite ease-in-out',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    }
  },
  plugins: [],
}