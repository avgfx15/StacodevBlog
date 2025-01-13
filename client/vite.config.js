import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import process from 'process';

export default defineConfig({
  server: {
    proxy: {
      '/api':
        process.env.NODE_ENV === 'production'
          ? 'https://stacodevblog.onrender.com/'
          : 'http://localhost:3200',
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
  plugins: [react()],
});
