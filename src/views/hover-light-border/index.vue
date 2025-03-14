<script setup lang="ts">
import { CommonList } from '@/components'
import { getTouchPosition } from '@/utils'
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
  const { x: clientX, y: clientY } = getTouchPosition(e)[0]

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
    <p class="block">
      鼠标滑动或手势拖动时，边框随交互有光斑效果。仿自 window10 的日历界面。
    </p>
    <CommonList :length="12" :column-props="{ column: 3, gap: 10 }">
      <template #default="{ row }">
        <div class="inner">
          <div class="content">
            {{ row.id }}
          </div>
        </div>
      </template>
    </CommonList>
  </div>
</template>

<style lang="less">
@import '@/styles/mixins.less';

.hover-light-border {
  user-select: none;
  .items-gap(bottom);

  .inner {
    position: relative;
    background-color: #ccc;
    overflow: hidden;
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
    margin: .px(8)[];
    background-color: #fff;
    .ratio(1 / 1);
  }
}
</style>
