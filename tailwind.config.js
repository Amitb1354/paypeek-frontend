/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy:    { DEFAULT: '#0F1629', mid: '#1A2540', light: '#252F4A' },
        indigo:  { DEFAULT: '#5B6BF8', light: '#EEF0FE', dark: '#3D4ED4' },
        emerald: { DEFAULT: '#10B981', light: '#D1FAE5' },
        ink:     { DEFAULT: '#1C2536', soft: '#8892A4', muted: '#C4CAD6' },
        surface: { DEFAULT: '#F7F8FC', card: '#FFFFFF', border: '#E8EAF0' },
      },
      fontFamily: {
        display: ['Syne', 'system-ui', 'sans-serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        ticker: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(12px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
      animation: {
        ticker: 'ticker 35s linear infinite',
        'fade-up': 'fadeUp 0.4s ease-out forwards',
        shimmer: 'shimmer 1.8s infinite linear',
      },
    },
  },
  plugins: [],
}
