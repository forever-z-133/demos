<script setup lang="ts">
import type { ColumnItemProps } from './helper'
import { computed, inject } from 'vue'
import { ColumnInjectKey, DefaultColumnInject, unit } from './helper'

type Props = ColumnItemProps
const props = withDefaults(defineProps<Props>(), {
  span: 1,
})
const columnCtx = inject(ColumnInjectKey, DefaultColumnInject)!

const style = computed(() => {
  const span = Math.min(props.span, columnCtx.column.value)
  const percent = (100 / columnCtx.column.value * span).toFixed(2)
  const width = `${percent}%`
  const [gap1, gap2] = columnCtx.gap.value
  const padding = `${unit(gap1 / 2)} ${unit(gap2 / 2)}`
  return { width, padding }
})
</script>

<template>
  <div class="column-item" :style="style">
    <slot />
  </div>
</template>

<style lang="less" scoped></style>
