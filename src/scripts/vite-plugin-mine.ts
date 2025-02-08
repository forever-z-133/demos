import type { Plugin } from 'vite'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const thisDir = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(thisDir, '..')
const templateCodeFile = path.join(thisDir, 'template/normal-page.vue')

/**
 * 本项目用到的 Vite 插件
 *
 * 功能1: 新建案例文件时，自动生成代码模板
 */
export default async function VitePluginMine() {
  return <Plugin>{
    name: 'vite-project-mine',
    enforce: 'post',
    configureServer(server) {
      server.watcher.on('add', (uri) => {
        const relativePath = path.relative(rootDir, uri).replace(/\\/g, '/')

        // 当文件属于 src/views/*/*.vue 文件时，则自动生成代码模版
        const inPagesDir = relativePath.startsWith('src/views/')
        const isVueFile = relativePath.endsWith('.vue')
        if (!inPagesDir || !isVueFile) return
        const name = path.dirname(relativePath).split('/').pop() || ''
        const templateCode = fs.readFileSync(templateCodeFile, 'utf-8')
        const code = templateCode.replaceAll('page-name-replacer', name)
        fs.writeFileSync(uri, code, 'utf8')
      })
    },
  }
}
