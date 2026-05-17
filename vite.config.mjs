import react from '@vitejs/plugin-react';
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [reactRouter()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.mjs',
  },

  resolve: {
    tsconfigPaths: true,
  },
});
