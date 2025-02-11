import type { Ref } from 'vue'
import { onMounted } from 'vue'

/**
 * 获取 canvas 和 context 实例
 */

interface Props {
  // 当传入 wrapperRef 时，canvas 尺寸与其一致
  wrapperRef?: Ref<HTMLElement | null>
  // 当未传入 wrapperRef 时，canvas 尺寸由 width height 传入之决定
  width?: number
  height?: number
  // 透传给 getContext('2d', contextProps) 的参数
  contextProps?: CanvasRenderingContext2DSettings
  // 画布初始化完成回调
  onReady?: (_canvas: HTMLCanvasElement, _ctx: CanvasRenderingContext2D) => void
}

function useCanvas(canvasRef: Ref<HTMLCanvasElement | null>, props?: Props) {
  const {
    wrapperRef,
    contextProps,
    width: customWidth,
    height: customHeight,
    onReady = () => {},
  } = props || {}

  let canvas: HTMLCanvasElement
  let ctx: CanvasRenderingContext2D

  // 初始化画布
  onMounted(() => {
    if (!canvasRef.value) return
    canvas = canvasRef.value

    const context = canvas.getContext('2d', contextProps)
    if (!context) return
    ctx = context

    if (wrapperRef && wrapperRef.value) {
      const rect = wrapperRef.value.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    } else {
      canvas.width = customWidth || 300
      canvas.height = customHeight || 200
    }

    onReady(canvas, ctx)
  })

  return {}
}
export default useCanvas
