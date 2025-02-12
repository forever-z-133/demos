import type { RouteMeta } from '../../src/router/types'
import path from 'node:path'
import { ESLint } from 'eslint'
import glob from 'fast-glob'
import fs from 'fs-extra'
import { getRouteMeta, getRouteName, rootDir } from './utils'

const eslint = new ESLint({ fix: true }) // 代码美化工具

let cacheMetaMapString: string // 缓存 metaMap 字符串，避免每次文件变动都刷新文件

// 路由配置文件所在位置
const targetRouterConfigFile = path.join(rootDir, 'src/router/meta-map/index.ts')
export const RouterConfigFilePath = targetRouterConfigFile

/**
 * 当初始化、新建或修改 src/views/*\/index.vue 案例路由文件时，则自动刷新全局路由配置
 */
async function updateRouterConfig(uri?: string) {
  const isInitial = !uri
  // 当新建或修改时，仅路由文件的变动才刷新。初始化时直接刷新
  if (!isInitial && !getRouteName(uri)) return

  // 读取所有路由文件的路由元信息，拼凑数据
  const routeFilePaths = glob.sync('src/views/*/index.vue', { absolute: true, cwd: rootDir })
  const metaMap: Record<string, RouteMeta> = {}
  routeFilePaths.forEach((uri) => {
    const name = getRouteName(uri)
    const meta = getRouteMeta(uri)
    if (!name || !meta) return
    metaMap[name] = meta
  })
  const metaMapString = JSON.stringify(metaMap, null, 2)

  // 比对内容是否变化，变化才更新文件
  if (!isInitial && cacheMetaMapString === metaMapString) return
  cacheMetaMapString = metaMapString

  // 更新路由配置文件
  const templateRouterConfigFile = path.join(rootDir, 'scripts/template/meta-map.ts')
  const templateRouterConfig = fs.readFileSync(templateRouterConfigFile, 'utf-8')
  const code = templateRouterConfig.replaceAll('{/* template */}', metaMapString)
  fs.ensureFileSync(targetRouterConfigFile)
  fs.writeFileSync(targetRouterConfigFile, code, 'utf8')

  // 美化代码，避免 eslint 报错
  const result = await eslint.lintFiles(targetRouterConfigFile)
  await ESLint.outputFixes(result)

  return metaMap
}
export default updateRouterConfig
