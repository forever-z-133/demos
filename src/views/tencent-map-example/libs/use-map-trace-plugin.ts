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

  let stopPropagation = false

  const { request, response, state, redrawFlag } = storeToRefs(useLogStore())

  watch(redrawFlag, () => draw())

  function initial(_map: TMap.Map) {
    mapIns = _map
    const TMap = window.TMap

    const infoWindow = new TMap.InfoWindow({
      map: mapIns,
      position: new TMap.LatLng(39.984104, 116.307503),
      offset: { x: 0, y: 0 }, // 设置信息窗相对position偏移像素
    })
    infoWindow.close()

    tracePointLayer = new TMap.MultiMarker({
      id: 'tracePointLayer',
      map: mapIns,
      geometries: [],
      // enableCollision: true,
      // collisionOptions: {
      //   sameSource: true,
      // },
      styles: {
        start: new TMap.MarkerStyle({
          width: 25,
          height: 35,
          anchor: { x: 12.5, y: 38 },
          src: 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/start.png',
        }),
        end: new TMap.MarkerStyle({
          width: 25,
          height: 35,
          anchor: { x: 12.5, y: 34 },
          src: 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/end.png',
        }),
        light: new TMap.MarkerStyle({
          width: 20,
          height: 20,
          anchor: { x: 10, y: 10 },
          src: 'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTM1My41IDE0Ni4xaC0xMDRjLTE3LjMgMC0zMS4zIDE0LjEtMzEuMyAzMS4zczE0LjEgMzEuMyAxMjcuMyA3Ny42aDEwNGwtOTYtMTA4Ljl6TTU4My43IDI1NS4xaDEwNEM4MDEgMjA4LjggODE1IDE5NC43IDgxNSAxNzcuNWMwLTE3LjQtMTQuMi0zMS4zLTMxLjMtMzEuM2gtMTA0bC05NiAxMDguOXpNNTgzLjcgNzY1LjhoMTA0QzgwMSA3MTkuNSA4MTUgNzA1LjQgODE1IDY4OC4yYzAtMTcuNC0xNC4yLTMxLjMtMzEuMy0zMS4zaC0xMDRsLTk2IDEwOC45ek0zNjMuMSA2NTYuN2gtMTA0Yy0xNy4zIDAtMzEuMyAxNC4xLTMxLjMgMzEuMyAwIDE3LjMgMTQuMSAzMS4zIDEyNy4zIDc3LjZoMTA0bC05Ni0xMDguOXpNMzUzLjUgNDAwLjNoLTEwNGMtMTcuMyAwLTMxLjMgMTQuMS0zMS4zIDMxLjNzMTQuMSAzMS4zIDEyNy4zIDc3LjZoMTA0bC05Ni0xMDguOXpNNTgzLjcgNTA5LjRoMTA0QzgwMSA0NjMuMSA4MTQuOSA0NDkgODE0LjkgNDMxLjhjMC0xNy40LTE0LjItMzEuMy0zMS4zLTMxLjNoLTEwNGwtOTUuOSAxMDguOXoiIGZpbGw9IiNBNEE5QUQiIHAtaWQ9IjUyMjkiPjwvcGF0aD48cGF0aCBkPSJNNjgzLjYgOTc1LjZIMzU1LjVjLTIxLjQgMC0zOC44LTE3LjQtMzguOC0zOC44Vjg2LjdjMC0yMS40IDE3LjQtMzguOCAzOC44LTM4LjhoMzI4LjFjMjEuNCAwIDM4LjggMTcuNCAzOC44IDM4Ljh2ODUwLjFjMCAyMS40LTE3LjQgMzguOC0zOC44IDM4Ljh6IiBmaWxsPSIjMkQ0MDdEIiBwLWlkPSI1MjMwIj48L3BhdGg+PHBhdGggZD0iTTY0Ny4yIDkyOS4ySDM5MS45Yy0xOS45IDAtMzYtMTYuMS0zNi0zNlYxMTkuMWMwLTE5LjkgMTYuMS0zNiAzNi0zNmgyNTUuM2MxOS45IDAgMzYgMTYuMSAzNiAzNnY3NzQuMWMwIDE5LjgtMTYuMiAzNi0zNiAzNnoiIGZpbGw9IiMxNzI0NDQiIHAtaWQ9IjUyMzEiPjwvcGF0aD48cGF0aCBkPSJNNDMwIDc4MWMwIDUxLjEgNDEuNSA5Mi42IDkyLjYgOTIuNiA1MS4xIDAgOTIuNi00MS41IDkyLjYtOTIuNiAwLTUxLjEtNDEuNS05Mi42LTkyLjYtOTIuNi01MS4xIDAtOTIuNiA0MS41LTkyLjYgOTIuNnoiIGZpbGw9IiMwMEFENjgiIHAtaWQ9IjUyMzIiPjwvcGF0aD48cGF0aCBkPSJNNTcxLjkgNzkzLjVjMCA0LjggMi41IDkuNCA2LjggMTEuOCA0LjEgMi40IDkuNCAyLjQgMTMuNiAwIDQuMS0yLjQgNi44LTcgNi44LTExLjggMC00LjgtMi41LTkuNC02LjgtMTEuOC00LjEtMi40LTkuNC0yLjQtMTMuNiAwLTQuMyAyLjQtNi44IDctNi44IDExLjh6TTUzOC4yIDc4MGMwIDQuOCAyLjUgOS40IDYuOCAxMS44IDQuMSAyLjQgOS40IDIuNCAxMy42IDAgNC4xLTIuNCA2LjgtNyA2LjgtMTEuOHMtMi41LTkuNC02LjgtMTEuOGMtNC4xLTIuNC05LjQtMi40LTEzLjYgMC00LjMgMi40LTYuOCA3LTYuOCAxMS44ek01NDcuOSA4MjguNWMwIDQuOCAyLjUgOS40IDYuOCAxMS44IDQuMSAyLjQgOS40IDIuNCAxMy42IDAgNC4xLTIuNCA2LjgtNyA2LjgtMTEuOHMtMi41LTkuNC02LjgtMTEuOGMtNC4xLTIuNC05LjQtMi40LTEzLjYgMC00LjIgMi41LTYuOCA2LjktNi44IDExLjh6IiBmaWxsPSIjRkZGRkZGIiBwLWlkPSI1MjMzIj48L3BhdGg+PHBhdGggZD0iTTQzMCA1MjIuMWMwIDUxLjEgNDEuNSA5Mi42IDkyLjYgOTIuNiA1MS4xIDAgOTIuNi00MS41IDkyLjYtOTIuNnMtNDEuNS05Mi42LTkyLjYtOTIuNmMtNTEuMS0wLjEtOTIuNiA0MS40LTkyLjYgOTIuNnoiIGZpbGw9IiNGRkQ4MTUiIHAtaWQ9IjUyMzQiPjwvcGF0aD48cGF0aCBkPSJNNTcxLjkgNTMzLjVjMCA0LjggMi41IDkuNCA2LjggMTEuOCA0LjEgMi40IDkuNCAyLjQgMTMuNiAwIDQuMS0yLjQgNi44LTcgNi44LTExLjhzLTIuNS05LjQtNi44LTExLjhjLTQuMS0yLjQtOS40LTIuNC0xMy42IDAtNC4zIDIuNC02LjggNi44LTYuOCAxMS44ek01MzguMiA1MTkuOGMwIDQuOCAyLjUgOS40IDYuOCAxMS44IDQuMSAyLjQgOS40IDIuNCAxMy42IDAgNC4xLTIuNCA2LjgtNyA2LjgtMTEuOHMtMi41LTkuNC02LjgtMTEuOGMtNC4xLTIuNC05LjQtMi40LTEzLjYgMC00LjMgMi41LTYuOCA3LTYuOCAxMS44ek01NDcuOSA1NjguNGMwIDQuOCAyLjUgOS40IDYuOCAxMS44IDQuMSAyLjQgOS40IDIuNCAxMy42IDAgNC4xLTIuNCA2LjgtNyA2LjgtMTEuOHMtMi41LTkuNC02LjgtMTEuOGMtNC4xLTIuNC05LjQtMi40LTEzLjYgMC00LjIgMi40LTYuOCA2LjktNi44IDExLjh6IiBmaWxsPSIjRkZGRkZGIiBwLWlkPSI1MjM1Ij48L3BhdGg+PHBhdGggZD0iTTQzMCAyNjkuN2MwIDUxLjEgNDEuNSA5Mi42IDkyLjYgOTIuNiA1MS4xIDAgOTIuNi00MS41IDkyLjYtOTIuNnMtNDEuNS05Mi42LTkyLjYtOTIuNmMtNTEuMSAwLTkyLjYgNDEuNS05Mi42IDkyLjZ6IiBmaWxsPSIjRkYwMDAwIiBwLWlkPSI1MjM2Ij48L3BhdGg+PHBhdGggZD0iTTU3MS45IDI2MGMwIDQuOCAyLjUgOS40IDYuOCAxMS44IDQuMSAyLjQgOS40IDIuNCAxMy42IDAgNC4xLTIuNCA2LjgtNyA2LjgtMTEuOCAwLTQuOC0yLjUtOS40LTYuOC0xMS44LTQuMS0yLjQtOS40LTIuNC0xMy42IDAtNC4zIDIuNC02LjggNi45LTYuOCAxMS44ek01MzguMiAyNDYuM2MwIDQuOCAyLjUgOS40IDYuOCAxMS44IDQuMSAyLjQgOS40IDIuNCAxMy42IDAgNC4xLTIuNCA2LjgtNyA2LjgtMTEuOCAwLTQuOC0yLjUtOS40LTYuOC0xMS44LTQuMS0yLjQtOS40LTIuNC0xMy42IDAtNC4zIDIuNC02LjggNy02LjggMTEuOHpNNTQ3LjkgMjk0LjljMCA0LjggMi41IDkuNCA2LjggMTEuOCA0LjEgMi40IDkuNCAyLjQgMTMuNiAwIDQuMS0yLjQgNi44LTcgNi44LTExLjhzLTIuNS05LjQtNi44LTExLjhjLTQuMS0yLjQtOS40LTIuNC0xMy42IDAtNC4yIDIuNi02LjggNy02LjggMTEuOHoiIGZpbGw9IiNGRkZGRkYiIHAtaWQ9IjUyMzciPjwvcGF0aD48cGF0aCBkPSJNNTIyLjggMTUwYy02NS43IDAtMTE5IDUzLjMtMTE5IDExOXM1My4zIDExOSAxMTkgMTE5IDExOS01My4zIDExOS0xMTktNTMuMy0xMTktMTE5LTExOXogbTAgMjE4LjljLTU1LjMgMC0xMDAtNDQuNy0xMDAtMTAwczQ0LjctMTAwIDEwMC0xMDAgMTAwIDQ0LjcgMTAwIDEwMC00NC45IDEwMC0xMDAgMTAwek01MjIuOCA0MDQuNGMtNjUuNyAwLTExOSA1My4zLTExOSAxMTlzNTMuMyAxMTkgMTE5IDExOSAxMTktNTMuMyAxMTktMTE5LTUzLjMtMTE5LTExOS0xMTl6IG0wIDIxOWMtNTUuMyAwLTEwMC00NC43LTEwMC0xMDBzNDQuNy0xMDAgMTAwLTEwMCAxMDAgNDQuNyAxMDAgMTAwYy0wLjEgNTUuMi00NC45IDEwMC0xMDAgMTAwek01MjIuOCA2NjIuOGMtNjUuNyAwLTExOSA1My4zLTExOSAxMTlzNTMuMyAxMTkgMTE5IDExOSAxMTktNTMuMyAxMTktMTE5LTUzLjMtMTE5LTExOS0xMTl6IG0wIDIxOWMtNTUuMyAwLTEwMC00NC43LTEwMC0xMDBzNDQuNy0xMDAgMTAwLTEwMCAxMDAgNDQuNyAxMDAgMTAwYy0wLjEgNTUuMy00NC45IDEwMC0xMDAgMTAweiIgZmlsbD0iI0QxRDNEMyIgcC1pZD0iNTIzOCI+PC9wYXRoPjwvc3ZnPg==',
        }),
        direction: new TMap.MarkerStyle({
          width: 10,
          height: 10,
          anchor: { x: 5, y: 5 },
          src: 'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTk1MC43MDQgMjk3LjNjLTAuODgtMC44OC0xLjgwMy0xLjY5LTIuNzU3LTIuNDQ1TDc2MC4wNTEgMTA2Ljk2Qzc1NC4xNzQgMTAwLjI1NiA3NDUuNTY0IDk2IDczNi4wMDIgOTZsLTAuMDc1IDAuMDAyYy04LjE5OS0wLjAyMS0xNi40MDUgMy4wNzgtMjIuNjI1IDkuMjk4LTYuMjIgNi4yMi05LjMxOCAxNC40MjYtOS4yOTggMjIuNjI1bC0wLjAwMiAwLjA3NXY2NEg0MTZjLTM1LjIgMC02NCAyOC44LTY0IDY0djEyOGMwIDM1LjIgMjguOCA2NCA2NCA2NGgyODguMDAydjY0bDAuMDAyIDAuMDc1Yy0wLjAyMSA4LjE5OSAzLjA3OCAxNi40MDUgOS4yOTggMjIuNjI1IDYuMjIgNi4yMiAxNC40MjYgOS4zMTggMjIuNjI1IDkuMjk4bDAuMDc1IDAuMDAyYzkuNTYyIDAgMTguMTcyLTQuMjU2IDI0LjA0OS0xMC45NmwxODcuODk2LTE4Ny44OTVhMzEuNzUxIDMxLjc1MSAwIDAgMCAyLjc1Ni0yLjQ0NWM2LjIzOS02LjIzOSA5LjMzNi0xNC40NzYgOS4yOTYtMjIuNyAwLjA0LTguMjI0LTMuMDU2LTE2LjQ2MS05LjI5NS0yMi43ek03My4yOTYgNjgxLjNjMC44OC0wLjg4IDEuODAzLTEuNjkgMi43NTctMi40NDVMMjYzLjk0OSA0OTAuOTZjNS44NzctNi43MDQgMTQuNDg3LTEwLjk2IDI0LjA0OS0xMC45NmwwLjA3NSAwLjAwMmM4LjE5OS0wLjAyMSAxNi40MDUgMy4wNzggMjIuNjI1IDkuMjk4IDYuMjIgNi4yMiA5LjMxOCAxNC40MjYgOS4yOTggMjIuNjI1bDAuMDAyIDAuMDc1djY0SDYwOGMzNS4yIDAgNjQgMjguOCA2NCA2NHYxMjhjMCAzNS4yLTI4LjggNjQtNjQgNjRIMzE5Ljk5OHY2NGwtMC4wMDIgMC4wNzVjMC4wMjEgOC4xOTktMy4wNzggMTYuNDA1LTkuMjk4IDIyLjYyNS02LjIyIDYuMjItMTQuNDI2IDkuMzE4LTIyLjYyNSA5LjI5OGwtMC4wNzUgMC4wMDJjLTkuNTYyIDAtMTguMTcyLTQuMjU2LTI0LjA0OS0xMC45Nkw3Ni4wNTMgNzI5LjE0NWEzMS43NTEgMzEuNzUxIDAgMCAxLTIuNzU2LTIuNDQ1Yy02LjIzOS02LjIzOS05LjMzNi0xNC40NzYtOS4yOTYtMjIuNy0wLjA0LTguMjI0IDMuMDU2LTE2LjQ2MSA5LjI5NS0yMi43eiIgcC1pZD0iNjI1MCI+PC9wYXRoPjwvc3ZnPg==',
        }),
      },
    })

    mapIns.on('click', (e) => {
      const stop = stopPropagation
      stopPropagation = false
      if (stop) return
      const point = ll2point(e.latLng)
      state.value.pointInput = point2str(point)
      mark(point, false)
      state.value.selectedLink = undefined
      infoWindow.close()
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
        direction: new TMap.PolylineStyle({
          color: '#b799ff',
          width: 7,
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

    tracePointLayer.on('click', (e) => {
      stopPropagation = true
      if (e.geometry) {
        const { position, properties = {} } = e.geometry
        if (!properties.raw) return
        const content = `<div style="max-width:200px;font-size:10px;text-wrap: auto;text-align:left;">${JSON.stringify(properties.raw, null, 2)}</div>`
        infoWindow.setPosition(position)
        infoWindow.setContent(content)
        infoWindow.open()
      } else {
        infoWindow.close()
      }
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
      stopPropagation = true
      if (!e.geometry) return
      traceLineLayer.remove(['response_hover'])
      if (e.geometry.properties.type === 'link' && e.geometry.properties.raw) {
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
      stopPropagation = true
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

    const bounds = p1.concat(p2)
    bounds.length && fitBounds(p1.concat(p2))
  }

  function updateRequestPaths() {
    const { points: tmp = [] } = request.value.paths[state.value.requestPathsIndex] || {}
    const points = tmp.map(p => point2ll(int2tx(p.point)))

    if (!points?.length) return []
    traceLineLayer.add([{ styleId: 'request', paths: points, properties: { type: 'point' } }])

    return points
  }

  function updateResponsePaths() {
    const { routeGuide = [] } = response.value || {}
    routeGuide.forEach(({ lights, direction }) => {
      lights.forEach((item) => {
        const { point, raw } = item
        tracePointLayer.add({ styleId: 'light', position: point2ll(int2tx(point)), properties: { raw } })
      })
      direction.forEach((item) => {
        const { enter, raw } = item
        tracePointLayer.add({ styleId: 'direction', position: point2ll(int2tx(enter)), properties: { raw } })
        // leave && tracePointLayer.add({ styleId: 'direction', position: point2ll(int2tx(leave)) })
        // const paths = links.map(link => link.map(p => point2ll(int2tx(p))))
        // traceLineLayer.add([{ styleId: 'selected_link', paths }])
      })
    })

    const { points: tmp = [] } = response.value.paths[state.value.requestPathsIndex] || {}
    if (state.value.responsePathsType === 'point') {
      const points = tmp.map(p => point2ll(int2tx(p.point)))
      if (!points?.length) return []
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
