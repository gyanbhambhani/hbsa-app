export interface FormSubmission {
  basicInfo: {
    name: string
    graduatingYear: string
    coreValue: string
  }
  selectedCommittees: string[]
  committeeResponses: {
    [committeeId: string]: {
      [questionId: string]: string
    }
  }
  generalResponses: {
    whyJoinHBSA: string
  }
  resumeUrl: string
  submittedAt: string
}

export interface GoogleSheetsConfig {
  scriptUrl: string
  timeout?: number
  retries?: number
}

export async function submitToGoogleSheets(
  formData: FormSubmission, 
  config?: GoogleSheetsConfig
): Promise<{ success: boolean; error?: string; submissionId?: string }> {
  const scriptUrl = config?.scriptUrl || process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL
  const timeout = config?.timeout || 10000
  const maxRetries = config?.retries || 3

  if (!scriptUrl) {
    return { 
      success: false, 
      error: 'Google Apps Script URL not configured' 
    }
  }

  // Validate form data
  const validationError = validateFormSubmission(formData)
  if (validationError) {
    return { 
      success: false, 
      error: validationError 
    }
  }

  // Format data for Google Sheets
  const formattedData = formatFormDataForSheets(formData)

  // Retry logic
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), timeout)

      const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      
      if (result.success) {
        return { 
          success: true, 
          submissionId: result.submissionId || generateSubmissionId(formData)
        }
      } else {
        throw new Error(result.error || 'Unknown error from Google Sheets')
      }

    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error)
      
      if (attempt === maxRetries) {
        return { 
          success: false, 
          error: error instanceof Error ? error.message : 'Submission failed after retries'
        }
      }
      
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000))
    }
  }

  return { success: false, error: 'Submission failed' }
}

function validateFormSubmission(formData: FormSubmission): string | null {
  if (!formData.basicInfo?.name?.trim()) {
    return 'Name is required'
  }
  
  if (!formData.basicInfo?.graduatingYear?.trim()) {
    return 'Graduating year is required'
  }
  
  if (!formData.selectedCommittees?.length) {
    return 'At least one committee must be selected'
  }
  
  if (!formData.resumeUrl?.trim()) {
    return 'Resume upload is required'
  }
  
  if (!formData.generalResponses?.whyJoinHBSA?.trim()) {
    return 'Why join HBSA response is required'
  }
  
  // Validate committee responses
  for (const committeeId of formData.selectedCommittees) {
    const responses = formData.committeeResponses[committeeId]
    if (!responses || Object.keys(responses).length === 0) {
      return `Responses required for committee: ${committeeId}`
    }
  }
  
  return null
}

function generateSubmissionId(formData: FormSubmission): string {
  const timestamp = Date.now()
  const nameHash = formData.basicInfo.name.replace(/\s+/g, '').toLowerCase().slice(0, 5)
  return `${nameHash}-${timestamp}`
}

// Helper function to format data for Google Sheets
export function formatFormDataForSheets(formData: FormSubmission) {
  const { basicInfo, selectedCommittees, committeeResponses, generalResponses, resumeUrl } = formData
  
  // Flatten committee responses
  const flattenedCommitteeResponses: { [key: string]: string } = {}
  selectedCommittees.forEach(committeeId => {
    const responses = committeeResponses[committeeId] || {}
    Object.entries(responses).forEach(([questionId, response]) => {
      flattenedCommitteeResponses[`${committeeId}_${questionId}`] = response
    })
  })

  return {
    timestamp: new Date().toISOString(),
    submissionId: generateSubmissionId(formData),
    name: basicInfo.name.trim(),
    graduatingYear: basicInfo.graduatingYear.trim(),
    coreValue: basicInfo.coreValue?.trim() || '',
    selectedCommittees: selectedCommittees.join(', '),
    whyJoinHBSA: generalResponses.whyJoinHBSA.trim(),
    resumeUrl: resumeUrl.trim(),
    ...flattenedCommitteeResponses
  }
}

// Helper function to validate file URLs
export function validateFileUrl(url: string): boolean {
  try {
    const urlObj = new URL(url)
    return urlObj.protocol === 'https:' && urlObj.hostname.length > 0
  } catch {
    return false
  }
} 