<script setup lang="ts"></script>

<template>
  <div class="infinite-marquee">
    <div class="wrapper">
      <slot />
    </div>
    <div class="wrapper" aria-hidden>
      <slot />
    </div>
  </div>
</template>

<style lang="less">
@import "@/styles/mixins.less";

.infinite-marquee {
  display: flex;
  --animation-duration: 10s;

  & > .wrapper {
    flex-shrink: 0;
    display: flex;
    animation: scrolling var(--animation-duration) linear infinite;
  }
}

@keyframes scrolling {
  to { transform: translateX(-100%); }
}
</style>
