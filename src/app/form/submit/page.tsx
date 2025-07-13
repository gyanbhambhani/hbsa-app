'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckIcon, ArrowLeftIcon, DocumentArrowUpIcon, UserIcon, UserGroupIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
import ResumeUploader from '@/components/ResumeUploader'
import { useFormStore } from '@/store/formStore'
import { committees } from '@/data/committees'

export default function SubmitPage() {
  const router = useRouter()
  const { 
    basicInfo, 
    selectedCommittees, 
    committeeResponses, 
    generalResponses, 
    resumeUrl, 
    setResumeUrl
  } = useFormStore()
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [uploadedFileName, setUploadedFileName] = useState('')

  const handleResumeUpload = (file: File) => {
    // Temporary: Store file info for display
    const fileName = file.name
    const fileSize = (file.size / 1024 / 1024).toFixed(2)
    const displayText = `${fileName} (${fileSize} MB)`
    setUploadedFileName(displayText)
    
    // For testing, use a placeholder URL
    setResumeUrl('https://uploadthing.com/f/test-resume.pdf')
  }

  const handleSubmit = async () => {
    if (!resumeUrl) {
      setSubmitError('Please upload your resume before submitting')
      return
    }

    setIsSubmitting(true)
    setSubmitError('')

    try {
      const formData = {
        basicInfo,
        selectedCommittees,
        committeeResponses,
        generalResponses,
        resumeUrl,
        submittedAt: new Date().toISOString()
      }

      console.log('Submitting form data:', formData)

      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      console.log('Submit response:', result)

      if (response.ok && result.success) {
        setSubmitSuccess(true)
      } else {
        setSubmitError(result.error || 'Failed to submit application. Please try again.')
      }
    } catch (error) {
      console.error('Submit error:', error)
      setSubmitError('Failed to submit application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBack = () => {
    if (selectedCommittees.length > 0) {
      router.push(`/form/questions/${selectedCommittees[selectedCommittees.length - 1]}`)
    } else {
      router.push('/form/committees')
    }
  }

  const stepNumber = 4 + selectedCommittees.length // After basic info, general, committees, and committee questions
  const totalSteps = 4 + selectedCommittees.length

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-24 h-24 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <CheckIcon className="w-12 h-12 text-white" />
            </motion.div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Application Submitted Successfully!
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-12 max-w-2xl mx-auto">
              Thank you for your interest in HBSA. We&apos;ll review your application and get back to you soon.
            </p>
            
            <button
              onClick={() => router.push('/')}
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl shadow-large hover:shadow-glow transition-all duration-300"
            >
              Return Home
            </button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50">
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
                  4
                </div>
                {selectedCommittees.length > 0 && (
                  <>
                    <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-yellow-500 rounded-full"></div>
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      {4 + selectedCommittees.length}
                    </div>
                  </>
                )}
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
              className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
            >
              <DocumentArrowUpIcon className="w-4 h-4 mr-2" />
              Submit Application
            </motion.div>
            
            <h2 className="text-4xl font-bold text-gray-900">
              Review & Submit Your Application
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Please review your application and upload your resume before submitting.
            </p>
          </div>

          {/* Resume Upload */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-large border border-gray-100 p-8"
          >
            <ResumeUploader
              onUpload={handleResumeUpload}
              uploadedFile={uploadedFileName || resumeUrl}
              error={submitError && !resumeUrl ? submitError : undefined}
            />
          </motion.div>

          {/* Form Review */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 text-center">Application Review</h3>
            
            {/* Basic Info */}
            <div className="bg-white rounded-2xl shadow-large border border-gray-100 p-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center mr-4">
                  <UserIcon className="w-5 h-5 text-primary-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900">Basic Information</h4>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="font-semibold text-sm text-gray-500 uppercase tracking-wide mb-1">Name</p>
                  <p className="text-lg text-gray-900">{basicInfo.name}</p>
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-500 uppercase tracking-wide mb-1">Graduating Year</p>
                  <p className="text-lg text-gray-900">{basicInfo.graduatingYear}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="font-semibold text-sm text-gray-500 uppercase tracking-wide mb-2">Core Value Response</p>
                  <p className="text-gray-700 leading-relaxed">{basicInfo.coreValue}</p>
                </div>
              </div>
            </div>

            {/* Selected Committees */}
            <div className="bg-white rounded-2xl shadow-large border border-gray-100 p-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-accent-100 rounded-xl flex items-center justify-center mr-4">
                  <UserGroupIcon className="w-5 h-5 text-accent-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900">Selected Committees</h4>
              </div>
              
              <div className="space-y-4">
                {selectedCommittees.map((committeeId) => {
                  const committee = committees.find(c => c.id === committeeId)
                  return (
                    <div key={committeeId} className="border-l-4 border-accent-500 pl-6 py-3 bg-accent-50 rounded-r-xl">
                      <p className="font-bold text-lg text-gray-900">{committee?.label}</p>
                      <p className="text-gray-600">{committee?.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* General Questions */}
            <div className="bg-white rounded-2xl shadow-large border border-gray-100 p-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-success-100 rounded-xl flex items-center justify-center mr-4">
                  <ChatBubbleLeftRightIcon className="w-5 h-5 text-success-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900">General Questions</h4>
              </div>
              
              <div>
                <p className="font-semibold text-sm text-gray-500 uppercase tracking-wide mb-2">Why do you want to join HBSA?</p>
                <p className="text-gray-700 leading-relaxed">{generalResponses.whyJoinHBSA}</p>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={handleBack}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-primary-300 hover:text-primary-700 transition-colors duration-200 flex items-center"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back
            </button>
            
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !resumeUrl}
              className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-large hover:shadow-glow transition-all duration-300 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  Submit Application
                  <CheckIcon className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          </div>

          {/* Error Message */}
          {submitError && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-error-50 border border-error-200 rounded-xl p-4 text-error-700"
            >
              <p className="font-medium">{submitError}</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
} 