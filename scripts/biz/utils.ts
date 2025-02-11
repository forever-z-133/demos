import type { RouteMeta } from '@/router/types'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'fs-extra'
import { pick } from 'lodash-es'

// 当前文件所在目录（即 src/scripts/biz）所在目录
export const thisDir = path.dirname(fileURLToPath(import.meta.url))

// 根目录（即 src 所在目录）
export const rootDir = path.resolve(thisDir, '../..')

// 从路径中取出页面名称，比如 src/view/a/index.vue 中返回 a
export function getRouteName(uri: string) {
  const match = /src\/views\/([^/]+)\/index.vue/.exec(uri)
  if (!match) return
  return match[1]
}

// 从路由文件中的 defineOptions() 中获取路由元信息
export function getRouteMeta(uri: string) {
  const content = fs.readFileSync(uri, 'utf-8')
  const match = /defineOptions\((\{[^}]*\})\)/.exec(content)
  if (!match) return
  const MetaKeys: (keyof RouteMeta)[] = ['title', 'group', 'layout', 'createTime']
  const str = match[1]
  // eslint-disable-next-line no-new-func
  const func = new Function(`return ${str}`)
  const options = func() as Record<string, any>
  const meta = pick(options, MetaKeys)
  return meta
}
