import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
  base: "./",
  build: {
    lib: {
      entry: "lib/_index.ts",
      name: "zyUtils",
      fileName: "zy-utils",
    },
    rollupOptions: {
      output: {
        globals: {
          zyUtils: "zyUtils",
        },
      },
    },
  },
  plugins: [
    dts(),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@public": resolve(__dirname, "public"),
    },
  },
});
