/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: '#6F6E77',
        primary: {
          main: '#274156',
          light: '#1b998b',
          bg: '#E9EBF8',
        },
        hover: {
          main: '#2E7D32',
          light: '#4CAF50',
        },

        danger: {
          main: '#BB342F',
        },
        info: {
          main: '#F2C14E',
        },
      },
    },
  },
  plugins: [],
};
