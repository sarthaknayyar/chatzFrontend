import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/my-app/',
  publicDir: 'public',
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    minify: true,
    sourcemap: false,
  },
});
