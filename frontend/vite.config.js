import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/', // Ensure correct base URL for SPA
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
