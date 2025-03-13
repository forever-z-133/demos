<script setup lang="ts">
import type TMap from 'tmap-gl-types'
import type { MAP_TYPE } from './libs/constants'
import type { Point } from './libs/guide-cloud-request.model'
import type { LogTableRow } from './libs/log.model'
import download from 'downloadjs'
import { throttle } from 'lodash-es'
import { onMounted, ref, watch } from 'vue'
import { MAP_TYPE_OPTIONS, MATCH_REQ_TYPE_OPTIONS, YAW_TYPE_OPTIONS } from './libs/constants'
import LogTable from './libs/log-table.vue'
import MapComponent from './libs/map-component.vue'
import RequestPathsPreview from './libs/request-paths-preview.vue'
import ResponsePathsPreview from './libs/response-paths-preview.vue'
import useLogParse from './libs/use-log-parse'
import useTracePlugin from './libs/use-map-trace-plugin'
import useMapTypePlugin from './libs/use-map-type-plugin'
import { getOptionLabel, getPointData } from './libs/utils'

defineOptions({
  title: '腾讯地图API演示',
  group: 'libs',
  layout: 'blank',
})

// 交互项数据
interface FormData {
  mapType: MAP_TYPE
  level: number
  requestPoints: string[]
  responsePoints: string
  responseLinkInfo: string[]
}
const DefaultFormData = {
  mapType: 'tencent-map',
  level: 12,
  requestPoints: [],
  responsePoints: '',
  responseLinkInfo: [],
} as FormData
const formData = ref(DefaultFormData)

// 地图初始化参数
let mapIns: TMap.Map
const mapDefaultOptions: TMap.MapOptions = {
  pitchable: false,
  rotatable: false,
  zoom: DefaultFormData.level,
  minZoom: 5,
  maxZoom: 21,
  baseMap: {
    type: 'vector',
    features: ['point', 'building2d'],
  },
}

// 拓展地图类型功能
const { initial: initMapTypePlugin, changeType: changeMapType } = useMapTypePlugin({
  defaultType: formData.value.mapType,
})
watch(() => formData.value.mapType, val => changeMapType(mapIns, val))
const { initial: initTracePlugin, drawRequest, drawResponse } = useTracePlugin({})

const { parse, lines, table } = useLogParse()
const detail = ref({} as LogTableRow)

onMounted(async () => {
  const publicPath = window.location.pathname
  const url = `${publicPath}tmp/export-b3a78311-b6d6-4bc0-8142-84585cc9bf5e.json`
  const res = await fetch(url)
  const txt = await res.text()
  parse(txt)
})

// 地图加载完成，初始化各种拓展
function handleMapLoaded(map: TMap.Map) {
  mapIns = map

  map.on('zoom', () => {
    formData.value.level = getMapLevel(map)
  })

  // 初始化地图类型
  initMapTypePlugin(mapIns)
  // 初始化线条绘制工具
  initTracePlugin(mapIns)
}

// 点击查看
function handleDetail(row: LogTableRow) {
  console.log(row)
  detail.value = row

  let allPoints: Point[] = []

  const { path } = row.request.mmReq
  const requestPoints = Array.from({ length: path.length }, (_, index) => path[index].coors.map(e => getPointData(e).gcj))
  requestPoints.forEach((points) => {
    allPoints = allPoints.concat(points)
    drawRequest(points, 'request')
  })
  formData.value.requestPoints = requestPoints.map(e => e.map(e => `${e.lat},${e.lng}`).join(';'))

  const { result } = row.response.mmRsp
  const responsePoints = Array.from({ length: result.length }, (_, index) => result[index].bindPoints.map(e => getPointData(e.point).gcj))
  responsePoints.forEach((points) => {
    allPoints = allPoints.concat(points)
    drawResponse(points)
  })
  formData.value.responsePoints = responsePoints[0].map(e => `${e.lat},${e.lng}`).join(';')

  fitBounds(allPoints)
}

function fitBounds(points: any[]) {
  const TMap = window.TMap
  const bounds = new TMap.LatLngBounds()
  points.forEach((p) => {
    bounds.extend(new TMap.LatLng(p.lat, p.lng))
  })

  mapIns.fitBounds(bounds, { padding: 50 })
}

// 点击下载
function handleDownload(row: LogTableRow) {
  const lineIds = row.raw.map(e => e.id)
  const stringLines = lines.value.filter((_, index) => lineIds.includes(index))
  const reqUUID = row.reqUUID
  const reqName = row.reqName
  const txt = stringLines.reduce((re, str) => (re += `${str}\r\n`), '')
  download(txt, `log-${reqName}-${reqUUID}.txt`, 'text/plain')
}

// 获得 level 整数
function getMapLevel(map: TMap.Map) {
  const { maxZoom = 21, minZoom = 5 } = mapDefaultOptions
  const mapLevel = Math.max(minZoom, Math.min(maxZoom, Math.round(map.getZoom())))
  return mapLevel
}
const handleZoomChange = throttle(() => {
  const val = formData.value.level
  mapIns.setZoom(val)
}, 500)
</script>

<template>
  <div class="tencent-map-api">
    <div class="info">
      <div class="log-table-wrapper">
        <div class="title">
          <span>日志</span>
        </div>
        <div class="content">
          <LogTable :data="table">
            <template #default="{ row }">
              <button @click="handleDetail(row)">
                查看
              </button>
              <button @click="handleDownload(row)">
                下载
              </button>
            </template>
          </LogTable>
        </div>
      </div>
      <div class="request-info">
        <div class="title">
          <span>请求体</span>
        </div>
        <div class="content">
          <div>请求发起时间：{{ detail.startTime || '--' }}</div>
          <div>请求名：{{ detail.reqName || '--' }}</div>
          <div>请求UUID：{{ detail.reqUUID || '--' }}</div>
          <div>渠道号：{{ detail.request?.channel || '--' }}</div>
          <div>设备ID：{{ detail.request?.deviceId || '--' }}</div>
          <div>异源/同源：{{ getOptionLabel(MATCH_REQ_TYPE_OPTIONS, detail.request?.matchReqType) }}</div>
          <div>偏航类型：{{ getOptionLabel(YAW_TYPE_OPTIONS, detail.request?.yawType) }}</div>
          <div>请求类型：{{ detail.request?.mmReq?.type || '--' }}</div>
          <div>
            请求路径：
            <RequestPathsPreview :detail="detail" />
          </div>
        </div>
      </div>
      <div class="response-info">
        <div class="title">
          <span>响应体</span>
        </div>
        <div class="content">
          <div v-if="detail.response">
            {{ detail.response.guideCode === 0 ? '诱导成功' : '诱导失败' }}，
            {{ detail.response.mmCode === 0 ? '异源匹配成功' : '异源匹配失败' }}
          </div>
          <div>
            返回路径：
            <ResponsePathsPreview :detail="detail" />
          </div>
        </div>
      </div>
    </div>
    <div class="map-container">
      <MapComponent :options="mapDefaultOptions" @loaded="handleMapLoaded" />
    </div>
    <div class="controls">
      <div class="control-item">
        <div class="title">
          <span>地图类型</span>
        </div>
        <div class="content">
          <select v-model="formData.mapType">
            <template v-for="op in MAP_TYPE_OPTIONS" :key="op.value">
              <option :value="op.value">
                {{ op.label }}
              </option>
            </template>
          </select>
        </div>
        <div class="title">
          <span>地图层级</span>
        </div>
        <div class="content flex-row">
          <span>{{ formData.level }}级</span>
          <input
            v-model="formData.level"
            class="grow"
            type="range"
            :min="mapDefaultOptions.minZoom"
            :max="mapDefaultOptions.maxZoom"
            @input="handleZoomChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
@import "@/styles/mixins.less";

.tencent-map-api {
  padding: .px(10)[];
  .flex-row(~'.map-container');
  align-items: stretch;
  gap: .px(10)[];

  .map-container {
    height: 90vh;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  }

  .title {
    font-size: 1.1em;
    font-weight: bold;
    padding: 6px 0;
  }

  .info {
    width: .px(240)[];
  }

  .controls {
    width: .px(100)[];
  }

  .request-info > .content > div {
    display: flex;
  }
}
</style>
