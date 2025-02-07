<script setup lang="ts"></script>

<template>
  <div class="body pure-layout">
    <slot />
  </div>
</template>

<style lang="less" scoped>
@import "@/styles/mixins.less";

.body {
  font-size: .px(16)[];
  .page-padding();
}
</style>
