/// <reference types="vitest" />
import { defineConfig } from 'vite'
import * as path from 'path'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgr({exportAsDefault: true}),
    react()
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    testTimeout: 7500,
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname,
    },
    setupFiles: './src/test/setup.ts'
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
})
