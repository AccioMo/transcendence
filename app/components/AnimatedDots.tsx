'use client'

import { useTheme } from '../contexts/ThemeContext'

const AnimatedDots = () => {
  const { theme } = useTheme()
  
  return (
    <div className="flex space-x-3">
      {Array.from({ length: 5 }, (_, index) => (
        <div
          key={index}
          className={`w-3 h-3 rounded-full animate-bounce`}
          style={{ 
            backgroundColor: theme.colors.accent,
            animationDelay: `${index * 0.1}s`,
            animationDirection: index % 2 === 0 ? 'normal' : 'reverse'
          }}
        />
      ))}
    </div>
  )
}

export default AnimatedDots 