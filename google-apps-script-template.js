/**
 * Google Apps Script for HBSA Application Form
 * 
 * Instructions:
 * 1. Go to https://script.google.com/
 * 2. Create a new project
 * 3. Replace the default code with this template
 * 4. Deploy as a web app (Execute as: Me, Who has access: Anyone)
 * 5. Copy the web app URL and set it as NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL in your .env.local
 */

// Configuration - Update these values
const SPREADSHEET_ID = '10Tsnpi-COzUKb4e5Sz36h3xsbcbtahlk6atnucMTDro'; // Your HBSA Applications spreadsheet
const SHEET_NAME = 'HBSA_Fall_2025_Applications'; // Name of the sheet tab

// Handle GET requests (for testing)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      success: false,
      error: 'This endpoint only accepts POST requests',
      message: 'Please use POST method to submit applications'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Handle POST requests (for form submissions)
function doPost(e) {
  try {
    // Check if postData exists
    if (!e || !e.postData) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'No data received',
          message: 'Please send form data in the request body'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Parse the incoming JSON data
    const formData = JSON.parse(e.postData.contents);
    
    // Validate the data
    if (!validateFormData(formData)) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'Invalid form data',
          message: 'Required fields are missing'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Write to Google Sheets
    const success = writeToSheet(formData);
    
    if (success) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          submissionId: formData.submissionId,
          message: 'Application submitted successfully'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    } else {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'Failed to write to spreadsheet',
          message: 'Please try again or contact support'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
  } catch (error) {
    console.error('Error processing submission:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: 'Internal server error: ' + error.message,
        message: 'Please try again later'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function validateFormData(data) {
  // Basic validation
  if (!data.name || !data.graduatingYear || !data.selectedCommittees || !data.resumeUrl) {
    return false;
  }
  return true;
}

function writeToSheet(formData) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      // Create the sheet if it doesn't exist
      const newSheet = spreadsheet.insertSheet(SHEET_NAME);
      setupSheetHeaders(newSheet);
      return writeToSheet(formData); // Recursive call with new sheet
    }
    
    // Prepare row data
    const rowData = [
      formData.timestamp,
      formData.submissionId,
      formData.name,
      formData.graduatingYear,
      formData.coreValue,
      formData.selectedCommittees,
      formData.whyJoinHBSA,
      formData.resumeUrl
    ];
    
    // Add committee-specific responses
    // This will add columns for each committee question
    const committeeColumns = extractCommitteeResponses(formData);
    rowData.push(...committeeColumns);
    
    // Append the row
    sheet.appendRow(rowData);
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, rowData.length);
    
    return true;
    
  } catch (error) {
    console.error('Error writing to sheet:', error);
    return false;
  }
}

function setupSheetHeaders(sheet) {
  const headers = [
    'Timestamp',
    'Submission ID',
    'Name',
    'Graduating Year',
    'Core Value',
    'Selected Committees',
    'Why Join HBSA',
    'Resume URL'
  ];
  
  // Add headers for committee questions
  const committeeHeaders = getCommitteeQuestionHeaders();
  headers.push(...committeeHeaders);
  
  // Set headers
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Style headers
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#4285f4');
  headerRange.setFontColor('white');
  
  // Freeze header row
  sheet.setFrozenRows(1);
}

function extractCommitteeResponses(formData) {
  const responses = [];
  
  // Extract all committee responses from the flattened data
  Object.keys(formData).forEach(key => {
    if (key.includes('_') && !['timestamp', 'submissionId', 'name', 'graduatingYear', 'coreValue', 'selectedCommittees', 'whyJoinHBSA', 'resumeUrl'].includes(key)) {
      responses.push(formData[key] || '');
    }
  });
  
  return responses;
}

function getCommitteeQuestionHeaders() {
  // Actual committee structure from your codebase
  const headers = [];
  
  // Sustainability Committee
  headers.push('sustainability_growth');
  headers.push('sustainability_projects');
  
  // MBA and Alumni Relations Committee
  headers.push('mba-alumni-relations_leadership-impact');
  headers.push('mba-alumni-relations_admired-alumnus');
  
  // Marketing Committee
  headers.push('marketing_workload-management');
  headers.push('marketing_initiative-idea');
  headers.push('marketing_portfolio');
  
  // Strategic Initiatives Committee
  headers.push('strategic-initiatives_strategic-project');
  headers.push('strategic-initiatives_qualifications');
  
  // Student Affairs Committee
  headers.push('student-affairs_interest-contribution');
  headers.push('student-affairs_event-ideas');
  headers.push('student-affairs_subcommittees');
  
  // Integration Committee
  headers.push('integration_improvement-area');
  headers.push('integration_cross-program-initiative');
  headers.push('integration_community-meaning');
  
  // Transfer Development Committee
  headers.push('transfer-development_is-transfer');
  headers.push('transfer-development_transfer-school');
  headers.push('transfer-development_transfer-improvements');
  headers.push('transfer-development_role-support');
  headers.push('transfer-development_transfer-subcommittees');
  
  // Professional Development Committee
  headers.push('professional-development_qualifications-pd');
  headers.push('professional-development_new-ideas');
  headers.push('professional-development_industry-trends');
  
  // Entrepreneurship Committee
  headers.push('entrepreneurship_pitching-experience');
  headers.push('entrepreneurship_fund-management');
  headers.push('entrepreneurship_digital-portal');
  headers.push('entrepreneurship_personality-word');
  headers.push('entrepreneurship_skill-word');
  headers.push('entrepreneurship_favorite-word');
  headers.push('entrepreneurship_pitch-decks');
  
  return headers;
}

// Optional: Function to test the setup
function testSetup() {
  const testData = {
    timestamp: new Date().toISOString(),
    submissionId: 'test-123',
    name: 'Test User',
    graduatingYear: '2025',
    coreValue: 'Leadership',
    selectedCommittees: 'marketing, sustainability',
    whyJoinHBSA: 'I want to contribute to the community',
    resumeUrl: 'https://example.com/resume.pdf',
    'marketing_workload-management': 'I prioritize tasks by deadline and importance',
    'marketing_initiative-idea': 'I would create a social media campaign',
    'marketing_portfolio': 'https://example.com/portfolio',
    'sustainability_growth': 'I want to learn about sustainable business practices',
    'sustainability_projects': 'I would like to work on reducing waste on campus'
  };
  
  const result = writeToSheet(testData);
  console.log('Test result:', result);
} 