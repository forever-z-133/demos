<script setup lang="ts">
import type { SpringOption } from 'flip-toolkit/lib/springSettings/types'
import type { HandleEnterUpdateDelete, OnFlipperComplete, OnFlipperStart, StaggerConfig } from 'flip-toolkit/lib/types'
import { Flipper } from 'flip-toolkit'
import { nextTick, onBeforeUpdate, onMounted, onUnmounted, provide, ref, useTemplateRef, watch } from 'vue'
import { FlipperInjectKey } from './helper'

interface Props {
  flipKey?: string | number | boolean | null
  staggerConfig?: StaggerConfig
  spring?: SpringOption
  applyTransformOrigin?: boolean
  handleEnterUpdateDelete?: HandleEnterUpdateDelete
  debug?: boolean
  onStart?: OnFlipperStart
  onComplete?: OnFlipperComplete
}
const props = withDefaults(defineProps<Props>(), {
  spring: 'noWobble',
})

const el = useTemplateRef<HTMLElement>('el')
const ready = ref(false)

let flipInstance: Flipper
onMounted(() => {
  if (!el.value) return
  flipInstance = new Flipper({
    element: el.value,
    staggerConfig: props.staggerConfig,
    spring: props.spring,
  })
  ready.value = true
})
onUnmounted(() => {
  ready.value = false
})
onBeforeUpdate(() => {
  flipInstance.recordBeforeUpdate()
})

watch(() => props.flipKey, (newKey, oldKey) => {
  if (newKey === oldKey) return
  nextTick(() => flipInstance.update(oldKey, newKey))
})

function getInstance() {
  return flipInstance
}

// 传递给 <Flipped> 的数据
provide(FlipperInjectKey, {
  getInstance,
})
</script>

<template>
  <div ref="el" class="flipper">
    <slot v-if="ready" />
  </div>
</template>
