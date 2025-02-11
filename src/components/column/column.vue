<script setup lang="ts">
import type { ColumnProps } from './helper'
import { computed, provide } from 'vue'
import { ColumnInjectKey, DefaultColumnNumber, DefaultGap, unit } from './helper'

type Props = ColumnProps
const props = withDefaults(defineProps<Props>(), {
  gap: () => DefaultGap,
})
const column = defineModel('column', { default: DefaultColumnNumber, required: false })

// 规范化 gap 数值格式
const gap = computed<[number, number]>(() => {
  if (typeof props.gap === 'number') {
    return [props.gap, props.gap]
  }
  if (Array.isArray(props.gap)) {
    const [g1, g2] = DefaultGap
    const [gap1 = g1, gap2 = g2] = props.gap
    return [gap1, gap2]
  }
  return DefaultGap
})

// 分栏样式
const style = computed(() => {
  const [gap1, gap2] = gap.value
  const margin = `-${unit(gap1 / 2)} -${unit(gap2 / 2)}`
  return { margin, alignItems: props.align, justifyContent: props.justify }
})

// 传递给 <column-item> 的数据
provide(ColumnInjectKey, {
  column,
  gap,
})
</script>

<template>
  <div class="column">
    <div class="column-wrapper" :style="style">
      <slot />
    </div>
  </div>
</template>

<style lang="less" scoped>
.column {
  overflow: hidden;

  .column-wrapper {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
