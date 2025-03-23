/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366f1', // indigo-500
          hover: '#4f46e5', // indigo-600
        },
        lavender: {
          100: '#f0ebff',
          200: '#e1d7ff',
          300: '#c2b4fc',
          400: '#a391f9',
          500: '#8470f6',
          600: '#6550f3',
          700: '#4730e0',
          800: '#3525b0',
          900: '#2c2080',
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require('tailwind-scrollbar-hide')],
} 
