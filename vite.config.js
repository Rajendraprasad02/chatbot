// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path";

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// });
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    process: { env: {} },
  },
  build: {
    cssCodeSplit: false,
    assetsInlineLimit: 5000000,
    lib: {
      entry: "src/widget.jsx",
      name: "ChatWidget",
      fileName: "chatbot",
      formats: ["iife"],
    },
    rollupOptions: {
      output: {
        entryFileNames: "chatbot.js",
        assetFileNames: "assets/[name][extname]",
      },
    },
  },
});
