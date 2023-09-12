/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'media', // 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        optimistic: ["Optimistic", "sans-serif"],
      },
      gridTemplateColumns :{
        dashboard: '200px repeat(8,1fr) 234px'
      },
      gridTemplateRows: {
        dashboard: 'repeat(4,1fr)'
      }
    },
  },
  plugins: [],
};
