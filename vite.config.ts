import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    // output directory for bundled files
    outDir: "./public/dist",

    // entry points that Vite will process
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "tsc-out/server/server.js"),
      },
    },
  },

  root: "tsc-out",
});
