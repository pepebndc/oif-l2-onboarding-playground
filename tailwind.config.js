/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        oz: {
          // Primary brand colors - static
          blue: '#4E5EE4',
          purple: '#6366F1',
          accent: '#818CF8',
          
          // Theme-aware colors using CSS variables
          bg: 'var(--oz-bg)',
          surface: 'var(--oz-surface)',
          card: 'var(--oz-card)',
          border: 'var(--oz-border)',
          text: 'var(--oz-text-muted)',
          
          // Dark mode specific (legacy support)
          dark: '#0A0B0D',
          darker: 'var(--oz-surface)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'oz': 'var(--oz-shadow)',
        'oz-md': 'var(--oz-shadow-md)',
        'oz-lg': 'var(--oz-shadow-lg)',
      }
    },
  },
  plugins: [],
}
