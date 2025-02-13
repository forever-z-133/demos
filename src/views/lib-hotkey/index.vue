<script setup lang="ts">
import { CodeView } from '@/components'
import Mousetrap from 'mousetrap' // 代码库极小，无需分包引入
import { onMounted, onUnmounted, ref } from 'vue'

defineOptions({
  title: '快捷键方面的知识整理',
  group: 'others',
  layout: 'pure',
})

const mousetrap = new Mousetrap()
const input = ref('command+d')
const now = ref(input.value)
const trigger = ref(false)

onMounted(() => {
  mousetrap.bind(input.value, handleTrigger)
})
onUnmounted(() => {
  mousetrap.reset()
})

function handleBind() {
  mousetrap.reset()
  now.value = input.value
  mousetrap.bind(input.value, handleTrigger)
}

let timer: number
function handleTrigger(e: KeyboardEvent) {
  e.preventDefault()
  trigger.value = true
  clearTimeout(timer)
  timer = setTimeout(() => {
    trigger.value = false
  }, 300)
}

const code = `import Mousetrap from 'mousetrap' // 代码库极小，无需分包引入

const mousetrap = new Mousetrap()

mousetrap.bind('esc', () => {}, '取消操作')
mousetrap.unbind('esc')
mousetrap.bind(['command+k', 'ctrl+k'], console.log)
mousetrap.trigger('ctrl+k')
mousetrap.reset()
`
</script>

<template>
  <div class="lib-hotkey">
    <p class="block">
      监听键盘操作，绑定快捷键，且支持按键组合，可使用工具库 <code>npm i mousetrap</code>。
    </p>
    <p class="block">
      注意：激活输入框状态时快捷键不生效
    </p>
    <div class="block">
      <CodeView :code="code" />
    </div>
    <div class="case">
      请输入快捷键(组合按键用+号连接)：
      <div class="input-wrapper">
        <input v-model="input" />
        <button class="btn" @click="handleBind">
          启用快捷键
        </button>
      </div>
      <div class="result">
        快捷键 {{ now }} 触发状态：{{ trigger ? '已触发' : '未触发' }}
      </div>
    </div>
  </div>
</template>

<style lang="less">
@import "@/styles/mixins.less";

.lib-hotkey {
  .items-gap(bottom);

  .input-wrapper {
    display: flex;
    align-items: center;
    gap: .px(10)[];
  }
}
</style>
