'use client'

import { ReactNode } from 'react'
import { motion, Variants } from 'framer-motion'

interface AnimatedButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'success' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
  fullWidth?: boolean
}

const buttonVariants: Variants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2 }
  },
  tap: { 
    scale: 0.95,
    transition: { duration: 0.1 }
  },
  disabled: { 
    scale: 1,
    opacity: 0.6
  }
}

const rippleVariants: Variants = {
  initial: { 
    scale: 0, 
    opacity: 0.5 
  },
  animate: { 
    scale: 4, 
    opacity: 0,
    transition: { duration: 0.6 }
  }
}

export default function AnimatedButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  fullWidth = false
}: AnimatedButtonProps) {
  const baseClasses = 'relative overflow-hidden font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variantClasses = {
    primary: 'bg-calGold text-haasBlue hover:bg-yellow-400 focus:ring-calGold',
    secondary: 'bg-haasBlue text-white hover:bg-blue-800 focus:ring-haasBlue',
    success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500'
  }
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }
  
  const widthClass = fullWidth ? 'w-full' : ''
  
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`

  return (
    <motion.button
      variants={buttonVariants}
      initial="initial"
      whileHover={disabled ? "disabled" : "hover"}
      whileTap={disabled ? "disabled" : "tap"}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      <motion.span
        className="absolute inset-0 bg-white rounded-full"
        variants={rippleVariants}
        initial="initial"
        whileHover="animate"
        style={{ 
          left: '50%', 
          top: '50%', 
          transform: 'translate(-50%, -50%)',
          width: '20px',
          height: '20px'
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
} 