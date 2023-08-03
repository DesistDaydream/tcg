import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
// import mkcert from "vite-plugin-mkcert"

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    vue(),
    //  mkcert()
  ],
  resolve: {
    alias: {
      // 代码中使用 import 导入文件时，会自动将 @ 替换为 src 目录
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    // https: true,
    // 监听地址
    host: "0.0.0.0",
    // 端口
    port: 42205,
    proxy: {
      "/api": {
        // target: "https://tcg.102205.xyz:10443",
        target: "http://localhost:2205",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})
