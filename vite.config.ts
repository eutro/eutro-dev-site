import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import checker from "vite-plugin-checker"

export default defineConfig(({}) => ({
  publicDir: "resources",
  plugins: [
    react(),
    checker({
      typescript: {
        buildMode: true
      },
    })
  ],
  ssr: {}
}));
