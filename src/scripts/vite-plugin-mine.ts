import type { RouteMeta } from '@/router/types'
import type { Plugin, ResolvedConfig } from 'vite'
import path from 'node:path'
import { ref } from 'vue'
import buildReadmeFile from './biz/build-readme-file'
import setRouteDefaultCode from './biz/set-route-default-code'
import updateRouterConfig from './biz/update-router-config'
import { rootDir } from './biz/utils'

const viteOptions = ref<ResolvedConfig>()
const metaMap = ref<Record<string, RouteMeta>>()

/**
 * 本项目用到的 Vite 插件
 *
 *【 setRouteDefaultCode 】新建 src/views/*\/index.vue 路由文件时，自动生成代码模板
 *【 updateRouterConfig 】初始化 或 新建/修改 src/views/*\/index.vue 路由文件时，自动刷新全局路由配置
 *【 buildReadmeFile 】打包结束后，自动生成 README.md 文件
 */
export default async function VitePluginMine() {
  return <Plugin>{
    name: 'vite-project-mine',
    enforce: 'pre',
    async configResolved(options) {
      viteOptions.value = options
      metaMap.value = await updateRouterConfig()
    },
    configureServer(server) {
      server.watcher.on('add', (uri) => {
        setRouteDefaultCode(uri)
        updateRouterConfig(uri)
      })
      server.watcher.on('change', (uri) => {
        updateRouterConfig(uri)
      })
    },
    async closeBundle() {
      if (!metaMap.value || !viteOptions.value) return
      const viteConfigDir = path.join(rootDir)
      const outDir = path.join(viteConfigDir, viteOptions.value.build.outDir)
      buildReadmeFile(metaMap.value, outDir)
    },
  }
}
