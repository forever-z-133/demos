import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { bindSetHTMlTitleAfterRouter } from './hooks/set-html-title'
import CasesRoutes from './modules/cases'
import StaticRoutes from './modules/static'

// 所有路由配置
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'entry',
    component: () => import('@/components/layouts/index.vue'),
    children: [
      ...StaticRoutes,
      ...CasesRoutes,
    ],
  },
]

// 创建路由
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

// 绑定一些路由守卫
bindSetHTMlTitleAfterRouter(router)

export default router
