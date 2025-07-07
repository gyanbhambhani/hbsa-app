'use client'

import { useState } from 'react'
import { Question } from '@/data/committees'
import { CheckIcon } from '@heroicons/react/24/outline'

interface QuestionBlockProps {
  question: Question
  value: string | string[]
  onChange: (value: string | string[]) => void
  error?: string
}

export default function QuestionBlock({ 
  question, 
  value, 
  onChange, 
  error 
}: QuestionBlockProps) {
  const [wordCount, setWordCount] = useState(0)

  const handleTextChange = (text: string) => {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0)
    setWordCount(words.length)
    onChange(text)
  }

  const handleMultiSelectChange = (option: string) => {
    const currentValues = Array.isArray(value) ? value : []
    const newValues = currentValues.includes(option)
      ? currentValues.filter(v => v !== option)
      : [...currentValues, option]
    onChange(newValues)
  }

  const renderInput = () => {
    switch (question.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            className={`
              w-full px-4 py-3 border-2 rounded-xl text-gray-900 placeholder-gray-400 text-lg
              focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all duration-300
              ${error ? 'border-error-300 bg-error-50' : 'border-gray-300 hover:border-primary-400'}
            `}
            placeholder="Enter your answer..."
          />
        )

      case 'textarea':
        return (
          <div className="space-y-3">
            <textarea
              value={value as string}
              onChange={(e) => handleTextChange(e.target.value)}
              rows={6}
              className={`
                w-full px-4 py-3 border-2 rounded-xl text-gray-900 placeholder-gray-400 text-lg resize-vertical
                focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all duration-300
                ${error ? 'border-error-300 bg-error-50' : 'border-gray-300 hover:border-primary-400'}
              `}
              placeholder="Enter your answer..."
            />
            {question.wordLimit && (
              <div className={`text-sm font-medium ${
                wordCount > question.wordLimit ? 'text-error-600' : 'text-gray-500'
              }`}>
                {wordCount} / {question.wordLimit} words
              </div>
            )}
          </div>
        )

      case 'url':
        return (
          <input
            type="url"
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            className={`
              w-full px-4 py-3 border-2 rounded-xl text-gray-900 placeholder-gray-400 text-lg
              focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all duration-300
              ${error ? 'border-error-300 bg-error-50' : 'border-gray-300 hover:border-primary-400'}
            `}
            placeholder="https://example.com"
          />
        )

      case 'select':
        return (
          <select
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            className={`
              w-full px-4 py-3 border-2 rounded-xl text-gray-900 bg-white text-lg appearance-none
              focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all duration-300
              ${error ? 'border-error-300 bg-error-50' : 'border-gray-300 hover:border-primary-400'}
            `}
          >
            <option value="">Select an option...</option>
            {question.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )

      case 'multiselect':
        return (
          <div className="space-y-3">
            {question.options?.map((option) => {
              const isSelected = Array.isArray(value) && value.includes(option)
              return (
                <label 
                  key={option} 
                  className={`
                    flex items-center space-x-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300
                    ${isSelected 
                      ? 'border-primary-500 bg-primary-50' 
                      : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                    }
                  `}
                >
                  <div className={`
                    w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all duration-300
                    ${isSelected 
                      ? 'border-primary-500 bg-primary-500' 
                      : 'border-gray-300'
                    }
                  `}>
                    {isSelected && (
                      <CheckIcon className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <span className={`text-lg ${isSelected ? 'text-primary-700 font-medium' : 'text-gray-700'}`}>
                    {option}
                  </span>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleMultiSelectChange(option)}
                    className="sr-only"
                  />
                </label>
              )
            })}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-gray-900 font-semibold text-lg mb-2">
          {question.label}
          {question.required && <span className="text-error-500 ml-1">*</span>}
        </label>
      </div>
      
      {renderInput()}
      
      {error && (
        <div className="flex items-center text-error-600 text-sm font-medium">
          <span className="w-1 h-1 bg-error-500 rounded-full mr-2"></span>
          {error}
        </div>
      )}
      
      {question.wordLimit && wordCount > question.wordLimit && (
        <div className="flex items-center text-error-600 text-sm font-medium">
          <span className="w-1 h-1 bg-error-500 rounded-full mr-2"></span>
          Word limit exceeded. Please keep your response under {question.wordLimit} words.
        </div>
      )}
    </div>
  )
} 