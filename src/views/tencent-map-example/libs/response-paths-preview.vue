<script setup lang="ts">
import type { ResponseData } from './use-log-store'
import { storeToRefs } from 'pinia'
import useLogStore from './use-log-store'
import { int2tx, point2arr, point2str } from './utils'

interface Props {
  paths: ResponseData['paths']
}
const props = withDefaults(defineProps<Props>(), {})

const { redraw } = useLogStore()
const { state } = storeToRefs(useLogStore())
</script>

<template>
  <div class="response-paths-preview">
    <t-radio-group v-model="state.requestPathsIndex" @change="() => redraw()">
      <template v-for="(item, index) in props.paths" :key="item.pathId">
        <t-radio :value="index">
          pathId：{{ item.pathId }}
        </t-radio>
      </template>
    </t-radio-group>
    <div class="content">
      <template v-for="(item, index) in props.paths" :key="item.pathId">
        <t-radio-group v-model="state.responsePathsType" @change="() => redraw()">
          <t-radio value="point">
            按坐标点
          </t-radio>
          <t-radio value="link">
            按link线
          </t-radio>
        </t-radio-group>
        <div v-if="state.requestPathsIndex === index" class="item">
          <template v-if="state.responsePathsType === 'point'">
            <div>起点：<input :value="point2str(int2tx(item.points[0].point))" /></div>
            <div>终点：<input :value="point2str(int2tx(item.points[item.points.length - 1].point))" /></div>
            <div>路线坐标：<input :value="item.points.map(e => point2str(int2tx(e.point))).join(';')" /></div>
          </template>
          <template v-else>
            <template v-for="(e, i) in item.linkGroup" :key="i">
              <div>起点：<input :value="point2str(int2tx(e.startLoc))" /></div>
              <div>终点：<input :value="point2str(int2tx(e.endLoc))" /></div>
              <div>linkGroups：<input :value="JSON.stringify(e.links.map(({ linkId, link }) => ({ linkId, link: link.map(p => point2arr(int2tx(p))) })))" /></div>
            </template>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>
