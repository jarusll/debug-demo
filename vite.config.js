import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: false
    }),
  ],
  build: {
    minify: false,
    target: 'esnext',
  },
  esbuild: {
    keepNames: true,
    target: 'esnext',
  },
  server: {
    hmr: { overlay: false }
  }
})
