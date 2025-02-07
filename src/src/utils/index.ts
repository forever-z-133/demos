// 获取随机数
export function random(min: number, max: number) {
  return Math.random() * (max - min) + min
}

// 获取鼠标或手势位置
export function getTouchPosition(e: MouseEvent | TouchEvent) {
  if (e instanceof MouseEvent) {
    const { clientX: x, clientY: y } = e
    return [{ x, y }]
  } else {
    const touches = Array.from(e.touches)
    const res = [] as { x: number, y: number }[]
    return touches.reduce((re, { clientX: x, clientY: y }) => [...re, { x, y }], res)
  }
}
