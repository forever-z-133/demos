import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import { TDesignResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
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
    AutoImport({
      resolvers: [TDesignResolver({ library: 'vue-next' })],
    }),
    Components({
      resolvers: [TDesignResolver({ library: 'vue-next' })],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'js/[name].[hash].js',
        chunkFileNames: 'js/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          const { name } = assetInfo
          if (name && name.endsWith('.css')) {
            return 'css/[name].[hash].[ext]'
          }
          return 'assets/[name].[hash].[ext]'
        },
        manualChunks(id) {
          if (id.includes('node_modules/vue') || id.includes('node_modules/pinia')) return 'vue'
          if (id.includes('node_modules/lodash')) return 'lodash'
          if (id.includes('node_modules/highlight.js')) return 'highlight'
          if (id.includes('node_modules/tdesign-vue-next')) return 'tdesign'
          // if (id.includes('src/views')) {
          //   const match = /\/views\/([^\]]+)\//.exec(id)
          //   if (match) return match[1]
          // }
        },
      },
    },
  },
})
