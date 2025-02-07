<script setup lang="ts">
import img from '@/assets/image.png'
import { onMounted, ref, useTemplateRef } from 'vue'
import useTouchMove from '@/utils/use-touch-move'

defineOptions({
  title: '刮刮乐玩法',
  group: 'libs',
})

const wrapperRef = useTemplateRef<HTMLCanvasElement>('game-box')
const canvasRef = useTemplateRef<HTMLCanvasElement>('canvas-ref')
const size = ref({ width: 300, height: 300 })
let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D

const percent = ref('0')

// 初始化画布
onMounted(() => {
  if (!canvasRef.value || !wrapperRef.value) return
  canvas = canvasRef.value
  const context = canvas.getContext('2d', { willReadFrequently: true })
  if (!context) return
  ctx = context

  const rect = wrapperRef.value.getBoundingClientRect()
  size.value.width = rect.width
  size.value.height = rect.height
  canvas.width = rect.width
  canvas.height = rect.height

  initial()
})

// 绑定滑动事件
let offset = { left: 0, top: 0 }
useTouchMove(wrapperRef, {
  onStart: handleTouchStart,
  onMove: handleTouchMove,
  onEnd: handleTouchEnd,
})

// 初始化
function initial() {
  percent.value = '0'

  ctx.reset()

  ctx.fillStyle = 'black'
  ctx.lineWidth = 10
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'
  ctx.globalCompositeOperation = 'source-over'

  ctx.fillRect(0, 0, size.value.width, size.value.height)
}

// 开始滑动
function handleTouchStart(pos: { x: number, y: number }) {
  const rect = canvas.getBoundingClientRect()
  const x = pos.x - rect.left
  const y = pos.y - rect.top
  offset = { left: rect.left, top: rect.top }
  ctx.moveTo(x, y)
  ctx.globalCompositeOperation = 'destination-out'
}

// 滑动中
function handleTouchMove(pos: { x: number, y: number }) {
  const { left = 0, top = 0 } = offset
  const x = pos.x - left
  const y = pos.y - top
  ctx.lineTo(x, y)
  ctx.stroke()
}

// 滑动结束
function handleTouchEnd() {
  ctx.globalCompositeOperation = 'source-over'
  const per = getTransparentPercent()
  percent.value = per.toFixed(1)
}

// 点击重置
function handleReset() {
  initial()
}

// 获取刮刮乐透明范围比例
function getTransparentPercent() {
  const imgData = ctx.getImageData(0, 0, size.value.width, size.value.height)
  if (!imgData) return 0
  const { data } = imgData
  let total = 0
  for (let i = 0; i < data.length; i += 4) {
    const alpha = data[i + 3]
    if (alpha < 100) total += 4
  }
  return total / data.length * 100
}
</script>

<template>
  <div class="gua-gua-le">
    <p class="block">
      使用 <code>Canvas</code> 实现刮刮乐效果
    </p>
    <div ref="game-box" class="game-box">
      <img :src="img" />
      <canvas ref="canvas-ref" :style="size" />
    </div>
    <p class="percent block">
      已刮范围：{{ percent }}%
    </p>
    <button class="btn" @click="handleReset">
      重置
    </button>
  </div>
</template>

<style lang="less">
@import "@/styles/mixins.less";

.gua-gua-le {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;
  user-select: none;

  .game-box {
    position: relative;
    margin: 0 auto;
    width: 320px;
    .ratio(1 / 1);

    img, canvas {
      width: 100%;
      height: 100%;
      display: block;
    }

    canvas {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
</style>
