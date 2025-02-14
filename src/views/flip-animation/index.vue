<script setup lang="ts">
import Complex from './examples/complex.vue'
import Official from './examples/official.vue'
import Simple from './examples/simple.vue'

defineOptions({
  title: 'Flip Animation 实战',
  group: 'effect',
})
</script>

<template>
  <div class="flip-animation">
    <p class="block">
      FLIP 动画是一种动画实现思路，即获取起始时样式(First)和结束时样式(Last)，计算变化量(Invert)后播放(Play)。可以让开发不用关心过程，直接套壳即可拥有过渡动画。
    </p>
    <div class="case">
      <Official />
    </div>
    <div class="case">
      <Simple />
    </div>
    <div class="case">
      <Complex />
    </div>
  </div>
</template>

<style lang="less">
@import "@/styles/mixins.less";

.flip-animation {
  .items-gap(bottom);

  .case {
    padding-bottom: .px(10)[];
    border-bottom: 1px solid #e5e5e5;

    .header {
      margin-bottom: .px(8)[];
    }
  }
}
</style>
