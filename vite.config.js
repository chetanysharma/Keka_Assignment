import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: process.env.VITE_PORT,
    proxy: {
      '/api': {
        target: process.env.VITE_APP_SITE_BASE_URL,
        changeOrigin: true,
        secure: false
        // rewrite: (path) => path.replace(/^\/api/, ""),
      }
    }
  },
})
