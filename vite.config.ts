import { defineConfig } from 'vite';
import path from 'path';

import react from '@vitejs/plugin-react';
import mix, { vercelAdapter } from 'vite-plugin-mix';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mix({
      handler: './src/server/app.ts',
      adapter: vercelAdapter(),
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
