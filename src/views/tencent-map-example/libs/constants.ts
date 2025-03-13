export interface OPTION {
  label: string
  value: string | number
  disabled?: boolean
  children?: OPTION[]
}

// 支持的地图类型
export const MAP_TYPE_OPTIONS = [
  { value: 'tencent-map', label: '腾讯地图' },
  { value: 'tencent-satellite', label: '腾讯卫星' },
  { value: 'gaode-map', label: '高德地图' },
  { value: 'gaode-satellite', label: '高德卫星' },
] as const satisfies OPTION[]
export type MAP_TYPE = ArrayElement<typeof MAP_TYPE_OPTIONS>['value']

// matchReqType 0-异源匹配, 1-同源匹配
export const MATCH_REQ_TYPE_OPTIONS = [
  { value: 0, label: '异源匹配' },
  { value: 1, label: '同源匹配' },
] as const satisfies OPTION[]
export type MATCH_REQ_TYPE = ArrayElement<typeof MATCH_REQ_TYPE_OPTIONS>['value']

// yawType 偏航类型:0-未偏航,1-自驾偏航,2-座舱偏航
export const YAW_TYPE_OPTIONS = [
  { value: 0, label: '未偏航' },
  { value: 1, label: '自驾偏航' },
  { value: 2, label: '座舱偏航' },
] as const satisfies OPTION[]
export type YAW_TYPE = ArrayElement<typeof YAW_TYPE_OPTIONS>['value']

// queryType 0-all 1-mm异源匹配
export const QUERY_TYPE_OPTIONS = [
  { value: 0, label: 'all' },
  { value: 1, label: 'mm异源匹配' },
] as const satisfies OPTION[]
export type QUERY_TYPE = ArrayElement<typeof QUERY_TYPE_OPTIONS>['value']
