<script setup lang="ts">
import img from './image.png'

defineOptions({
  title: '抖音故障艺术效果',
  group: 'effect',
})
</script>

<template>
  <div class="fault-shake-effect">
    <div class="fault-text" data-text="故障艺术效果">
      故障艺术效果
    </div>
    <div class="fault-text special" data-text="加强版">
      加强版
      <div class="tmp" />
    </div>
    <div class="fault-image" :style="`background-image: url(${img});`" />
  </div>
</template>

<style lang="less">
.fault-shake-effect {
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
}

.fault-text {
  position: relative;
  &::before {
    content: attr(data-text);
    position: absolute;
    left: 0;
    overflow: hidden;
    color: #24f6f0;
    animation: shake .5s infinite reverse;
  }
  &::after {
    content: attr(data-text);
    position: absolute;
    left: 0;
    overflow: hidden;
    color: #fe2d52;
    mix-blend-mode: lighten;
    animation: shake 1s infinite;
  }
}

.special {
  &::before {
    animation: shake-special 1s infinite reverse;
  }
  &::after {
    animation: shake-special 1s infinite;
  }
  & > .tmp {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 0.1em;
    background: white;
    animation: tmp-move 1s infinite;
  }
}

.fault-image {
  position: relative;
  width: 150px;
  height: 150px;
  background: #24f6f0 url('https://picsum.photos/150/150') center / contain no-repeat;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: inherit;
    background-color: #fe2d52;
    background-blend-mode: lighten;
    mix-blend-mode: darken;
    animation: shake 1s infinite;
  }
}

@keyframes shake {
  0% { transform: translate(0, 0); }
  20% { transform: translate(3px, 0); }
  40% { transform: translate(-3px, 3px); }
  70% { transform: translate(3px, -2px); }
  100% { transform: translate(2px, 1px); }
}
@keyframes shake-special {
  0% { transform: translate(0, 0); height: 1em; }
  10% { transform: translate(3px, 0); height: 0.4em; }
  20% { transform: translate(-3px, 3px); height: 0.8em; }
  40% { transform: translate(3px, -2px); height: 0.3em; }
  50%, 100% { transform: translate(2px, 1px);  height: 1.2em; }
}
@keyframes tmp-move {
  0% { top: 0; }
  50% { top: 100%; }
}
</style>
