<script setup lang="ts">
import type { FlipId, FlippedProps } from 'flip-toolkit/lib/types'
import { inject, onMounted, useTemplateRef } from 'vue'
import { FlipperInjectKey } from './helper'

type addFlippedArgs = { flipId: FlipId, innerFlipId: undefined } & Omit<FlippedProps, 'flipId' | 'children'>
interface addInvertedArgs {
  flipId: undefined
  innerFlipId: FlipId
  opacity?: boolean
  translate?: boolean
  scale?: boolean
  transformOrigin?: string
}
type Props = addFlippedArgs | addInvertedArgs
const props = withDefaults(defineProps<Props>(), {
  spring: 'noWobble',
})

const el = useTemplateRef<HTMLElement>('el')
const flipperCtx = inject(FlipperInjectKey)!

onMounted(() => {
  if (!el.value) return
  const flipInstance = flipperCtx.getInstance()
  if (props.flipId) {
    flipInstance.addFlipped({
      element: el.value,
      children: null,
      ...props,
    })
  } else {
    flipInstance.addInverted({
      element: el.value,
      parent: el.value.parentElement!,
      scale: true,
      opacity: true,
      translate: true,
      transformOrigin: '0 0',
    })
  }
})
</script>

<template>
  <div ref="el" class="flipped">
    <slot />
  </div>
</template>
