import fs from 'fs-extra'
import buildReadmeFile, { ReadmeFilePath } from './biz/build-readme-file'

/**
 * 检查 README.md 文件是否为最新
 */
(async () => {
  const different = await ifReadmeNeedChange()
  if (different) throw new Error('请检查运行 npm run build-readme 更新 README.md 文件')
})()

// 判断内容是否为最新
async function ifReadmeNeedChange() {
  fs.ensureFileSync(ReadmeFilePath)
  const oldReadme = fs.readFileSync(ReadmeFilePath, 'utf-8')
  const newReadme = await buildReadmeFile(false)
  return newReadme !== oldReadme
}
