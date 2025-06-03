'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AnimatedDots from '../components/AnimatedDots'
import LoginButtons from '../components/LoginButtons'
import EmailLoginSlider from '../components/EmailLoginSlider'
import { useTheme } from '../contexts/ThemeContext'

const LoginPage = () => {
  const [isEmailSliderOpen, setIsEmailSliderOpen] = useState(false)
  const router = useRouter()
  const { theme } = useTheme()

  const handleEmailLoginClick = () => {
    setIsEmailSliderOpen(true)
  }

  const handleCloseEmailSlider = () => {
    setIsEmailSliderOpen(false)
  }

  const handle42Login = () => {
    console.log('42 login clicked')
    router.push('/home')
  }

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
        <h1 
          className="text-xl font-orbitron font-medium text-center"
          style={{ color: theme.colors.text }}
        >
          Welcome to my Game
        </h1>
      </div>

      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-jersey font-bold mb-12 glow-effect"
            style={{ color: theme.colors.text }}
          >
            TRANSCENDENCE
          </h1>
          
          <LoginButtons 
            onEmailClick={handleEmailLoginClick}
            on42Click={handle42Login}
          />
        </div>
      </div>

      <div className="absolute bottom-4 left-4">
        <p 
          className="text-sm font-orbitron"
          style={{ color: theme.colors.textSecondary }}
        >
          made by a7a
        </p>
      </div>

      <div className="absolute bottom-4 right-4">
        <AnimatedDots />
      </div>

      <EmailLoginSlider 
        isOpen={isEmailSliderOpen}
        onClose={handleCloseEmailSlider}
      />
    </div>
  )
}

export default LoginPage 