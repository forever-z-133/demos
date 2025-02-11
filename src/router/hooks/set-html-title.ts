import type { Router } from 'vue-router'
import type { RouteMeta } from '../types'
import { AppName } from '@/constants/global'

/**
 * 每次跳页，修改页面标题
 */
export function bindSetHTMlTitleAfterRouter(router: Router) {
  router.beforeEach((to) => {
    const meta = to.meta as unknown as RouteMeta
    const title = meta.title || AppName
    setHTMLTitle(title)
  })
}

// 设置页面标题
function setHTMLTitle(title: string) {
  requestAnimationFrame(() => {
    document.title = title
  })
}
