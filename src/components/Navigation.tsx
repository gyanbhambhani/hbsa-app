'use client'

import { useRouter } from 'next/navigation'
import AnimatedButton from './AnimatedButton'

interface NavigationProps {
  currentStep: number
  totalSteps: number
}

export default function Navigation({ currentStep, totalSteps }: NavigationProps) {
  const router = useRouter()

  const getStepPath = (step: number) => {
    // This is a simplified version - in practice, you'd need to track the actual current step
    // For now, we'll use the basic flow
    switch (step) {
      case 1:
        return '/form/basic-info'
      case 2:
        return '/form/committees'
      case 3:
        return '/form/general'
      case 4:
        return '/form/submit'
      default:
        return '/form/basic-info'
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      router.push(getStepPath(currentStep - 1))
    }
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      router.push(getStepPath(currentStep + 1))
    }
  }

  return (
    <div className="flex justify-between items-center mt-8">
      <AnimatedButton
        onClick={handlePrevious}
        variant="secondary"
        disabled={currentStep === 1}
      >
        Previous
      </AnimatedButton>

      <div className="text-haasText">
        Step {currentStep} of {totalSteps}
      </div>

      <AnimatedButton
        onClick={handleNext}
        variant="primary"
        disabled={currentStep === totalSteps}
      >
        Next
      </AnimatedButton>
    </div>
  )
} 