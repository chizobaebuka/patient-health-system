/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#f0f4f8',
        foreground: '#2d3748',
        primary: {
          DEFAULT: '#3b5998',
          50: '#e8f0fe',
          100: '#c9d8fd',
          200: '#a7befa',
          300: '#849ff5',
          400: '#6683ee',
          500: '#3b5998',
          600: '#354e8c',
          700: '#2d4372',
          800: '#25365a',
          900: '#1c2a45',
        },
        secondary: {
          DEFAULT: '#38a169',
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#38a169',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        accent: {
          DEFAULT: '#ed8936',
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#ed8936',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
      },
      fontFamily: {
        sans: ['Inter var', ...fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}