'use client'

import Navigation from '../components/Navigation'
import { FaTrophy, FaFire, FaGamepad, FaCrown, FaMedal, FaUser } from 'react-icons/fa'
import { MdPeople } from 'react-icons/md'
import { useTheme } from '../contexts/ThemeContext'

const HomePage = () => {
  const { theme } = useTheme()

  const userData = {
    fullName: "John Doe",
    username: "johndoe42",
    level: 15,
    xp: 7500,
    xpToNext: 10000,
    rank: "Gold III",
    winStreak: 8,
    totalGames: 127,
    wins: 89,
    losses: 38,
    winRate: 70,
    lastGameResult: "Victory",
    lastOpponent: "alice_smith",
    points: 2450
  }

  const achievements = [
    { id: 1, name: "First Victory", description: "Win your first game", icon: FaTrophy, unlocked: true },
    { id: 2, name: "Streak Master", description: "Win 5 games in a row", icon: FaFire, unlocked: true },
    { id: 3, name: "Champion", description: "Reach Gold rank", icon: FaCrown, unlocked: true },
    { id: 4, name: "Perfectionist", description: "Win without losing a point", icon: FaMedal, unlocked: false },
  ]

  const onlineFriends = [
    { username: "alice_smith", status: "In Game" },
    { username: "bob_player", status: "Online" },
    { username: "charlie99", status: "Online" },
  ]

  const recentGames = [
    { opponent: "alice_smith", result: "Victory", score: "11-7", date: "2 hours ago" },
    { opponent: "mike_pro", result: "Victory", score: "11-9", date: "5 hours ago" },
    { opponent: "sarah_ace", result: "Defeat", score: "9-11", date: "1 day ago" },
  ]

  const progressPercentage = (userData.xp / userData.xpToNext) * 100

  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: theme.colors.background }}
    >
      <Navigation />
      
      <main className="pt-20 px-4 sm:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-2 space-y-8">
              <div 
                className="rounded-lg p-6"
                style={{ backgroundColor: theme.colors.surface }}
              >
                <div className="flex items-center mb-6">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mr-4"
                    style={{ backgroundColor: theme.colors.accent }}
                  >
                    <FaUser 
                      className="text-3xl"
                      style={{ color: theme.colors.background }}
                    />
                  </div>
                  <div>
                    <h1 
                      className="text-3xl font-jersey font-bold"
                      style={{ color: theme.colors.text }}
                    >
                      {userData.fullName}
                    </h1>
                    <p 
                      className="text-lg"
                      style={{ color: theme.colors.textSecondary }}
                    >
                      @{userData.username}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <span 
                        className="px-3 py-1 rounded-full text-sm font-bold"
                        style={{ 
                          backgroundColor: theme.colors.accent,
                          color: theme.colors.background
                        }}
                      >
                        {userData.rank}
                      </span>
                      <span 
                        className="font-semibold"
                        style={{ color: theme.colors.accent }}
                      >
                        {userData.points} Points
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span 
                      className="font-orbitron"
                      style={{ color: theme.colors.text }}
                    >
                      Level {userData.level}
                    </span>
                    <span 
                      className="text-sm"
                      style={{ color: theme.colors.textSecondary }}
                    >
                      {userData.xp}/{userData.xpToNext} XP
                    </span>
                  </div>
                  <div 
                    className="w-full rounded-full h-3"
                    style={{ backgroundColor: theme.colors.border }}
                  >
                    <div 
                      className="h-3 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${progressPercentage}%`,
                        backgroundColor: theme.colors.accent
                      }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div 
                      className="text-2xl font-bold"
                      style={{ color: theme.colors.text }}
                    >
                      {userData.totalGames}
                    </div>
                    <div 
                      className="text-sm"
                      style={{ color: theme.colors.textSecondary }}
                    >
                      Total Games
                    </div>
                  </div>
                  <div className="text-center">
                    <div 
                      className="text-2xl font-bold"
                      style={{ color: theme.colors.success }}
                    >
                      {userData.wins}
                    </div>
                    <div 
                      className="text-sm"
                      style={{ color: theme.colors.textSecondary }}
                    >
                      Wins
                    </div>
                  </div>
                  <div className="text-center">
                    <div 
                      className="text-2xl font-bold"
                      style={{ color: theme.colors.error }}
                    >
                      {userData.losses}
                    </div>
                    <div 
                      className="text-sm"
                      style={{ color: theme.colors.textSecondary }}
                    >
                      Losses
                    </div>
                  </div>
                  <div className="text-center">
                    <div 
                      className="text-2xl font-bold"
                      style={{ color: theme.colors.info }}
                    >
                      {userData.winRate}%
                    </div>
                    <div 
                      className="text-sm"
                      style={{ color: theme.colors.textSecondary }}
                    >
                      Win Rate
                    </div>
                  </div>
                </div>
              </div>

              <div 
                className="rounded-lg p-6"
                style={{ backgroundColor: theme.colors.surface }}
              >
                <h2 
                  className="text-xl font-orbitron font-bold mb-4 flex items-center"
                  style={{ color: theme.colors.text }}
                >
                  <FaFire 
                    className="mr-2"
                    style={{ color: theme.colors.warning }}
                  />
                  Win Streak: {userData.winStreak}
                </h2>
                <div 
                  className="p-4 rounded-lg"
                  style={{ 
                    backgroundColor: theme.colors.warning,
                    color: theme.colors.background
                  }}
                >
                  <p className="text-lg font-bold">🔥 You're on fire! Keep the streak going!</p>
                </div>
              </div>

              <div 
                className="rounded-lg p-6"
                style={{ backgroundColor: theme.colors.surface }}
              >
                <h2 
                  className="text-xl font-orbitron font-bold mb-4"
                  style={{ color: theme.colors.text }}
                >
                  Recent Games
                </h2>
                <div className="space-y-3">
                  {recentGames.map((game, index) => (
                    <div 
                      key={index} 
                      className="flex justify-between items-center p-3 rounded-lg"
                      style={{ backgroundColor: theme.colors.secondary }}
                    >
                      <div>
                        <span 
                          className="font-medium"
                          style={{ color: theme.colors.text }}
                        >
                          vs {game.opponent}
                        </span>
                        <p 
                          className="text-sm"
                          style={{ color: theme.colors.textSecondary }}
                        >
                          {game.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <span 
                          className="font-bold"
                          style={{ 
                            color: game.result === 'Victory' ? theme.colors.success : theme.colors.error
                          }}
                        >
                          {game.result}
                        </span>
                        <p 
                          className="text-sm"
                          style={{ color: theme.colors.textSecondary }}
                        >
                          {game.score}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div 
                className="rounded-lg p-6"
                style={{ backgroundColor: theme.colors.surface }}
              >
                <h2 
                  className="text-xl font-orbitron font-bold mb-4 flex items-center"
                  style={{ color: theme.colors.text }}
                >
                  <MdPeople 
                    className="mr-2"
                    style={{ color: theme.colors.success }}
                  />
                  Online Friends ({onlineFriends.length})
                </h2>
                <div className="space-y-3">
                  {onlineFriends.map((friend, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span style={{ color: theme.colors.text }}>{friend.username}</span>
                      <span 
                        className="text-sm px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: friend.status === 'In Game' ? theme.colors.info : theme.colors.success,
                          color: theme.colors.background
                        }}
                      >
                        {friend.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div 
                className="rounded-lg p-6"
                style={{ backgroundColor: theme.colors.surface }}
              >
                <h2 
                  className="text-xl font-orbitron font-bold mb-4 flex items-center"
                  style={{ color: theme.colors.text }}
                >
                  <FaTrophy 
                    className="mr-2"
                    style={{ color: theme.colors.warning }}
                  />
                  Achievements
                </h2>
                <div className="space-y-3">
                  {achievements.map((achievement) => {
                    const IconComponent = achievement.icon
                    return (
                      <div 
                        key={achievement.id} 
                        className="flex items-center p-3 rounded-lg"
                        style={{ 
                          backgroundColor: achievement.unlocked ? theme.colors.secondary : theme.colors.border,
                          opacity: achievement.unlocked ? 1 : 0.6
                        }}
                      >
                        <IconComponent 
                          className="text-2xl mr-3"
                          style={{ 
                            color: achievement.unlocked ? theme.colors.warning : theme.colors.textSecondary
                          }}
                        />
                        <div>
                          <h3 
                            className="font-bold"
                            style={{ 
                              color: achievement.unlocked ? theme.colors.text : theme.colors.textSecondary
                            }}
                          >
                            {achievement.name}
                          </h3>
                          <p 
                            className="text-sm"
                            style={{ color: theme.colors.textSecondary }}
                          >
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div 
                className="rounded-lg p-6"
                style={{ backgroundColor: theme.colors.surface }}
              >
                <h2 
                  className="text-xl font-orbitron font-bold mb-4"
                  style={{ color: theme.colors.text }}
                >
                  Quick Actions
                </h2>
                <div className="space-y-3">
                  <button 
                    className="w-full font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                    style={{ 
                      backgroundColor: theme.colors.accent,
                      color: theme.colors.background
                    }}
                  >
                    <FaGamepad className="inline mr-2" />
                    Quick Match
                  </button>
                  <button 
                    className="w-full font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                    style={{ 
                      backgroundColor: theme.colors.success,
                      color: theme.colors.background
                    }}
                  >
                    Challenge Friend
                  </button>
                  <button 
                    className="w-full font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                    style={{ 
                      backgroundColor: theme.colors.info,
                      color: theme.colors.background
                    }}
                  >
                    Join Tournament
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default HomePage 