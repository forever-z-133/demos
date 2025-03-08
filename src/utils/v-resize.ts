import type { Directive } from 'vue'

/**
 * 监听元素尺寸变化
 */

export type VResizeCallback = (size: { width: number, height: number }) => void
const map = new WeakMap<Element, VResizeCallback>()

const ob = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const handler = map.get(entry.target)
    if (handler) {
      const width = entry.borderBoxSize[0].inlineSize
      const height = entry.borderBoxSize[0].blockSize
      handler({ width, height })
    }
  }
})

const vResize = <Directive>{
  mounted(el, bindings) {
    ob.observe(el)
    const callback = bindings.value as VResizeCallback
    map.set(el, callback)
  },
  unmounted(el) {
    ob.unobserve(el)
  },
}
export default vResize
