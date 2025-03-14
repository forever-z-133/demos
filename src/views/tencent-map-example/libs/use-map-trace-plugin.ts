import type TMap from 'tmap-gl-types'
import type { Point } from './guide-cloud-request.model'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import useLogStore from './use-log-store'
import { int2tx, ll2point, point2arr, point2ll, point2str } from './utils'

/**
 * 地图路线绘制工具
 */
interface Props {}
function useMapTracePlugin(_props?: Props) {
  let mapIns: TMap.Map
  let tracePointLayer: TMap.MultiMarker
  let traceLineLayer: TMap.MultiPolyline
  let traceDotLayer: TMap.MultiCircle

  const { request, response, state, redrawFlag } = storeToRefs(useLogStore())

  watch(redrawFlag, () => draw())

  function initial(_map: TMap.Map) {
    mapIns = _map
    const TMap = window.TMap

    tracePointLayer = new TMap.MultiMarker({
      id: 'tracePointLayer',
      map: mapIns,
      geometries: [],
      styles: {
        start: new TMap.MarkerStyle({
          width: 25,
          height: 35,
          anchor: { x: 12.5, y: 34 },
          src: 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/start.png',
        }),
        end: new TMap.MarkerStyle({
          width: 25,
          height: 35,
          anchor: { x: 12.5, y: 34 },
          src: 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/end.png',
        }),
        mark: new TMap.MarkerStyle({
          // width: 25,
          // height: 35,
          // anchor: { x: 12.5, y: 34 },
          // src: 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/end.png',
        }),
      },
    })

    mapIns.on('click', (e) => {
      const point = ll2point(e.latLng)
      state.value.pointInput = point2str(point)
      mark(point, false)
    })

    traceLineLayer = new TMap.MultiPolyline({
      id: 'traceLayer',
      map: mapIns,
      geometries: [],
      styles: {
        request: new TMap.PolylineStyle({
          color: '#3777FF',
          width: 5,
          lineCap: 'round',
        }),
        response: new TMap.PolylineStyle({
          color: '#48ad5d',
          width: 5,
          lineCap: 'round',
        }),
        response_hover: new TMap.PolylineStyle({
          color: '#b7ceff',
          width: 5,
          borderWidth: 1,
          borderColor: '#FFF',
          lineCap: 'round',
        }),
        selected_link: new TMap.PolylineStyle({
          color: '#b7ceff',
          width: 5,
          borderWidth: 1,
          borderColor: '#FFF',
          lineCap: 'round',
        }),
      },
    })

    traceDotLayer = new TMap.MultiCircle({
      id: 'traceDotLayer',
      map: mapIns,
      geometries: [],
      styles: {
        response: new TMap.CircleStyle({
          color: '#31663c',
          showBorder: false,
        }),
        response_hover: new TMap.CircleStyle({
          color: '#b7ceff',
          showBorder: false,
        }),
        selected_link: new TMap.CircleStyle({
          color: '#b7ceff',
          showBorder: false,
        }),
      },
    })

    traceLineLayer.on('hover', (e) => {
      if (e.geometry) {
        const { paths, properties = {} } = e.geometry
        traceLineLayer.remove(['response_hover'])
        if (state.value.responsePathsType === 'link' && properties.type === 'link') {
          traceLineLayer.add([{ id: 'response_hover', styleId: 'response_hover', paths, properties }])
        }
      } else {
        traceLineLayer.remove(['response_hover'])
      }
    })
    traceLineLayer.on('click', (e) => {
      if (!e.geometry) return
      traceLineLayer.remove(['response_hover'])
      if (e.geometry.properties.type === 'link') {
        const raw = e.geometry.properties.raw
        state.value.selectedLink = raw
        state.value.linkIdInput = raw.rawLinkId
        state.value.linkInfoInput = JSON.stringify(raw.points.map((p: any) => point2arr(int2tx(p))))
      }
    })

    traceDotLayer.on('hover', (e) => {
      if (e.geometry) {
        const { center, radius, properties } = e.geometry
        traceDotLayer.remove(['response_hover'])
        traceDotLayer.add([{ id: 'response_hover', styleId: 'response_hover', center, radius, properties }])
      } else {
        traceDotLayer.remove(['response_hover'])
      }
    })
    traceDotLayer.on('click', (e) => {
      if (!e.geometry) return
      traceDotLayer.remove(['response_hover'])
      const raw = e.geometry.properties.raw
      state.value.selectedPoint = raw
      state.value.pointInput = point2str(int2tx(raw.point))
    })
  }

  watch(() => state.value.selectedLink, () => {
    if (state.value.selectedLink) {
      const { points } = state.value.selectedLink
      traceLineLayer.remove(['selected_link'])
      const paths = points.map(p => point2ll(int2tx(p)))
      traceLineLayer.add([{ id: 'selected_link', styleId: 'selected_link', paths, properties: { type: 'link' } }])
    } else {
      traceLineLayer.remove(['selected_link'])
    }
  })

  watch(() => state.value.selectedPoint, () => {
    if (state.value.selectedPoint) {
      const { point } = state.value.selectedPoint
      traceDotLayer.remove(['selected_link'])
      const center = point2ll(int2tx(point))
      traceDotLayer.add([{ id: 'selected_link', styleId: 'selected_link', center, radius: 6, properties: { type: 'link' } }])
    } else {
      traceDotLayer.remove(['selected_link'])
    }
  })

  function draw() {
    tracePointLayer.setGeometries([])
    traceLineLayer.setGeometries([])
    traceDotLayer.setGeometries([])

    state.value.selectedLink = undefined
    state.value.selectedPoint = undefined
    state.value.pointInput = ''
    state.value.linkIdInput = ''
    state.value.linkInfoInput = ''

    const p1 = updateRequestPaths()
    const p2 = updateResponsePaths()

    fitBounds(p1.concat(p2))
  }

  function updateRequestPaths() {
    const { points: tmp = [] } = request.value.paths[state.value.requestPathsIndex] || {}
    const points = tmp.map(p => point2ll(int2tx(p.point)))

    traceLineLayer.add([{ styleId: 'request', paths: points, properties: { type: 'point' } }])

    return points
  }

  function updateResponsePaths() {
    const { points: tmp = [] } = response.value.paths[state.value.requestPathsIndex] || {}
    if (state.value.responsePathsType === 'point') {
      const points = tmp.map(p => point2ll(int2tx(p.point)))
      traceLineLayer.add([{ styleId: 'response', paths: points, properties: { type: 'point' } }])
      traceDotLayer.add(points.map((p, i) => ({ styleId: 'response', center: p, radius: 6, properties: { raw: { point: tmp[i].point } } })))
      tracePointLayer.add([
        { id: 'start', styleId: 'start', position: points[0] },
        { id: 'end', styleId: 'end', position: points[points.length - 1] },
      ])
      return points
    } else {
      const points: TMap.LatLng[] = []
      const { linkGroup = [] } = response.value.paths[state.value.requestPathsIndex] || {}
      linkGroup.forEach(({ links = [] }) => {
        const oneLinkGroupPoints: TMap.LatLng[] = []
        const geometries = links.map(({ linkId, link, raw }) => {
          const paths = link.map(p => point2ll(int2tx(p)))
          oneLinkGroupPoints.push(...paths)
          return { styleId: 'response', paths, properties: { type: 'link', linkId, raw } }
        })
        tracePointLayer.add([
          { id: 'start', styleId: 'start', position: oneLinkGroupPoints[0] },
          { id: 'end', styleId: 'end', position: oneLinkGroupPoints[oneLinkGroupPoints.length - 1] },
        ])
        points.push(...oneLinkGroupPoints)
        traceLineLayer.add(geometries)
      })
      return points
    }
  }

  function fitBounds(points: Point[]) {
    const TMap = window.TMap
    const bounds = new TMap.LatLngBounds()
    points.forEach((p) => {
      bounds.extend(new TMap.LatLng(p.lat, p.lng))
    })

    mapIns.fitBounds(bounds, { padding: 50 })
  }

  function mark(p: Point, setCenter = true) {
    const point = point2ll(p)
    tracePointLayer.remove(['mark'])
    tracePointLayer.add([{ id: 'mark', styleId: 'mark', position: point }])
    setCenter && mapIns.setCenter(point)
  }

  return {
    initial,
    draw,
    mark,
  }
}
export default useMapTracePlugin
