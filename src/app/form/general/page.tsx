'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRightIcon, ArrowLeftIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
import { useFormStore } from '@/store/formStore'

export default function GeneralPage() {
  const router = useRouter()
  const { generalResponses, setGeneralResponses, selectedCommittees } = useFormStore()
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!generalResponses.whyJoinHBSA.trim()) {
      newErrors.whyJoinHBSA = 'This field is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) {
      router.push('/form/submit')
    }
  }

  const handleBack = () => {
    router.push(`/form/questions/${selectedCommittees[selectedCommittees.length - 1]}`)
  }

  const stepNumber = 2 + selectedCommittees.length + 1 // After basic info, committees, and committee questions
  const totalSteps = 2 + selectedCommittees.length + 2 // +2 for general and submit

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
                <p className="text-sm text-gray-600">Step {stepNumber} of {totalSteps}</p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="hidden sm:block">
              <div className="flex items-center space-x-2">
                {Array.from({ length: totalSteps }, (_, i) => (
                  <div key={i} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      i < stepNumber ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {i + 1}
                    </div>
                    {i < totalSteps - 1 && (
                      <div className="w-12 h-1 bg-gray-200 rounded-full mx-2">
                        <div className={`h-1 bg-primary-600 rounded-full transition-all duration-300 ${
                          i < stepNumber - 1 ? 'w-full' : 'w-0'
                        }`}></div>
                      </div>
                    )}
                  </div>
                ))}
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
              <ChatBubbleLeftRightIcon className="w-4 h-4 mr-2" />
              General Questions
            </motion.div>
            
            <h2 className="text-4xl font-bold text-gray-900">
              Tell us more about yourself
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Share your motivation for joining HBSA and what you hope to contribute to our community.
            </p>
          </div>

          {/* Question Section */}
          <div className="bg-white rounded-2xl shadow-large border border-gray-100 p-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-gray-900 font-semibold text-lg mb-2">
                  Why do you want to join HBSA? <span className="text-error-500">*</span>
                </label>
                <p className="text-gray-600 text-base mb-4">
                  Share your motivation for joining HBSA, what you hope to contribute, and how you envision your involvement in the organization.
                </p>
              </div>
              
              <div className="relative">
                <textarea
                  value={generalResponses.whyJoinHBSA}
                  onChange={(e) => setGeneralResponses({ whyJoinHBSA: e.target.value })}
                  rows={8}
                  className={`
                    w-full px-6 py-4 border-2 rounded-xl text-gray-900 placeholder-gray-400 text-lg resize-vertical
                    focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all duration-300
                    ${errors.whyJoinHBSA ? 'border-error-300 bg-error-50' : 'border-gray-300 hover:border-primary-400'}
                  `}
                  placeholder="Share your motivation for joining HBSA, what you hope to contribute, and how you envision your involvement in the organization..."
                />
                <ChatBubbleLeftRightIcon className="absolute right-4 top-4 w-5 h-5 text-gray-400" />
              </div>
              
              {errors.whyJoinHBSA && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center text-error-600 text-sm font-medium"
                >
                  <span className="w-1 h-1 bg-error-500 rounded-full mr-2"></span>
                  {errors.whyJoinHBSA}
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-gray-600 text-center sm:text-left">
              <span className="font-semibold text-primary-600">
                {selectedCommittees.length}
              </span>
              <span className="mx-1">committee{selectedCommittees.length !== 1 ? 's' : ''} selected</span>
            </div>
            
            <div className="flex space-x-4 w-full sm:w-auto">
              <button
                onClick={handleBack}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-primary-300 hover:text-primary-700 transition-colors duration-200 flex items-center"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Back
              </button>
              
              <button
                onClick={handleNext}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-large hover:shadow-glow transition-all duration-300 flex items-center"
              >
                Review Application
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 