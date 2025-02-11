import type { Ref } from 'vue'
import { getTouchPosition } from '@/utils'
import { onMounted, onUnmounted } from 'vue'

/**
 * 按住拖动的交互代码
 */

interface Props {
  onStart: (pos: { x: number, y: number }) => void
  onMove: (pos: { x: number, y: number }) => void
  onEnd: () => void
}
function useTouchMove(domRef: Ref, props?: Props) {
  const {
    onStart = () => undefined,
    onMove = () => undefined,
    onEnd = () => undefined,
  } = props || {}
  let down = false

  onMounted(() => {
    if (!domRef.value) return
    domRef.value.addEventListener('touchstart', handleStart)
    domRef.value.addEventListener('mousedown', handleStart)
    window.addEventListener('touchmove', handleMove)
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('touchend', handleEnd)
    window.addEventListener('mouseup', handleEnd)
    domRef.value.addEventListener('touchcancel', handleEnd)
  })
  onUnmounted(() => {
    if (!domRef.value) return
    domRef.value.removeEventListener('touchstart', handleStart)
    domRef.value.removeEventListener('mousedown', handleStart)
    window.removeEventListener('touchmove', handleMove)
    window.removeEventListener('mousemove', handleMove)
    window.removeEventListener('touchend', handleEnd)
    window.removeEventListener('mouseup', handleEnd)
    domRef.value.removeEventListener('touchcancel', handleEnd)
  })

  function handleStart(e: MouseEvent | TouchEvent) {
    if (e instanceof MouseEvent && e.button !== 0) return
    down = true
    const pos = getTouchPosition(e)
    onStart(pos[0])
  }

  function handleMove(e: MouseEvent | TouchEvent) {
    if (!down) return
    const pos = getTouchPosition(e)
    onMove(pos[0])
  }

  function handleEnd() {
    if (down) onEnd()
    down = false
  }
}
export default useTouchMove
