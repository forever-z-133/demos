<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  data?: any[]
}
defineOptions({
  name: 'RecursionFlatLoop',
})
const props = withDefaults(defineProps<Props>(), {
  data: () => [],
})

const propArr = computed(() => {
  return props.data.slice(1, props.data.length)
})
</script>

<template>
  <div class="box">
    <RecursionFlatLoop v-if="propArr.length !== 0" :data="propArr" />
    {{ props.data }}
  </div>
</template>

<style>
.box {
  width: 100%;
  height: 100%;
  padding: 5px;
  border: 1px solid red;
}
</style>
