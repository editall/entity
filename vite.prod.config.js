import { defineConfig } from 'vite'

const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: path.join(__dirname, './docs'),
    rollupOptions: {
      input: {
        entityjs: path.resolve(__dirname, 'index.html'),
      }
    }
  }
})