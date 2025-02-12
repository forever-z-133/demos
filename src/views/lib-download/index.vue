<script setup lang="ts">
import { CodeView } from '@/components'
import download from 'downloadjs' // 代码库极小，无需分包引入

defineOptions({
  title: '下载方面的知识整理',
  group: 'others',
  layout: 'pure',
})

const code = `import download from 'downloadjs' // 代码库极小，无需分包引入

download('hello world', 'hello.txt')

download('https://xx/favicon.png')

fetch('https://api/xx')
  .then(res => res.blob())
  .then(blob => download(blob))
`

function handleText() {
  const data = 'hello world'
  const fileName = 'hello.txt'
  download(data, fileName)
}

function handleUrl() {
  const basePath = location.origin + location.pathname
  const data = `${basePath}favicon.png`
  download(data)
}

function handleFetch() {
  const basePath = location.origin + location.pathname
  const data = `${basePath}favicon.png`
  fetch(data)
    .then(res => res.blob())
    .then(blob => download(blob))
}
</script>

<template>
  <div class="lib-download">
    <div class="block">
      下载一般如下有两种：
      <ul>
        <li>方式一：直接 <code>window.open</code> 打开链接，使用浏览器下载</li>
        <li>方式二：前端请求数据流，然后利用 <code>a[download]</code> 下载</li>
      </ul>
      按照不同需求，你可能会需要进行抉择，主要是以下方面的考虑：
      <ul>
        <li>是否为 GET 请求，比如方式一只支持 GET 请求</li>
        <li>文件名称问题，比如方式二要靠读取 <code>headers['content-disposition']</code> 请求头然后前端定义 <code>a[download]</code></li>
        <li>进度展示问题，比如方式二才可设置 <code>onprogress</code> 回调，或显示下载结束</li>
        <li>大文件耗时长问题，比如方式二加载过久还看不到进度会体验不佳</li>
        <li>资源报错展示问题，比如方式一的报错由后端控制，方式二由前端控制</li>
        <li>资源安全性问题，比如方式一靠 cookies 或链接中加临时密钥，方式二靠接口回调时判断 <code>headers['content-type']</code> 类型</li>
      </ul>
    </div>
    <p class="block">
      针对方式二，前端自写的 <code>a[download]</code> 可能会遇到下载不完全，或类型难判断，等问题。所以可引入工具库 <code>npm i downloadjs</code>
    </p>
    <div class="block">
      <CodeView :code="code" lang="js" />
    </div>
    <div class="case">
      <button class="btn" @click="handleText">
        下载文本
      </button>
      <button class="btn" @click="handleUrl">
        下载链接
      </button>
      <button class="btn" @click="handleFetch">
        下载接口
      </button>
    </div>
  </div>
</template>

<style lang="less">
@import "@/styles/mixins.less";

.lib-download {
  .items-gap(bottom);

  .case {
    display: flex;
    gap: .px(10)[];
  }
}
</style>
