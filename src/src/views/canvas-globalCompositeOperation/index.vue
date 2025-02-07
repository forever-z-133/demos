<script setup lang="ts">
import { CommonList } from '@/components'
import { onMounted, onUnmounted, ref } from 'vue'

defineOptions({
  title: 'globalCompositeOperation 知识整理',
  group: 'others',
  layout: 'pure',
})

const list = [
  {
    id: 'source-over',
    desc: '默认。在目标图像上显示源图像。',
  },
  {
    id: 'source-atop',
    desc: '在目标图像顶部显示源图像。源图像位于目标图像之外的部分是不可见的。',
  },
  {
    id: 'source-in',
    desc: '在目标图像中显示源图像。只有目标图像内的源图像部分会显示，目标图像是透明的。',
  },
  {
    id: 'source-out',
    desc: '在目标图像之外显示源图像。只会显示目标图像之外源图像部分，目标图像是透明的。',
  },
  {
    id: 'destination-over',
    desc: '在源图像上方显示目标图像。',
  },
  {
    id: 'destination-atop',
    desc: '在源图像顶部显示目标图像。源图像之外的目标图像部分不会被显示。',
  },
  {
    id: 'destination-in',
    desc: '在源图像中显示目标图像。只有源图像内的目标图像部分会被显示，源图像是透明的。',
  },
  {
    id: 'destination-out',
    desc: '在源图像外显示目标图像。只有源图像外的目标图像部分会被显示，源图像是透明的。',
  },
  {
    id: 'lighter',
    desc: '显示源图像 + 目标图像。',
  },
  {
    id: 'copy',
    desc: '显示源图像。忽略目标图像。',
  },
  {
    id: 'xor',
    desc: '使用异或操作对源图像与目标图像进行组合。',
  },
]

const column = ref(1)

onMounted(() => {
  updateGrid()
  window.addEventListener('resize', updateGrid)
  initial()
})
onUnmounted(() => {
  window.removeEventListener('resize', updateGrid)
})

function updateGrid() {
  const width = window.innerWidth
  if (width < 768) column.value = 1
  else if (width < 992) column.value = 2
  else if (width < 1200) column.value = 3
  else column.value = 4
}

function initial() {
  const doms = document.querySelectorAll('canvas')
  const canvasWidth = 200
  const canvasHeight = 120
  Array.from(doms).forEach((canvas) => {
    canvas.width = canvasWidth
    canvas.height = canvasHeight
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const clipWidth = canvasWidth / 2

    ctx.fillStyle = 'rgba(0, 255, 0, .5)'
    ctx.fillRect(0, 0, clipWidth, canvasHeight)

    const globalCompositeOperation = canvas.dataset.key as GlobalCompositeOperation
    ctx.globalCompositeOperation = globalCompositeOperation

    ctx.fillStyle = 'rgba(255, 0, 0, 1)'
    ctx.beginPath()
    ctx.arc(clipWidth, canvasHeight / 2, 40, 0, 2 * Math.PI)
    ctx.fill()
  })
}
</script>

<template>
  <div class="canvas-globalCompositeOperation">
    <p class="block">
      Canvas 的图层模式，即 globalCompositeOperation 属性的应用。表现为覆盖时的遮挡或蒙版效果。
    </p>
    <p class="block">
      先绘制 `rgba(0, 255, 0, .5)` 的淡绿色方块，再设置 <code>globalCompositeOperation</code>，再绘制 `rgba(255, 0, 0, 1)` 的红色圆，最终效果如下：
    </p>
    <CommonList :data="list" :column="column" :gap="[16, 40]">
      <template #default="{ row }">
        <section class="item">
          <div class="title">
            {{ row.id }}
          </div>
          <div class="desc">
            {{ row.desc }}
          </div>
          <canvas :data-key="row.id" />
        </section>
      </template>
    </CommonList>
  </div>
</template>

<style lang="less">
@import '@/styles/mixins.less';

.canvas-globalCompositeOperation {
  .items-gap(bottom);

  .item {
    .items-gap(bottom, .px(6)[]);
  }
  .title {
    font-size: 1.2em;
    font-weight: bold;
  }
  .desc {
    line-height: 1.4;
    height: 2.8em;
  }
  canvas {
    box-shadow: 0 0 4px rgba(0, 0, 0, .15);
  }
}
</style>
