/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
  cacheDir: './node_modules/.vite/cartojavi1',

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [
    react(),
    viteTsConfigPaths({
      root: './',
    }),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: './',
  //    }),
  //  ],
  // },

  test: {
    globals: true,
    setupFiles: './testUtils/setupTests.js',

    cache: {
      dir: './node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    alias: {
      '@deck.gl/carto/typed': path.resolve(
        __dirname,
        'node_modules',
        '@deck.gl/carto/dist/esm'
      ),
      '@deck.gl/geo-layers': path.resolve(
        __dirname,
        'node_modules',
        '@deck.gl/geo-layers/dist/esm'
      ),
      '@deck.gl/layers': path.resolve(
        __dirname,
        'node_modules',
        '@deck.gl/layers/dist/esm'
      ),
      '@deck.gl/aggregation-layers': path.resolve(
        __dirname,
        'node_modules',
        '@deck.gl/aggregation-layers/dist/esm'
      ),
    },
    // resolvers: [
    //   {
    //     test: /@deck.gl\/carto\/typed/,
    //     resolve: (id) => {
    //       return id.replace('@deck.gl/carto/typed', '@deck.gl/carto/dist/esm');
    //     },
    //   },
    // ],
  },
});
