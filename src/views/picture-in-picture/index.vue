<script setup lang="ts">
import { CodeView } from '@/components'
import { onMounted, useTemplateRef } from 'vue'

defineOptions({
  title: '浏览器原生画中画功能 PIP',
  group: 'others',
  layout: 'pure',
})

const pipContent = useTemplateRef('pipContent')

onMounted(() => {
  // 检查是否支持 PiP 功能
  if ('documentPictureInPicture' in window) {
    console.log('🚀 浏览器支持 PiP 功能！')
  } else {
    alert('⚠️ 当前浏览器不支持 PiP 功能，更新浏览器或者换台电脑吧！')
  }
})

interface RequestWindowOptions {
  disallowReturnToOpener?: boolean
  height?: number
  width?: number
  preferInitialWindowPlacement?: boolean
}
declare global {
  interface Window {
    documentPictureInPicture: {
      window: Window | null
      requestWindow: (options?: RequestWindowOptions) => Promise<Window>
    }
  }
}

// 打开画中画
async function handleOpenPip() {
  if (!pipContent.value) return

  const exist = window.documentPictureInPicture.window
  if (exist) return

  // 打开画中画
  const pipWindow = await createPipWindow()
  const dom = pipContent.value.cloneNode(true) as HTMLElement
  dom.classList.add('pip-mode')
  dom.querySelector('button')!.addEventListener('click', () => {
    pipWindow.close()
  })
  pipWindow.document.body.appendChild(dom)
}

async function createPipWindow() {
  // 请求创建一个 PiP 窗口
  const pipWindow = await window.documentPictureInPicture.requestWindow({
    width: 200, // 设置窗口的宽度
    height: 300, // 设置窗口的高度
  });

  // 设置 PiP 样式同步
  [...document.styleSheets].forEach((styleSheet) => {
    try {
      const cssRules = [...styleSheet.cssRules].map(rule => rule.cssText).join('')
      const style = document.createElement('style')
      style.textContent = cssRules
      pipWindow.document.head.appendChild(style)
    } catch (e: any) {
      console.log(e.message)
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.type = styleSheet.type
      link.media = styleSheet.media as unknown as string
      link.href = styleSheet.href ?? ''
      pipWindow.document.head.appendChild(link)
    }
  })

  pipWindow.addEventListener('enter', () => {
    console.log('已进入 PIP 窗口')
  })
  pipWindow.addEventListener('pagehide', () => {
    console.log('已退出 PIP 窗口')
  })
  pipWindow.addEventListener('focus', () => {
    console.log('PiP 窗口进入了焦点状态')
  })
  pipWindow.addEventListener('blur', () => {
    console.log('PiP 窗口失去了焦点')
  })

  return pipWindow
}

const code = `const pipContent = document.querySelector('.pipContent')

// 请求创建一个 PiP 窗口
const pipWindow = await window.documentPictureInPicture.requestWindow({
  width: 200,
  height: 300,
})

// 将原始元素克隆并添加到 PiP 窗口中
pipWindow.document.body.appendChild(pipContent.cloneNode(true));

// 设置 PiP 样式同步，当然这块可以用其他方式实现样式的注入
[...document.styleSheets].forEach((styleSheet) => {
  try {
    const cssRules = [...styleSheet.cssRules].map(rule => rule.cssText).join('')
    const style = document.createElement('style')
    style.textContent = cssRules
    pipWindow.document.head.appendChild(style)
  } catch (e: any) {
    console.log(e.message)
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.type = styleSheet.type
    link.media = styleSheet.media as unknown as string
    link.href = styleSheet.href ?? ''
    pipWindow.document.head.appendChild(link)
  }
})

pipWindow.addEventListener("enter", (event) => {
  console.log("已进入 PIP 窗口");
})

// 关闭 PiP 窗口
pipWindow.close()`

function handleTemp() {
  alert('xxx')
}
</script>

<template>
  <div class="picture-in-picture">
    <p class="block">
      视频网站/直播中比较常见，悬浮窗/画中画的功能，浏览器原生提供了实现。
    </p>
    <p class="block">
      相比传统实现，原生 <code>documentPictureInPicture</code> 的弹窗完全脱离浏览器视图，也完全代码隔离需要重新赋予样式和脚本。单个浏览器中无法打开多个画中画
    </p>
    <div class="case">
      <div ref="pipContent" class="pipContent" @click="handleTemp">
        这是一个将要放入画中画的 div 元素！
        <button>
          画中画时才显示，点我关闭
        </button>
      </div>
      <button @click="handleOpenPip">
        切换画中画
      </button>
    </div>
    <div class="block">
      <CodeView :code="code" />
    </div>
  </div>
</template>

<style lang="less">
@import "@/styles/mixins.less";

.picture-in-picture {
  .items-gap(bottom);
}

.pipContent {
  padding: .px(4)[] 0;
  border-bottom: 1px solid #ddd;
  margin-bottom: .px(10)[];
  color: pink;

  &:not(.pip-mode) {
    button {
      display: none;
    }
  }

  &.pip-mode {
    padding: .px(4)[] .px(10)[];
  }
}
</style>
