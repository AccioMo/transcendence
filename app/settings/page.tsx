'use client'

import { useState } from 'react'
import Navigation from '../components/Navigation'
import { useTheme } from '../contexts/ThemeContext'
import { FaUser, FaShieldAlt, FaUserFriends, FaImage, FaSave, FaTrash, FaUserMinus, FaUnlock, FaLock, FaEye, FaEyeSlash, FaQrcode } from 'react-icons/fa'

interface User {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  avatar: string
  bio: string
  phone: string
  is2FAEnabled: boolean
}

interface Friend {
  id: number
  name: string
  avatar: string
  status: 'friend' | 'blocked'
  addedDate: string
}

const mockUser: User = {
  id: 1,
  username: 'johndoe42',
  email: 'john.doe@student.42.fr',
  firstName: 'John',
  lastName: 'Doe',
  avatar: '👨‍💻',
  bio: 'Passionate developer and gamer. Love playing Pong!',
  phone: '+1 (555) 123-4567',
  is2FAEnabled: false
}

const mockFriends: Friend[] = [
  { id: 1, name: 'Alex Johnson', avatar: '👨‍💻', status: 'friend', addedDate: '2024-01-15' },
  { id: 2, name: 'Sarah Chen', avatar: '👩‍🎨', status: 'friend', addedDate: '2024-02-20' },
  { id: 3, name: 'Mike Rodriguez', avatar: '🧑‍🚀', status: 'blocked', addedDate: '2024-01-10' },
  { id: 4, name: 'Emma Wilson', avatar: '👩‍🔬', status: 'friend', addedDate: '2024-03-05' },
  { id: 5, name: 'Toxic Player', avatar: '😈', status: 'blocked', addedDate: '2024-02-01' },
  { id: 6, name: 'Lisa Zhang', avatar: '👩‍💼', status: 'friend', addedDate: '2024-03-12' },
]

const SettingsPage = () => {
  const { theme, toggleTheme, isDark } = useTheme()
  const [activeTab, setActiveTab] = useState('profile')
  const [user, setUser] = useState<User>(mockUser)
  const [friends, setFriends] = useState<Friend[]>(mockFriends)
  const [showPassword, setShowPassword] = useState(false)
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  })
  const [show2FAQR, setShow2FAQR] = useState(false)

  const tabs = [
    { id: 'profile', name: 'Profile', icon: FaUser },
    { id: 'security', name: 'Security', icon: FaShieldAlt },
    { id: 'friends', name: 'Friends Management', icon: FaUserFriends },
    { id: 'avatar', name: 'Avatar', icon: FaImage },
  ]

  const handleUserUpdate = (field: keyof User, value: any) => {
    setUser(prev => ({ ...prev, [field]: value }))
  }

  const handlePasswordChange = (field: keyof typeof passwords, value: string) => {
    setPasswords(prev => ({ ...prev, [field]: value }))
  }

  const handleSaveProfile = () => {
    console.log('Saving profile:', user)
    // In a real app, this would send the data to the backend
  }

  const handleChangePassword = () => {
    if (passwords.new !== passwords.confirm) {
      alert('New passwords do not match!')
      return
    }
    console.log('Changing password')
    setPasswords({ current: '', new: '', confirm: '' })
    // In a real app, this would send the password change request
  }

  const handleToggle2FA = () => {
    if (!user.is2FAEnabled) {
      setShow2FAQR(true)
    } else {
      handleUserUpdate('is2FAEnabled', false)
      setShow2FAQR(false)
    }
  }

  const handleConfirm2FA = () => {
    handleUserUpdate('is2FAEnabled', true)
    setShow2FAQR(false)
    console.log('2FA enabled successfully')
  }

  const handleUnblockFriend = (friendId: number) => {
    setFriends(prev => prev.map(friend => 
      friend.id === friendId ? { ...friend, status: 'friend' } : friend
    ))
    console.log(`Unblocked friend ${friendId}`)
  }

  const handleRemoveFriend = (friendId: number) => {
    setFriends(prev => prev.filter(friend => friend.id !== friendId))
    console.log(`Removed friend ${friendId}`)
  }

  const avatarOptions = ['👨‍💻', '👩‍💻', '🧑‍🚀', '👩‍🎨', '👨‍🎓', '👩‍🔬', '👨‍⚕️', '👩‍💼', '🧑‍🎤', '👩‍🎮']

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.text }}>
            Username (Read-only)
          </label>
          <input
            type="text"
            value={user.username}
            disabled
            className="w-full px-4 py-2 rounded-lg border opacity-50 cursor-not-allowed"
            style={{
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              color: theme.colors.textSecondary
            }}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.text }}>
            Email (Read-only)
          </label>
          <input
            type="email"
            value={user.email}
            disabled
            className="w-full px-4 py-2 rounded-lg border opacity-50 cursor-not-allowed"
            style={{
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              color: theme.colors.textSecondary
            }}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.text }}>
            First Name
          </label>
          <input
            type="text"
            value={user.firstName}
            onChange={(e) => handleUserUpdate('firstName', e.target.value)}
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-opacity-50"
            style={{
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.border,
              color: theme.colors.text
            }}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.text }}>
            Last Name
          </label>
          <input
            type="text"
            value={user.lastName}
            onChange={(e) => handleUserUpdate('lastName', e.target.value)}
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-opacity-50"
            style={{
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.border,
              color: theme.colors.text
            }}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.text }}>
            Phone Number
          </label>
          <input
            type="tel"
            value={user.phone}
            onChange={(e) => handleUserUpdate('phone', e.target.value)}
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-opacity-50"
            style={{
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.border,
              color: theme.colors.text
            }}
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.text }}>
          Bio
        </label>
        <textarea
          value={user.bio}
          onChange={(e) => handleUserUpdate('bio', e.target.value)}
          rows={4}
          className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-opacity-50"
          style={{
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.border,
            color: theme.colors.text
          }}
          placeholder="Tell us about yourself..."
        />
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={handleSaveProfile}
          className="px-6 py-2 rounded-lg flex items-center gap-2 font-medium transition-all duration-200 hover:opacity-80"
          style={{
            backgroundColor: theme.colors.success,
            color: '#FFFFFF'
          }}
        >
          <FaSave size={16} />
          Save Changes
        </button>
      </div>
    </div>
  )

  const renderSecurityTab = () => (
    <div className="space-y-8">
      {/* Theme Toggle */}
      <div 
        className="p-6 rounded-lg"
        style={{ backgroundColor: theme.colors.surface }}
      >
        <h3 className="text-lg font-medium mb-4" style={{ color: theme.colors.text }}>
          Appearance
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium" style={{ color: theme.colors.text }}>
              Theme
            </p>
            <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
              Choose between light and dark mode
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-lg transition-all duration-200 hover:opacity-80"
            style={{
              backgroundColor: theme.colors.primary,
              color: theme.colors.text
            }}
          >
            {isDark ? 'Switch to Light' : 'Switch to Dark'}
          </button>
        </div>
      </div>

      {/* Password Change */}
      <div 
        className="p-6 rounded-lg"
        style={{ backgroundColor: theme.colors.surface }}
      >
        <h3 className="text-lg font-medium mb-4" style={{ color: theme.colors.text }}>
          Change Password
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.text }}>
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={passwords.current}
                onChange={(e) => handlePasswordChange('current', e.target.value)}
                className="w-full px-4 py-2 pr-12 rounded-lg border focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.border,
                  color: theme.colors.text
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                style={{ color: theme.colors.textSecondary }}
              >
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.text }}>
              New Password
            </label>
            <input
              type="password"
              value={passwords.new}
              onChange={(e) => handlePasswordChange('new', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.border,
                color: theme.colors.text
              }}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.text }}>
              Confirm New Password
            </label>
            <input
              type="password"
              value={passwords.confirm}
              onChange={(e) => handlePasswordChange('confirm', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.border,
                color: theme.colors.text
              }}
            />
          </div>
          
          <button
            onClick={handleChangePassword}
            disabled={!passwords.current || !passwords.new || !passwords.confirm}
            className="px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:opacity-80 disabled:opacity-50"
            style={{
              backgroundColor: theme.colors.warning,
              color: '#FFFFFF'
            }}
          >
            Change Password
          </button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div 
        className="p-6 rounded-lg"
        style={{ backgroundColor: theme.colors.surface }}
      >
        <h3 className="text-lg font-medium mb-4" style={{ color: theme.colors.text }}>
          Two-Factor Authentication
        </h3>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-medium" style={{ color: theme.colors.text }}>
              {user.is2FAEnabled ? 'Enabled' : 'Disabled'}
            </p>
            <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
              Add an extra layer of security to your account
            </p>
          </div>
          <button
            onClick={handleToggle2FA}
            className="px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-all duration-200 hover:opacity-80"
            style={{
              backgroundColor: user.is2FAEnabled ? theme.colors.error : theme.colors.success,
              color: '#FFFFFF'
            }}
          >
            {user.is2FAEnabled ? <FaLock size={16} /> : <FaUnlock size={16} />}
            {user.is2FAEnabled ? 'Disable 2FA' : 'Enable 2FA'}
          </button>
        </div>
        
        {show2FAQR && (
          <div 
            className="p-4 rounded-lg border-2 border-dashed"
            style={{ 
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.border
            }}
          >
            <div className="text-center">
              <FaQrcode size={48} className="mx-auto mb-4" style={{ color: theme.colors.textSecondary }} />
              <p className="mb-4" style={{ color: theme.colors.text }}>
                Scan this QR code with your authenticator app
              </p>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => setShow2FAQR(false)}
                  className="px-4 py-2 rounded-lg font-medium"
                  style={{
                    backgroundColor: theme.colors.textSecondary,
                    color: theme.colors.background
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm2FA}
                  className="px-4 py-2 rounded-lg font-medium"
                  style={{
                    backgroundColor: theme.colors.success,
                    color: '#FFFFFF'
                  }}
                >
                  I've Scanned It
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  const renderFriendsTab = () => (
    <div className="space-y-6">
      <div className="flex gap-4">
        <button
          onClick={() => setActiveTab('friends')}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${ 
            activeTab === 'friends' ? 'opacity-100' : 'opacity-70 hover:opacity-90'
          }`}
          style={{
            backgroundColor: activeTab === 'friends' ? theme.colors.primary : theme.colors.surface,
            color: theme.colors.text
          }}
        >
          All Friends ({friends.filter(f => f.status === 'friend').length})
        </button>
        <button
          onClick={() => setActiveTab('blocked')}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${ 
            activeTab === 'blocked' ? 'opacity-100' : 'opacity-70 hover:opacity-90'
          }`}
          style={{
            backgroundColor: activeTab === 'blocked' ? theme.colors.primary : theme.colors.surface,
            color: theme.colors.text
          }}
        >
          Blocked ({friends.filter(f => f.status === 'blocked').length})
        </button>
      </div>

      <div className="space-y-2">
        {friends
          .filter(friend => activeTab === 'friends' ? friend.status === 'friend' : friend.status === 'blocked')
          .map(friend => (
            <div
              key={friend.id}
              className="p-4 rounded-lg flex items-center justify-between"
              style={{ backgroundColor: theme.colors.surface }}
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">{friend.avatar}</div>
                <div>
                  <h3 className="font-medium" style={{ color: theme.colors.text }}>
                    {friend.name}
                  </h3>
                  <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
                    {friend.status === 'friend' ? 'Friend' : 'Blocked'} since {new Date(friend.addedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2">
                {friend.status === 'blocked' && (
                  <button
                    onClick={() => handleUnblockFriend(friend.id)}
                    className="px-3 py-1 rounded text-sm font-medium transition-all duration-200 hover:opacity-80"
                    style={{
                      backgroundColor: theme.colors.success,
                      color: '#FFFFFF'
                    }}
                  >
                    <FaUnlock size={14} className="inline mr-1" />
                    Unblock
                  </button>
                )}
                <button
                  onClick={() => handleRemoveFriend(friend.id)}
                  className="px-3 py-1 rounded text-sm font-medium transition-all duration-200 hover:opacity-80"
                  style={{
                    backgroundColor: theme.colors.error,
                    color: '#FFFFFF'
                  }}
                >
                  <FaUserMinus size={14} className="inline mr-1" />
                  Remove
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  )

  const renderAvatarTab = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">{user.avatar}</div>
        <h3 className="text-lg font-medium mb-2" style={{ color: theme.colors.text }}>
          Current Avatar
        </h3>
        <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
          Choose a new avatar from the options below
        </p>
      </div>
      
      <div className="grid grid-cols-5 md:grid-cols-10 gap-4">
        {avatarOptions.map((avatar, index) => (
          <button
            key={index}
            onClick={() => handleUserUpdate('avatar', avatar)}
            className={`text-4xl p-4 rounded-lg transition-all duration-200 hover:scale-110 ${
              user.avatar === avatar ? 'ring-4' : ''
            }`}
            style={{
              backgroundColor: theme.colors.surface,
              ringColor: theme.colors.success
            }}
          >
            {avatar}
          </button>
        ))}
      </div>
      
      <div className="text-center">
        <button
          onClick={handleSaveProfile}
          className="px-6 py-2 rounded-lg flex items-center gap-2 font-medium transition-all duration-200 hover:opacity-80 mx-auto"
          style={{
            backgroundColor: theme.colors.success,
            color: '#FFFFFF'
          }}
        >
          <FaSave size={16} />
          Save Avatar
        </button>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab()
      case 'security':
        return renderSecurityTab()
      case 'friends':
      case 'blocked':
        return renderFriendsTab()
      case 'avatar':
        return renderAvatarTab()
      default:
        return renderProfileTab()
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
          <h1 
            className="text-3xl font-jersey font-bold mb-8"
            style={{ color: theme.colors.text }}
          >
            Settings
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div 
                className="rounded-lg p-4 space-y-2"
                style={{ backgroundColor: theme.colors.surface }}
              >
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 font-medium transition-all duration-200 ${
                        activeTab === tab.id || (activeTab === 'blocked' && tab.id === 'friends') 
                          ? 'opacity-100' : 'opacity-70 hover:opacity-90'
                      }`}
                      style={{
                        backgroundColor: activeTab === tab.id || (activeTab === 'blocked' && tab.id === 'friends') 
                          ? theme.colors.primary : 'transparent',
                        color: theme.colors.text
                      }}
                    >
                      <Icon size={18} />
                      {tab.name}
                    </button>
                  )
                })}
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div 
                className="rounded-lg p-6"
                style={{ backgroundColor: theme.colors.surface }}
              >
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SettingsPage