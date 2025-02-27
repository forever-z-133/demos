import type TMap from 'tmap-gl-types'

// 支持的地图类型
export const MAP_TYPE_OPTIONS = [
  { value: 'tencent-map', label: '腾讯地图' },
  { value: 'tencent-satellite', label: '腾讯卫星' },
  { value: 'gaode-map', label: '高德地图' },
  { value: 'gaode-satellite', label: '高德卫星' },
] as const satisfies { value: string, label: string }[]

// 地图类型
export type MAP_TYPE = ArrayElement<typeof MAP_TYPE_OPTIONS>['value']

interface Props {
  defaultType: MAP_TYPE
}

// 地图类型拓展
function useMapTypePlugin(props?: Props) {
  const { defaultType = 'tencent-map' } = props || {}
  const MapTypeLayerMap = {} as { [key in MAP_TYPE]: TMap.ImageTileLayer }

  // 初始化
  function initial(map: TMap.Map) {
    MapTypeLayerMap['gaode-map'] = createMapTypeLayer(map, 'gaode-map')
    MapTypeLayerMap['gaode-satellite'] = createMapTypeLayer(map, 'gaode-satellite')

    changeType(map, defaultType)
  }

  // 切换地图类型
  function changeType(map: TMap.Map, mapType: MAP_TYPE) {
    if (mapType === 'gaode-map') {
      MapTypeLayerMap['gaode-map'].setVisible(true)
      MapTypeLayerMap['gaode-satellite'].setVisible(false)
    } else if (mapType === 'gaode-satellite') {
      MapTypeLayerMap['gaode-map'].setVisible(false)
      MapTypeLayerMap['gaode-satellite'].setVisible(true)
    } else {
      MapTypeLayerMap['gaode-map'].setVisible(false)
      MapTypeLayerMap['gaode-satellite'].setVisible(false)
      const type = mapType === 'tencent-satellite' ? 'satellite' : 'vector'
      map.setBaseMap({ type })
    }
  }

  return {
    initial,
    changeType,
  }
}
export default useMapTypePlugin

// 地图底图瓦片链接前缀
const MAP_TYPE_LAYER_TILE_URL_PREFIX: Record<MAP_TYPE, string> = {
  'tencent-map': '',
  'tencent-satellite': '',
  'gaode-map': 'https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7',
  'gaode-satellite': 'https://webst03.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=6',
}

// 创建地图类型图层
function createMapTypeLayer(map: TMap.Map, mapType: MAP_TYPE) {
  const TMap = window.TMap
  const prefix = MAP_TYPE_LAYER_TILE_URL_PREFIX[mapType]

  return new TMap.ImageTileLayer({
    getTileUrl(x: number, y: number, z: number) {
      return `${prefix}&x=${x}&y=${y}&z=${z}`
    },
    tileSize: 256, // 瓦片像素尺寸
    visible: false, // 是否可见
    map, // 设置图层显示到哪个地图实例中
  })
}
