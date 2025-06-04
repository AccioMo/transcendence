'use client'

import { useState } from 'react'
import Navigation from '../components/Navigation'
import { useTheme } from '../contexts/ThemeContext'
import { FaRobot, FaUser, FaUsers, FaTrophy, FaGamepad } from 'react-icons/fa'
import PingPongGame from '../components/PingPongGame'

type GameMode = 'bot' | 'offline' | 'friend' | 'tournament' | null
type BotDifficulty = 'easy' | 'medium' | 'hard'

const PlayPage = () => {
  const { theme } = useTheme()
  const [gameMode, setGameMode] = useState<GameMode>(null)
  const [botDifficulty, setBotDifficulty] = useState<BotDifficulty>('medium')
  const [showDifficultyModal, setShowDifficultyModal] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)

  const handlePlayBot = () => {
    setGameMode('bot')
    setShowDifficultyModal(true)
  }

  const handleDifficultySelect = (difficulty: BotDifficulty) => {
    setBotDifficulty(difficulty)
    setShowDifficultyModal(false)
    setGameStarted(true)
  }

  const handleOfflinePlay = () => {
    setGameMode('offline')
    setGameStarted(true)
  }
  const handlePlayFriend = () => {
    /* TODO: Implement friend selection */
    alert('Friend play coming soon!')
  }

  const handleJoinTournament = () => {
    /* TODO: Implement tournament system */
    alert('Tournament system coming soon!')
  }

  const handleBackToMenu = () => {
    setGameMode(null)
    setGameStarted(false)
    setShowDifficultyModal(false)
  }

  const gameButtons = [
    {
      id: 'bot',
      label: 'Play our Bot',
      icon: FaRobot,
      color: theme.colors.info,
      onClick: handlePlayBot,
      description: 'Challenge our AI bot'
    },
    {
      id: 'offline',
      label: 'Offline Play?',
      icon: FaUser,
      color: theme.colors.warning,
      onClick: handleOfflinePlay,
      description: 'Practice alone'
    },
    {
      id: 'play',
      label: 'PLAY',
      icon: FaGamepad,
      color: theme.colors.primary,
      onClick: handlePlayBot,
      description: 'Quick game vs bot',
      isMain: true
    },
    {
      id: 'friend',
      label: 'Play vs a friend',
      icon: FaUsers,
      color: theme.colors.success,
      onClick: handlePlayFriend,
      description: 'Challenge a friend'
    },
    {
      id: 'tournament',
      label: 'Join a tournament',
      icon: FaTrophy,
      color: theme.colors.error,
      onClick: handleJoinTournament,
      description: 'Compete with others'
    }
  ]

  if (gameStarted && gameMode) {
    return (
      <PingPongGame 
        mode={gameMode}
        botDifficulty={gameMode === 'bot' ? botDifficulty : undefined}
        onBackToMenu={handleBackToMenu}
      />
  )
  }

  /* Main component return with game mode selection, rules, and difficulty modal */
  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: theme.colors.background }}
    >
      <Navigation />
      <main className="pt-20 px-4 sm:px-8 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 
              className="text-5xl font-jersey font-bold mb-4"
              style={{ color: theme.colors.text }}
            >
              Ping Pong Arena
            </h1>
            <p 
              className="text-xl"
              style={{ color: theme.colors.textSecondary }}
            >
              Choose your game mode and start playing!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            {gameButtons.map((button) => {
              const Icon = button.icon
              return (
                <button
                  key={button.id}
                  onClick={button.onClick}
                  className={`group relative p-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                    button.isMain ? 'md:col-span-1 order-3 md:order-none' : ''
                  }`}
                  style={{
                    backgroundColor: theme.colors.surface,
                    border: `2px solid ${button.color}`,
                    height: button.isMain ? '200px' : '150px'
                  }}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <div 
                      className={`mb-3 p-3 rounded-full transition-all duration-300 group-hover:scale-110`}
                      style={{ backgroundColor: `${button.color}20` }}
                    >
                      <Icon 
                        size={button.isMain ? 32 : 24} 
                        style={{ color: button.color }} 
                      />
                    </div>
                    <h3 
                      className={`font-bold text-center ${
                        button.isMain ? 'text-lg' : 'text-base'
                      }`}
                      style={{ color: theme.colors.text }}
                    >
                      {button.label}
                    </h3>
                    <p 
                      className="text-sm text-center mt-2"
                      style={{ color: theme.colors.textSecondary }}                    >
                      {button.description}
                    </p>
                  </div>
                  
                  <div 
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{ backgroundColor: button.color }}
                  />
                </button>
              )
            })}
          </div>

          <div
            className="p-6 rounded-lg"
            style={{ backgroundColor: theme.colors.surface }}
          >
            <h2 
              className="text-2xl font-bold mb-4"
              style={{ color: theme.colors.text }}
            >
              Game Rules
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 
                  className="text-lg font-semibold mb-2"
                  style={{ color: theme.colors.primary }}
                >
                  Controls
                </h3>
                <ul 
                  className="space-y-1 text-sm"
                  style={{ color: theme.colors.textSecondary }}
                >
                  <li>• Use <kbd className="px-2 py-1 rounded bg-gray-200 text-gray-800">W</kbd> and <kbd className="px-2 py-1 rounded bg-gray-200 text-gray-800">S</kbd> keys to move up and down</li>
                  <li>• Or use your mouse to control the paddle</li>
                  <li>• First to score 11 points wins!</li>
                </ul>
              </div>
              <div>
                <h3 
                  className="text-lg font-semibold mb-2"
                  style={{ color: theme.colors.success }}
                >
                  Bot Difficulties
                </h3>
                <ul 
                  className="space-y-1 text-sm"
                  style={{ color: theme.colors.textSecondary }}
                >
                  <li>• <span style={{ color: theme.colors.success }}>Easy</span>: Perfect for beginners</li>
                  <li>• <span style={{ color: theme.colors.warning }}>Medium</span>: Balanced challenge</li>
                  <li>• <span style={{ color: theme.colors.error }}>Hard</span>: Expert level AI</li>
                </ul>
              </div>
            </div>        </div>
        </div>
      </main>

      {showDifficultyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div 
            className="p-8 rounded-xl max-w-md w-full mx-4"
            style={{ backgroundColor: theme.colors.surface }}
          >
            <h2 
              className="text-2xl font-bold mb-6 text-center"
              style={{ color: theme.colors.text }}
            >
              Select Bot Difficulty
            </h2>
            
            <div className="space-y-4">
              {(['easy', 'medium', 'hard'] as BotDifficulty[]).map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => handleDifficultySelect(difficulty)}
                  className="w-full p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: theme.colors.background,
                    borderColor: difficulty === 'easy' ? theme.colors.success : 
                                 difficulty === 'medium' ? theme.colors.warning : theme.colors.error,
                    color: theme.colors.text
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold capitalize">{difficulty}</span>
                    <FaRobot 
                      style={{
                        color: difficulty === 'easy' ? theme.colors.success : 
                               difficulty === 'medium' ? theme.colors.warning : theme.colors.error
                      }}
                    />
                  </div>
                  <p 
                    className="text-sm mt-1"
                    style={{ color: theme.colors.textSecondary }}
                  >
                    {difficulty === 'easy' && 'Slow reactions, simple strategy'}
                    {difficulty === 'medium' && 'Balanced speed and tactics'}
                    {difficulty === 'hard' && 'Lightning fast, unpredictable'}
                  </p>
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setShowDifficultyModal(false)}
              className="w-full mt-6 p-3 rounded-lg transition-all duration-300"
              style={{
                backgroundColor: theme.colors.border,
                color: theme.colors.textSecondary
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PlayPage