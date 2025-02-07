<script setup lang="ts">
import img from '@/assets/image.png'

defineOptions({
  title: '抖音故障艺术效果',
  group: 'effect',
})
</script>

<template>
  <div class="fault-shake-effect">
    <p class="block">
      使用 CSS 的 <code>mix-blend-mode</code> 和 <code>background-blend-mode</code> 实现故障艺术效果
    </p>
    <div class="case">
      <span class="fault-text" data-text="故障艺术效果">
        故障艺术效果
      </span>
    </div>
    <div class="case">
      <span class="fault-text special" data-text="加强版">
        加强版
        <span class="tmp" />
      </span>
    </div>
    <div class="case">
      <div class="fault-image" :style="`background-image: url(${img});`" />
    </div>
  </div>
</template>

<style lang="less">
@import '@/styles/mixins.less';

.fault-shake-effect {
  .items-gap(bottom);
  text-align: center;

  .case {
    .fault-image {
      margin-left: auto;
      margin-right: auto;
    }
  }
}

.fault-text {
  position: relative;
  &::before {
    content: attr(data-text);
    position: absolute;
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
  width: .px(150)[];
  height: .px(150)[];
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
