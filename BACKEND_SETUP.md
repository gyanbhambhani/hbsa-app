# HBSA Application Backend Setup Guide

## Overview
This guide will help you set up the backend API for the HBSA application form, including Google Sheets integration for data storage.

## Architecture
- **Frontend**: Next.js with React
- **Backend**: Next.js API Routes
- **File Storage**: Resume links (e.g., Google Drive)
- **Data Storage**: Google Sheets via Google Apps Script
- **Form State**: Zustand store

## Setup Steps

### 1. Environment Variables
Create a `.env.local` file in your project root:

```bash
# Google Apps Script URL (you'll get this after setting up Google Apps Script)
NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec

# UploadThing (already configured)
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id
```

### 2. Google Sheets Setup

#### Step 1: Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "HBSA Applications"
4. Copy the spreadsheet ID from the URL (the long string between /d/ and /edit)

#### Step 2: Set up Google Apps Script
1. Go to [Google Apps Script](https://script.google.com)
2. Create a new project
3. Name it "HBSA Application Handler"
4. Replace the default code with the content from `google-apps-script-template.js`
5. Update the `SPREADSHEET_ID` variable with your actual spreadsheet ID
6. Save the project

#### Step 3: Deploy as Web App
1. Click "Deploy" → "New deployment"
2. Choose "Web app" as the type
3. Set "Execute as" to "Me"
4. Set "Who has access" to "Anyone"
5. Click "Deploy"
6. Copy the web app URL
7. Add this URL to your `.env.local` as `NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL`

### 3. Test the Setup

#### Test Google Apps Script
1. In Google Apps Script, run the `testSetup()` function
2. Check your Google Sheet to see if a test row was added
3. Verify the headers are properly formatted

#### Test API Endpoint
```bash
# Start your development server
npm run dev

# Test the API endpoint
curl -X POST http://localhost:3000/api/submit \
  -H "Content-Type: application/json" \
  -d '{
    "basicInfo": {
      "name": "Test User",
      "graduatingYear": "2025",
      "coreValue": "Leadership"
    },
    "selectedCommittees": ["marketing"],
    "committeeResponses": {
      "marketing": {
        "q1": "Test response"
      }
    },
    "generalResponses": {
      "whyJoinHBSA": "I want to contribute"
    },
    "resumeUrl": "https://example.com/resume.pdf"
  }'
```

## Data Flow

### 1. Form Submission
```
User fills form → Form data stored in Zustand → Resume uploaded to UploadThing → 
API call to /api/submit → Google Apps Script → Google Sheets
```

### 2. File Handling
- Resume files are uploaded to UploadThing
- UploadThing returns a secure URL
- The URL is stored in Google Sheets
- Files are accessible via the URL

### 3. Data Structure in Google Sheets
| Column | Description |
|--------|-------------|
| Timestamp | When the application was submitted |
| Submission ID | Unique identifier for the submission |
| Name | Applicant's full name |
| Graduating Year | Expected graduation year |
| Core Value | Selected core value |
| Selected Committees | Comma-separated list of committees |
| Why Join HBSA | General response |
| Resume URL | Link to uploaded resume |
| Committee Responses | Individual committee question responses |

## Error Handling

### API Errors
- **400**: Invalid data (missing fields, invalid file URL)
- **500**: Server error (Google Sheets failure, network issues)

### Retry Logic
- Automatic retries with exponential backoff
- Maximum 3 attempts
- 10-second timeout per attempt

### Validation
- Required field validation
- File URL validation
- Committee response validation

## Security Considerations

### Google Apps Script
- Web app is publicly accessible (required for API calls)
- No sensitive data is exposed
- Rate limiting is handled by Google

### File Uploads
- UploadThing handles file security
- Files are stored securely
- URLs are temporary and secure

### Environment Variables
- Never commit `.env.local` to version control
- Use different URLs for development and production

## Production Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production
```bash
NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/PRODUCTION_SCRIPT_ID/exec
UPLOADTHING_SECRET=your_production_uploadthing_secret
UPLOADTHING_APP_ID=your_production_uploadthing_app_id
```

## Monitoring and Maintenance

### Google Sheets
- Monitor sheet size (Google Sheets has limits)
- Set up automated backups
- Consider archiving old applications

### API Monitoring
- Monitor API response times
- Set up error alerts
- Track submission success rates

### File Storage
- Monitor UploadThing usage
- Set up file retention policies
- Consider file size limits

## Troubleshooting

### Common Issues

#### Google Apps Script Errors
- **Permission denied**: Check spreadsheet sharing settings
- **Script not found**: Verify the web app URL
- **Timeout errors**: Check script execution time limits

#### API Errors
- **CORS issues**: Ensure proper headers
- **Validation errors**: Check form data structure
- **Network errors**: Verify internet connectivity

#### File Upload Issues
- **UploadThing errors**: Check API keys and configuration
- **File size limits**: Verify file size restrictions
- **File type restrictions**: Check allowed file types

### Debug Mode
Enable debug logging by adding to your `.env.local`:
```bash
DEBUG=true
```

## Alternative Storage Options

If you need to scale beyond Google Sheets, consider:

### 1. Airtable
- Better for complex data relationships
- More flexible API
- Built-in file attachments
- Monthly cost: $10-20

### 2. Supabase
- Full PostgreSQL database
- Real-time capabilities
- File storage included
- Free tier available

### 3. MongoDB Atlas
- NoSQL database
- Flexible schema
- Good for complex data
- Free tier available

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review Google Apps Script logs
3. Check browser developer tools
4. Contact the development team 