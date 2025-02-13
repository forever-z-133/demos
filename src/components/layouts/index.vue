<script setup lang="ts">
import { useGlobalStore } from '@/constants/global.store'
import { onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import NormalLayout from './normal-layout.vue'
import PureLayout from './pure-layout.vue'

const route = useRoute()
const globalStore = useGlobalStore()

globalStore.updateLayout(route.meta)
onMounted(() => {
  globalStore.setRootFontSize()
  window.addEventListener('resize', handleWindowResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', handleWindowResize)
})

function handleWindowResize() {
  globalStore.updateLayout(route.meta)
  globalStore.setRootFontSize()
}
</script>

<template>
  <template v-if="globalStore.layoutType === 'normal'">
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
