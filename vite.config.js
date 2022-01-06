
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true
  },
  test: {
    environment: 'happy-dom',
    global: true,
  },
})