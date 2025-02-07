<script setup lang="ts">
defineOptions({
  title: '多层级的数字 list-style 效果',
  group: 'effect',
})

const code = `ul {
  counter-reset: name;
}
li::before {
  content: counter(name, '-') '. ';
  counter-increment: name;
}`
</script>

<template>
  <div class="pure-css-number-list-style">
    <p class="block">
      使用 CSS 的 <code>counter()</code> 特性，实现多层级的数字 <code>list-style</code> 效果。
    </p>
    <div class="block">
      <pre><code>{{ code }}</code></pre>
    </div>
    <div class="case">
      <ul>
        <li>
          <span>我是王小二</span>
          <ul>
            <li><span>我是王小二的大儿子</span></li>
            <li>
              <span>我是王小二的二儿子</span>
              <ul>
                <li><span>我是王小二的二儿子的大孙子</span></li>
                <li><span>我是王小二的二儿子的二孙子</span></li>
                <li><span>我是王小二的二儿子的小孙子</span></li>
              </ul>
            </li>
            <li><span>我是王小二的三儿子</span></li>
          </ul>
        </li>
        <li><span>我是王小三</span></li>
        <li>
          <span>我是王小四</span>
          <ul>
            <li><span>我是王小四的大儿子</span></li>
          </ul>
        </li>
      </ul>
    </div>
    <p class="block">
      备注：若使用了 <code>display: flex</code> 和 <code>order</code> 来改变 <code>li</code> 顺序，但不会影响计数顺序。
    </p>
  </div>
</template>

<style lang="less">
@import "@/styles/mixins.less";

.pure-css-number-list-style {
  .items-gap(bottom);

  .case {
    padding: .px(10)[] 0;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
  }

  ul {
    counter-reset: counter;
    margin: 0 0;
    padding-left: 0;
  }
  li {
    list-style: none;

    & li {
      padding-left: .px(20)[];
    }

    &::before {
      content: counters(counter, '-') '. ';
      counter-increment: counter;
      color: blue;
    }
  }
}
</style>
