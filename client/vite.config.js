import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://stacodevblog-backend.onrender.com',
      secure: false,
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString();
          }
        },
      },
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(import.meta.env.MODE),
  },
  plugins: [react()],
});
