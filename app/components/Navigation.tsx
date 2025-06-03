'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { FaSignOutAlt, FaSun, FaMoon } from 'react-icons/fa'
import { useTheme } from '../contexts/ThemeContext'

const Navigation = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, toggleTheme, isDark } = useTheme()

  const navItems = [
    { name: 'HOME', href: '/home' },
    { name: 'FRIENDS', href: '/friends' },
    { name: 'PLAY', href: '/play' },
    { name: 'STATISTICS', href: '/statistics' },
    { name: 'SETTINGS', href: '/settings' },
  ]

  const handleLogout = () => {
    console.log('Logout clicked')
    router.push('/login')
  }

  return (
    <nav 
      className="fixed top-0 left-0 w-full z-30 border-b"
      style={{ 
        backgroundColor: theme.colors.primary,
        borderBottomColor: theme.colors.border
      }}
    >
      <div className="flex justify-between items-center py-4 px-4 sm:px-8">
        <div className="flex-1 flex justify-center">
          <div className="flex items-center gap-1">
            {navItems.map((item, index) => (
              <div key={item.name} className="flex items-center">
                <Link
                  href={item.href}
                  className={`px-4 py-2 text-sm sm:text-base font-orbitron font-medium transition-all duration-300 hover:scale-105`}
                  style={{
                    color: pathname === item.href ? theme.colors.text : theme.colors.textSecondary
                  }}
                >
                  {item.name}
                </Link>
                {index < navItems.length - 1 && (
                  <span 
                    className="mx-1"
                    style={{ color: theme.colors.border }}
                  >
                    |
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 transition-all duration-300 hover:scale-105 px-3 py-2 rounded"
            style={{ color: theme.colors.textSecondary }}
            aria-label="Toggle theme"
          >
            {isDark ? <FaSun size={18} /> : <FaMoon size={18} />}
          </button>
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 transition-all duration-300 hover:scale-105 px-4 py-2"
            style={{ color: theme.colors.textSecondary }}
            aria-label="Logout"
          >
            <FaSignOutAlt size={20} />
            <span className="text-sm font-orbitron font-medium">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navigation 