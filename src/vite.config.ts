import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import VitePluginMine from './scripts/vite-plugin-mine'

export default defineConfig({
  base: './',
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    VitePluginMine(),
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
        manualChunks(id) {
          if (id.includes('node_modules/vue') || id.includes('node_modules/pinia')) return 'vue'
          if (id.includes('node_modules/lodash')) return 'lodash'
          if (id.includes('node_modules/highlight.js')) return 'highlight'
          // if (id.includes('src/views')) {
          //   const match = /\/views\/([^\]]+)\//.exec(id)
          //   if (match) return match[1]
          // }
        },
      },
    },
  },
})
