<script setup lang="ts">
import img from '@/assets/image.png'
import useCanvas from '@/utils/use-canvas'
import useTouchMove from '@/utils/use-touch-move'
import { ref, useTemplateRef } from 'vue'
import useGuaGame from './use-gua-game'

defineOptions({
  title: '刮刮乐玩法',
  group: 'libs',
})

const wrapperRef = useTemplateRef<HTMLElement>('game-box')
const canvasRef = useTemplateRef<HTMLCanvasElement>('canvas-ref')

const percent = ref('0')

const { initial, handleTouchStart, handleTouchMove, handleTouchEnd, getTransparentPercent, reset } = useGuaGame({
  onEnd: handleActionEnd,
})

useCanvas(canvasRef, {
  wrapperRef,
  contextProps: { willReadFrequently: true },
  onReady(canvas, ctx) {
    initial(canvas, ctx)
  },
})

// 绑定滑动事件
useTouchMove(wrapperRef, {
  onStart: handleTouchStart,
  onMove: handleTouchMove,
  onEnd: handleTouchEnd,
})

// 滑动结束
function handleActionEnd() {
  const per = getTransparentPercent()
  percent.value = per.toFixed(1)
}

// 点击重置
function handleReset() {
  percent.value = '0'
  reset()
}
</script>

<template>
  <div class="gua-gua-le">
    <p class="block">
      使用 <code>Canvas</code> 实现刮刮乐效果
    </p>
    <div ref="game-box" class="game-box">
      <img :src="img" />
      <canvas ref="canvas-ref" />
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
  .items-gap(bottom);
  text-align: center;
  user-select: none;

  .game-box {
    position: relative;
    margin-left: auto;
    margin-right: auto;
    width: .px(320)[];
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
