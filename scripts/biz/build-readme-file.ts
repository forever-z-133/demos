import type { RouteMeta } from '../../src/router/types'
import path from 'node:path'
import fs from 'fs-extra'
import { RouteGroupTitles } from '../../src/constants/global'
import { rootDir } from './utils'

const BasePath = 'https://forever-z.cn/'

/**
 * 打包结束后，自动生成 README.md 文件
 */
async function buildReadmeFile(metaMap: Record<string, RouteMeta>, outDir?: string) {
  const templateReadmeFilePath = path.join(rootDir, 'scripts/template/README.md')
  const targetReadmeFileDir = outDir || path.join(rootDir, 'dist')
  const targetReadmeFilePath = path.join(targetReadmeFileDir, 'README.md')

  let content = '\n'
  Object.keys(metaMap).forEach((routeName) => {
    const meta = metaMap[routeName] as RouteMeta
    const group = meta.group as Required<RouteMeta>['group']
    const groupTitle = RouteGroupTitles[group]
    const title = meta.title || routeName
    content += `* [[${groupTitle}] ${title}](${BasePath}${routeName})\n`
  })

  const templateReadme = fs.readFileSync(templateReadmeFilePath, 'utf-8')
  const code = templateReadme + content

  fs.ensureFileSync(targetReadmeFilePath)
  fs.writeFileSync(targetReadmeFilePath, code, 'utf8')
  console.log('dist/README.md 文件已生成。')

  return code
}
export default buildReadmeFile
