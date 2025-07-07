'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRightIcon, ArrowLeftIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
import QuestionBlock from '@/components/QuestionBlock'
import { useFormStore } from '@/store/formStore'
import { committees, Committee, Question } from '@/data/committees'

export default function CommitteeQuestionsPage() {
  const router = useRouter()
  const params = useParams()
  const committeeId = params.committee as string
  
  const { 
    selectedCommittees, 
    committeeResponses, 
    setCommitteeResponse 
  } = useFormStore()
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [committee, setCommittee] = useState<Committee | null>(null)

  useEffect(() => {
    if (!selectedCommittees.includes(committeeId)) {
      router.push('/form/committees')
      return
    }

    const foundCommittee = committees.find(c => c.id === committeeId)
    if (!foundCommittee) {
      router.push('/form/committees')
      return
    }

    setCommittee(foundCommittee)
  }, [committeeId, selectedCommittees, router])

  const validateForm = () => {
    if (!committee) return false

    const newErrors: { [key: string]: string } = {}
    
    committee.questions.forEach((question: Question) => {
      if (question.required) {
        const response = committeeResponses[committeeId]?.[question.id]
        if (!response || (typeof response === 'string' && !response.trim())) {
          newErrors[question.id] = 'This field is required'
        }
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (!validateForm()) return

    const currentIndex = selectedCommittees.indexOf(committeeId)
    const nextCommitteeId = selectedCommittees[currentIndex + 1]
    
    if (nextCommitteeId) {
      router.push(`/form/questions/${nextCommitteeId}`)
    } else {
      router.push('/form/general')
    }
  }

  const handlePrevious = () => {
    const currentIndex = selectedCommittees.indexOf(committeeId)
    const prevCommitteeId = selectedCommittees[currentIndex - 1]
    
    if (prevCommitteeId) {
      router.push(`/form/questions/${prevCommitteeId}`)
    } else {
      router.push('/form/committees')
    }
  }

  if (!committee) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  const currentIndex = selectedCommittees.indexOf(committeeId)
  const stepNumber = 2 + currentIndex + 1
  const totalSteps = 2 + selectedCommittees.length + 2

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
              Committee Questions
            </motion.div>
            
            <h2 className="text-4xl font-bold text-gray-900">
              {committee.label}
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {committee.description}
            </p>
            
            <div className="inline-flex items-center px-4 py-2 bg-accent-100 text-accent-700 rounded-full text-sm font-medium">
              <span className="mr-2">Committee {currentIndex + 1}</span>
              <span>of {selectedCommittees.length}</span>
            </div>
          </div>

          {/* Questions */}
          <div className="bg-white rounded-2xl shadow-large border border-gray-100 p-8">
            <div className="space-y-8">
              {committee.questions.map((question: Question, index: number) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <QuestionBlock
                    question={question}
                    value={committeeResponses[committeeId]?.[question.id] || ''}
                    onChange={(value) => setCommitteeResponse(committeeId, question.id, value as string)}
                    error={errors[question.id]}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-gray-600 text-center sm:text-left">
              <span className="font-semibold text-primary-600">
                {currentIndex + 1}
              </span>
              <span className="mx-1">of</span>
              <span className="font-semibold text-primary-600">
                {selectedCommittees.length}
              </span>
              <span className="ml-1">committees</span>
            </div>
            
            <div className="flex space-x-4 w-full sm:w-auto">
              <button
                onClick={handlePrevious}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-primary-300 hover:text-primary-700 transition-colors duration-200 flex items-center"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Back
              </button>
              
              <button
                onClick={handleNext}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-large hover:shadow-glow transition-all duration-300 flex items-center"
              >
                {currentIndex + 1 === selectedCommittees.length ? 'Continue to General Questions' : 'Next Committee'}
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 