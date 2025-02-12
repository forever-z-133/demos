import buildReadmeFile from './biz/build-readme-file'

/**
 * 根据路由配置生成 README.md 文件
 */
(async () => {
  await buildReadmeFile(true)
})()
