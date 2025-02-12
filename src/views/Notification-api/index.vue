<script setup lang="ts">
import { CodeView } from '@/components'
import { ref } from 'vue'

defineOptions({
  title: '浏览器通知 Notification API',
  group: 'others',
})

const permission = ref(Notification.permission)

function handleStart() {
  permission.value = Notification.permission
  if (!('Notification' in window)) {
    alert('This browser does not support desktop notification')
    return
  }
  if (Notification.permission === 'granted') {
    const notification = new Notification('Hi there!', { body: 'body' })
    notification.onerror = console.log
    notification.onclick = console.log
    notification.onshow = console.log
    notification.onclose = console.log
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((...args) => {
      console.log(...args)
      handleStart()
    })
  }
}

const code = `function sendNotification() {
  if (!('Notification' in window)) {
    alert('This browser does not support desktop notification')
    return
  }
  if (Notification.permission === 'granted') {
    const notification = new Notification('Hi there!', { body: 'body' })
    notification.onshow = console.log
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(sendNotification)
  }
}`
</script>

<template>
  <div class="Notification-api">
    <p class="block">
      浏览器的 Notification API。但好像不生效了。
    </p>
    <p class="block">
      浏览器通知权限状态：{{ permission }}
    </p>
    <button class="btn" @click="handleStart">
      发起通知
    </button>
    <div class="block">
      <CodeView :code="code" lang="js" />
    </div>
  </div>
</template>

<style lang="less">
@import "@/styles/mixins.less";

.Notification-api {
  .items-gap(bottom);
}
</style>
