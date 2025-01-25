import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: '../',
    rollupOptions: {
      output: {
        entryFileNames: 'dist/js/[name].[hash].js',
        chunkFileNames: 'dist/js/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          const { name } = assetInfo
          if (name && name.endsWith('.css')) {
            return 'dist/css/[name].[hash].[ext]'
          }
          return 'dist/assets/[name].[hash].[ext]'
        },
      },
    },
  },
})
