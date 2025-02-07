<script setup lang="ts"></script>

<template>
  <div class="body pure-layout">
    <slot />
  </div>
</template>

<style lang="less" scoped>
@import "@/styles/mixins.less";

.body {
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
  font-size: .px(16)[];
  .page-padding();
}
</style>
