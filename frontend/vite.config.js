import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://social-app-9bgk.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
