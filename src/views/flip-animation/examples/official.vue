<script setup lang="ts">
import { Flipper } from 'flip-toolkit'
import { onMounted } from 'vue'

onMounted(() => {
  const container = document.querySelector('.container') as HTMLElement
  const square = document.querySelector('.square') as HTMLElement

  const flipper = new Flipper({ element: container })

  flipper.addFlipped({
    element: square,
    flipId: 'square',
    children: [],
    onStart: () => console.log('animation started!'),
    onSpringUpdate: springValue =>
      console.log(`current spring value: ${springValue}`),
    onComplete: () => console.log('animation completed!'),
  })

  const btn = document.querySelector('.btn') as HTMLElement
  btn.addEventListener('click', () => {
    flipper.recordBeforeUpdate()
    square.classList.toggle('big-square')
    flipper.update(undefined, undefined)
  })
})
</script>

<template>
  <div class="container">
    <div class="header">
      非组件案例
      <button class="btn">
        Toggle
      </button>
    </div>
    <div class="square">
      <div class="inner-square" />
    </div>
  </div>
</template>

<style lang="less">
.container {
  .square {
    width: 100px;
    height: 100px;
    background: pink;

    &.big-square {
      width: 200px;
      height: 200px;
      border-radius: 100%;
      background: lightblue;
    }
  }
}
</style>
