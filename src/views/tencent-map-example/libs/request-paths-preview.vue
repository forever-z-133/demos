<script setup lang="ts">
import type { RequestData } from './use-log-store'
import { storeToRefs } from 'pinia'
import useLogStore from './use-log-store'
import { int2tx, point2str } from './utils'

interface Props {
  paths: RequestData['paths']
}
const props = withDefaults(defineProps<Props>(), {})

const { redraw } = useLogStore()
const { state } = storeToRefs(useLogStore())
</script>

<template>
  <div class="request-paths-preview">
    <t-radio-group v-model="state.requestPathsIndex" @change="() => redraw()">
      <template v-for="(item, index) in props.paths" :key="item.pathId">
        <t-radio :value="index">
          pathId：{{ item.pathId }}
        </t-radio>
      </template>
    </t-radio-group>
    <div class="content">
      <template v-for="(item, index) in props.paths" :key="item.pathId">
        <div v-if="state.requestPathsIndex === index" class="item">
          <div>路线长度：{{ item.length }}米</div>
          <div>路线坐标：<input :value="item.points.map(e => point2str(int2tx(e.point))).join(';')" /></div>
        </div>
      </template>
    </div>
  </div>
</template>
