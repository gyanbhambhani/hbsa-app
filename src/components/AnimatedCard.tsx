'use client'

import { ReactNode } from 'react'
import { motion, Variants } from 'framer-motion'

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  interactive?: boolean
  delay?: number
}

const cardVariants: Variants = {
  initial: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1
    }
  }
}

const shadowVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  hover: { 
    opacity: 0.8,
    scale: 1.05,
    transition: { duration: 0.2 }
  }
}

export default function AnimatedCard({
  children,
  className = '',
  onClick,
  interactive = false,
  delay = 0
}: AnimatedCardProps) {
  const baseClasses = 'bg-white rounded-lg shadow-lg relative overflow-hidden'
  const interactiveClasses = interactive ? 'cursor-pointer' : ''
  const cardClasses = `${baseClasses} ${interactiveClasses} ${className}`

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover={interactive ? "hover" : undefined}
      whileTap={interactive ? "tap" : undefined}
      onClick={onClick}
      className={cardClasses}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Animated shadow effect */}
      {interactive && (
        <motion.div
          variants={shadowVariants}
          className="absolute inset-0 bg-gradient-to-br from-haasBlue/5 to-calGold/5 rounded-lg"
          style={{ zIndex: -1 }}
        />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Hover border effect */}
      {interactive && (
        <motion.div
          className="absolute inset-0 border-2 border-transparent rounded-lg"
          initial={{ borderColor: 'transparent' }}
          whileHover={{ 
            borderColor: 'rgba(0, 50, 98, 0.1)',
            transition: { duration: 0.2 }
          }}
        />
      )}
    </motion.div>
  )
} 