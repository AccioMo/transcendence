'use client'

import { useState } from 'react'
import Navigation from '../components/Navigation'
import { useTheme } from '../contexts/ThemeContext'
import { FaTrophy, FaMedal, FaFire, FaGamepad, FaClock, FaCalendarAlt, FaUser, FaChartLine, FaStar, FaCrown, FaBullseye, FaRocket } from 'react-icons/fa'

interface GameMatch {
  id: number
  opponent: string
  opponentAvatar: string
  result: 'win' | 'loss'
  score: string
  date: string
  duration: string
  gameMode: 'classic' | 'power-up' | 'tournament'
}

interface PlayerStats {
  level: number
  xp: number
  xpToNext: number
  totalGames: number
  wins: number
  losses: number
  winRate: number
  currentStreak: number
  bestStreak: number
  totalPlayTime: string
  rank: string
  rankPosition: number
  averageScore: number
  highestScore: number
}

interface Achievement {
  id: number
  name: string
  description: string
  icon: string
  unlocked: boolean
  unlockedDate?: string
  progress?: number
  maxProgress?: number
}

const mockStats: PlayerStats = {
  level: 27,
  xp: 3420,
  xpToNext: 4000,
  totalGames: 156,
  wins: 98,
  losses: 58,
  winRate: 62.8,
  currentStreak: 5,
  bestStreak: 12,
  totalPlayTime: '47h 32m',
  rank: 'Gold III',
  rankPosition: 234,
  averageScore: 8.4,
  highestScore: 15
}

const mockMatches: GameMatch[] = [
  { id: 1, opponent: 'Alex Johnson', opponentAvatar: '👨‍💻', result: 'win', score: '11-7', date: 'Today', duration: '8:45', gameMode: 'classic' },
  { id: 2, opponent: 'Sarah Chen', opponentAvatar: '👩‍🎨', result: 'win', score: '11-9', date: 'Today', duration: '12:30', gameMode: 'power-up' },
  { id: 3, opponent: 'Mike Rodriguez', opponentAvatar: '🧑‍🚀', result: 'loss', score: '8-11', date: 'Yesterday', duration: '9:15', gameMode: 'classic' },
  { id: 4, opponent: 'Emma Wilson', opponentAvatar: '👩‍🔬', result: 'win', score: '11-5', date: 'Yesterday', duration: '6:20', gameMode: 'tournament' },
  { id: 5, opponent: 'David Kim', opponentAvatar: '👨‍🎓', result: 'win', score: '11-8', date: '2 days ago', duration: '10:10', gameMode: 'classic' },
  { id: 6, opponent: 'Lisa Zhang', opponentAvatar: '👩‍💼', result: 'loss', score: '9-11', date: '2 days ago', duration: '11:45', gameMode: 'power-up' },
  { id: 7, opponent: 'Ryan Thompson', opponentAvatar: '🧑‍⚡', result: 'win', score: '11-6', date: '3 days ago', duration: '7:35', gameMode: 'classic' },
  { id: 8, opponent: 'Maya Patel', opponentAvatar: '👩‍🎤', result: 'loss', score: '7-11', date: '3 days ago', duration: '9:55', gameMode: 'tournament' },
]

const mockAchievements: Achievement[] = [
  { id: 1, name: 'First Victory', description: 'Win your first game', icon: '🏆', unlocked: true, unlockedDate: '2024-01-15' },
  { id: 2, name: 'Winning Streak', description: 'Win 5 games in a row', icon: '🔥', unlocked: true, unlockedDate: '2024-02-10' },
  { id: 3, name: 'Century Club', description: 'Play 100 games', icon: '💯', unlocked: true, unlockedDate: '2024-03-20' },
  { id: 4, name: 'Perfect Game', description: 'Win without losing a point', icon: '⭐', unlocked: true, unlockedDate: '2024-02-25' },
  { id: 5, name: 'Marathon Player', description: 'Play for 50 hours total', icon: '⏰', unlocked: false, progress: 47, maxProgress: 50 },
  { id: 6, name: 'Tournament Champion', description: 'Win a tournament', icon: '👑', unlocked: false },
  { id: 7, name: 'Legendary Streak', description: 'Win 20 games in a row', icon: '🚀', unlocked: false, progress: 12, maxProgress: 20 },
  { id: 8, name: 'Master Player', description: 'Reach level 50', icon: '🎯', unlocked: false, progress: 27, maxProgress: 50 },
]

const StatisticsPage = () => {
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState('overview')

  const getGameModeColor = (mode: string) => {
    switch (mode) {
      case 'classic': return theme.colors.info
      case 'power-up': return theme.colors.warning
      case 'tournament': return theme.colors.success
      default: return theme.colors.textSecondary
    }
  }

  const getGameModeIcon = (mode: string) => {
    switch (mode) {
      case 'classic': return '🏓'
      case 'power-up': return '⚡'
      case 'tournament': return '🏆'
      default: return '🎮'
    }
  }

  const calculateXPPercentage = () => {
    return (mockStats.xp / mockStats.xpToNext) * 100
  }

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Level and XP Section */}
      <div 
        className="p-6 rounded-lg"
        style={{ backgroundColor: theme.colors.surface }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold"
              style={{ backgroundColor: theme.colors.primary, color: theme.colors.text }}
            >
              {mockStats.level}
            </div>
            <div>
              <h3 className="text-xl font-bold" style={{ color: theme.colors.text }}>
                Level {mockStats.level}
              </h3>
              <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
                {mockStats.rank} • Rank #{mockStats.rankPosition}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
              XP: {mockStats.xp.toLocaleString()} / {mockStats.xpToNext.toLocaleString()}
            </p>
            <p className="text-sm font-medium" style={{ color: theme.colors.text }}>
              {mockStats.xpToNext - mockStats.xp} XP to next level
            </p>
          </div>
        </div>
        
        {/* XP Progress Bar */}
        <div 
          className="w-full h-4 rounded-full overflow-hidden"
          style={{ backgroundColor: theme.colors.border }}
        >
          <div 
            className="h-full transition-all duration-500 rounded-full"
            style={{ 
              width: `${calculateXPPercentage()}%`,
              backgroundColor: theme.colors.success
            }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div 
          className="p-4 rounded-lg text-center"
          style={{ backgroundColor: theme.colors.surface }}
        >
          <FaGamepad size={24} className="mx-auto mb-2" style={{ color: theme.colors.info }} />
          <p className="text-2xl font-bold" style={{ color: theme.colors.text }}>
            {mockStats.totalGames}
          </p>
          <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
            Total Games
          </p>
        </div>
        
        <div 
          className="p-4 rounded-lg text-center"
          style={{ backgroundColor: theme.colors.surface }}
        >
          <FaTrophy size={24} className="mx-auto mb-2" style={{ color: theme.colors.success }} />
          <p className="text-2xl font-bold" style={{ color: theme.colors.text }}>
            {mockStats.wins}
          </p>
          <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
            Wins
          </p>
        </div>
        
        <div 
          className="p-4 rounded-lg text-center"
          style={{ backgroundColor: theme.colors.surface }}
        >
          <FaChartLine size={24} className="mx-auto mb-2" style={{ color: theme.colors.warning }} />
          <p className="text-2xl font-bold" style={{ color: theme.colors.text }}>
            {mockStats.winRate}%
          </p>
          <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
            Win Rate
          </p>
        </div>
        
        <div 
          className="p-4 rounded-lg text-center"
          style={{ backgroundColor: theme.colors.surface }}
        >
          <FaFire size={24} className="mx-auto mb-2" style={{ color: theme.colors.error }} />
          <p className="text-2xl font-bold" style={{ color: theme.colors.text }}>
            {mockStats.currentStreak}
          </p>
          <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
            Current Streak
          </p>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          className="p-6 rounded-lg"
          style={{ backgroundColor: theme.colors.surface }}
        >
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: theme.colors.text }}>
            <FaClock style={{ color: theme.colors.info }} />
            Game Statistics
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span style={{ color: theme.colors.textSecondary }}>Total Play Time</span>
              <span style={{ color: theme.colors.text }}>{mockStats.totalPlayTime}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: theme.colors.textSecondary }}>Best Streak</span>
              <span style={{ color: theme.colors.text }}>{mockStats.bestStreak} wins</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: theme.colors.textSecondary }}>Average Score</span>
              <span style={{ color: theme.colors.text }}>{mockStats.averageScore}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: theme.colors.textSecondary }}>Highest Score</span>
              <span style={{ color: theme.colors.text }}>{mockStats.highestScore}</span>
            </div>
          </div>
        </div>
        
        <div 
          className="p-6 rounded-lg"
          style={{ backgroundColor: theme.colors.surface }}
        >          <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: theme.colors.text }}>
            <FaBullseye style={{ color: theme.colors.success }} />
            Performance
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span style={{ color: theme.colors.textSecondary }}>Losses</span>
              <span style={{ color: theme.colors.text }}>{mockStats.losses}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: theme.colors.textSecondary }}>Win/Loss Ratio</span>
              <span style={{ color: theme.colors.text }}>
                {(mockStats.wins / mockStats.losses).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: theme.colors.textSecondary }}>Games per Day</span>
              <span style={{ color: theme.colors.text }}>4.2</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: theme.colors.textSecondary }}>Avg Game Duration</span>
              <span style={{ color: theme.colors.text }}>9m 15s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderMatchHistoryTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold" style={{ color: theme.colors.text }}>
          Recent Matches ({mockMatches.length})
        </h3>
        <div className="flex gap-2 text-sm">
          <span style={{ color: theme.colors.success }}>
            ● Classic
          </span>
          <span style={{ color: theme.colors.warning }}>
            ● Power-up
          </span>
          <span style={{ color: theme.colors.info }}>
            ● Tournament
          </span>
        </div>
      </div>
      
      <div className="space-y-2">
        {mockMatches.map((match) => (
          <div
            key={match.id}
            className="p-4 rounded-lg flex items-center justify-between"
            style={{ backgroundColor: theme.colors.surface }}
          >
            <div className="flex items-center gap-4">
              <div 
                className={`w-3 h-3 rounded-full`}
                style={{ backgroundColor: getGameModeColor(match.gameMode) }}
              />
              <div className="text-xl">{match.opponentAvatar}</div>
              <div>
                <h4 className="font-medium" style={{ color: theme.colors.text }}>
                  vs {match.opponent}
                </h4>
                <p className="text-sm flex items-center gap-2" style={{ color: theme.colors.textSecondary }}>
                  <span>{getGameModeIcon(match.gameMode)}</span>
                  {match.gameMode} • {match.date}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center gap-3">
                <div 
                  className={`px-3 py-1 rounded-full text-sm font-bold`}
                  style={{
                    backgroundColor: match.result === 'win' ? theme.colors.success : theme.colors.error,
                    color: '#FFFFFF'
                  }}
                >
                  {match.result.toUpperCase()}
                </div>
                <div className="text-right">
                  <p className="font-bold" style={{ color: theme.colors.text }}>
                    {match.score}
                  </p>
                  <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
                    {match.duration}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderAchievementsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold" style={{ color: theme.colors.text }}>
          Achievements ({mockAchievements.filter(a => a.unlocked).length}/{mockAchievements.length})
        </h3>
        <div className="text-sm" style={{ color: theme.colors.textSecondary }}>
          {Math.round((mockAchievements.filter(a => a.unlocked).length / mockAchievements.length) * 100)}% Complete
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockAchievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`p-4 rounded-lg border-2 ${
              achievement.unlocked ? 'opacity-100' : 'opacity-60'
            }`}
            style={{ 
              backgroundColor: theme.colors.surface,
              borderColor: achievement.unlocked ? theme.colors.success : theme.colors.border
            }}
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">{achievement.icon}</div>
              <div className="flex-1">
                <h4 className="font-bold" style={{ color: theme.colors.text }}>
                  {achievement.name}
                </h4>
                <p className="text-sm mb-2" style={{ color: theme.colors.textSecondary }}>
                  {achievement.description}
                </p>
                
                {achievement.unlocked ? (
                  <div className="flex items-center gap-2">
                    <FaMedal size={16} style={{ color: theme.colors.success }} />
                    <span className="text-sm" style={{ color: theme.colors.success }}>
                      Unlocked {achievement.unlockedDate}
                    </span>
                  </div>
                ) : achievement.progress !== undefined ? (
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span style={{ color: theme.colors.textSecondary }}>Progress</span>
                      <span style={{ color: theme.colors.text }}>
                        {achievement.progress}/{achievement.maxProgress}
                      </span>
                    </div>
                    <div 
                      className="w-full h-2 rounded-full"
                      style={{ backgroundColor: theme.colors.border }}
                    >
                      <div 
                        className="h-full rounded-full"
                        style={{ 
                          width: `${(achievement.progress! / achievement.maxProgress!) * 100}%`,
                          backgroundColor: theme.colors.warning
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <span className="text-sm" style={{ color: theme.colors.textSecondary }}>
                    🔒 Locked
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const tabs = [
    { id: 'overview', name: 'Overview', icon: FaChartLine },
    { id: 'matches', name: 'Match History', icon: FaGamepad },
    { id: 'achievements', name: 'Achievements', icon: FaTrophy },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverviewTab()
      case 'matches':
        return renderMatchHistoryTab()
      case 'achievements':
        return renderAchievementsTab()
      default:
        return renderOverviewTab()
    }
  }

  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: theme.colors.background }}
    >
      <Navigation />
      <main className="pt-20 px-4 sm:px-8 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <FaChartLine size={32} style={{ color: theme.colors.success }} />
            <h1 
              className="text-3xl font-jersey font-bold"
              style={{ color: theme.colors.text }}
            >
              Statistics
            </h1>
          </div>
          
          {/* Tab Navigation */}
          <div 
            className="flex gap-1 p-1 rounded-lg mb-6"
            style={{ backgroundColor: theme.colors.surface }}
          >
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-4 py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-all duration-200 ${
                    activeTab === tab.id ? 'opacity-100' : 'opacity-70 hover:opacity-90'
                  }`}
                  style={{
                    backgroundColor: activeTab === tab.id ? theme.colors.primary : 'transparent',
                    color: theme.colors.text
                  }}
                >
                  <Icon size={16} />
                  <span className="hidden sm:inline">{tab.name}</span>
                </button>
              )
            })}
          </div>
          
          {/* Tab Content */}
          <div>
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  )
}

export default StatisticsPage