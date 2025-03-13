<script setup lang="ts">
import type { LogTableRow } from './log.model'
import { computed } from 'vue'
import PathsDialog from './paths-dialog.vue'

interface Props {
  detail: LogTableRow
}
const props = withDefaults(defineProps<Props>(), {})

const shown = computed(() => {
  const { path = [] } = props.detail?.request?.mmReq || {}
  return path.map(({ pathId, length, coors }) => {
    const paths = coors
    return { pathId, length, paths }
  })
})
</script>

<template>
  <div class="request-paths-preview">
    <template v-for="item in shown" :key="item.pathId">
      <div class="item">
        <div>PathId：{{ item.pathId }}</div>
        <div>路线长度：{{ item.length }}米</div>
        <div>路线坐标：<input :value="item.paths.map(({ lat, lng }) => `${lat},${lng}`).join(';')" /></div>
        <PathsDialog :paths="item.paths" />
      </div>
    </template>
  </div>
</template>
