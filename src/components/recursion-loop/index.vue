<script setup lang="ts">
interface Props {
  data?: any[]
}
defineOptions({
  name: 'RecursionLoop',
})
const props = withDefaults(defineProps<Props>(), {
  data: () => [],
})
</script>

<template>
  <div class="box">
    <details v-for="(item, index) in props.data" :key="index" open>
      <summary :style="{ color: item.children ? '#1890ff' : 'grey' }">
        {{ item.path }}
      </summary>
      <template v-if="item.children && item.children.length">
        <RecursionLoop :data="item.children" />
      </template>
    </details>
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
