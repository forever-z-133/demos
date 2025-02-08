<script setup lang="ts">
import { RecursionFlatLoop, RecursionLoop } from '@/components'

defineOptions({
  title: '递归组件实战演示',
  group: 'libs',
})

const tree = [
  { path: '0', children: [
    { path: '0-1', children: [{ path: '0-1-1' }] },
    { path: '0-2', children: [{ path: '0-2-1' }] },
    { path: '0-3' },
  ] },
  { path: '1' },
  { path: '2' },
  { path: '3', children: [
    { path: '3-1', children: [{ path: '3-1-1' }] },
    { path: '3-2', children: [{ path: '3-2-1', children: [
      { path: '3-2-1-1' },
      { path: '3-2-1-2', children: [{ path: '3-2-1-2-1' }] },
      { path: '3-2-1-3' },
    ] }] },
  ] },
]

const code = ``
</script>

<template>
  <div class="recursion-loop-component">
    <p class="block">
      案例描述
    </p>
    <div class="block">
      <pre><code>{{ code }}</code></pre>
    </div>
    <div class="case">
      <RecursionFlatLoop :data="[1, 2, 3]" />
    </div>
    <div class="case">
      <RecursionLoop :data="tree" />
    </div>
  </div>
</template>

<style lang="less">
@import "@/styles/mixins.less";

.recursion-loop-component {
  .items-gap(bottom);
}
</style>
