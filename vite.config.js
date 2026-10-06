import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The Vite entry is app.html so the built, runnable bundle can be published
// as the canonical root index.html (see scripts/publish.mjs).
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: { input: 'app.html' },
  },
  server: { open: '/app.html' },
});
