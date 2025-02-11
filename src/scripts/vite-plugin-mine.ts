import type { Plugin } from 'vite'
import setRouteDefaultCode from './biz/set-route-default-code'
import updateRouterConfig from './biz/update-router-config'

/**
 * 本项目用到的 Vite 插件
 *
 * 功能1: 新建案例文件时，自动生成代码模板
 */
export default async function VitePluginMine() {
  return <Plugin>{
    name: 'vite-project-mine',
    enforce: 'pre',
    configResolved() {
      updateRouterConfig()
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
  }
}
