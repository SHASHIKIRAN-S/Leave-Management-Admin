import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000', // Change this to your FastAPI server
        changeOrigin: true,
        secure: false
      },
    },
  },
});
