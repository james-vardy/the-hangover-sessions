import { defineConfig } from "vite";
import { useHtmlMinifyPlugin } from "@tomjs/vite-plugin-html";

export default defineConfig({
  root: ".",
  publicDir: "public",

  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    // Vite 7 defaults to the new Baseline target; keep it explicit for clarity
    // (Chrome 107 / Edge 107 / Firefox 104 / Safari 16)
    // https://vite.dev/guide/migration
    target: "baseline-widely-available",

    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log", "console.warn"],
      },
      mangle: { safari10: true },
    },

    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || "";
          if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/.test(name)) {
            return "assets/media/[name]-[hash][extname]";
          } else if (/\.(png|jpe?g|gif|svg|webp|avif)(\?.*)?$/.test(name)) {
            return "assets/images/[name]-[hash][extname]";
          } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/.test(name)) {
            return "assets/fonts/[name]-[hash][extname]";
          } else if (/\.css(\?.*)?$/.test(name)) {
            return "assets/css/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
      },
    },
  },

  css: {
    devSourcemap: true,
    preprocessorOptions: {
      css: { charset: false },
    },
  },

  plugins: [
    // drop-in HTML minify replacement (same defaults you used)
    useHtmlMinifyPlugin({
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true,
      minifyCSS: true,
      minifyJS: true,
    }),
  ],

  assetsInclude: ["**/*.json"],

  server: {
    port: 3000,
    host: true,
    open: true,
    cors: true,
    // proxy: { "/api": "http://localhost:8787" }
  },

  preview: {
    port: 4173,
    host: true,
    open: true,
  },

  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __DEV__: process.env.NODE_ENV === "development",
  },

  optimizeDeps: {
    include: [],
    exclude: [],
  },

  // Keep your relative deploy base as-is
  base: "./",
});
