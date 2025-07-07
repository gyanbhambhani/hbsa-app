'use client'

import { useState } from 'react'
import { DocumentArrowUpIcon, CheckIcon, DocumentIcon } from '@heroicons/react/24/outline'

interface ResumeUploaderProps {
  onUpload: (file: File) => void
  uploadedFile?: string
  error?: string
}

export default function ResumeUploader({ onUpload, uploadedFile, error }: ResumeUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleFileSelect = (file: File) => {
    // Check file type
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
    
    if (!validTypes.includes(file.type)) {
      alert('Please upload a PDF or Word document (.pdf, .doc, .docx)')
      return
    }
    
    // Check file size (10MB limit)
    const maxSize = 10 * 1024 * 1024 // 10MB in bytes
    if (file.size > maxSize) {
      alert('File size must be less than 10MB')
      return
    }
    
    onUpload(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-gray-900 font-semibold text-lg mb-2">
          Resume Upload <span className="text-error-500">*</span>
        </label>
        <p className="text-gray-600 text-base">
          Upload your resume to complete your application. We accept PDF, DOC, and DOCX files.
        </p>
      </div>
      
      <div
        className={`
          border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300
          ${isDragging
            ? 'border-primary-500 bg-primary-50'
            : uploadedFile
            ? 'border-success-300 bg-success-50'
            : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {uploadedFile ? (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-success-500 rounded-full flex items-center justify-center mx-auto">
              <CheckIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="font-semibold text-success-700 text-lg">File uploaded successfully!</p>
              <p className="text-sm text-success-600 mt-1">{uploadedFile}</p>
            </div>
            <div className="text-sm text-gray-500">
              You can drag and drop a new file to replace this one
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <DocumentArrowUpIcon className="w-8 h-8 text-gray-400" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">
                Drop your resume here, or click to browse
              </p>
              <p className="text-sm text-gray-500">
                Supports PDF, DOC, and DOCX files (max 10MB)
              </p>
            </div>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleFileSelect(file)
              }}
              className="hidden"
              id="resume-upload"
            />
            <label
              htmlFor="resume-upload"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:shadow-large cursor-pointer transition-all duration-300"
            >
              <DocumentIcon className="w-4 h-4 mr-2" />
              Choose File
            </label>
          </div>
        )}
      </div>
      
      {error && (
        <div className="flex items-center text-error-600 text-sm font-medium">
          <span className="w-1 h-1 bg-error-500 rounded-full mr-2"></span>
          {error}
        </div>
      )}
    </div>
  )
} 