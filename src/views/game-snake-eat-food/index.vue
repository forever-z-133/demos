<script setup lang="ts">
import useCanvas from '@/utils/use-canvas.ts'
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import useSnakeGame from './use-snake-game.ts'

defineOptions({
  title: '贪吃蛇小游戏',
  group: 'others',
})

const wrapperRef = useTemplateRef<HTMLElement>('game-box')
const canvasRef = useTemplateRef<HTMLCanvasElement>('canvas-ref')

const score = ref(0)

const { initial, gameLoop, handleKeyDown, reset } = useSnakeGame({
  onScore: _score => (score.value = _score),
  onGameOver: () => console.log(`游戏结束！得分: ${score.value}`),
})

useCanvas(canvasRef, {
  wrapperRef,
  onReady(canvas, ctx) {
    initial(canvas, ctx)
    gameLoop()
  },
})

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

function handleReset() {
  score.value = 0
  reset()
  gameLoop()
}
</script>

<template>
  <div class="game-snake-eat-food">
    <p class="block">
      贪吃蛇小游戏
    </p>
    <div class="case">
      <div ref="game-box" class="game-box">
        <canvas ref="canvas-ref" />
      </div>
    </div>
    <p class="block">
      当前得分：{{ score }}
    </p>
    <button class="btn" @click="handleReset">
      重置游戏
    </button>
  </div>
</template>

<style lang="less">
@import "@/styles/mixins.less";

.game-snake-eat-food {
  .items-gap(bottom);

  .game-box {
    border: 2px solid black;
    background-color: #f0f0f0;
    width: 100%;
    .ratio(1 / 1);

    canvas {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
}
</style>
