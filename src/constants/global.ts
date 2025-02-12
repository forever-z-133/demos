import type { RouteGroupKeys } from '@/router/types'

// 全局标题
export const AppName = '永恒君的案例库'

// 首页路径
export const AppHomePage = '/'

// 首页路由标记
export const AppHomePageName = 'home'

// 公共组件标识
export const GlobalComponentPrefix = 'z-'

// 路由分组
export const RouteGroupTitles: Record<RouteGroupKeys, string> = {
  libs: '功能',
  effect: '效果',
  others: '其他',
  undefined: '未分类',
}
