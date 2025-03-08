<script setup lang="ts">
import type TMap from 'tmap-gl-types'
import type { MAP_TYPE } from './libs/use-map-type-plugin'
import { onMounted, ref, shallowRef, watch } from 'vue'
import MapComponent from './libs/map-component.vue'
import useLogParse from './libs/use-log-parse'
import useMapTypePlugin, { MAP_TYPE_OPTIONS } from './libs/use-map-type-plugin'

defineOptions({
  title: '腾讯地图API演示',
  group: 'libs',
  layout: 'pure',
})

// 地图初始化参数
let mapIns: TMap.Map
const mapDefaultOptions: TMap.MapOptions = {
  pitchable: false,
  rotatable: false,
  zoom: 13,
  minZoom: 5,
  maxZoom: 14,
}

// 拓展地图类型功能
const mapType = ref<MAP_TYPE>('gaode-satellite')
const { initial: initMapTypePlugin, changeType: changeMapType } = useMapTypePlugin({
  defaultType: mapType.value,
})
watch(mapType, () => changeMapType(mapIns, mapType.value))

const table = shallowRef([] as any[])
const { load, parse } = useLogParse()

onMounted(async () => {
  const publicPath = window.location.pathname
  const txt = await load(`${publicPath}tmp/export-9358b80c-5a28-416e-9a7e-f4893e8a7cd9.json`)
  const rows = parse(txt)
  table.value = rows
  console.log(rows)
})

// 地图加载完成，初始化各种拓展
function handleMapLoaded(map: TMap.Map) {
  mapIns = map

  // 初始化地图类型
  initMapTypePlugin(mapIns)
}

function handleClickTableRow(row: any) {
  console.log(row)
}
</script>

<template>
  <div class="tencent-map-api">
    <div class="map-container">
      <MapComponent :options="mapDefaultOptions" @loaded="handleMapLoaded" />
    </div>
    <div class="controls">
      <div class="control-item">
        <div class="title">
          <span>地图类型</span>
        </div>
        <div class="content">
          <select v-model="mapType">
            <template v-for="op in MAP_TYPE_OPTIONS" :key="op.value">
              <option :value="op.value">
                {{ op.label }}
              </option>
            </template>
          </select>
        </div>
      </div>
      <div class="control-item">
        <div class="title">
          <span>日志</span>
        </div>
        <div class="content">
          <table>
            <tbody>
              <tr>
                <th>请求发起时间</th>
                <th>操作</th>
              </tr>
              <template v-for="(row, i) in table" :key="i">
                <tr>
                  <td>{{ row.request.startTime }}</td>
                  <td>
                    <button @click="handleClickTableRow(row)">
                      查看
                    </button>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
@import "@/styles/mixins.less";

.tencent-map-api {
  .items-gap(bottom);
  display: flex;
  gap: .px(20)[];

  .map-container {
    width: 80%;
    height: 90vh;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  }
}
</style>
