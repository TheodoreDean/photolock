import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  // Relative paths work both locally and on GitHub Pages project sites.
  base: "./",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        privacy: resolve(__dirname, "privacy.html"),
        terms: resolve(__dirname, "terms.html"),
        support: resolve(__dirname, "support.html"),
      },
    },
  },
});
