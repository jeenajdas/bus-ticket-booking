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
          DEFAULT: '#000080', // Navy blue
          light: '#0000a0',
          dark: '#000060',
        },
        accent: {
          DEFAULT: '#e0c27b', // Gold
          light: '#f0d28b',
          dark: '#c9aa5f',
        },
        slate: {
          900: '#0f172a',
        }
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(100%)', filter: 'blur(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)', filter: 'blur(0)' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        reveal: 'reveal 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
    },
  },
  plugins: [],
}
