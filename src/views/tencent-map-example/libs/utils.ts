// 分配渲染长文本
export async function progressiveRender(logText: string, callback: (s: string) => void, chunkSize = 10000) {
  let offset = 0
  let current = ''

  while (offset < logText.length) {
    const chunk = logText.slice(offset, offset + chunkSize)
    offset += chunkSize
    current += chunk
    await new Promise((resolve) => {
      callback(current)
      requestAnimationFrame(resolve)
    })
  }
}
