<script setup lang="ts">
import type { RouteMeta } from '@/router/types'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import NormalLayout from './normal-layout.vue'
import PureLayout from './pure-layout.vue'

const route = useRoute()
const layoutType = ref('normal' as RouteMeta['layout'])

watch(route, () => {
  const meta = route.meta as RouteMeta || {}
  const { layout = 'normal' } = meta
  layoutType.value = layout
})
</script>

<template>
  <template v-if="layoutType === 'normal'">
    <NormalLayout>
      <RouterView />
    </NormalLayout>
  </template>
  <template v-else>
    <PureLayout>
      <RouterView />
    </PureLayout>
  </template>
</template>
