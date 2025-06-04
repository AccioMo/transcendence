'use client'

import { useState, useRef, useEffect } from 'react'
import Navigation from '../components/Navigation'
import { useTheme } from '../contexts/ThemeContext'
import { FaGamepad, FaBan, FaTimes, FaPaperPlane, FaCircle } from 'react-icons/fa'

interface Friend {
  id: number
  name: string
  avatar: string
  status: 'online' | 'offline' | 'playing'
  lastSeen?: string
}

interface Message {
  id: number
  sender: 'me' | 'friend'
  content: string
  timestamp: string
}

const mockFriends: Friend[] = [
  { id: 1, name: 'Alex Johnson', avatar: '👨‍💻', status: 'online' },
  { id: 2, name: 'Sarah Chen', avatar: '👩‍🎨', status: 'playing' },
  { id: 3, name: 'Mike Rodriguez', avatar: '🧑‍🚀', status: 'online' },
  { id: 4, name: 'Emma Wilson', avatar: '👩‍🔬', status: 'offline', lastSeen: '2 hours ago' },
  { id: 5, name: 'David Kim', avatar: '👨‍🎓', status: 'offline', lastSeen: '1 day ago' },
  { id: 6, name: 'Lisa Zhang', avatar: '👩‍💼', status: 'online' },
  { id: 7, name: 'Ryan Thompson', avatar: '🧑‍⚡', status: 'playing' },
  { id: 8, name: 'Maya Patel', avatar: '👩‍🎤', status: 'offline', lastSeen: '3 hours ago' },
]

const mockMessages: { [key: number]: Message[] } = {
  1: [
    { id: 1, sender: 'friend', content: 'Hey! Ready for a game?', timestamp: '2:30 PM' },
    { id: 2, sender: 'me', content: 'Absolutely! What do you want to play?', timestamp: '2:31 PM' },
    { id: 3, sender: 'friend', content: 'How about some Pong? I\'ve been practicing!', timestamp: '2:32 PM' },
    { id: 4, sender: 'me', content: 'You\'re on! 😄', timestamp: '2:33 PM' },
  ],
  2: [
    { id: 1, sender: 'friend', content: 'Just finished an amazing match!', timestamp: '1:15 PM' },
    { id: 2, sender: 'me', content: 'Nice! How did it go?', timestamp: '1:20 PM' },
  ],
  3: [
    { id: 1, sender: 'me', content: 'Hey Mike, how\'s it going?', timestamp: '10:30 AM' },
    { id: 2, sender: 'friend', content: 'Good! Just got online. Want to play?', timestamp: '10:35 AM' },
  ]
}

const FriendsPage = () => {
  const { theme } = useTheme()
  const [activeFriend, setActiveFriend] = useState<Friend | null>(mockFriends[0])
  const [isChatVisible, setIsChatVisible] = useState(true)
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [activeFriend])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return '#4ade80'
      case 'playing': return '#f59e0b'
      case 'offline': return '#6b7280'
      default: return '#6b7280'
    }
  }

  const getStatusText = (friend: Friend) => {
    switch (friend.status) {
      case 'online': return 'Online'
      case 'playing': return 'Playing'
      case 'offline': return friend.lastSeen ? `Last seen ${friend.lastSeen}` : 'Offline'
      default: return 'Offline'
    }
  }
  const handleSendMessage = () => {
    if (newMessage.trim() && activeFriend) {
      /* In a real app, this would send the message to the backend */
      console.log(`Sending message to ${activeFriend.name}: ${newMessage}`)
      setNewMessage('')
    }
  }

  const handleChallenge = () => {
    if (activeFriend) {
      console.log(`Challenging ${activeFriend.name} to a game!`)
      /* In a real app, this would send a challenge request */
    }
  }

  const handleBlock = () => {
    if (activeFriend) {
      console.log(`Blocking ${activeFriend.name}`)
      /* In a real app, this would block the user */
    }
  }

  const handleClose = () => {
    setIsChatVisible(false)
    setTimeout(() => {
      setActiveFriend(null)
      setIsChatVisible(true)
    }, 300)  }

  /* Main component return with friends sidebar and chat area */
  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: theme.colors.background }}
    >
      <Navigation />
      <main className="pt-20 h-screen flex">
        <div 
          className="w-80 border-r flex flex-col"
          style={{ 
            backgroundColor: theme.colors.surface,
            borderRightColor: theme.colors.border
          }}
        >
          <div className="p-4 border-b" style={{ borderBottomColor: theme.colors.border }}>
            <h2 
              className="text-xl font-jersey font-bold"
              style={{ color: theme.colors.text }}
            >
              Friends ({mockFriends.length})
            </h2>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {mockFriends.map((friend) => (
              <div
                key={friend.id}
                onClick={() => setActiveFriend(friend)}
                className={`p-4 border-b cursor-pointer transition-all duration-200 hover:opacity-80 ${
                  activeFriend?.id === friend.id ? 'opacity-100' : 'opacity-70'
                }`}
                style={{ 
                  backgroundColor: activeFriend?.id === friend.id ? theme.colors.primary : 'transparent',
                  borderBottomColor: theme.colors.border
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="text-2xl">{friend.avatar}</div>
                    <div 
                      className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2"
                      style={{ 
                        backgroundColor: getStatusColor(friend.status),
                        borderColor: theme.colors.surface
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 
                      className="font-medium truncate"
                      style={{ color: theme.colors.text }}
                    >
                      {friend.name}
                    </h3>
                    <p 
                      className="text-sm truncate"
                      style={{ color: theme.colors.textSecondary }}
                    >
                      {getStatusText(friend)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>        <div className={`flex-1 flex flex-col transition-transform duration-300 ${
          isChatVisible ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {activeFriend ? (
            <>
              <div 
                className="p-4 border-b flex items-center justify-between"
                style={{ 
                  backgroundColor: theme.colors.surface,
                  borderBottomColor: theme.colors.border
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="text-2xl">{activeFriend.avatar}</div>
                    <div 
                      className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2"
                      style={{ 
                        backgroundColor: getStatusColor(activeFriend.status),
                        borderColor: theme.colors.surface
                      }}
                    />
                  </div>
                  <div>
                    <h3 
                      className="font-medium"
                      style={{ color: theme.colors.text }}
                    >
                      {activeFriend.name}
                    </h3>
                    <p 
                      className="text-sm"
                      style={{ color: theme.colors.textSecondary }}
                    >
                      {getStatusText(activeFriend)}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleChallenge}
                    className="px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-all duration-200 hover:opacity-80"
                    style={{ 
                      backgroundColor: theme.colors.success,
                      color: theme.colors.text
                    }}
                  >
                    <FaGamepad size={16} />
                    Challenge {activeFriend.name.split(' ')[0]}
                  </button>
                  
                  <button
                    onClick={handleBlock}
                    className="px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-all duration-200 hover:opacity-80"
                    style={{ 
                      backgroundColor: theme.colors.error,
                      color: theme.colors.text
                    }}
                  >
                    <FaBan size={16} />
                    Block
                  </button>
                  
                  <button
                    onClick={handleClose}
                    className="px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-all duration-200 hover:opacity-80"
                    style={{ 
                      backgroundColor: theme.colors.textSecondary,
                      color: theme.colors.background
                    }}
                  >
                    <FaTimes size={16} />
                    Close
                  </button>
                </div>              </div>              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {mockMessages[activeFriend.id]?.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === 'me' ? 'rounded-br-none' : 'rounded-bl-none'
                      }`}
                      style={{
                        backgroundColor: '#1A1A1A',
                        color: '#FFFFFF'
                      }}
                    >
                      <p className="text-sm font-bold">{message.content}</p>
                      <p 
                        className="text-xs mt-1 opacity-70 font-medium"
                        style={{ color: '#B0B0B0' }}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />              </div>

              <div 
                className="p-4 border-t"
                style={{ 
                  backgroundColor: theme.colors.surface,
                  borderTopColor: theme.colors.border
                }}
              >
                <div className="flex gap-2">                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    style={{
                      backgroundColor: theme.colors.background,
                      borderColor: theme.colors.border,
                      color: theme.colors.text
                    }}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="px-4 py-2 rounded-lg transition-all duration-200 hover:opacity-80 disabled:opacity-50"
                    style={{
                      backgroundColor: theme.colors.primary,
                      color: theme.colors.text
                    }}
                  >
                    <FaPaperPlane size={16} />
                  </button>
                </div>
              </div>            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">💬</div>
                <h3 
                  className="text-xl font-medium mb-2"
                  style={{ color: theme.colors.text }}
                >
                  Select a friend to start chatting
                </h3>
                <p 
                  className="text-sm"
                  style={{ color: theme.colors.textSecondary }}
                >
                  Choose someone from your friends list to begin a conversation
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default FriendsPage 