'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ArrowRightIcon, ClockIcon, UsersIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'

export default function Home() {
  const router = useRouter()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image src="/hbsalogo.png" alt="HBSA Logo" width={232} height={90} />
            </div>
                          <div className="text-right">
                <p className="text-sm text-gray-500">UC Berkeley</p>
                <p className="text-xs text-gray-400">Fall 2025 Applications</p>
              </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-blue-800 via-blue-600 to-yellow-500 bg-clip-text text-transparent">
                    Join HBSA
                  </span>
                </h2>
                <p className="text-2xl text-gray-700 font-medium">
                  Shape the future of business at Berkeley
                </p>
              </div>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                The Haas Business Student Association is UC Berkeley&apos;s premier business organization, 
                connecting ambitious students with industry leaders, exclusive opportunities, and a network 
                of driven peers. Join us in building the next generation of business leaders.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-yellow-500 rounded-lg flex items-center justify-center">
                    <UsersIcon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Network</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Connect with 500+ members and industry professionals
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-yellow-500 rounded-lg flex items-center justify-center">
                    <RocketLaunchIcon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Growth</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Access exclusive internships, events, and career resources
                </p>
              </div>
            </div>

            {/* Application Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <ClockIcon className="w-5 h-5" />
                  <span className="font-medium">Application Process</span>
                </div>
                <span className="text-sm text-gray-500">~15 minutes</span>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Open to all Berkeley students</p>
                <p>• First Round Applications</p>
                <p>• Second Round Interview</p>
              </div>
            </div>
          </div>

          {/* Right Column - CTA */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="text-center space-y-6">
              <Image src="/hbsalogo.png" alt="HBSA Logo" width={232} height={90} />
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Ready to Apply?
                </h3>
                <p className="text-gray-600">
                  Take the first step toward joining one of Berkeley&apos;s most prestigious student organizations.
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => router.push('/form/basic-info')}
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-yellow-500 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-yellow-400 transition-all duration-300 flex items-center justify-center"
                >
                  Start Your Application
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </button>
                
                                 <p className="text-xs text-gray-500">
                   Applications close August 7, 2025
                 </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-600">
              © 2024 Haas Business Student Association. All rights reserved.
            </p>
            <p className="text-xs text-gray-500">
              University of California, Berkeley • Haas School of Business
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
