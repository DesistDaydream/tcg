import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [vue()],
  resolve: {
    alias: {
      // 代码中使用 import 导入文件时，会自动将 @ 替换为 src 目录
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    // 监听地址
    host: "0.0.0.0",
    // 端口
    port: 62205,
    // proxy: {
    //   "/api/v1": {
    //     target: "https://tcg.102205.xyz:8443",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ""),
    //   },
    // },
  },
})
