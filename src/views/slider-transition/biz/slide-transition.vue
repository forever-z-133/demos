<script setup lang="ts">
interface Props {
  duration?: string
}
const props = withDefaults(defineProps<Props>(), {
  duration: '0.3s',
})

function handleBeforeEnter(_el: Element) {
  const el = _el as HTMLElement
  el.style.height = '0px'
}
function handleEnter(_el: Element) {
  const el = _el as HTMLElement
  el.style.height = 'auto'
  const h = el.clientHeight
  el.style.height = '0px'
  requestAnimationFrame(() => {
    el.style.height = `${h}px`
    el.style.transition = `height ${props.duration}`
  })
}
function handleAfterEnter(_el: Element) {
  const el = _el as HTMLElement
  el.style.transition = ''
}
function handleLeave(_el: Element) {
  const el = _el as HTMLElement
  el.style.height = `0px`
  el.style.transition = `height ${props.duration}`
}
function handleAfterLeave(_el: Element) {
  const el = _el as HTMLElement
  el.style.transition = ''
}
</script>

<template>
  <Transition @before-enter="handleBeforeEnter" @enter="handleEnter" @after-enter="handleAfterEnter" @leave="handleLeave" @after-leave="handleAfterLeave">
    <slot />
  </Transition>
</template>
