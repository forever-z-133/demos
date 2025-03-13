import type TMap from 'tmap-gl-types'
import type { Point } from './guide-cloud-request.model'

type TraceType = 'request' | 'request_tmp' | 'response'

/**
 * 地图路线绘制工具
 */
interface Props {}
function useMapTracePlugin(_props?: Props) {
  let mapIns: TMap.Map
  let tracePointLayer: TMap.MultiMarker
  let traceLayer: TMap.MultiPolyline
  let traceDotLayer: TMap.MultiCircle

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

    traceLayer = new TMap.MultiPolyline({
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
        request_tmp: new TMap.PolylineStyle({
          color: '#b7ceff',
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
      },
    })

    traceDotLayer = new TMap.MultiCircle({
      id: 'traceDotLayer',
      map: mapIns,
      geometries: [],
      styles: {},
    })
  }

  function draw(id: string, traceType: TraceType, points: Point[]) {
    const TMap = window.TMap
    // 画线条
    traceLayer.remove([id])
    traceLayer.add([{
      id,
      styleId: traceType,
      paths: points.map(p => new TMap.LatLng(p.lat, p.lng)),
    }])
    // 画点
    traceDotLayer.remove([id])
    traceDotLayer.add(points.map(p => ({ center: new TMap.LatLng(p.lat, p.lng), radius: 6 })))
    // 画起点和终点
    const arr = [points[0], points[points.length - 1]]
    arr.forEach((p, i) => {
      const position = new TMap.LatLng(p.lat, p.lng)
      tracePointLayer.add({ position, styleId: i === 0 ? 'start' : 'end' })
    })
  }

  function drawRequest(points: Point[], styleId: TraceType = 'request') {
    const id = `request_trace_${styleId}`
    draw(id, styleId, points)
  }

  function drawResponse(points: Point[], styleId: TraceType = 'response') {
    const id = `response_trace_${styleId}`
    draw(id, styleId, points)
  }

  function drawGuide(points: Point[], styleId: TraceType = 'response') {
    const id = `guide_${styleId}`
    draw(id, styleId, points)
  }

  return {
    initial,
    draw,
    drawRequest,
    drawResponse,
    drawGuide,
  }
}
export default useMapTracePlugin
