'use client'

import { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'

interface EmailLoginSliderProps {
  isOpen: boolean
  onClose: () => void
}

const EmailLoginSlider = ({ isOpen, onClose }: EmailLoginSliderProps) => {
  const [isRegisterMode, setIsRegisterMode] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const { theme } = useTheme()

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleLogin = () => {
    console.log('Login clicked with:', { email: formData.email, password: formData.password })
  }

  const handleRegister = () => {
    console.log('Register clicked with:', formData)
  }

  const toggleRegisterMode = () => {
    setIsRegisterMode(!isRegisterMode)
    setFormData({ username: '', email: '', password: '', confirmPassword: '' })
  }

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
      
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-2/5 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ backgroundColor: theme.colors.surface }}
      >
        <div className="flex flex-col h-full p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 
              className="text-2xl font-orbitron font-bold"
              style={{ color: theme.colors.text }}
            >
              {isRegisterMode ? 'Register' : 'Login'}
            </h2>
            <button
              onClick={onClose}
              className="text-3xl hover:opacity-70 transition-opacity"
              style={{ color: theme.colors.text }}
              aria-label="Close login form"
            >
              ×
            </button>
          </div>

          <div className="flex-1 space-y-6">
            {isRegisterMode && (
              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: theme.colors.textSecondary }}
                >
                  Username
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200"
                  style={{ 
                    backgroundColor: theme.colors.background,
                    borderColor: theme.colors.border,
                    color: theme.colors.text
                  }}
                  placeholder="Enter your username"
                />
              </div>
            )}

            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: theme.colors.textSecondary }}
              >
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200"
                style={{ 
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.border,
                  color: theme.colors.text
                }}
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: theme.colors.textSecondary }}
              >
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200"
                style={{ 
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.border,
                  color: theme.colors.text
                }}
                placeholder="Enter your password"
              />
            </div>

            {isRegisterMode && (
              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: theme.colors.textSecondary }}
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200"
                  style={{ 
                    backgroundColor: theme.colors.background,
                    borderColor: theme.colors.border,
                    color: theme.colors.text
                  }}
                  placeholder="Confirm your password"
                />
              </div>
            )}

            {!isRegisterMode && (
              <div className="text-right">
                <button 
                  className="text-sm hover:opacity-70 transition-opacity"
                  style={{ color: theme.colors.info }}
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              onClick={isRegisterMode ? handleRegister : handleLogin}
              className="w-full font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              style={{ 
                backgroundColor: theme.colors.accent,
                color: theme.colors.background
              }}
            >
              {isRegisterMode ? 'Register' : 'Login'}
            </button>

            <div className="text-center">
              <button
                onClick={toggleRegisterMode}
                className="text-sm hover:opacity-70 transition-opacity"
                style={{ color: theme.colors.textSecondary }}
              >
                {isRegisterMode ? 'Already have an account? Login' : 'New here? Register'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EmailLoginSlider 