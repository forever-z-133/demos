<script setup lang="ts"></script>

<template>
  <div class="body">
    <slot />
  </div>
</template>

<style lang="less" scoped>
@import "@/styles/mixins.less";

.body {
  .page-padding();
}
</style>
