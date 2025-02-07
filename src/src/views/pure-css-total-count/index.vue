<script setup lang="ts">
defineOptions({
  title: '纯 CSS 实现 checkbox 勾选总数统计',
  group: 'others',
})

const code = `.wrapper {
  counter-reset: name;
}
[type="checkbox"]:checked {
  counter-increment: name;
}
.output::after {
  content: counter(name);
}
`
</script>

<template>
  <div class="pure-css-total-count">
    <p class="block">
      利用 CSS 的 <code>counter()</code> 特性实现 <code>checkbox</code> 的勾选总数统计。
    </p>
    <div class="block">
      <pre><code>{{ code }}</code></pre>
    </div>
    <div class="checkbox-list">
      <template v-for="i in 4" :key="i">
        <label class="item">
          <input type="checkbox" />
          <span class="label">选项{{ i }}</span>
        </label>
      </template>
    </div>
    <div class="output">
      已勾选数量：
    </div>
  </div>
</template>

<style lang="less">
@import "@/styles/mixins.less";

.pure-css-total-count {
  .items-gap(bottom);
  counter-reset: counter;

  .checkbox-list {
    display: flex;
    align-items: center;
    gap: .px(10)[];

    [type="checkbox"] {
      position: absolute;
      left: -9999px;

      &:checked {
        counter-increment: counter;
      }

      &:checked + .label {
        background-color: rgba(255, 255, 0, 1);
      }
    }

    .label {
      padding: .px(4)[] .px(12)[];
      border: 1px solid #e9e9e9;
      font-size: .px(12)[];
      border-radius: .px(4)[];
      cursor: pointer;

      &:hover {
        background-color: #f9f9f9;
      }
    }
  }

  .output:after {
    content: counter(counter);
  }
}
</style>
