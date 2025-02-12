// 路由内的数据
export interface RouteMeta {
  title?: string
  group?: 'effect' | 'libs' | 'others' | 'undefined'
  layout?: 'normal' | 'pure'
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

// 路由组
export type RouteGroupKeys = Required<RouteMeta>['group']
