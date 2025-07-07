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

export async function submitToGoogleSheets(formData: FormSubmission): Promise<boolean> {
  try {
    // Replace this URL with your Google Apps Script web app URL
    const GOOGLE_APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL || ''
    
    if (!GOOGLE_APPS_SCRIPT_URL) {
      console.error('Google Apps Script URL not configured')
      return false
    }

    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    return result.success === true
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error)
    return false
  }
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
    name: basicInfo.name,
    graduatingYear: basicInfo.graduatingYear,
    coreValue: basicInfo.coreValue,
    selectedCommittees: selectedCommittees.join(', '),
    whyJoinHBSA: generalResponses.whyJoinHBSA,
    resumeUrl,
    ...flattenedCommitteeResponses
  }
} 