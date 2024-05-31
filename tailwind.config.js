/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '1024px',
      xl: '1170px',
    },
    extend: {
      container: {
        center: true,
      },
      colors: {
        primary: '#3b82f6',
      },
      fontFamily: {
        inter: ['Inter, sans-serif'],
      },
      boxShadow: {
        form: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
