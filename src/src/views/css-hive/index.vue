<script setup lang="ts">
defineOptions({
  title: '蜂巢(正六边形)样式',
  group: 'effect',
})

const code = `.hive {
  --sqrt-3: 1.7320508075688772; /*根号3*/
  --width: 100px; /*注意蜂巢的宽高不同*/
  --hive-background: pink;
  --border-color: gray;
  --border-width: 8px;

  background-color: var(--hive-background);
  width: var(--width);
  height: calc(var(--width) / var(--sqrt-3) * 2);
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);

  &.border {
    position: relative;
    background-color: var(--border-color);
    padding: var(--border-width);

    &::before {
      content: '';
      position: absolute;
      inset: var(--border-width);
      clip-path: inherit;
      background: var(--hive-background);
    }

    & > .content {
      position: relative;
      z-index: 0;
      height: 100%;
    }
  }

  &.vertical {
    width: calc(var(--width) / var(--sqrt-3) * 2);
    height: var(--width);
    clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
  }
}`

function handleClick() {
  console.log('click')
}
</script>

<template>
  <div class="css-hive">
    <p class="block">
      使用 CSS 的 <code>clip-path</code> 实现蜂巢（正六边形）样式，且点击区域与形状一致。但边框效果需靠伪元素实现，另外内部文本有裁剪问题。
    </p>
    <div class="case">
      <div class="hive-item" @click="handleClick">
        <div class="content">
          文字文字文字文字
        </div>
      </div>
      <div class="hive-item border" @click="handleClick">
        <div class="content">
          文字文字文字文字
        </div>
      </div>
    </div>
    <div class="case">
      <div class="hive-item vertical" @click="handleClick">
        <div class="content">
          横向的
        </div>
      </div>
      <div class="hive-item vertical border" @click="handleClick">
        <div class="content">
          横向的
        </div>
      </div>
    </div>
    <div class="block">
      <pre><code>{{ code }}</code></pre>
    </div>
    <p class="block">
      备注：<code>shape-outside: polygon()</code> 对本身无效，其他元素在 <code>float</code> 时才会按此形状环绕。
    </p>
  </div>
</template>

<style lang="less">
@import "@/styles/mixins.less";

.css-hive {
  .items-gap(bottom);

  .case {
    display: flex;
    gap: .px(12)[];
  }

  .hive-item {
    --hive-background: pink;
    --sqrt-3: 1.7320508075688772;
    --width: .px(100)[];
    --border-color: gray;
    --border-width: .px(8)[];
    width: var(--width);
    height: calc(var(--width) / var(--sqrt-3) * 2);
    background-color: var(--hive-background);
    // 路径生产可用：https://techbrood.com/tool?p=css-clip-path
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    text-align: center;
    cursor: pointer;

    &.vertical {
      width: calc(var(--width) / var(--sqrt-3) * 2);
      height: var(--width);
      clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
    }

    &.border {
      position: relative;
      background-color: var(--border-color);
      padding: var(--border-width);

      &::before {
        content: '';
        position: absolute;
        inset: var(--border-width);
        clip-path: inherit;
        background: var(--hive-background);
      }

      & > .content {
        position: relative;
        z-index: 0;
        height: 100%;
      }
    }
  }
}
</style>
