import { NextRequest, NextResponse } from 'next/server'
import { submitToGoogleSheets, FormSubmission } from '@/lib/googleSheets'

export async function POST(request: NextRequest) {
  try {
    const formData: FormSubmission = await request.json()

    // Validate required fields
    if (!formData.basicInfo.name || !formData.basicInfo.graduatingYear) {
      return NextResponse.json(
        { error: 'Missing required basic information' },
        { status: 400 }
      )
    }

    if (!formData.selectedCommittees || formData.selectedCommittees.length === 0) {
      return NextResponse.json(
        { error: 'No committees selected' },
        { status: 400 }
      )
    }

    if (!formData.resumeUrl) {
      return NextResponse.json(
        { error: 'Resume not uploaded' },
        { status: 400 }
      )
    }

    // Add submission timestamp
    formData.submittedAt = new Date().toISOString()

    // Submit to Google Sheets
    const success = await submitToGoogleSheets(formData)

    if (success) {
      return NextResponse.json(
        { success: true, message: 'Application submitted successfully' },
        { status: 200 }
      )
    } else {
      return NextResponse.json(
        { error: 'Failed to submit to Google Sheets' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error in submit API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 