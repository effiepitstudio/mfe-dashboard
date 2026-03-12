import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [react(), vue()],
  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, "../shared"),
      "@mfe-form": path.resolve(__dirname, "../mfe-form/src"),
      "@mfe-visualizer": path.resolve(__dirname, "../mfe-visualizer/src"),
      "@": path.resolve(__dirname, "../mfe-visualizer/src"),
    },
  },
  server: {
    port: 9000,
    cors: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
});
