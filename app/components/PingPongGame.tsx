'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { FaArrowLeft, FaPause, FaPlay } from 'react-icons/fa'

interface PingPongGameProps {
  mode: 'bot' | 'offline' | 'friend' | 'tournament'
  botDifficulty?: 'easy' | 'medium' | 'hard'
  onBackToMenu: () => void
}

interface GameState {
  ball: {
    x: number
    y: number
    dx: number
    dy: number
    speed: number
  }
  paddles: {
    left: { y: number, speed: number }
    right: { y: number, speed: number }
  }
  score: {
    left: number
    right: number
  }
  gameRunning: boolean
  gameStarted: boolean
  countdown: number
  winner: 'left' | 'right' | null
  baseSpeed: number
}

const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 400
const PADDLE_WIDTH = 10
const PADDLE_HEIGHT = 80
const BALL_SIZE = 12
const WINNING_SCORE = 11

const PingPongGame: React.FC<PingPongGameProps> = ({ 
  mode, 
  botDifficulty = 'medium', 
  onBackToMenu 
}) => {
  const { theme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const keysRef = useRef<{ [key: string]: boolean }>({})
  const mouseYRef = useRef<number>(CANVAS_HEIGHT / 2)
  const [isPaused, setIsPaused] = useState(false)
  const [gameState, setGameState] = useState<GameState>({
    ball: {
      x: CANVAS_WIDTH / 2 - BALL_SIZE / 2,
      y: CANVAS_HEIGHT / 2 - BALL_SIZE / 2,
      dx: 0,
      dy: 0,
      speed: 3
    },    paddles: {
      left: { y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2, speed: 1 },
      right: { y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2, speed: 1 }
    },score: { left: 0, right: 0 },
    gameRunning: false,
    gameStarted: false,    countdown: 3,
    winner: null,    baseSpeed: 0.8  /* Slower starting speed */
  })
    /* Calculate speed increment based on total goals - increase by 0.2 every 6 goals (much slower progression) */
  const getCurrentSpeed = useCallback((totalGoals: number, baseSpeed: number) => {
    const speedIncrement = Math.floor(totalGoals / 6) * 0.2
    return Math.min(baseSpeed + speedIncrement, 4) /* Cap at maximum speed of 4 */
  }, [])
  /* Reset ball position and direction with random angle (±45 degrees) */
  const resetBall = useCallback(() => {
    const direction = Math.random() > 0.5 ? 1 : -1
    const angle = (Math.random() - 0.5) * Math.PI / 4
    
    setGameState(prev => {
      const totalGoals = prev.score.left + prev.score.right
      const currentSpeed = getCurrentSpeed(totalGoals, prev.baseSpeed)
      
      return {
        ...prev,
        ball: {
          x: CANVAS_WIDTH / 2 - BALL_SIZE / 2,
          y: CANVAS_HEIGHT / 2 - BALL_SIZE / 2,
          dx: Math.cos(angle) * currentSpeed * direction,
          dy: Math.sin(angle) * currentSpeed,
          speed: currentSpeed
        }
      }
    })  }, [getCurrentSpeed])  /* Get bot speed based on difficulty level */
  const getBotSpeed = () => {
    switch (botDifficulty) {
      case 'easy': return 1.2  /* Much slower for easy mode */
      case 'medium': return 2.5
      case 'hard': return 4
      default: return 2.5
    }
  }  /* Get bot reaction rate based on difficulty level */
  const getBotReaction = () => {
    switch (botDifficulty) {
      case 'easy': return 0.15  /* Much lower reaction rate for easy mode */
      case 'medium': return 0.5
      case 'hard': return 0.75
      default: return 0.5
    }
  }  /* Update bot paddle position with AI logic including randomness and imperfection */
  const updateBotPaddle = useCallback((ball: GameState['ball'], rightPaddle: GameState['paddles']['right']) => {
    if (mode !== 'bot') return rightPaddle

    const botSpeed = getBotSpeed()
    const reaction = getBotReaction()
    
    /* Add some randomness and imperfection to bot movement */
    const targetY = ball.y - PADDLE_HEIGHT / 2
    const paddleCenter = rightPaddle.y + PADDLE_HEIGHT / 2
    const diff = (targetY + PADDLE_HEIGHT / 2) - paddleCenter
      /* Add random error to make bot less perfect - more error for easy mode */
    const errorMultiplier = botDifficulty === 'easy' ? 2 : 1
    const randomError = (Math.random() - 0.5) * 30 * errorMultiplier /* ±15-30 pixels of error */
    const adjustedDiff = diff + randomError
    
    /* Bot only reacts when ball is coming towards it and within reaction probability */
    if (ball.dx > 0 && Math.random() < reaction) {
      const deadZone = botDifficulty === 'easy' ? 20 : 10 /* Larger dead zone for easy mode */
      if (Math.abs(adjustedDiff) > deadZone) {
        const moveDirection = adjustedDiff > 0 ? 1 : -1
        const newY = rightPaddle.y + (moveDirection * botSpeed)
        return {
          ...rightPaddle,
          y: Math.max(0, Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, newY))
        }
      }
    }
    
    return rightPaddle
  }, [mode, botDifficulty])
  /* Main game update loop */
  const updateGame = useCallback(() => {
    if (!gameState.gameRunning || isPaused) return

    setGameState(prev => {
      let newState = { ...prev }

      /* Update ball position */
      newState.ball.x += newState.ball.dx
      newState.ball.y += newState.ball.dy

      /* Ball collision with top and bottom walls */
      if (newState.ball.y <= 0 || newState.ball.y >= CANVAS_HEIGHT - BALL_SIZE) {
        newState.ball.dy = -newState.ball.dy
        newState.ball.y = Math.max(0, Math.min(CANVAS_HEIGHT - BALL_SIZE, newState.ball.y))
      }
      
      /* Update player paddle (left) - keyboard control for offline and friend modes */
      if (mode === 'bot' || mode === 'offline' || mode === 'friend') {
        if (mode === 'bot') {
          /* Mouse control for bot mode */
          const targetY = mouseYRef.current - PADDLE_HEIGHT / 2
          const paddleSpeed = 8
          const diff = targetY - newState.paddles.left.y
          
          if (Math.abs(diff) > paddleSpeed) {
            newState.paddles.left.y += diff > 0 ? paddleSpeed : -paddleSpeed
          } else {
            newState.paddles.left.y = targetY
          }        }

        /* Keyboard control (W/S keys) for left player */
        if (keysRef.current['w'] || keysRef.current['W']) {
          newState.paddles.left.y -= newState.paddles.left.speed
        }
        if (keysRef.current['s'] || keysRef.current['S']) {
          newState.paddles.left.y += newState.paddles.left.speed
        }

        /* Keep paddle within bounds */
        newState.paddles.left.y = Math.max(0, Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, newState.paddles.left.y))
      }
      
      /* Update right paddle based on mode */      if (mode === 'bot') {
        newState.paddles.right = updateBotPaddle(newState.ball, newState.paddles.right)
      } else if (mode === 'offline' || mode === 'friend') {
        /* Second player controls (O/L keys) for both offline and friend modes */
        if (keysRef.current['o'] || keysRef.current['O']) {
          newState.paddles.right.y -= newState.paddles.right.speed
        }
        if (keysRef.current['l'] || keysRef.current['L']) {
          newState.paddles.right.y += newState.paddles.right.speed
        }
        newState.paddles.right.y = Math.max(0, Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, newState.paddles.right.y))      }

      /* Ball collision with paddles */
      /* Left paddle collision */
      if (newState.ball.x <= PADDLE_WIDTH &&
          newState.ball.y + BALL_SIZE >= newState.paddles.left.y &&
          newState.ball.y <= newState.paddles.left.y + PADDLE_HEIGHT &&
          newState.ball.dx < 0) {
        const hitPos = (newState.ball.y + BALL_SIZE / 2 - newState.paddles.left.y) / PADDLE_HEIGHT
        const angle = (hitPos - 0.5) * Math.PI / 3 /* ±30 degrees */
        const speed = Math.min(newState.ball.speed + 0.05, 4.5) /* Slower increase, lower cap */
        
        newState.ball.dx = Math.cos(angle) * speed
        newState.ball.dy = Math.sin(angle) * speed
        newState.ball.speed = speed
        newState.ball.x = PADDLE_WIDTH      }

      /* Right paddle collision */
      if (newState.ball.x + BALL_SIZE >= CANVAS_WIDTH - PADDLE_WIDTH &&
          newState.ball.y + BALL_SIZE >= newState.paddles.right.y &&
          newState.ball.y <= newState.paddles.right.y + PADDLE_HEIGHT &&
          newState.ball.dx > 0) {
        const hitPos = (newState.ball.y + BALL_SIZE / 2 - newState.paddles.right.y) / PADDLE_HEIGHT
        const angle = (hitPos - 0.5) * Math.PI / 3 /* ±30 degrees */
        const speed = Math.min(newState.ball.speed + 0.05, 4.5) /* Slower increase, lower cap */
          newState.ball.dx = -Math.cos(angle) * speed
        newState.ball.dy = Math.sin(angle) * speed
        newState.ball.speed = speed
        newState.ball.x = CANVAS_WIDTH - PADDLE_WIDTH - BALL_SIZE
      }
      
      /* Score detection - only when ball goes behind the paddles */
      if (newState.ball.x < -BALL_SIZE) {  /* Ball went past left paddle */
        newState.score.right++
        const totalGoals = newState.score.left + newState.score.right
        const currentSpeed = getCurrentSpeed(totalGoals, newState.baseSpeed)
        
        newState.ball = {
          x: CANVAS_WIDTH / 2 - BALL_SIZE / 2,
          y: CANVAS_HEIGHT / 2 - BALL_SIZE / 2,
          dx: currentSpeed,
          dy: (Math.random() - 0.5) * currentSpeed,
          speed: currentSpeed
        }
        
        if (newState.score.right >= WINNING_SCORE) {
          newState.winner = 'right'
          newState.gameRunning = false
        }      }

      if (newState.ball.x > CANVAS_WIDTH + BALL_SIZE) {  /* Ball went past right paddle */
        newState.score.left++
        const totalGoals = newState.score.left + newState.score.right
        const currentSpeed = getCurrentSpeed(totalGoals, newState.baseSpeed)
        
        newState.ball = {
          x: CANVAS_WIDTH / 2 - BALL_SIZE / 2,
          y: CANVAS_HEIGHT / 2 - BALL_SIZE / 2,
          dx: -currentSpeed,
          dy: (Math.random() - 0.5) * currentSpeed,
          speed: currentSpeed
        }
        
        if (newState.score.left >= WINNING_SCORE) {
          newState.winner = 'left'
          newState.gameRunning = false
        }
      }

      return newState
    })
  }, [gameState.gameRunning, isPaused, mode, updateBotPaddle])
  /* Canvas drawing function */
  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    /* Clear canvas with dark background */
    ctx.fillStyle = '#1a1a1a'
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    /* Draw center line */
    ctx.strokeStyle = '#444444'
    ctx.lineWidth = 2
    ctx.setLineDash([10, 10])
    ctx.beginPath()
    ctx.moveTo(CANVAS_WIDTH / 2, 0)
    ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT)
    ctx.stroke()
    ctx.setLineDash([])

    /* Draw paddles with white color */
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, gameState.paddles.left.y, PADDLE_WIDTH, PADDLE_HEIGHT)
    ctx.fillRect(CANVAS_WIDTH - PADDLE_WIDTH, gameState.paddles.right.y, PADDLE_WIDTH, PADDLE_HEIGHT)

    /* Draw ball - make it more visible with a circle and glow effect */
    ctx.fillStyle = '#FFFFFF'
    ctx.shadowColor = '#FFFFFF'
    ctx.shadowBlur = 15
    ctx.beginPath()
    ctx.arc(gameState.ball.x + BALL_SIZE / 2, gameState.ball.y + BALL_SIZE / 2, BALL_SIZE / 2, 0, Math.PI * 2)
    ctx.fill()
    ctx.shadowBlur = 0

    /* Draw scores */
    ctx.fillStyle = '#FFFFFF'
    ctx.font = 'bold 48px Arial'
    ctx.textAlign = 'center'
    ctx.fillText(gameState.score.left.toString(), CANVAS_WIDTH / 4, 60)
    ctx.fillText(gameState.score.right.toString(), (CANVAS_WIDTH * 3) / 4, 60)
    
    /* Draw countdown */
    if (!gameState.gameStarted && gameState.countdown >= 0) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
      
      ctx.fillStyle = '#FFFFFF'
      ctx.font = 'bold 96px Arial'
      ctx.textAlign = 'center'
        if (gameState.countdown > 0) {
        ctx.fillText(gameState.countdown.toString(), CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2)
      } else {
        ctx.fillStyle = '#00FF00'
        ctx.fillText('GO!', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2)
      }
      
      /* Show player controls during countdown for offline and friend modes */
      if (mode === 'offline' || mode === 'friend') {
        ctx.fillStyle = '#CCCCCC'
        ctx.font = '20px Arial'
        ctx.textAlign = 'left'
        ctx.fillText('Player 1: W/S', 50, CANVAS_HEIGHT - 30)
        ctx.textAlign = 'right'
        ctx.fillText('Player 2: O/L', CANVAS_WIDTH - 50, CANVAS_HEIGHT - 30)
      }
    }

    /* Draw winner message */
    if (gameState.winner) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
      
      ctx.fillStyle = '#FFFFFF'
      ctx.font = 'bold 48px Arial'
      ctx.textAlign = 'center'
      const winnerText = gameState.winner === 'left' ? 
        (mode === 'bot' ? 'You Win!' : 'Left Player Wins!') : 
        (mode === 'bot' ? 'Bot Wins!' : 'Right Player Wins!')
      ctx.fillText(winnerText, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2)
      
      ctx.fillStyle = '#CCCCCC'
      ctx.font = '24px Arial'
      ctx.fillText('Press Space to play again or ESC to go back', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 50)
    }

    /* Draw pause message */
    if (isPaused && gameState.gameRunning) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
      
      ctx.fillStyle = '#FFFFFF'
      ctx.font = 'bold 48px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('PAUSED', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2)
      
      ctx.fillStyle = '#CCCCCC'
      ctx.font = '24px Arial'
      ctx.fillText('Press Space to resume', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 50)    }
  }, [gameState, isPaused, mode])

  /* Game loop effect */
  useEffect(() => {
    const gameLoop = () => {
      updateGame()
      draw()
      animationRef.current = requestAnimationFrame(gameLoop)
    }

    if (gameState.gameStarted) {
      animationRef.current = requestAnimationFrame(gameLoop)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [updateGame, draw, gameState.gameStarted])
  
  /* Countdown timer effect */
  useEffect(() => {
    if (gameState.countdown >= 0 && !gameState.gameStarted) {
      const timer = setTimeout(() => {
        if (gameState.countdown === 0) {
          /* Show "GO!" then start the game */
          setTimeout(() => {
            setGameState(prev => {
              const totalGoals = prev.score.left + prev.score.right
              const currentSpeed = getCurrentSpeed(totalGoals, prev.baseSpeed)
              
              return {
                ...prev,
                countdown: -1,
                gameStarted: true,
                gameRunning: true,
                ball: {
                  x: CANVAS_WIDTH / 2 - BALL_SIZE / 2,
                  y: CANVAS_HEIGHT / 2 - BALL_SIZE / 2,
                  dx: currentSpeed,
                  dy: (Math.random() - 0.5) * currentSpeed,
                  speed: currentSpeed
                }
              }            })
          }, 500) /* Show "GO!" for 500ms */
        } else {
          setGameState(prev => ({
            ...prev,
            countdown: prev.countdown - 1
          }))
        }
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [gameState.countdown, gameState.gameStarted, getCurrentSpeed])

  /* Keyboard event handlers effect */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key] = true

      if (e.key === ' ') {
        e.preventDefault()
        if (gameState.winner) {
          /* Restart game */
          setGameState({
            ball: {
              x: CANVAS_WIDTH / 2 - BALL_SIZE / 2,
              y: CANVAS_HEIGHT / 2 - BALL_SIZE / 2,
              dx: 0,
              dy: 0,
              speed: 3
            },            paddles: {
              left: { y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2, speed: 4 },
              right: { y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2, speed: 4 }            },
            score: { left: 0, right: 0 },
            gameRunning: false,
            gameStarted: false,
            countdown: 3,
            winner: null,
            baseSpeed: 0.8  /* Use same slower starting speed */
          })
        } else {
          setIsPaused(prev => !prev)
        }
      }

      if (e.key === 'Escape') {
        onBackToMenu()
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key] = false
    }

    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const scaleY = CANVAS_HEIGHT / rect.height
      mouseYRef.current = (e.clientY - rect.top) * scaleY
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [gameState.winner, onBackToMenu])

  const handlePauseToggle = () => {
    setIsPaused(prev => !prev)
  }
  /* Main component return with header, game canvas, and controls info */
  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div 
        className="p-4 flex items-center justify-between"
        style={{ backgroundColor: theme.colors.surface }}
      >
        <button
          onClick={onBackToMenu}
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105"
          style={{ backgroundColor: theme.colors.border, color: theme.colors.text }}
        >
          <FaArrowLeft />
          Back to Menu
        </button>

        <div className="text-center">
          <h1 
            className="text-2xl font-jersey font-bold"
            style={{ color: theme.colors.text }}
          >
            {mode === 'bot' && `vs Bot (${botDifficulty})`}
            {mode === 'offline' && 'Offline Practice'}
            {mode === 'friend' && 'vs Friend'}
            {mode === 'tournament' && 'Tournament'}
          </h1>
        </div>

        <button
          onClick={handlePauseToggle}
          disabled={!gameState.gameStarted || gameState.winner !== null}
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50"
          style={{ backgroundColor: theme.colors.primary, color: '#FFFFFF' }}
        >
          {isPaused ? <FaPlay /> : <FaPause />}
          {isPaused ? 'Resume' : 'Pause'}
        </button>      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div 
          className="relative rounded-lg shadow-2xl"
          style={{ backgroundColor: '#1a1a1a', border: `2px solid ${theme.colors.border}` }}
        >
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            className="rounded-lg"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>      </div>

      <div 
        className="p-4 text-center"
        style={{ backgroundColor: theme.colors.surface }}
      >
        <div className="max-w-4xl mx-auto">          <p 
            className="text-sm"
            style={{ color: theme.colors.textSecondary }}
          >
            {mode === 'bot' && 'Controls: Move mouse or use W/S keys to control your paddle'}
            {mode === 'offline' && 'Player 1: W/S keys | Player 2: O/L keys'}
            {mode === 'friend' && 'Player 1: W/S keys | Player 2: O/L keys'}
          </p>
          <p 
            className="text-xs mt-1"
            style={{ color: theme.colors.textSecondary }}
          >
            Space: Pause/Resume | ESC: Back to Menu | First to {WINNING_SCORE} points wins!
          </p>
        </div>
      </div>
    </div>
  )
}

export default PingPongGame
