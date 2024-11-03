/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        main: {
          background: '#1a202c',
          'default-text': '#f7fafc',
          'card-background': '#2d3748',
          'card-border': '#4a5568',
          'primary-text': '#9f7aea',
          'secondary-text': '#38b2ac',
          active: '#38b2ac',
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
