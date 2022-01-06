
import { defineConfig } from 'vite'
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'dist/main.js'),
      name: 'EntityJS',
      fileName: (format) => `entity.${format}.js`
    }
  }
})