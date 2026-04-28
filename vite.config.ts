import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    svelte(),
    dts()
  ],
  resolve: {
    alias: {
      $lib: path.resolve(__dirname, 'src/lib'),
      $assets: path.resolve(__dirname, 'src/assets')
    },
  },
  build: {
    target: 'es2018',
    commonjsOptions: {
      include: [], // 👈 không xử lý CJS nữa
    },
    lib: {
      entry: 'src/define-web-component.ts',
      fileName: 'floor-editor',
      name: 'floor-editor',
      formats: ['es', 'umd']
    },
    assetsInlineLimit: 10 * 1024 * 1024, // 10MB
  }
});