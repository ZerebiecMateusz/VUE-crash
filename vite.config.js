import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  server: {
    port: 3000,
    // Ignorujemy plik jobs.json, żeby zmiany robione przez backend nie restartowały serwera Vite!
    watch: {
      ignored: ['**/jobs.json', '**/db.json', '**/data/**'] 
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: ( path ) => path.replace(/^\/api/, '')
      }
    }
  }
})
