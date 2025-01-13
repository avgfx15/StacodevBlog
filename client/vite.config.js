import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3200', // Replace with your backend URL
        changeOrigin: true,
        secure: false, // Correctly placed inside the target configuration
        onError(err, req, res) {
          console.error('Proxy error:', err);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Proxy error: ' + err.message);
        },
      },
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
