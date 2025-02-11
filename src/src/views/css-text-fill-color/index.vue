<script setup lang="ts">
defineOptions({
  title: 'CSS 的 text-fill-color 属性',
  group: 'others',
})
</script>

<template>
  <div class="css-text-fill-color">
    <p class="block">
      使用 CSS 的 <code>text-fill-color: transparent;</code> 和 <code>background-clip: text;</code> 属性，使文字显示为背景的颜色或图片。但仅 <code>-webkit-</code> 浏览器适用。
    </p>
    <template v-for="i in 3" :key="i">
      <div class="case">
        <div class="text-style" :class="[`item-${i}`]">
          Gaperiam nemo saepe sunt enim, perferendis aut numquam est doloremque tempora molestias in vero? Eius animi odit earum, fugit optio.
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="less">
@import "@/styles/mixins.less";

.css-text-fill-color {
  .items-gap(bottom);

  .case {
    border-top: .px(2)[] solid #eee;
    padding-top: .px(16)[];
  }
  .text-style {
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-fill-color: transparent;
    line-height: 1.4em;
    font-weight: bold;

    &.item-1 {
      background-image: linear-gradient(currentColor, rgba(255, 255, 255, 0));
    }

    &.item-2 {
      background-image: linear-gradient(#9588DD, #9588DD),
                        linear-gradient(#DD88C8, #DD88C8),
                        linear-gradient(#D3DD88, #D3DD88),
                        linear-gradient(#88B0DD, #88B0DD);
      background-size: 100% 1.4em, 100% 2.8em, 100% 4.2em, 100% 5.6em;
      background-repeat: no-repeat;
    }

    &.item-3 {
      background-image: url(@/assets/image.png);
      background-size: 30% 100%;
    }
  }
}
</style>
