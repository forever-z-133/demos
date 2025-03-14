<script setup lang="ts">
import type TMap from 'tmap-gl-types'
import type { LogTableRow } from './libs/log.model'
import download from 'downloadjs'
import { throttle } from 'lodash-es'
import { storeToRefs } from 'pinia'
import { nextTick, onMounted, ref, watch } from 'vue'
import { MAP_TYPE_OPTIONS } from './libs/constants'
import LogTable from './libs/log-table.vue'
import MapComponent from './libs/map-component.vue'
import RequestPathsPreview from './libs/request-paths-preview.vue'
import ResponsePathsPreview from './libs/response-paths-preview.vue'
import useLogParse from './libs/use-log-parse'
import useLogStore from './libs/use-log-store'
import useTracePlugin from './libs/use-map-trace-plugin'
import useMapTypePlugin from './libs/use-map-type-plugin'
import { str2point } from './libs/utils'

defineOptions({
  title: '腾讯地图API演示',
  group: 'libs',
  layout: 'blank',
})

const uploading = ref(true)
const { updateDetail } = useLogStore()
const { request, response, state } = storeToRefs(useLogStore())

// 地图初始化参数
let mapIns: TMap.Map
const mapDefaultOptions: TMap.MapOptions = {
  pitchable: false,
  rotatable: false,
  zoom: state.value.level,
  minZoom: 5,
  maxZoom: 21,
  baseMap: {
    type: 'vector',
    features: ['point', 'building2d'],
  },
}

// 拓展地图类型功能
const { initial: initMapTypePlugin, changeType: changeMapType } = useMapTypePlugin({
  defaultType: state.value.mapType,
})
watch(() => state.value.mapType, val => changeMapType(mapIns, val))
const { initial: initTracePlugin, draw, mark } = useTracePlugin({})

const { parse, lines, table } = useLogParse()

onMounted(async () => {
  uploading.value = true
  const publicPath = window.location.pathname
  const url = `${publicPath}tmp/export-b3a78311-b6d6-4bc0-8142-84585cc9bf5e.json`
  const res = await fetch(url)
  const txt = await res.text()
  parse(txt)
  uploading.value = false
})

// 地图加载完成，初始化各种拓展
function handleMapLoaded(map: TMap.Map) {
  mapIns = map

  map.on('zoom', () => {
    state.value.level = getMapLevel(map)
  })

  // 初始化地图类型
  initMapTypePlugin(mapIns)
  // 初始化线条绘制工具
  initTracePlugin(mapIns)
}

// 点击查看
function handleDetail(row: LogTableRow) {
  console.log(row)
  updateDetail(row)
  nextTick(() => {
    draw()
  })
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
  const val = state.value.level
  mapIns.setZoom(val)
}, 500)

function handlePointInputChange() {
  const p = str2point(state.value.pointInput)
  console.log(p)
  mark(p)
}
</script>

<template>
  <div class="tencent-map-api">
    <div class="info">
      <div class="log-table-wrapper">
        <div class="title">
          <span>日志</span>
        </div>
        <div class="content">
          <div v-if="uploading">
            日志较大，正在加载中...
          </div>
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
          <div>请求发起时间：{{ request.startTime }}</div>
          <div>请求名：{{ request.reqName }}</div>
          <div>请求UUID：{{ request.reqUUID }}</div>
          <div>渠道号：{{ request.channel }}</div>
          <div>设备ID：{{ request.deviceId }}</div>
          <div>异源/同源：{{ request.matchReqType }}</div>
          <div>偏航类型：{{ request.yawType }}</div>
          <div>请求类型：{{ request.type }}</div>
          <div style="display: block;">
            请求路径：
            <RequestPathsPreview :paths="request.paths" style="padding-left:10px" />
          </div>
        </div>
      </div>
      <div class="response-info">
        <div class="title">
          <span>响应体</span>
        </div>
        <div class="content">
          <div>诱导状态：{{ response.guideCode }}</div>
          <div>异源匹配状态：{{ response.mmCode }}</div>
          <div style="display: block;">
            返回路径：
            <ResponsePathsPreview :paths="response.paths" style="padding-left:10px" />
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
          <select v-model="state.mapType">
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
          <span>{{ state.level }}级</span>
          <input
            v-model="state.level"
            class="grow"
            type="range"
            :min="mapDefaultOptions.minZoom"
            :max="mapDefaultOptions.maxZoom"
            @input="handleZoomChange"
          />
        </div>
        <div class="title">
          <span>选中坐标点</span>
        </div>
        <div class="content">
          <div>point：<input v-model="state.pointInput" @blur="handlePointInputChange" /></div>
        </div>
        <div class="title">
          <span>选中link</span>
        </div>
        <div class="content">
          <div>linkId：<input v-model="state.linkIdInput" /></div>
          <div>linkinfo：<input v-model="state.linkInfoInput" /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
@import "@/styles/mixins.less";

.tencent-map-api {
  max-height: 100vh;
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
    max-height: 100%;
    overflow: auto;
  }

  .controls {
    width: .px(140)[];
  }

  .request-info > .content > div {
    display: flex;
  }
}
</style>
