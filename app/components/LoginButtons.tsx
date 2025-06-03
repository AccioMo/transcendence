'use client'

import Logo42 from './Logo42'
import { useTheme } from '../contexts/ThemeContext'

interface LoginButtonsProps {
  onEmailClick: () => void
  on42Click: () => void
}

const LoginButtons = ({ onEmailClick, on42Click }: LoginButtonsProps) => {
  const { theme } = useTheme()

  return (
    <div className="space-y-4 w-full max-w-md mx-auto">
      <button
        onClick={on42Click}
        className="w-full flex items-center justify-center py-4 px-6 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        style={{ 
          backgroundColor: theme.colors.accent,
          color: theme.colors.background
        }}
        aria-label="Login with 42 Intranet"
      >
        <Logo42 className="w-6 h-6 mr-3" />
        <span className="text-lg font-orbitron">
          Intra 42Logo | Login
        </span>
      </button>
      
      <button
        onClick={onEmailClick}
        className="w-full py-4 px-6 border-2 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        style={{ 
          borderColor: theme.colors.border,
          backgroundColor: 'transparent',
          color: theme.colors.text
        }}
        aria-label="Continue with email"
      >
        <span className="text-lg font-orbitron">
          Continue with email
        </span>
      </button>
    </div>
  )
}

export default LoginButtons 