'use client'

import Navigation from '../components/Navigation'
import { useTheme } from '../contexts/ThemeContext'

const PlayPage = () => {
  const { theme } = useTheme()

  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: theme.colors.background }}
    >
      <Navigation />
      <main className="pt-20 px-4 sm:px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          <h1 
            className="text-3xl font-jersey font-bold mb-8"
            style={{ color: theme.colors.text }}
          >
            Play
          </h1>
          <div 
            className="rounded-lg p-6"
            style={{ backgroundColor: theme.colors.surface }}
          >
            <p 
              className="text-lg"
              style={{ color: theme.colors.textSecondary }}
            >
              Game interface coming soon...
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default PlayPage 