import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from './contexts/ThemeContext'

export const metadata: Metadata = {
  title: 'Transcendence - Ping Pong Game',
  description: 'A modern ping pong game built with Next.js',
}

interface RootLayoutProps {
  children: React.ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen h-full">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout 