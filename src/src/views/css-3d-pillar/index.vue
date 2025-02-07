<script setup lang="ts">
defineOptions({
  title: 'CSS 实现 3D 桶状效果',
  group: 'effect',
})

const list = ['red', 'grey', 'blue', 'green', 'yellow', 'pink', 'lightblue', 'lightgreen']

const code = `.pillar-container {
  transform-style: preserve-3d;
  transform: rotateX(-5deg);
}
.pillar-list {
  transform-style: preserve-3d;
  animation: rotate 5s linear infinite;
}
@length: 8;
.item {
  each(range(@length), {
    @deg: (360deg / @length * @value);
    @r: (460px / (2 * sin((pi() * (@length - 2)) / (2 * @length))));
    &:nth-child(@{value}) {
      transform: rotateY(@deg) translateZ(@r);
    }
  })
}
@keyframes rotate {
  to { transform: rotateY(360deg); }
}
`
</script>

<template>
  <div class="css-3d-pillar">
    <p class="block">
      使用 CSS 的 <code>preserve-3d</code> 和 <code>transform</code> 实现 3D 桶状效果
    </p>
    <div class="block">
      <pre><code>{{ code }}</code></pre>
    </div>
    <div class="case">
      <div class="pillar-container">
        <div class="pillar-list">
          <template v-for="item in list" :key="item">
            <div class="item">
              <div class="content" :style="{ background: item }" />
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
@import "@/styles/mixins.less";

.css-3d-pillar {
  .items-gap(bottom);

  .pillar-container {
    width: 100%;
    height: 300px;
    transform-style: preserve-3d;
    transform: rotateX(-5deg);

    .pillar-list {
      height: 100%;
      transform-style: preserve-3d;
      animation: rotate 5s linear infinite;
    }

    @length: 8;
    .item {
      each(range(@length), {
        @deg: (360deg / @length * @value);
        @r: (460px / (2 * sin((pi() * (@length - 2)) / (2 * @length)))); /** TODO: 此处值还有问题，无法对其 **/
        &:nth-child(@{value}) {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 200px;
          height: 200px;
          margin: -100px 0 0 -100px;
          backface-visibility: visible;
          transform: rotateY(@deg) translateZ(@r);
        }
      });
    }

    .content {
      width: 100%;
      height: 100%;
    }
  }
}

@keyframes rotate {
  to { transform: rotateY(360deg); }
}
</style>
