import type TMap from 'tmap-gl-types'
import type { OPTION } from './constants'
import type { Point } from './guide-cloud-request.model'
import { CoordinateTransform } from './coordinate-transform'

// 分配渲染长文本
export async function progressiveRender(logText: string, callback: (s: string) => void, chunkSize = 10000) {
  let offset = 0
  let current = ''

  while (offset < logText.length) {
    const chunk = logText.slice(offset, offset + chunkSize)
    offset += chunkSize
    current += chunk
    await new Promise((resolve) => {
      callback(current)
      requestAnimationFrame(resolve)
    })
  }
}

export function getOption(options: OPTION[], value: string | number) {
  return options.find(o => o.value === value)
}
export function getOptionLabel(options: OPTION[], value: string | number) {
  return getOption(options, value)?.label || '--'
}

export function wgs2gcj(p: Point): Point {
  const { lat, lon } = CoordinateTransform.wgs84ToGcj02(p.lat, p.lng)
  return { lat, lng: lon }
}

export function gcj2wgs(p: Point): Point {
  const { lat, lon } = CoordinateTransform.gcj02ToWgs84(p.lat, p.lng)
  return { lat, lng: lon }
}

const txBase = 10 ** 7
export function int2tx(p: Point): Point {
  return { lat: p.lat / txBase, lng: p.lng / txBase }
}

export function tx2int(p: Point): Point {
  return { lat: p.lat * txBase, lng: p.lng * txBase }
}

export function point2str(p: Point): string {
  return `${p.lng},${p.lat}`
}

export function point2ll(p: Point): TMap.LatLng {
  const TMap = window.TMap
  return new TMap.LatLng(p.lat, p.lng)
}

// 地图坐标点转换
type PointType = 'int' | 'gcj' | 'wsg'
export function getPointData(p: Point, thisType: PointType = 'int') {
  let int = { lng: p.lng, lat: p.lat }
  let gcj = { lng: p.lng, lat: p.lat }
  let wsg = { lng: p.lng, lat: p.lat }
  if (thisType === 'int') {
    gcj = int2tx(p)
    wsg = gcj2wgs(gcj)
  } else if (thisType === 'gcj') {
    int = tx2int(p)
    wsg = gcj2wgs(gcj)
  } else if (thisType === 'wsg') {
    int = tx2int(p)
    gcj = wgs2gcj(wsg)
  }
  return { int, gcj, wsg }
}
