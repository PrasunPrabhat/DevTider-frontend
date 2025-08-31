import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false, // disable source maps in production
  },
  server: {
    sourcemapIgnoreList: () => true, // prevents eval-based dev sourcemaps
  },
});
