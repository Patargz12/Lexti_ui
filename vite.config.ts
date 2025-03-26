import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// No need to import tailwindcss here

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react()
    // Don't add tailwindcss here
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
})