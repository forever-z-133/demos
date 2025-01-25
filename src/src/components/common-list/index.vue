<script setup lang="ts">
import { computed } from 'vue'

/**
 * 通用列表组件
 */

interface Props {
  data?: any[]
  length?: number
}
defineOptions({
  name: 'CommonList',
})
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
  <div class="list">
    <div class="wrapper">
      <template v-for="(item, index) in list" :key="index">
        <div class="item">
          <div class="inner">
            <div class="content">
              <slot :row="item">
                {{ item.id }}
              </slot>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
