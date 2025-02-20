<script setup lang="ts">
import { random } from '@/utils'
import { onMounted, onUnmounted, useTemplateRef } from 'vue'

defineOptions({
  title: '到处乱撞的广告',
  group: 'effect',
  layout: 'pure',
})

const adRef = useTemplateRef('ad')
let timer: number

const data = {
  x: 0, // 视图内位置
  y: 0,
  width: 0, // 广告尺寸
  height: 0,
  speed: 5,
  angle: 45, // 0度为正右方，向下+1
}

onMounted(() => {
  initial()
  timer = setInterval(() => {
    update()
    render()
  }, 1000 / 60)
})
onUnmounted(() => {
  clearInterval(timer)
})

function initial() {
  if (!adRef.value) return
  const dom = adRef.value
  const rect = dom.getBoundingClientRect()
  data.width = rect.width
  data.height = rect.height
  const maxW = window.innerWidth - data.width
  const maxH = window.innerHeight - data.height
  data.x = random(0, maxW)
  data.y = random(0, maxH)
  data.angle = random(0, 360)
}

function update() {
  const maxW = window.innerWidth - data.width
  const maxH = window.innerHeight - data.height
  const { x: tempX, y: tempY } = calculate()
  if (tempX >= maxW || tempX <= 0) {
    const angleChange = 90
    const direction = (data.angle < 90 || (data.angle > 180 && data.angle < 270)) ? 1 : -1
    data.angle += direction * angleChange
  } else if (tempY >= maxH || tempY <= 0) {
    const angleChange = data.angle > 90 && data.angle < 270 ? 90 : 270
    const direction = (tempY < 0 ? -1 : 1)
    data.angle += direction * angleChange
  }
  const { x, y } = calculate()
  data.x = x
  data.y = y
}

function calculate() {
  const delta = data.speed
  const deltaX = delta * Math.cos(data.angle * Math.PI / 180)
  const deltaY = delta * Math.sin(data.angle * Math.PI / 180)
  const x = data.x + deltaX
  const y = data.y + deltaY
  return { x, y }
}

function render() {
  if (!adRef.value) return
  const dom = adRef.value
  const top = data.y
  const left = data.x
  dom.style.transform = `translate3d(${left}px, ${top}px, 0)`
}
</script>

<template>
  <div class="fly-everywhere-ad">
    <p class="block">
      到处乱撞的广告位
    </p>
    <Teleport to="body">
      <div ref="ad" class="fly-ad" />
    </Teleport>
    <div class="temp" />
  </div>
</template>

<style lang="less">
@import "@/styles/mixins.less";

.fly-ad {
  position: fixed;
  width: .px(100)[];
  height: .px(100)[];
  background: pink;
  top: 0;
  left: 0;
  will-change: transform;
  transform: translate3d(0, 0, 0)
}

.fly-everywhere-ad {
  .items-gap(bottom);

  .temp {
    height: 2000px;
  }
}
</style>
