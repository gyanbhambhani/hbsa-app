'use client'

import { useState } from 'react'
import { CheckIcon } from '@heroicons/react/24/outline'

interface ResumeLinkInputProps {
  value: string
  onChange: (url: string) => void
  error?: string
}

export default function ResumeLinkInput({ value, onChange, error }: ResumeLinkInputProps) {
  const [touched, setTouched] = useState(false)

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-gray-900 font-semibold text-lg mb-2">
          Resume Google Drive Link <span className="text-error-500">*</span>
        </label>
        <p className="text-gray-600 text-base">
          Please paste a Google Drive link to your resume. <br />
          <span className="font-semibold">Important:</span> Make sure sharing is set to <span className="font-semibold">Anyone at UC Berkeley</span> can view. <br />
          <span className="text-sm text-gray-500">(Go to your file in Google Drive → Share → General access: Anyone with the link → Restrict to: Anyone at UC Berkeley)</span>
        </p>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="url"
          value={value}
          onChange={e => onChange(e.target.value)}
          onBlur={() => setTouched(true)}
          className={`w-full px-4 py-3 border-2 rounded-xl text-gray-900 placeholder-gray-400 text-lg focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all duration-300 ${error && touched ? 'border-error-300 bg-error-50' : 'border-gray-300 hover:border-primary-400'}`}
          placeholder="https://drive.google.com/..."
          required
        />
        {value && !error && (
          <CheckIcon className="w-6 h-6 text-success-500" />
        )}
      </div>
      {error && touched && (
        <div className="flex items-center text-error-600 text-sm font-medium">
          <span className="w-1 h-1 bg-error-500 rounded-full mr-2"></span>
          {error}
        </div>
      )}
    </div>
  )
} 