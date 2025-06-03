'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const RootPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/login')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#282828' }}>
      <div className="text-white text-xl font-orbitron">Loading...</div>
    </div>
  )
}

export default RootPage 