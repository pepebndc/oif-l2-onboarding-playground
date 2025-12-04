/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        oz: {
          blue: '#4E5EE4',
          purple: '#6366F1',
          dark: '#0A0B0D',
          darker: '#06070A',
          card: '#111318',
          border: '#1E2028',
          text: '#A1A1AA',
          accent: '#818CF8',
        }
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}

