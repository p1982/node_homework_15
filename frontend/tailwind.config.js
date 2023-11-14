/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '40': 'repeat(40, minmax(0, 1fr))',
      }
    },
  },
  plugins: [],
}

