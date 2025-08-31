import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Build settings
  build: {
    sourcemap: false,           // disable source maps in production
    outDir: "dist",             // default build folder
  },

  // Dev server settings
  server: {
    port: 5173,
    strictPort: true,
  },

  // Ensure SPA routing works on Vercel
  base: "/",                   // important for Vercel
});
