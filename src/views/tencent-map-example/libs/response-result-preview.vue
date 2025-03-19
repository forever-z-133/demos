<script setup lang="ts">
import type { ResponseData } from './use-log-store'
import { ref, watch } from 'vue'
import { int2tx, point2str } from './utils'

interface Props {
  routeGuide: ResponseData['routeGuide']
}
const props = withDefaults(defineProps<Props>(), {})

const currentRouteId = ref(props.routeGuide.length ? props.routeGuide[0].routeId : '')
watch(() => props.routeGuide, (val) => {
  console.log(currentRouteId.value, val)
  if (!currentRouteId.value && val.length) {
    currentRouteId.value = val[0].routeId
  }
})
</script>

<template>
  <div class="response-result-preview">
    <t-radio-group v-model="currentRouteId">
      <template v-for="item in props.routeGuide" :key="item.pathId">
        <t-radio :value="item.routeId">
          routeId：{{ item.routeId }}
        </t-radio>
      </template>
    </t-radio-group>
    <div class="content">
      <template v-for="(item) in props.routeGuide" :key="item.routeId">
        <div v-if="item.routeId === currentRouteId" class="item">
          <div>红绿灯信息：<input :value="item.lights.map(({ point: p }) => point2str(int2tx(p))).join(',')" /></div>
          <div>导航转向信息：<input :value="JSON.stringify(item.direction.map(e => e.raw))" /></div>
          <div>引导面：<input :value="JSON.stringify(item.control.map(e => e.raw))" /></div>
          <div>车道信息：<input :value="JSON.stringify(item.lanes.map(e => e.raw))" /></div>
          <div>Tips：<input :value="JSON.stringify(item.tips.map(e => e.raw))" /></div>
        </div>
      </template>
    </div>
  </div>
</template>
