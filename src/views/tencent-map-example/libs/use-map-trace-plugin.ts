import type TMap from 'tmap-gl-types'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import useLogStore from './use-log-store'
import { int2tx, point2ll } from './utils'

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
      },
    })

    traceLineLayer = new TMap.MultiPolyline({
      id: 'traceLayer',
      map: mapIns,
      geometries: [],
      styles: {
        request: new TMap.PolylineStyle({
          color: '#3777FF',
          width: 5,
          borderWidth: 1,
          borderColor: '#FFF',
          lineCap: 'round',
          showArrow: true,
        }),
        response: new TMap.PolylineStyle({
          color: '#48ad5d',
          width: 5,
          borderWidth: 1,
          borderColor: '#FFF',
          lineCap: 'round',
          showArrow: true,
        }),
        response_hover: new TMap.PolylineStyle({
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
      styles: {},
    })

    traceLineLayer.on('hover', (e) => {
      if (e.geometry) {
        const { paths } = e.geometry
        traceLineLayer.remove(['response_hover'])
        if (state.value.responsePathsType === 'link') {
          traceLineLayer.add([{ id: 'response_hover', styleId: 'response_hover', paths }])
        }
      } else {
        traceLineLayer.remove(['response_hover'])
      }
    })
  }

  function draw() {
    tracePointLayer.updateGeometries([])
    traceLineLayer.updateGeometries([])
    traceDotLayer.updateGeometries([])

    updateRequestPaths()
    updateResponsePaths()
  }

  function updateRequestPaths() {
    const { points: tmp = [] } = request.value.paths[state.value.requestPathsIndex] || {}
    const points = tmp.map(p => point2ll(int2tx(p.point)))

    traceLineLayer.add([{ styleId: 'request', paths: points }])
  }

  function updateResponsePaths() {
    const { points: tmp = [] } = response.value.paths[state.value.requestPathsIndex] || {}
    if (state.value.responsePathsType === 'point') {
      const points = tmp.map(p => point2ll(int2tx(p.point)))
      traceLineLayer.add([{ styleId: 'response', paths: points }])
    } else {
      const { linkGroup = [] } = response.value.paths[state.value.requestPathsIndex] || {}
      linkGroup.forEach(({ links = [] }) => {
        const geometries = links.map(({ link = [] }) => {
          return { styleId: 'repsonse', paths: link.map(p => point2ll(int2tx(p))) }
        })
        console.log(geometries)
        traceLineLayer.add(geometries)
      })
    }
  }

  // function fitBounds(points: any[]) {
  //   const TMap = window.TMap
  //   const bounds = new TMap.LatLngBounds()
  //   points.forEach((p) => {
  //     bounds.extend(new TMap.LatLng(p.lat, p.lng))
  //   })

  //   mapIns.fitBounds(bounds, { padding: 50 })
  // }

  return {
    initial,
    draw,
  }
}
export default useMapTracePlugin
