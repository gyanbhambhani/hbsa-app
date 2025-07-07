'use client'

import { useState } from 'react'
import { motion, Variants } from 'framer-motion'

interface AnimatedInputProps {
  label: string
  type?: string
  value: string
  onChange: (value: string) => void
  error?: string
  required?: boolean
  placeholder?: string
  className?: string
  disabled?: boolean
}

const labelVariants: Variants = {
  initial: { 
    y: 0, 
    scale: 1,
    color: '#6B7280'
  },
  focused: { 
    y: -20, 
    scale: 0.85,
    color: '#003262'
  },
  filled: { 
    y: -20, 
    scale: 0.85,
    color: '#003262'
  }
}

const inputVariants: Variants = {
  initial: { 
    borderColor: '#D1D5DB'
  },
  focused: { 
    borderColor: '#003262',
    boxShadow: '0 0 0 3px rgba(0, 50, 98, 0.1)'
  },
  error: { 
    borderColor: '#EF4444',
    boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1)'
  }
}

export default function AnimatedInput({
  label,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  placeholder,
  className = '',
  disabled = false
}: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const isFilled = value.length > 0

  const baseClasses = 'relative w-full'
  const inputClasses = `w-full px-4 py-3 border-2 rounded-lg bg-transparent transition-all duration-200 focus:outline-none ${
    disabled ? 'bg-gray-100 cursor-not-allowed' : ''
  } ${className}`

  return (
    <motion.div 
      className={baseClasses}
      initial="initial"
      animate={error ? "error" : isFocused ? "focused" : "initial"}
    >
      {/* Input */}
      <motion.input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={isFocused ? placeholder : ''}
        required={required}
        disabled={disabled}
        className={inputClasses}
        variants={inputVariants}
      />
      
      {/* Floating Label */}
      <motion.label
        className="absolute left-4 top-3 pointer-events-none origin-left"
        variants={labelVariants}
        animate={isFocused || isFilled ? "focused" : "initial"}
        transition={{ duration: 0.2 }}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </motion.label>
      
      {/* Error Message */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm mt-2"
        >
          {error}
        </motion.p>
      )}
      
      {/* Focus Indicator */}
      {isFocused && !error && (
        <motion.div
          className="absolute inset-0 border-2 border-haasBlue rounded-lg pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </motion.div>
  )
} 