import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    // output directory for bundled files
    outDir: "dist",

    // entry points that Vite will process
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "tsc-out/server.js"),
      },
    },
  },

  root: "tsc-out",
});
