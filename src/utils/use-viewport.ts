import { ref } from 'vue'

/**
 * 监听视口尺寸变化
 */

const vw = ref(0)
const vh = ref(0)
function handleResize() {
  vw.value = document.documentElement.clientWidth
  vh.value = document.documentElement.clientHeight
}

handleResize()
window.addEventListener('resize', handleResize)

function useViewport() {
  return {
    vw,
    vh,
  }
}
export default useViewport
