export interface FormSubmission {
  basicInfo: {
    firstName: string
    lastName: string
    email: string
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
  const timeout = config?.timeout || 15000 // Reduced to 15 seconds for faster response
  const maxRetries = config?.retries || 1 // Reduced to 1 retry for faster failure

  console.log('Google Apps Script URL:', scriptUrl)
  console.log('Environment variable:', process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL)

  if (!scriptUrl) {
    console.log('No script URL found!')
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
  console.log('Formatted data being sent:', JSON.stringify(formattedData, null, 2))

  // Retry logic with improved error handling
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempt ${attempt}/${maxRetries} - Submitting to Google Apps Script...`)
      
      const controller = new AbortController()
      const timeoutId = setTimeout(() => {
        console.log(`Request timeout after ${timeout}ms`)
        controller.abort()
      }, timeout)

      const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      console.log(`Response status: ${response.status}`)
      console.log(`Response headers:`, Object.fromEntries(response.headers.entries()))

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`HTTP error response:`, errorText)
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`)
      }

      const result = await response.json()
      console.log(`Google Apps Script response:`, result)
      
      if (result.success) {
        console.log(`Submission successful on attempt ${attempt}`)
        return { 
          success: true, 
          submissionId: result.submissionId || generateSubmissionId(formData)
        }
      } else {
        throw new Error(result.error || 'Unknown error from Google Sheets')
      }

    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error)
      
      // Don't retry on certain errors
      if (error instanceof Error && (
        error.message.includes('Invalid form data') ||
        error.message.includes('Required fields are missing') ||
        error.message.includes('HTTP error! status: 400')
      )) {
        return { 
          success: false, 
          error: error.message
        }
      }
      
      if (attempt === maxRetries) {
        return { 
          success: false, 
          error: error instanceof Error ? error.message : 'Submission failed after retries'
        }
      }
      
      // Wait before retrying (exponential backoff with jitter)
      const delay = Math.pow(2, attempt) * 1000 + Math.random() * 1000
      console.log(`Waiting ${Math.round(delay)}ms before retry...`)
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }

  return { success: false, error: 'Submission failed' }
}

function validateFormSubmission(formData: FormSubmission): string | null {
  if (!formData.basicInfo?.firstName?.trim()) {
    return 'First name is required'
  }
  
  if (!formData.basicInfo?.lastName?.trim()) {
    return 'Last name is required'
  }
  
  if (!formData.basicInfo?.email?.trim()) {
    return 'Email is required'
  }
  
  if (!formData.basicInfo?.graduatingYear?.trim()) {
    return 'Graduating year is required'
  }
  
  if (!formData.basicInfo?.coreValue?.trim()) {
    return 'Core value is required'
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
  const nameHash = (formData.basicInfo.firstName + formData.basicInfo.lastName).replace(/\s+/g, '').toLowerCase().slice(0, 5)
  return `${nameHash}-${timestamp}`
}

// Helper function to format data for Google Sheets
export function formatFormDataForSheets(formData: FormSubmission) {
  // Send the data in the nested format that the new Google Apps Script expects
  return {
    basicInfo: {
      firstName: formData.basicInfo.firstName.trim(),
      lastName: formData.basicInfo.lastName.trim(),
      email: formData.basicInfo.email.trim(),
      graduatingYear: formData.basicInfo.graduatingYear.trim(),
      coreValue: formData.basicInfo.coreValue?.trim() || ''
    },
    selectedCommittees: formData.selectedCommittees,
    committeeResponses: formData.committeeResponses,
    generalResponses: {
      whyJoinHBSA: formData.generalResponses.whyJoinHBSA.trim()
    },
    resumeUrl: formData.resumeUrl.trim()
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

// Helper function to test Google Apps Script connection
export async function testGoogleAppsScriptConnection(scriptUrl?: string): Promise<{ success: boolean; error?: string }> {
  const url = scriptUrl || process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL
  
  if (!url) {
    return { success: false, error: 'No Google Apps Script URL configured' }
  }

  try {
    console.log('Testing connection to Google Apps Script...')
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    console.log(`Test response status: ${response.status}`)
    
    if (response.ok) {
      const result = await response.json()
      console.log('Test response:', result)
      return { success: true }
    } else {
      const errorText = await response.text()
      return { success: false, error: `HTTP ${response.status}: ${errorText}` }
    }
  } catch (error) {
    console.error('Connection test failed:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Connection test failed' 
    }
  }
} 