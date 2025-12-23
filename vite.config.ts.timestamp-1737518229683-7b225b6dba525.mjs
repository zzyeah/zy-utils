// vite.config.ts
import { defineConfig } from "file:///home/D/app-test/zy-utils/node_modules/vite/dist/node/index.js";
import dts from "file:///home/D/app-test/zy-utils/node_modules/vite-plugin-dts/dist/index.mjs";
import { resolve } from "path";
import { nodeResolve } from "file:///home/D/app-test/zy-utils/node_modules/@rollup/plugin-node-resolve/dist/es/index.js";
import commonjs from "file:///home/D/app-test/zy-utils/node_modules/@rollup/plugin-commonjs/dist/es/index.js";
import { viteNodeHmrPlugin } from "file:///home/D/app-test/zy-utils/node_modules/vite-node/dist/hmr.mjs";
var __vite_injected_original_dirname = "/home/D/app-test/zy-utils";
var vite_config_default = defineConfig({
  base: "./",
  build: {
    lib: {
      entry: "lib/_index.ts",
      name: "zyUtils",
      fileName: "zy-utils"
    },
    rollupOptions: {
      output: {
        globals: {
          zyUtils: "zyUtils"
        }
      }
    }
  },
  plugins: [dts(), viteNodeHmrPlugin(), nodeResolve(), commonjs()],
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "src"),
      "@public": resolve(__vite_injected_original_dirname, "public")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9EL2FwcC10ZXN0L3p5LXV0aWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9EL2FwcC10ZXN0L3p5LXV0aWxzL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL0QvYXBwLXRlc3QvenktdXRpbHMvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IGR0cyBmcm9tIFwidml0ZS1wbHVnaW4tZHRzXCI7XG5cbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgbm9kZVJlc29sdmUgfSBmcm9tIFwiQHJvbGx1cC9wbHVnaW4tbm9kZS1yZXNvbHZlXCI7XG5pbXBvcnQgY29tbW9uanMgZnJvbSBcIkByb2xsdXAvcGx1Z2luLWNvbW1vbmpzXCI7XG5pbXBvcnQgeyB2aXRlTm9kZUhtclBsdWdpbiB9IGZyb20gXCJ2aXRlLW5vZGUvaG1yXCI7XG4vLyBpbXBvcnQge3ZpdGVOb2RlfSBmcm9tIFwidml0ZS1ub2RlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGJhc2U6IFwiLi9cIixcbiAgYnVpbGQ6IHtcbiAgICBsaWI6IHtcbiAgICAgIGVudHJ5OiBcImxpYi9faW5kZXgudHNcIixcbiAgICAgIG5hbWU6IFwienlVdGlsc1wiLFxuICAgICAgZmlsZU5hbWU6IFwienktdXRpbHNcIixcbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBnbG9iYWxzOiB7XG4gICAgICAgICAgenlVdGlsczogXCJ6eVV0aWxzXCIsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IFtkdHMoKSwgdml0ZU5vZGVIbXJQbHVnaW4oKSwgbm9kZVJlc29sdmUoKSwgY29tbW9uanMoKV0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IHJlc29sdmUoX19kaXJuYW1lLCBcInNyY1wiKSxcbiAgICAgIFwiQHB1YmxpY1wiOiByZXNvbHZlKF9fZGlybmFtZSwgXCJwdWJsaWNcIiksXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE2UCxTQUFTLG9CQUFvQjtBQUMxUixPQUFPLFNBQVM7QUFFaEIsU0FBUyxlQUFlO0FBQ3hCLFNBQVMsbUJBQW1CO0FBQzVCLE9BQU8sY0FBYztBQUNyQixTQUFTLHlCQUF5QjtBQU5sQyxJQUFNLG1DQUFtQztBQVN6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixNQUFNO0FBQUEsRUFDTixPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsTUFDSCxPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsSUFDWjtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sU0FBUztBQUFBLFVBQ1AsU0FBUztBQUFBLFFBQ1g7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVMsQ0FBQyxJQUFJLEdBQUcsa0JBQWtCLEdBQUcsWUFBWSxHQUFHLFNBQVMsQ0FBQztBQUFBLEVBQy9ELFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBQUEsTUFDN0IsV0FBVyxRQUFRLGtDQUFXLFFBQVE7QUFBQSxJQUN4QztBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
