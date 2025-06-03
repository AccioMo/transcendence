'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface ThemeColors {
  primary: string
  secondary: string
  background: string
  surface: string
  text: string
  textSecondary: string
  border: string
  accent: string
  success: string
  warning: string
  error: string
  info: string
}

interface Theme {
  name: 'light' | 'dark'
  colors: ThemeColors
}

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  isDark: boolean
}

const lightTheme: Theme = {
  name: 'light',
  colors: {
    primary: '#E3E3E3',
    secondary: '#D1D1D1',
    background: '#FAFAFA',
    surface: '#FFFFFF',
    text: '#1A1A1A',
    textSecondary: '#4A4A4A',
    border: '#C0C0C0',
    accent: '#2A2A2A',
    success: '#2E7D32',
    warning: '#F57C00',
    error: '#D32F2F',
    info: '#1976D2'
  }
}

const darkTheme: Theme = {
  name: 'dark',
  colors: {
    primary: '#282828',
    secondary: '#3A3A3A',
    background: '#1E1E1E',
    surface: '#2D2D2D',
    text: '#FFFFFF',
    textSecondary: '#B0B0B0',
    border: '#404040',
    accent: '#CCCCCC',
    success: '#909090',
    warning: '#ABABAB',
    error: '#808080',
    info: '#A0A0A0'
  }
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const savedTheme = localStorage.getItem('transcendence-theme')
    if (savedTheme) {
      setIsDark(savedTheme === 'dark')
    }
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    localStorage.setItem('transcendence-theme', newIsDark ? 'dark' : 'light')
  }

  const theme = isDark ? darkTheme : lightTheme

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
} 