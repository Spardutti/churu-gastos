/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: '#6F6E77',
        main: {
          primary: '#021526',
          secondary: '#03346E',
          tertiary: '#6EACDA',
          light: '#E2E2B6',
        },
      },
    },
  },
  plugins: [],
};
