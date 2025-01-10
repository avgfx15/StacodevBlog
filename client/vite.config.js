import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3200',
      secure: false,
    },
  },
  build: {
    chunkSizeWarningLimit: 1000, // Adjust this value as needed (default is 500 kB)
  },
  plugins: [react()],
});
