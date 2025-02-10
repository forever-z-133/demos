import type { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import type { RouteMeta } from '../types'
import { pick } from 'lodash-es'

// 各页面的 defineOptions 中待提取的 meta 数据
const MetaKeys = ['title', 'group', 'layout', 'createTime']

// 读取页面组件的配置和异步组件
const modules = import.meta.glob(['@/views/*/index.vue'], { eager: true, import: 'default' })
const modulesSync = import.meta.glob(['@/views/*/index.vue'], { import: 'default' })

// 所有案例拼凑路由配置
const routes = [] as RouteRecordRaw[]
for (const path in modules) {
  const config = modules[path] as RouteMeta
  const component = modulesSync[path] as Component
  const pathArr = path.split('/')
  const name = pathArr[pathArr.length - 2]
  const meta = getComponentOptions(config) as Record<string, any>

  routes.push({
    path: `/${name}`,
    name,
    component,
    meta,
  })
}

// 获取页面组件中的配置项，比如页面标题等
function getComponentOptions(config: RouteMeta): RouteMeta {
  const options = pick(config, MetaKeys)
  return options
}

export default routes
