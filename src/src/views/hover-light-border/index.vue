<script setup lang="ts">
import { CommonList } from '@/components'
import { onMounted, onUnmounted } from 'vue'

defineOptions({
  title: '跟随鼠标的网格边框效果',
  group: 'effect',
})

let items: NodeListOf<HTMLElement>
onMounted(() => {
  items = document.querySelectorAll('.inner')
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('touchmove', handleMouseMove)
})
onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('touchmove', handleMouseMove)
})

function handleMouseMove(e: MouseEvent | TouchEvent) {
  let clientX: number
  let clientY: number
  if (e instanceof TouchEvent) {
    clientX = e.touches[0].clientX
    clientY = e.touches[0].clientY
  } else {
    clientX = e.clientX
    clientY = e.clientY
  }

  for (const item of items) {
    const rect = item.getBoundingClientRect()
    let x = clientX - rect.left - rect.height / 2
    let y = clientY - rect.top - rect.height / 2

    if (window.innerWidth > 992) {
      const screenScale = 0.5
      x /= screenScale
      y /= screenScale
    }

    item.style.setProperty('--x', `${x}px`)
    item.style.setProperty('--y', `${y}px`)
  }
}
</script>

<template>
  <div class="hover-light-border">
    <CommonList :length="12" />
  </div>
</template>

<style lang="less">
.hover-light-border {
  .list {
    overflow-x: hidden;
  }
  .wrapper {
    display: flex;
    flex-wrap: wrap;
  }
  .item {
    width: 33.33%;
    padding: 5px;
    border-radius: 10px;
  }
  .inner {
    position: relative;
    height: 250px;
    padding: 8px;
    background-color: #ccc;
    overflow: hidden;
  }
  @media (max-width: 992px) {
    .inner {
      height: 15vh;
    }
  }
  .inner::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(closest-side circle, red, transparent);
    transform: translate3d(var(--x, -9999em), var(--y, -9999em), 0);
  }
  .content {
    position: relative;
    z-index: 0;
    height: 100%;
    background-color: #fff;
  }
}
</style>
