import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

import { resolve } from "path";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { viteNodeHmrPlugin } from "vite-node/hmr";
// import {viteNode} from "vite-node";

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
  plugins: [dts(), viteNodeHmrPlugin(), nodeResolve(), commonjs()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@public": resolve(__dirname, "public"),
      "@lib": resolve(__dirname, "lib"),
      "@dist": resolve(__dirname, "dist"),
    },
  },
});
