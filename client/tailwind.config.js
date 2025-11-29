/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // OceanR brand colors - deep blues from logo
        primary: {
          50: '#e6f1ff',
          100: '#b3d9ff',
          200: '#80c1ff',
          300: '#4da9ff',
          400: '#1a91ff',
          500: '#0077e6',
          600: '#005db3',
          700: '#004380',
          800: '#00294d',
          900: '#000f1a',
        },
        ocean: {
          light: '#4da9ff',
          DEFAULT: '#0077e6',
          dark: '#004380',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
