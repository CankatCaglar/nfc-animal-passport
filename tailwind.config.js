/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'earth': {
          dark: '#421B1C', // #421B1C
          red: '#88383B',  // #88383B
          brown: '#A89072', // #A89072
          gold: '#E5AC65',  // #E5AC65
          sand: '#DBCAB3',  // #DBCAB3
        },
        'theme': {
          beige: '#E8D5C4', // Beige
          lightBeige: '#F3E9E0', // Light Beige
          darkGrey: '#3A3845', // Dark Grey
          mediumGrey: '#5A5766', // Medium Grey
          lightText: '#F5F5F5', // Light text for dark backgrounds
          darkText: '#1A1A1A', // Dark text for light backgrounds
          accent: '#C58940', // Accent color (warm brown)
          lightAccent: '#E5BA73', // Light accent color
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
    },
  },
  plugins: [],
} 