import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        secure: false,
        ws: true,
        changeOrigin: true,
        target: "http://localhost:3000",
      },
    },
  },
})
