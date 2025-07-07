'use client'

import { useRouter } from 'next/navigation'
import { UserGroupIcon } from '@heroicons/react/24/outline'

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-6 text-center">
        {/* Logo */}
        <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
          <UserGroupIcon className="w-10 h-10 text-white" />
        </div>
        
        {/* Welcome Message */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to the HBSA App
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          Haas Business Student Association Application Portal
        </p>
        
        {/* Start Application Button */}
        <button
          onClick={() => router.push('/form/basic-info')}
          className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg shadow-large hover:shadow-glow transition-all duration-300"
        >
          Start Your Application
        </button>
      </div>
    </div>
  )
}
