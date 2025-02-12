<script setup lang="ts">
import { CodeView } from '@/components'
import { addZero } from '@/utils'
import InfiniteMarquee from './InfiniteMarquee.vue'

defineOptions({
  title: '纯 CSS 实现无限滚动',
  group: 'effect',
})

const colors = ['pink', 'lightgray', 'lightblue', 'lightgreen', 'lightcyan']
const numbers = Array.from({ length: 10 }, (_, i) => `100000000${addZero(i + 1)}`)

const code = `<template>
  <div class="infinite-marquee">
    <div class="wrapper">
      <slot />
    </div>
    <div class="wrapper" aria-hidden>
      <slot />
    </div>
  </div>
<template>

<style lang="less">
.infinite-marquee {
  display: flex;
  --animation-duration: 10s;

  & > .wrapper {
    flex-shrink: 0;
    display: flex;
    animation: scrolling var(--animation-duration) linear infinite;
  }
}

@keyframes scrolling {
  to { transform: translateX(-100%); }
}
</style>
`
</script>

<template>
  <div class="pure-css-infinite-marquee">
    <p class="block">
      纯 CSS 实现无限滚动。靠拷贝一份子元素，完成前后尾的拼接，然后进行 <code>transform: translateX(-100%)</code> 的动画即可。
    </p>
    <p class="block">
      注意：动画时长应当随子元素宽度而变化，需动态计算。
    </p>
    <div class="case">
      <InfiniteMarquee>
        <template v-for="(color, index) in colors" :key="color">
          <div class="card" :style="{ background: color }">
            {{ index }}
          </div>
        </template>
      </InfiniteMarquee>
    </div>
    <div class="case">
      <InfiniteMarquee>
        <template v-for="num in numbers" :key="num">
          <span class="number">{{ num }}</span>
        </template>
      </InfiniteMarquee>
    </div>
    <div class="block">
      <CodeView :code="code" />
    </div>
  </div>
</template>

<style lang="less">
@import "@/styles/mixins.less";

.pure-css-infinite-marquee {
  .items-gap(bottom);

  .card {
    width: .px(100)[];
    height: .px(100)[];
    margin-right: .px(10)[];
  }

  .number {
    margin-right: .px(10)[];
  }
}
</style>
