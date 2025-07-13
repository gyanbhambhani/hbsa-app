'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
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
      router.push('/form/submit')
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
  const stepNumber = 3 + currentIndex // After basic info, general, committees
  const totalSteps = 4 + selectedCommittees.length // +1 for submit

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">HBSA Application</h1>
              <p className="text-sm text-gray-600">Step {stepNumber} of {totalSteps}</p>
            </div>
            
            {/* Progress Bar */}
            <div className="hidden sm:block">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  1
                </div>
                <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-yellow-500 rounded-full"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  2
                </div>
                <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-yellow-500 rounded-full"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  3
                </div>
                <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-yellow-500 rounded-full"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  {3 + currentIndex + 1}
                </div>
                {currentIndex + 1 < selectedCommittees.length && (
                  <>
                    <div className="w-12 h-1 bg-gray-200 rounded-full"></div>
                    <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-sm font-semibold">
                      {3 + currentIndex + 2}
                    </div>
                  </>
                )}
                <div className="w-12 h-1 bg-gray-200 rounded-full"></div>
                <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-sm font-semibold">
                  {4 + selectedCommittees.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {/* Page Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
              <ChatBubbleLeftRightIcon className="w-4 h-4 mr-2" />
              Committee Questions
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900">
              {committee.label}
            </h2>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {committee.description}
            </p>
            
            <div className="inline-flex items-center px-4 py-2 bg-accent-100 text-accent-700 rounded-full text-sm font-medium">
              <span className="mr-2">Committee {currentIndex + 1}</span>
              <span>of {selectedCommittees.length}</span>
            </div>
          </div>

          {/* Questions */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="space-y-6">
              {committee.questions.map((question: Question) => (
                <div key={question.id}>
                  <QuestionBlock
                    question={question}
                    value={committeeResponses[committeeId]?.[question.id] || ''}
                    onChange={(value) => setCommitteeResponse(committeeId, question.id, value as string)}
                    error={errors[question.id]}
                  />
                </div>
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
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:border-primary-300 hover:text-primary-700 transition-colors duration-200 flex items-center"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Back
              </button>
              
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-yellow-500 text-white rounded-lg font-medium hover:from-blue-700 hover:to-yellow-400 transition-all duration-200 flex items-center"
              >
                {currentIndex + 1 === selectedCommittees.length ? 'Review Application' : 'Next Committee'}
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 