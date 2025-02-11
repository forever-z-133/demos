<script setup lang="ts">
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
      <pre><code>{{ code }}</code></pre>
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
