import type { RouteMeta } from '@/router/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGlobalStore = defineStore('global', () => {
  // 当前页面的框架样式类型
  const layoutType = ref('pure' as RouteMeta['layout'])
  const layoutScale = ref(1) // normal 框架样式在 PC 端会 scale(2)
  function updateLayout(meta: RouteMeta) {
    const { layout = 'normal' } = meta
    layoutType.value = layout
    const isPC = window.innerWidth > 992
    const scale = layout === 'normal' && isPC ? 2 : 1
    layoutScale.value = scale
  }

  function setRootFontSize() {
    const rootDom = document.documentElement
    if (layoutScale.value === 1) {
      rootDom.style.fontSize = layoutType.value === 'blank' ? '16px' : '10px'
    } else {
      rootDom.style.fontSize = '20px'
    }
  }

  return {
    layoutType,
    layoutScale,
    updateLayout,
    setRootFontSize,
  }
})
