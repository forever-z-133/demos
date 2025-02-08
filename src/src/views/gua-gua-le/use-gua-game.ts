/**
 * 刮刮乐
 */

interface Props {
  onEnd?: () => void
}

function useGuaGame(props?: Props) {
  const {
    onEnd = () => {},
  } = props || {}

  let canvas: HTMLCanvasElement
  let ctx: CanvasRenderingContext2D

  // 画布所在视图中位置
  let offset = { left: 0, top: 0 }

  function initial(_canvas: HTMLCanvasElement, _ctx: CanvasRenderingContext2D) {
    canvas = _canvas
    ctx = _ctx

    reset()
  }

  // 开始滑动
  function handleTouchStart(pos: { x: number, y: number }) {
    const rect = canvas.getBoundingClientRect()
    const x = pos.x - rect.left
    const y = pos.y - rect.top
    offset = { left: rect.left, top: rect.top }
    ctx.moveTo(x, y)
    ctx.globalCompositeOperation = 'destination-out'
  }

  // 滑动中
  function handleTouchMove(pos: { x: number, y: number }) {
    const { left = 0, top = 0 } = offset
    const x = pos.x - left
    const y = pos.y - top
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  // 滑动结束
  function handleTouchEnd() {
    ctx.globalCompositeOperation = 'source-over'
    onEnd()
  }

  // 获取刮刮乐透明范围比例
  function getTransparentPercent() {
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    if (!imgData) return 0
    const { data } = imgData
    let total = 0
    for (let i = 0; i < data.length; i += 4) {
      const alpha = data[i + 3]
      if (alpha < 100) total += 4
    }
    return total / data.length * 100
  }

  function reset() {
    ctx.reset()

    ctx.fillStyle = 'black'
    ctx.lineWidth = 10
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'
    ctx.globalCompositeOperation = 'source-over'

    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  return {
    initial,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    getTransparentPercent,
    reset,
  }
}
export default useGuaGame
