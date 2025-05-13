import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

import zipPack from "vite-plugin-zip-pack";
import { resolve } from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/assets/*',
          dest: 'assets'
        },
        {
          src: 'twitch-config.json', // We'll create this file
          dest: '.'
        }
      ]
    }),
    zipPack({
      outFileName: "dist.zip",
      outDir: ".",
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        viewer: resolve(__dirname, "index.html"),
      },
      output: {
        // Keep your existing naming
        entryFileNames: 'viewer.js',
        assetFileNames: (assetInfo: any) => {
          if (assetInfo.name!.endsWith('.css')) {
            return 'style.css';
          }
          return 'assets/[name][extname]';
        },
      }
    },
    cssCodeSplit: false,
    cssTarget: "chrome61",
    assetsInlineLimit: 0,
    sourcemap: false,
    emptyOutDir: true,
    outDir: "dist",
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
  assetsInclude: ['**/*.ttf'],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@icons": resolve(__dirname, "./src/assets")
    },
  },
});
