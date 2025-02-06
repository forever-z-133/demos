import type { RouteRecordRaw } from 'vue-router'

import { AppHomePage, AppHomePageName } from '@/constants/global'

const routes: RouteRecordRaw[] = [
  {
    path: AppHomePage,
    name: AppHomePageName,
    component: () => import('@/views/home.vue'),
  },
]

export default routes
