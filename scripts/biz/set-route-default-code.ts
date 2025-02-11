import path from 'node:path'
import fs from 'fs-extra'
import { getRouteName, rootDir } from './utils'

/**
 * 当新建文件 src/views/*\/index.vue 案例路由文件时，则自动使用代码模版
 */
function setRouteDefaultCode(uri: string) {
  const name = getRouteName(uri)
  if (!name) return
  const templateCodeFile = path.join(rootDir, 'scripts/template/normal-page.vue')
  const templateCode = fs.readFileSync(templateCodeFile, 'utf-8')
  const code = templateCode.replaceAll('page-name-replacer', name)
  fs.writeFileSync(uri, code, 'utf8')
}
export default setRouteDefaultCode
