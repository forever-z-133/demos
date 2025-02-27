<script setup lang="ts">
import type TMap from 'tmap-gl-types'
import { loadScript } from '@/utils/index'

import { onMounted, onUnmounted, ref } from 'vue'

interface Props {
  defaultLat?: number
  defaultLng?: number
  options?: TMap.MapOptions
}
const props = withDefaults(defineProps<Props>(), {
  defaultLat: 39.914012857692846,
  defaultLng: 116.39726472863117,
})
const emit = defineEmits<{
  (e: 'loaded', map: TMap.Map): void
}>()
defineExpose({})

const randomId = ref('') // 用于热更新时重新实例化地图
let map: TMap.Map | null
const loading = ref(true)

onMounted(async () => {
  randomId.value = Date.now().toString()
  initial()
})

onUnmounted(() => {
  if (!map) return
  map.destroy()
  map = null
})

// 初始化
async function initial() {
  try {
    loading.value = true
    await Promise.all([
      loadScript(
        'gljs-tools',
        'https://map.qq.com/api/gljs?v=1.exp&key=SD5BZ-RFZHU-C6ZVE-2H3GT-3I2DQ-2VFCG&libraries=tools,geometry',
      ),
    ])
    handleScriptLoaded()
  } catch (err) {
    alert((err as Error).message || '初始化地图失败')
  } finally {
    loading.value = false
  }
}

// 地图SDK加载完成后，实例化地图
function handleScriptLoaded() {
  const TMap = window.TMap
  const dom = document.querySelector(`#map-${randomId.value}`) as HTMLDivElement
  if (!dom) return
  try {
    const center = new TMap.LatLng(props.defaultLat, props.defaultLng)
    map = new TMap.Map(dom, {
      center,
      ...props.options,
    })
    emit('loaded', map)
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="map-component">
    <div :id="`map-${randomId}`" class="map-instance" />
    <div v-if="loading" class="map-status">
      地图初始化中...
    </div>
  </div>
</template>

<style scoped lang="less">
.map-component {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transform: translate3d(0, 0, 0);

  .map-instance {
    width: 100%;
    height: 100%;
  }

  .map-status {
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
