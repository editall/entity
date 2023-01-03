import { defineConfig } from 'vite'
import path from "path";

export default defineConfig({
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
  },
  build: {
    target:"esnext",
    minify:"esbuild",
    emptyOutDir: true,
    esbuild: {
      keepNames: true,
      minify:"whitespace"
    },
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "entity"
    }
  }
});