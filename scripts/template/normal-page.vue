<script setup lang="ts">
import { CodeView } from '@/components'

defineOptions({
  title: 'new 页面标题',
})

const code = ``
</script>

<template>
  <div class="page-name-replacer">
    <p class="block">
      案例描述
    </p>
    <div class="block">
      <CodeView :code="code" />
    </div>
    <div class="case" />
  </div>
</template>

<style lang="less">
@import "@/styles/mixins.less";

.page-name-replacer {
  .items-gap(bottom);
}
</style>
