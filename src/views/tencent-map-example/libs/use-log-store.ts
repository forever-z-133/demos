import type { MAP_TYPE } from './constants'
import type { Point } from './guide-cloud-request.model'
import type { LogTableRow } from './log.model'
import { defineStore } from 'pinia'
import { computed, ref, shallowRef } from 'vue'
import { MATCH_REQ_TYPE_OPTIONS, YAW_TYPE_OPTIONS } from './constants'
import { getOptionLabel } from './utils'

// 交互项数据
export interface State {
  // 地图类型
  mapType: MAP_TYPE
  // 地图层级
  level: number
  // 绘制请求路径索引
  requestPathsIndex: number
  // 绘制响应路径类型
  responsePathsType: 'point' | 'link'
}
const DefaultState = {
  mapType: 'tencent-map',
  level: 12,
  requestPathsIndex: 0,
  responsePathsType: 'point',
} as State

type RawReqPoint = {} & { pathId: string }
export interface RequestData {
  startTime: string
  reqName: string
  reqUUID: string
  channel: string
  deviceId: string
  matchReqType: string
  yawType: string
  type: string
  paths: {
    pathId: string
    length: number
    points: { id: string, point: Point, raw: RawReqPoint }[]
  }[]
}

type RawRspPoint = LogTableRow['response']['mmRsp']['result'][0]['bindPoints'][0] & { pathId: string }
type RawRspLink = LogTableRow['response']['mmRsp']['result'][0]['linkGroups'][0]['linkinfo'][0] & { pathId: string }
export interface ResponseData {
  guideCode: string
  mmCode: string
  paths: {
    pathId: string
    points: { id: string, point: Point, raw: RawRspPoint }[]
    linkGroup: {
      links: { linkId: string, link: [Point, Point], raw: RawRspLink }[]
    }[]
  }[]
  direction: { linkId: string }[]
  // links: { pathId: string, links: [Point, Point][], str: string[] }[]
}

const useLogStore = defineStore('log', () => {
  const detail = shallowRef({} as LogTableRow)
  const state = ref({ ...DefaultState })
  const redrawFlag = ref(0)

  const request = computed(() => {
    const { startTime = '--', reqName = '--', reqUUID = '--', request } = detail.value || {}
    const { channel = '--', deviceId = '--', matchReqType, yawType, mmReq } = request || {}
    const { type = '--', path = [] } = mmReq || {}
    const paths = path.map(({ pathId, length, coors }) => {
      const points = coors.map((p, i) => ({ id: `req_${pathId}_p_${i}`, point: p, raw: { pathId } }))
      return { pathId, length, points }
    })
    return <RequestData>{
      startTime,
      reqName,
      reqUUID,
      channel,
      deviceId,
      matchReqType: getOptionLabel(MATCH_REQ_TYPE_OPTIONS, matchReqType),
      yawType: getOptionLabel(YAW_TYPE_OPTIONS, yawType),
      type: type || '--',
      paths,
    }
  })

  const response = computed(() => {
    const { response } = detail.value || {}
    const { guideCode, mmCode, /* navGuideRsp, routeGuideRes, */mmRsp } = response || {}
    const { result = [] } = mmRsp || {}
    const paths = result.map(({ pathId, bindPoints, linkGroups }) => {
      const points = bindPoints.map((item, i) => ({ id: `req_${pathId}_p_${i}`, point: item.point, raw: { ...item, pathId } }))
      const linkGroup = linkGroups.map(({ linkinfo }) => {
        const links = linkinfo.map(item => ({ linkId: item.rawLinkId, link: item.points, raw: { ...item, pathId } }))
        return { links }
      })
      return { pathId, points, linkGroup }
    })
    return <ResponseData>{
      guideCode: guideCode === undefined ? '--' : (guideCode === 0 ? '成功' : '失败'),
      mmCode: mmCode === undefined ? '--' : (mmCode === 0 ? '成功' : '失败'),
      paths,
    }
  })

  function updateDetail(val: LogTableRow) {
    detail.value = val
  }

  function redraw() {
    redrawFlag.value++
  }

  return {
    detail,
    updateDetail,
    request,
    response,
    state,
    redraw,
    redrawFlag,
  }
})
export default useLogStore
