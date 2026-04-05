import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three')) {
            return 'three-core';
          }

          if (id.includes('@react-three/drei')) {
            return 'drei-vendor';
          }

          if (id.includes('@react-three/fiber')) {
            return 'fiber-vendor';
          }

          if (id.includes('node_modules/framer-motion')) {
            return 'motion-vendor';
          }

          if (id.includes('node_modules/react')) {
            return 'react-vendor';
          }
        },
      },
    },
  },
});
