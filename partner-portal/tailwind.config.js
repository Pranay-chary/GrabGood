/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4eda94',
          DEFAULT: '#2ecc71',
          dark: '#27ae60',
        },
        secondary: {
          light: '#f39c12',
          DEFAULT: '#e67e22',
          dark: '#d35400',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 5px 0 rgba(0,0,0,0.05)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 