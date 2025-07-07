'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRightIcon, ArrowLeftIcon, UserIcon, CalendarIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { useFormStore } from '@/store/formStore'

export default function BasicInfoPage() {
  const router = useRouter()
  const { basicInfo, setBasicInfo } = useFormStore()
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const graduatingYears = ['2026', '2027', '2028', '2029']

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!basicInfo.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!basicInfo.graduatingYear) {
      newErrors.graduatingYear = 'Graduating year is required'
    }

    if (!basicInfo.coreValue.trim()) {
      newErrors.coreValue = 'Core value response is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) {
      router.push('/form/committees')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">HBSA Application</h1>
                <p className="text-sm text-gray-600">Step 1 of 4</p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="hidden sm:block">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  1
                </div>
                <div className="w-12 h-1 bg-gray-200 rounded-full">
                  <div className="w-1/4 h-1 bg-primary-600 rounded-full"></div>
                </div>
                <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-sm font-semibold">
                  2
                </div>
                <div className="w-12 h-1 bg-gray-200 rounded-full"></div>
                <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-sm font-semibold">
                  3
                </div>
                <div className="w-12 h-1 bg-gray-200 rounded-full"></div>
                <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-sm font-semibold">
                  4
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Page Header */}
          <div className="text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
            >
              <UserIcon className="w-4 h-4 mr-2" />
              Basic Information
            </motion.div>
            
            <h2 className="text-4xl font-bold text-gray-900">
              Tell us about yourself
            </h2>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Let&apos;s start with some basic information to get to know you better and understand your background.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-large border border-gray-100 p-8">
            <div className="space-y-8">
              {/* Name Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-3"
              >
                <label className="block text-gray-900 font-semibold text-lg">
                  Full Name <span className="text-error-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={basicInfo.name}
                    onChange={(e) => setBasicInfo({ name: e.target.value })}
                    className={`
                      w-full px-6 py-4 border-2 rounded-xl text-gray-900 placeholder-gray-400 text-lg
                      focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all duration-300
                      ${errors.name ? 'border-error-300 bg-error-50' : 'border-gray-300 hover:border-primary-400'}
                    `}
                    placeholder="Enter your full name"
                  />
                  <UserIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-error-600 text-sm font-medium flex items-center"
                  >
                    <span className="w-1 h-1 bg-error-500 rounded-full mr-2"></span>
                    {errors.name}
                  </motion.p>
                )}
              </motion.div>

              {/* Graduating Year Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-3"
              >
                <label className="block text-gray-900 font-semibold text-lg">
                  Graduating Year <span className="text-error-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={basicInfo.graduatingYear}
                    onChange={(e) => setBasicInfo({ graduatingYear: e.target.value })}
                    className={`
                      w-full px-6 py-4 border-2 rounded-xl text-gray-900 bg-white text-lg appearance-none
                      focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all duration-300
                      ${errors.graduatingYear ? 'border-error-300 bg-error-50' : 'border-gray-300 hover:border-primary-400'}
                    `}
                  >
                    <option value="">Select your graduating year</option>
                    {graduatingYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <CalendarIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
                {errors.graduatingYear && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-error-600 text-sm font-medium flex items-center"
                  >
                    <span className="w-1 h-1 bg-error-500 rounded-full mr-2"></span>
                    {errors.graduatingYear}
                  </motion.p>
                )}
              </motion.div>

              {/* Core Value Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-3"
              >
                <label className="block text-gray-900 font-semibold text-lg">
                  Which Haas core value do you most embody and why? <span className="text-error-500">*</span>
                </label>
                <div className="relative">
                  <textarea
                    value={basicInfo.coreValue}
                    onChange={(e) => setBasicInfo({ coreValue: e.target.value })}
                    rows={6}
                    className={`
                      w-full px-6 py-4 border-2 rounded-xl text-gray-900 placeholder-gray-400 text-lg resize-vertical
                      focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all duration-300
                      ${errors.coreValue ? 'border-error-300 bg-error-50' : 'border-gray-300 hover:border-primary-400'}
                    `}
                    placeholder="Tell us about the Haas core value that resonates most with you and how you embody it in your daily life..."
                  />
                  <SparklesIcon className="absolute right-4 top-4 w-5 h-5 text-gray-400" />
                </div>
                {errors.coreValue && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-error-600 text-sm font-medium flex items-center"
                  >
                    <span className="w-1 h-1 bg-error-500 rounded-full mr-2"></span>
                    {errors.coreValue}
                  </motion.p>
                )}
                
                {/* Help Text */}
                <div className="bg-primary-50 rounded-xl p-4 border border-primary-100">
                  <h4 className="font-semibold text-primary-900 mb-2">Haas Core Values:</h4>
                  <ul className="text-sm text-primary-800 space-y-1">
                    <li>• <strong>Question the Status Quo</strong> - Challenge conventional thinking</li>
                    <li>• <strong>Confidence Without Attitude</strong> - Lead with humility</li>
                    <li>• <strong>Students Always</strong> - Embrace lifelong learning</li>
                    <li>• <strong>Beyond Yourself</strong> - Consider the greater good</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-primary-300 hover:text-primary-700 transition-colors duration-200 flex items-center"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back
            </button>
            
            <button
              onClick={handleNext}
              className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg shadow-large hover:shadow-glow transition-all duration-300 flex items-center group"
            >
              Continue to Committee Selection
              <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 