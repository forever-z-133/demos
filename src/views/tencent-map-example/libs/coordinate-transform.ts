/* eslint-disable no-loss-of-precision */
export interface Coordinate {
  lat: number
  lon: number
}

export class CoordinateTransform {
  static readonly PI = Math.PI

  static readonly A = 6378245.0

  static readonly EE = 0.00669342162296594323

  static transformLat(x: number, y: number): number {
    let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x))
    ret
      += ((20.0 * Math.sin(6.0 * x * CoordinateTransform.PI) + 20.0 * Math.sin(2.0 * x * CoordinateTransform.PI)) * 2.0)
        / 3.0
    ret
      += ((20.0 * Math.sin(y * CoordinateTransform.PI) + 40.0 * Math.sin((y / 3.0) * CoordinateTransform.PI)) * 2.0) / 3.0
    ret
      += ((160.0 * Math.sin((y / 12.0) * CoordinateTransform.PI) + 320 * Math.sin((y * CoordinateTransform.PI) / 30.0))
        * 2.0)
      / 3.0
    return ret
  }

  static transformLon(x: number, y: number): number {
    let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x))
    ret
      += ((20.0 * Math.sin(6.0 * x * CoordinateTransform.PI) + 20.0 * Math.sin(2.0 * x * CoordinateTransform.PI)) * 2.0)
        / 3.0
    ret
      += ((20.0 * Math.sin(x * CoordinateTransform.PI) + 40.0 * Math.sin((x / 3.0) * CoordinateTransform.PI)) * 2.0) / 3.0
    ret
      += ((150.0 * Math.sin((x / 12.0) * CoordinateTransform.PI) + 300.0 * Math.sin((x / 30.0) * CoordinateTransform.PI))
        * 2.0)
      / 3.0
    return ret
  }

  static outOfChina(lat: number, lon: number): boolean {
    return !(lon > 73.66 && lon < 135.05 && lat > 3.86 && lat < 53.55)
  }

  public static wgs84ToGcj02(lat: number, lon: number): Coordinate {
    if (CoordinateTransform.outOfChina(lat, lon)) {
      return { lat, lon }
    }
    let dLat = CoordinateTransform.transformLat(lon - 105.0, lat - 35.0)
    let dLon = CoordinateTransform.transformLon(lon - 105.0, lat - 35.0)
    const radLat = (lat / 180.0) * CoordinateTransform.PI
    let magic = Math.sin(radLat)
    magic = 1 - CoordinateTransform.EE * magic * magic
    const sqrtMagic = Math.sqrt(magic)
    dLat
      = (dLat * 180.0)
        / (((CoordinateTransform.A * (1 - CoordinateTransform.EE)) / (magic * sqrtMagic)) * CoordinateTransform.PI)
    dLon = (dLon * 180.0) / ((CoordinateTransform.A / sqrtMagic) * Math.cos(radLat) * CoordinateTransform.PI)
    const mgLat = lat + dLat
    const mgLon = lon + dLon
    return { lat: mgLat, lon: mgLon }
  }

  public static gcj02ToWgs84(lat: number, lon: number): Coordinate {
    if (CoordinateTransform.outOfChina(lat, lon)) {
      return { lat, lon }
    }
    let dLat = CoordinateTransform.transformLat(lon - 105.0, lat - 35.0)
    let dLon = CoordinateTransform.transformLon(lon - 105.0, lat - 35.0)
    const radLat = (lat / 180.0) * CoordinateTransform.PI
    let magic = Math.sin(radLat)
    magic = 1 - CoordinateTransform.EE * magic * magic
    const sqrtMagic = Math.sqrt(magic)
    dLat
      = (dLat * 180.0)
        / (((CoordinateTransform.A * (1 - CoordinateTransform.EE)) / (magic * sqrtMagic)) * CoordinateTransform.PI)
    dLon = (dLon * 180.0) / ((CoordinateTransform.A / sqrtMagic) * Math.cos(radLat) * CoordinateTransform.PI)
    const mgLat = lat + dLat
    const mgLon = lon + dLon
    return { lat: lat * 2 - mgLat, lon: lon * 2 - mgLon }
  }
}
