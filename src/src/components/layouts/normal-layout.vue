<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  document.documentElement.classList.add('is-full')
})
onUnmounted(() => {
  document.documentElement.classList.remove('is-full')
})
</script>

<template>
  <div class="body normal-layout">
    <header class="header" />
    <div class="page-container">
      <slot />
    </div>
    <footer class="footer">
      <div class="copyright">
        <span>本案例由张永恒实现，联系我可通过 </span><a href="https://github.com/forever-z-133" target="_blank">github</a><br />
        <span>或者 E-mail: <a href="mailto:617754841@qq.com">617754841@qq.com</a></span>
      </div>
    </footer>
  </div>
</template>

<style lang="less" scoped>
@import "@/styles/mixins.less";

.body {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  max-width: 768px;
  margin: auto;
  font-size: .px(16)[];
}
@media (min-width: 992px) {
  /* 宽屏上 */
  .body {
    width: 750px;
    height: 1334px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
    -webkit-transform: scale(.5);
            transform: scale(.5);
  }
}
.header, .footer {
  position: relative;
  z-index: 1;
  flex-shrink: 0;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, .1);
  .page-padding();
}
.header:empty, .footer:empty {
  display: none;
}
.page-container {
  height: 100%;
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: auto;
  transform: translate3d(0,0,0);
  -webkit-overflow-scrolling: touch;
  .page-padding();
}
</style>
