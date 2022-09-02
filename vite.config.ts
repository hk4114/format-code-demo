import { defineConfig } from 'vite'
import autoprefixer from 'autoprefixer'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [autoprefixer]
    }
  },
  plugins: [react()]
})
