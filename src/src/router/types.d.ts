// 路由内的数据
export interface RouteMeta {
  title?: string
  group?: 'effect' | 'libs'
  createTime?: string
}

// 路由配置
export interface RouteItem {
  path: string
  name: string
  component?: Component | string
  components?: Component
  redirect?: string
  meta: RouteMeta
  children?: RouteItem[]
}
