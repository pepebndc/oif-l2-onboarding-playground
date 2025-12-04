import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Enable history API fallback for SPA routing
    historyApiFallback: true,
  },
  preview: {
    // Also enable for preview server (production build preview)
    historyApiFallback: true,
  },
})

