<script setup lang="ts">
import type { LogTableRow } from './log.model'
import { computed } from 'vue'

interface Props {
  detail: LogTableRow
}
const props = withDefaults(defineProps<Props>(), {})

const shown = computed(() => {
  const { result = [] } = props.detail?.response?.mmRsp || {}
  return result.map(({ pathId, bindPoints, linkGroups }) => {
    const paths = bindPoints.map(({ point: p }) => `${p.lat},${p.lng}`).join(';')
    const links = linkGroups.map(({ linkinfo }) => JSON.stringify(linkinfo))
    return { pathId, paths, links }
  })
})
</script>

<template>
  <div class="response-paths-preview">
    <template v-for="item in shown" :key="item.pathId">
      <div class="item">
        <div>PathId：{{ item.pathId }}</div>
        <div>路线坐标：<input :value="item.paths" /></div>
        <div>
          路线linkinfo：
          <template v-for="l in item.links" :key="l.rawLinkId">
            <input :value="l" />
          </template>
        </div>
      </div>
    </template>
  </div>
</template>
