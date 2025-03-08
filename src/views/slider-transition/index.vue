<script setup lang="ts">
import { CodeView } from '@/components'
import { ref } from 'vue'
import SlideTransition from './biz/slide-transition.vue'
import TmpList from './biz/tmp-list.vue'

defineOptions({
  title: 'slider 动画效果',
  group: 'effect',
})

const visible1 = ref(false)
const visible2 = ref(false)
const visible3 = ref(false)

const code = `\<script setup lang="ts"\>
function handleBeforeEnter(_el: Element) {
  const el = _el as HTMLElement
  el.style.height = '0px'
}
function handleEnter(_el: Element) {
  const el = _el as HTMLElement
  el.style.height = 'auto'
  const h = el.clientHeight
  el.style.height = '0px'
  requestAnimationFrame(() => {
    el.style.height = \`\${h}px\`
    el.style.transition = \`height \${props.duration}\`
  })
}
function handleAfterEnter(_el: Element) {
  const el = _el as HTMLElement
  el.style.transition = ''
}
function handleLeave(_el: Element) {
  const el = _el as HTMLElement
  el.style.height = '0px'
  el.style.transition = \`height \${props.duration}\`
}
function handleAfterLeave(_el: Element) {
  const el = _el as HTMLElement
  el.style.transition = ''
}
\</script\>`
const code2 = `<template>
  <Transition
    @before-enter="handleBeforeEnter"
    @enter="handleEnter"
    @after-enter="handleAfterEnter"
    @leave="handleLeave"
    @after-leave="handleAfterLeave"
  >
    <slot />
  </Transition>
<template>`
</script>

<template>
  <div class="slider-transition">
    <div class="case">
      <p class="block">
        方法一、使用 max-height 固定值实现。缺点为实际高度与 max-height 有差异时收起动画会延迟。
      </p>
      <div class="">
        <button class="btn" @click="() => visible1 = !visible1">
          {{ visible1 ? '收起' : '展开' }}
        </button>
        <TmpList class="list1" :class="{ visible: visible1 }" />
      </div>
    </div>
    <div class="case">
      <p class="block">
        方法二、使用 scale 实现。缺点动画效果可能不符合需求，且元素占位有较大问题。
      </p>
      <div class="">
        <button class="btn" @click="() => visible2 = !visible2">
          {{ visible2 ? '收起' : '展开' }}
        </button>
        <TmpList class="list2" :class="{ visible: visible2 }" />
      </div>
    </div>
    <div class="case">
      <p class="block">
        方法三、计算高度用 FLIP 动画原理实现。
      </p>
      <div class="">
        <button class="btn" @click="() => visible3 = !visible3">
          {{ visible3 ? '收起' : '展开' }}
        </button>
        <SlideTransition duration=".5s">
          <TmpList v-if="visible3" class="list3" />
        </SlideTransition>
      </div>
      <div class="block">
        <CodeView :code="code2" />
      </div>
      <div class="block">
        <CodeView :code="code" style="max-height: 400px" />
      </div>
    </div>
  </div>
</template>

<style lang="less">
@import "@/styles/mixins.less";

.slider-transition {
  .items-gap(bottom);

  .case {
    padding-bottom: .px(12)[];
    border-bottom: 1px solid #ddd;
  }

  .list1 {
    max-height: 0;
    transition: max-height .5s;
    &.visible {
      max-height: 40vh;
    }
  }

  .list2 {
    position: absolute;
    left: -9999em;
    transform-origin: top center;
    transform: scaleY(0);
    transition: transform .5s;
    &.visible {
      position: relative;
      left: unset;
      transform: scaleY(1);
    }
  }
}
</style>
