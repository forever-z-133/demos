import type { RouteRecordRaw } from 'vue-router'
import { AppHomePage, AppHomePageName } from '@/constants/global'
import { createRouter, createWebHistory } from 'vue-router'
import { bindSetHTMlTitleAfterRouter } from './hooks/set-html-title'
import AllRoutes from './modules/index'

// 所有路由配置
const routes: RouteRecordRaw[] = [
  {
    path: AppHomePage,
    name: AppHomePageName,
    component: () => import('../views/home.vue'),
  },
  ...AllRoutes,
]

// 创建路由
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// 绑定一些路由守卫
bindSetHTMlTitleAfterRouter(router)

export default router
