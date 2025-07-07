'use client'

import { motion } from 'framer-motion'

interface AnimatedProgressProps {
  current: number
  total: number
  className?: string
  showPercentage?: boolean
  animated?: boolean
}

export default function AnimatedProgress({
  current,
  total,
  className = '',
  showPercentage = true,
  animated = true
}: AnimatedProgressProps) {
  const percentage = Math.min((current / total) * 100, 100)
  
  const progressVariants = {
    initial: { width: 0 },
    animate: { 
      width: `${percentage}%`,
      transition: { 
        duration: animated ? 0.8 : 0,
        ease: "easeOut" as const
      }
    }
  }

  const glowVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: [0, 1, 0],
      transition: { 
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Progress Bar Container */}
      <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-haasBlue/20 to-calGold/20" />
        
        {/* Progress Fill */}
        <motion.div
          className="h-full bg-gradient-to-r from-haasBlue to-calGold rounded-full relative"
          variants={progressVariants}
          initial="initial"
          animate="animate"
        >
          {/* Glow Effect */}
          {animated && (
            <motion.div
              className="absolute inset-0 bg-white/30 rounded-full"
              variants={glowVariants}
              initial="initial"
              animate="animate"
            />
          )}
          
          {/* Shimmer Effect */}
          {animated && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          )}
        </motion.div>
      </div>
      
      {/* Progress Text */}
      {showPercentage && (
        <div className="flex justify-between items-center mt-2">
          <motion.span
            className="text-sm font-medium text-haasText"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Step {current} of {total}
          </motion.span>
          
          <motion.span
            className="text-sm font-bold text-haasBlue"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            {Math.round(percentage)}%
          </motion.span>
        </div>
      )}
      
      {/* Progress Dots */}
      <div className="flex justify-center space-x-2 mt-3">
        {Array.from({ length: total }, (_, index) => (
          <motion.div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index < current ? 'bg-calGold' : 'bg-gray-300'
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>
    </div>
  )
} 