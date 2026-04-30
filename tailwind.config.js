/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Rubik', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#fdf2f2',
          100: '#fce4e4',
          200: '#f9c9c9',
          400: '#ec8282',
          500: '#e25a5a',
          600: '#d13f3f',
          700: '#b82e2e',
          900: '#7a1a1a',
        },
        navy: {
          DEFAULT: '#162e38',
          light: '#1e3d4a',
          dark: '#0e1e25',
        },
        muted: '#67777e',
        surface: '#f2f6f7',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(-8px)' },
          '50%': { transform: 'translateY(8px)' },
        },
      },
    },
  },
  plugins: [],
}
