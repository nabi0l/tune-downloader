import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  // For development, use the proxy. For production, use the environment variable
  const isDev = command === 'serve';
  
  return {
    plugins: [react(), tailwindcss()],
    server: isDev ? {
      proxy: {
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
          secure: false,
          ws: true,
        }
      }
    } : {},
    // Environment variables that start with VITE_ will be exposed to your client-side code
    envPrefix: 'VITE_',
  };
});
