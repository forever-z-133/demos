<script setup lang="ts">
import { CodeView } from '@/components'
import { ref } from 'vue'

defineOptions({
  title: 'CSS 的相对颜色语法',
  group: 'others',
})

const color = ref('')

const code_hover = `.button {
  --primary-color: #618dff;
  background-color: var(--primary-color);

  &:hover {
    /** 亮度 - 20 **/
    background-color: ~'hsl(from var(--primary-color) h s calc(l - 20))';
  }
}`

const code_border = `.border {
  --bg-color: var(--color, #2c87ff);
  background-color: var(--bg-color);
  /** 亮度若大于 60 则文字为黑色，反之为白色 **/
  color: hsl(from var(--bg-color) h s calc(calc(l - 60) * -999999));
  border-color: hsl(from var(--bg-color) h s calc(l - 20 * clamp(-1, calc(l - 50), 1)));
}`
</script>

<template>
  <div class="css-relative-color">
    <p class="block">
      比如红色 <code>red</code> 可以在 <code>rgba(from r g b / alpha)</code> 中分拆为四个值，然后对某个值进行单独处理。
    </p>
    <div class="case">
      <div class="box red" style="background-color: red;">
        red
      </div>
      <div class="box red-relative" style="background-color: rgb(from red 200 g b);">
        rgb(from red 200 g b)
      </div>
      <div class="box red-relative-2" style="background-color: rgba(from red r g b / .5);">
        rgba(from red r g b / .5);
      </div>
      <div class="box red-relative-3" style="background-color: rgba(from red calc(r / 2) g b / alpha);">
        rgba(from red calc(r / 2) g b / alpha)
      </div>
      <div class="box red-relative-4" style="background-color: hsl(from red h 50 l);">
        hsl(from red h 50 l)
      </div>
    </div>
    <p class="block">
      以下为实战案例 <input v-model="color" type="color" />
    </p>
    <div class="case">
      <div class="button" :style="{ '--color': color }">
        hover me
      </div>
      <div class="block">
        <CodeView :code="code_hover" lang="less" />
      </div>
    </div>
    <div class="case">
      <div class="border" :style="{ '--color': color }">
        border darker
      </div>
      <div class="block">
        <CodeView :code="code_border" lang="less" />
      </div>
    </div>
  </div>
</template>

<style lang="less">
@import "@/styles/mixins.less";

.css-relative-color {
  .items-gap(bottom);

  .case {
    display: flex;
    flex-direction: column;
    gap: .px(6)[];
  }

  .box {
    height: .px(50)[];
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .button {
    --primary-color: var(--color, #2c87ff);
    background-color: var(--primary-color);
    padding: .px(4)[] .px(10)[];
    cursor: pointer;

    &:hover {
      /** 亮度 - 20 **/
      background-color: ~'hsl(from var(--primary-color) h s calc(l - 20))';
    }
  }

  .border {
    --bg-color: var(--color, #2c87ff);
    background-color: var(--bg-color);
    padding: .px(4)[] .px(10)[];
    color: ~'hsl(from var(--bg-color) h s calc(calc(l - 60) * -999999))';
    border: .px(4)[] solid transparent;
    border-color: ~'hsl(from var(--bg-color) h s calc(l - 20 * clamp(-1, calc(l - 50), 1)))';
  }
}
</style>
