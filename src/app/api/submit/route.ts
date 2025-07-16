import { NextRequest, NextResponse } from 'next/server'
import { submitToGoogleSheets, FormSubmission, validateFileUrl } from '@/lib/googleSheets'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const formData: FormSubmission = await request.json()

    // Validate file URL
    if (!validateFileUrl(formData.resumeUrl)) {
      return NextResponse.json(
        { error: 'Invalid resume file URL' },
        { status: 400 }
      )
    }

    // Add submission timestamp
    formData.submittedAt = new Date().toISOString()

    // Submit to Google Sheets with enhanced error handling
    const result = await submitToGoogleSheets(formData)

    if (result.success) {
      // Send confirmation email
      try {
        await resend.emails.send({
          from: 'HBSA Applications <no-reply@resend.dev>',
          to: formData.basicInfo.email,
          subject: 'HBSA Application Received',
          html: `<p>Dear ${formData.basicInfo.name},</p>
<p>Thank you for submitting your application to HBSA. We have received your application and will review it soon.</p>
<p>If you have any questions, feel free to reply to this email.</p>
<p>Best regards,<br/>HBSA Team</p>`
        })
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError)
        // Do not fail the submission if email fails
      }
      return NextResponse.json(
        { 
          success: true, 
          message: 'Application submitted successfully',
          submissionId: result.submissionId
        },
        { status: 200 }
      )
    } else {
      return NextResponse.json(
        { 
          error: result.error || 'Failed to submit application',
          details: 'Please try again or contact support if the problem persists'
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error in submit API:', error)
    
    // Handle specific error types
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON data' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: 'An unexpected error occurred. Please try again.'
      },
      { status: 500 }
    )
  }
} 