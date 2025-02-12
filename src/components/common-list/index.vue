<script setup lang="ts">
import type { ColumnProps } from '../column/helper'
import { computed } from 'vue'
import ColumnItem from '../column/column-item.vue'
import Column from '../column/column.vue'

/**
 * 通用列表组件
 */

interface Props {
  data?: any[]
  length?: number
  columnProps?: ColumnProps
}
const props = withDefaults(defineProps<Props>(), {
  length: 0,
})

const list = computed(() => {
  if (props.data) return props.data
  const length = props.length
  return Array.from({ length }).fill(undefined).map((_, i) => ({ id: i + 1 }))
})
</script>

<template>
  <Column class="list" v-bind="props.columnProps">
    <template v-for="(item, index) in list" :key="index">
      <ColumnItem class="item">
        <slot :row="item" :index="index">
          {{ item.id }}
        </slot>
      </ColumnItem>
    </template>
  </Column>
</template>
