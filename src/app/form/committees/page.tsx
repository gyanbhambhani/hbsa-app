'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRightIcon, ArrowLeftIcon, CheckIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { useFormStore } from '@/store/formStore'
import { committees } from '@/data/committees'

export default function CommitteesPage() {
  const router = useRouter()
  const { selectedCommittees, setSelectedCommittees } = useFormStore()
  const [error, setError] = useState('')

  const handleCommitteeToggle = (committeeId: string) => {
    setError('')
    
    if (selectedCommittees.includes(committeeId)) {
      setSelectedCommittees(selectedCommittees.filter(id => id !== committeeId))
    } else {
      if (selectedCommittees.length >= 2) {
        setError('You can only select up to 2 committees')
        return
      }
      setSelectedCommittees([...selectedCommittees, committeeId])
    }
  }

  const handleNext = () => {
    if (selectedCommittees.length === 0) {
      setError('Please select at least one committee')
      return
    }
    
    if (selectedCommittees.length > 2) {
      setError('You can only select up to 2 committees')
      return
    }

    router.push(`/form/questions/${selectedCommittees[0]}`)
  }

  const handleBack = () => {
    router.push('/form/basic-info')
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
                <p className="text-sm text-gray-600">Step 2 of 4</p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="hidden sm:block">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  1
                </div>
                <div className="w-12 h-1 bg-primary-600 rounded-full"></div>
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  2
                </div>
                <div className="w-12 h-1 bg-gray-200 rounded-full">
                  <div className="w-0 h-1 bg-primary-600 rounded-full"></div>
                </div>
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
      <div className="max-w-6xl mx-auto px-6 py-12">
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
              className="inline-flex items-center px-4 py-2 bg-accent-100 text-accent-700 rounded-full text-sm font-medium"
            >
              <UserGroupIcon className="w-4 h-4 mr-2" />
              Committee Selection
            </motion.div>
            
            <h2 className="text-4xl font-bold text-gray-900">
              Choose Your Committees
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select up to <span className="font-bold text-accent-600 bg-accent-100 px-2 py-1 rounded-lg">2 committees</span> that align with your interests and goals. 
              You&apos;ll answer specific questions for each selected committee in the next steps.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-error-50 border border-error-200 rounded-xl p-4"
            >
              <div className="flex items-center">
                <div className="w-5 h-5 bg-error-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
                <p className="text-error-700 font-medium">{error}</p>
              </div>
            </motion.div>
          )}

          {/* Committees Grid */}
          <div className="grid gap-6">
            {committees.map((committee, index) => (
              <motion.div
                key={committee.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                className="group"
              >
                <div
                  onClick={() => handleCommitteeToggle(committee.id)}
                  className={`
                    relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300
                    ${selectedCommittees.includes(committee.id)
                      ? 'bg-gray-100 text-gray-900 shadow-large border-2 border-primary-600'
                      : 'bg-white hover:bg-gray-50 shadow-soft border-2 border-gray-200 hover:border-primary-300'
                    }
                    p-6
                  `}
                >
                  <div className="flex items-start space-x-6">
                    {/* Checkbox */}
                    <div className="flex-shrink-0 mt-1">
                      <div className={`
                        w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300
                        ${selectedCommittees.includes(committee.id)
                          ? 'border-primary-600 bg-primary-600'
                          : 'border-gray-300 group-hover:border-primary-400'
                        }
                      `}>
                        {selectedCommittees.includes(committee.id) && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-4 h-4 bg-white rounded flex items-center justify-center"
                          >
                            <CheckIcon className="w-3 h-3 text-primary-600" />
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className={`text-xl font-bold ${selectedCommittees.includes(committee.id) ? 'text-gray-900' : 'text-gray-900'}`}>
                          {committee.label}
                        </h3>
                        <span className={`
                          text-sm font-semibold px-3 py-1 rounded-full
                          ${selectedCommittees.includes(committee.id)
                            ? 'bg-primary-600 text-white'
                            : 'bg-primary-100 text-primary-700'
                          }
                        `}>
                          {committee.questions.length} question{committee.questions.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                      <p className={`text-base leading-relaxed ${selectedCommittees.includes(committee.id) ? 'text-gray-700' : 'text-gray-600'}`}>
                        {committee.description}
                      </p>
                    </div>
                  </div>

                  {/* Selection Indicator */}
                  {selectedCommittees.includes(committee.id) && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute top-4 right-4 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center shadow-medium"
                    >
                      <CheckIcon className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Selection Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-large border border-gray-100 p-6"
          >
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedCommittees.length} of 2 committees selected
                </div>
                <div className="flex justify-center lg:justify-start space-x-2">
                  {[1, 2].map((num) => (
                    <div
                      key={num}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        selectedCommittees.length >= num ? 'bg-primary-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-4 w-full lg:w-auto">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBack}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-primary-300 hover:text-primary-700 transition-colors duration-200 flex items-center"
                >
                  <ArrowLeftIcon className="w-4 h-4 mr-2" />
                  Back
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNext}
                  disabled={selectedCommittees.length === 0}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-large hover:shadow-glow transition-all duration-300 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Questions
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
} 