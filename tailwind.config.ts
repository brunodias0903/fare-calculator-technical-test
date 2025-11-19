import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#030712',
        surface: 'rgba(255,255,255,0.04)',
        'surface-strong': 'rgba(15,23,42,0.6)',
        brand: {
          50: '#f2e8ff',
          200: '#c7a7ff',
          400: '#a172ff',
          500: '#8358ff',
          600: '#6c45d6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 20px 60px rgba(99, 102, 241, 0.25)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
} satisfies Config
