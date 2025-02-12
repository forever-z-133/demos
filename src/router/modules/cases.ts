import type { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import MetaMap from '../meta-map/index' // 注意此文件由 vite-plugin-mine 自动生成

const modulesSync = import.meta.glob(['@/views/*/index.vue'], { import: 'default' })

// 所有案例拼凑路由配置
const routes = [] as RouteRecordRaw[]
for (const path in modulesSync) {
  const component = modulesSync[path] as Component
  const pathArr = path.split('/')
  const name = pathArr[pathArr.length - 2]
  const meta = MetaMap[name] as Record<string, any>

  routes.push({
    path: `/${name}`,
    name,
    component,
    meta,
  })
}

export default routes
