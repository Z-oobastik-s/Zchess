import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const BUILD_VERSION = Date.now().toString();

export default defineConfig({
  base: '/Zchess/',
  plugins: [
    react(),
    {
      name: 'inject-build-version',
      closeBundle() {
        const swPath = resolve(__dirname, 'dist/sw.js');
        try {
          let sw = readFileSync(swPath, 'utf-8');
          sw = sw.replace('__BUILD_VERSION__', BUILD_VERSION);
          writeFileSync(swPath, sw);
        } catch {
          // sw.js создаётся при копировании из public
        }

        const versionPath = resolve(__dirname, 'dist/version.json');
        writeFileSync(
          versionPath,
          JSON.stringify({ version: BUILD_VERSION, builtAt: new Date().toISOString() }),
        );
      },
    },
  ],
  define: {
    __APP_VERSION__: JSON.stringify(BUILD_VERSION),
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          r3f: ['@react-three/fiber', '@react-three/drei'],
          motion: ['framer-motion'],
          gsap: ['gsap'],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
