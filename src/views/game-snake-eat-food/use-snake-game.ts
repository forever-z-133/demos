/**
 * 贪吃蛇游戏
 */

interface Props {
  onScore?: (score: number) => void
  onGameOver?: (score: number) => void
}

function useSnakeGame(props?: Props) {
  const {
    onScore = (_score: number) => {},
    onGameOver = (_score: number) => {},
  } = props || {}

  let canvas: HTMLCanvasElement
  let ctx: CanvasRenderingContext2D

  // 定义网格大小和格子数量
  const gridSize = 10 // 每个格子的大小（像素）
  let tileCount = 50 // 每行/列的格子数

  // 初始化蛇的位置（数组表示身体每一节）
  let snake = [
    { x: 10, y: 10 }, // 蛇头
  ]

  // 食物位置
  let food = { x: 15, y: 15 }

  // 初始方向（向右）
  let dx = 1 // x方向移动速度
  let dy = 0 // y方向移动速度

  // 得分
  let score = 0

  // 定时器
  let timer: number

  function initial(_canvas: HTMLCanvasElement, _ctx: CanvasRenderingContext2D) {
    canvas = _canvas
    ctx = _ctx
    reset()
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // 绘制蛇
    ctx.fillStyle = 'green'
    snake.forEach((segment) => {
      ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2)
    })

    // 绘制食物
    ctx.fillStyle = 'red'
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2)
  }

  function moveSnake() {
    // 创建新蛇头
    const head = { x: snake[0].x + dx, y: snake[0].y + dy }

    // 检查是否吃到食物
    if (head.x === food.x && head.y === food.y) {
      score += 10
      food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount),
      }
      onScore(score)
    } else {
    // 没吃到食物时移除蛇尾
      snake.pop()
    }

    // 添加新蛇头
    snake.unshift(head)
  }

  function handleKeyDown(e: KeyboardEvent) {
    switch (e.code) {
      case 'ArrowUp':
        if (dy !== 1) {
          dx = 0
          dy = -1
        } // 防止反向移动
        break
      case 'ArrowDown':
        if (dy !== -1) {
          dx = 0
          dy = 1
        }
        break
      case 'ArrowLeft':
        if (dx !== 1) {
          dx = -1
          dy = 0
        }
        break
      case 'ArrowRight':
        if (dx !== -1) {
          dx = 1
          dy = 0
        }
        break
    }
  }

  function reset() {
    tileCount = canvas.width / gridSize
    snake = [{ x: 10, y: 10 }]
    food = { x: 15, y: 15 }
    dx = 1
    dy = 0
    score = 0

    draw()
  }

  function gameLoop() {
    moveSnake()

    // 碰撞检测（撞墙或自己）
    const head = snake[0]
    if (
      head.x < 0 || head.x >= tileCount
      || head.y < 0 || head.y >= tileCount
      || snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    ) {
      onGameOver(score)
      return
    }

    draw()
    clearTimeout(timer)
    timer = window.setTimeout(gameLoop, 100) // 每100毫秒更新一次（可调整速度）
  }

  return {
    initial,
    gameLoop,
    handleKeyDown,
    reset,
  }
}
export default useSnakeGame
