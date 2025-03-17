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
  // 选中的 link
  selectedLink?: RawRspLink
  // 选中的 point
  selectedPoint?: { point: Point }
  pointInput: string
  linkIdInput: string
  linkInfoInput: string
}
const DefaultState = {
  mapType: 'tencent-map',
  level: 12,
  requestPathsIndex: 0,
  responsePathsType: 'point',
  selectedLink: undefined,
  selectedPoint: undefined,
  pointInput: '',
  linkIdInput: '',
  linkInfoInput: '',
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
      length: number
      startLoc: Point
      endLoc: Point
      links: { linkId: string, link: [Point, Point], raw: RawRspLink }[]
    }[]
  }[]
  routeGuide: {
    routeId: string
    lights: { point: Point, raw: LogTableRow['response']['routeGuideRes']['result'][0]['routes'][0]['rgRedLightResult'][0] }[]
    tips: { point: Point, tsection: number, raw: LogTableRow['response']['routeGuideRes']['result'][0]['routes'][0]['rgTipsResult'][0] }[]
    direction: { enter: Point, leave?: Point, linkIds: string[], links: [Point, Point][], accessoryInfo: number, raw: LogTableRow['response']['routeGuideRes']['result'][0]['routes'][0]['rgIntersectionResult'][0] }[]
    lanes: any[]
    control: any[]
  }[]
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
    const { guideCode, mmCode, /* navGuideRsp, */routeGuideRes, mmRsp } = response || {}
    const { result = [] } = mmRsp || {}

    const paths = result.map(({ pathId, bindPoints, linkGroups }) => {
      const points = bindPoints.map((item, i) => ({ id: `req_${pathId}_p_${i}`, point: item.point, raw: { ...item, pathId } }))
      const linkGroup = linkGroups.map(({ linkinfo, length, startLoc, endLoc }) => {
        const links = linkinfo.map(item => ({ linkId: item.rawLinkId, link: item.points, raw: { ...item, pathId } }))
        return { links, length, startLoc, endLoc }
      })
      return { pathId, points, linkGroup }
    })

    const routeGuide: ResponseData['routeGuide'] = []
    const { result: routeGuideResult = [] } = routeGuideRes || {}
    routeGuideResult.forEach(({ routeId: routeIds, routes }) => {
      routes.forEach((r, index) => {
        const routeId = routeIds[index]
        const lights = r.rgRedLightResult.map(item => ({ point: item.pos.pos, raw: item }))
        const tips = r.rgTipsResult.map(item => ({ point: item.pos.pos, tsection: item.tsection, raw: item }))
        const direction = r.rgIntersectionResult.map((item) => {
          const { enterPos, leavePos, interRawLinkIds: linkIds, accessoryInfo } = item
          const links: [Point, Point][] = []
          paths.forEach(({ linkGroup }) => {
            linkGroup.forEach(g => g.links.forEach(({ linkId, link }) => {
              if (linkIds.includes(linkId)) links.push(link)
            }))
          })
          return { enter: enterPos.pos, leave: leavePos?.pos, linkIds, links, accessoryInfo, raw: item }
        })

        routeGuide.push({ routeId, lights, tips, direction, lanes: [], control: [] })
      })
    })
    return <ResponseData>{
      guideCode: guideCode === undefined ? '--' : (guideCode === 0 ? '成功' : '失败'),
      mmCode: mmCode === undefined ? '--' : (mmCode === 0 ? '成功' : '失败'),
      paths,
      routeGuide,
    }
  })

  function updateDetail(val: LogTableRow) {
    detail.value = val
    console.log(val)
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
