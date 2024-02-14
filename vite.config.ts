import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { VitePluginFonts } from "vite-plugin-fonts";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
  },
  plugins: [
    vue(),
    VitePluginFonts({
      google: {
        families: [
          "Yusei Magic",
          "Reggae One",
          "DotGothic16",
          "Chakra Petch",
          "Yuji Mai",
          "Yuji Syuku",
          "Kaisei Tokumin",
        ],
      },
    }),
    sentryVitePlugin({
      org: "creatriver",
      project: "javascript-vue",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    assetsDir: "assets/[hash]",
    outDir: "dist",
    sourcemap: true,
  },
});
