/**
 * Google Apps Script for HBSA Application Form - Spring 2026
 *
 * SETUP INSTRUCTIONS:
 * 
 * STEP 1: Create a new Google Spreadsheet
 *   1. Go to https://sheets.google.com
 *   2. Create a new blank spreadsheet
 *   3. Name it "HBSA Spring 2026 Applications"
 *   4. Copy the SPREADSHEET_ID from the URL:
 *      https://docs.google.com/spreadsheets/d/[THIS_IS_YOUR_SPREADSHEET_ID]/edit
 *   5. Paste it below in the SPREADSHEET_ID variable
 *
 * STEP 2: Create Google Apps Script
 *   1. Go to https://script.google.com/
 *   2. Click "New Project"
 *   3. Name it "HBSA Spring 2026 Handler"
 *   4. Delete the default code and paste this entire file
 *   5. Update the SPREADSHEET_ID below with your spreadsheet ID
 *   6. Click Save (Ctrl+S)
 *
 * STEP 3: Deploy as Web App
 *   1. Click "Deploy" > "New deployment"
 *   2. Click the gear icon and select "Web app"
 *   3. Set "Execute as" to "Me"
 *   4. Set "Who has access" to "Anyone"
 *   5. Click "Deploy"
 *   6. Copy the Web app URL
 *
 * STEP 4: Update your .env.local
 *   Add this line (replace with your actual URL):
 *   NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
 *
 * STEP 5: Test the setup
 *   1. In Apps Script, click "Run" > "testSetup"
 *   2. Grant permissions when prompted
 *   3. Check your spreadsheet - a test row should appear
 */

// ============================================================================
// CONFIGURATION - UPDATE THIS WITH YOUR SPREADSHEET ID
// ============================================================================
const SPREADSHEET_ID = '199FoaFZSaPtOW251F6wsbxmJSS_Eg6MSmWOqvDNaGRM';
const SHEET_NAME = 'HBSA_Spring_2026_Applications';

// ============================================================================
// DO NOT MODIFY BELOW THIS LINE (unless you know what you're doing)
// ============================================================================

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
    console.log('Received request:', e);
    console.log('Post data:', e.postData);
    
    if (!e || !e.postData) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'No data received',
          message: 'Please send form data in the request body'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    console.log('Raw post data contents:', e.postData.contents);
    const formData = JSON.parse(e.postData.contents);
    console.log('Parsed form data:', formData);

    if (!validateFormData(formData)) {
      console.log('Validation failed for data:', formData);
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'Invalid form data',
          message: 'Required fields are missing'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const success = writeToSheet(formData);

    if (success) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
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
  console.log('Validating data:', data);
  
  if (!data) {
    console.log('Data is null or undefined');
    return false;
  }
  
  // Basic info validation
  if (!data.basicInfo || 
      !data.basicInfo.firstName || 
      !data.basicInfo.lastName || 
      !data.basicInfo.email || 
      !data.basicInfo.graduatingYear || 
      !data.basicInfo.coreValue) {
    console.log('Basic info validation failed');
    return false;
  }
  
  // Committees validation
  if (!data.selectedCommittees || 
      !Array.isArray(data.selectedCommittees) || 
      data.selectedCommittees.length === 0) {
    console.log('Selected committees validation failed');
    return false;
  }
  
  // Committee responses validation
  if (!data.committeeResponses || typeof data.committeeResponses !== 'object') {
    console.log('Committee responses validation failed');
    return false;
  }
  
  // General responses validation
  if (!data.generalResponses || !data.generalResponses.whyJoinHBSA) {
    console.log('General responses validation failed');
    return false;
  }
  
  // Resume URL validation
  if (!data.resumeUrl) {
    console.log('Resume URL validation failed');
    return false;
  }
  
  console.log('All validations passed');
  return true;
}

function writeToSheet(formData) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      setupSheetHeaders(sheet);
    }

    // Prepare row data
    const rowData = [
      new Date().toISOString(),
      Utilities.getUuid(),
      formData.basicInfo.firstName,
      formData.basicInfo.lastName,
      formData.basicInfo.email,
      formData.basicInfo.graduatingYear,
      formData.basicInfo.coreValue,
      formData.selectedCommittees[0] || '',
      formData.selectedCommittees[1] || '',
      formData.generalResponses.whyJoinHBSA,
      formData.resumeUrl
    ];

    // Add committee-specific responses
    const committeeColumns = extractCommitteeResponses(formData.committeeResponses);
    rowData.push(...committeeColumns);

    sheet.appendRow(rowData);
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
    'First Name',
    'Last Name',
    'Email',
    'Graduating Year',
    'Core Value',
    'First Committee',
    'Second Committee',
    'Why Join HBSA',
    'Resume URL'
  ];
  headers.push(...getCommitteeQuestionHeaders());
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#4285f4');
  headerRange.setFontColor('white');
  sheet.setFrozenRows(1);
}

function extractCommitteeResponses(committeeResponses) {
  const headers = getCommitteeQuestionHeaders();
  const responses = [];
  
  // Maps readable headers to [committeeId, questionId]
  const headerToIds = {
    // Strategic Initiatives
    'Strategic Initiatives - Interest': ['strategic-initiatives', 'interest'],
    'Strategic Initiatives - Commitment': ['strategic-initiatives', 'commitment'],
    'Strategic Initiatives - Proposal': ['strategic-initiatives', 'proposal'],
    // Tech
    'Tech - Excitement': ['tech', 'excitement'],
    'Tech - Improvement': ['tech', 'improvement'],
    'Tech - Dream Project': ['tech', 'dream-project'],
    // Transfer Development
    'Transfer Development - Community': ['transfer-development', 'community'],
    'Transfer Development - Mentorship': ['transfer-development', 'mentorship'],
    'Transfer Development - Initiatives': ['transfer-development', 'initiatives'],
    // Marketing
    'Marketing - Workload': ['marketing', 'workload'],
    'Marketing - Initiative': ['marketing', 'initiative'],
    'Marketing - Portfolio': ['marketing', 'portfolio'],
    // DEI
    'DEI - Meaning': ['dei', 'meaning'],
    'DEI - Inclusive Space': ['dei', 'inclusive-space'],
    'DEI - Contribution': ['dei', 'contribution'],
    // Entrepreneurship
    'Entrepreneurship - Event': ['entrepreneurship', 'event'],
    'Entrepreneurship - Spirit': ['entrepreneurship', 'spirit'],
    'Entrepreneurship - Impact': ['entrepreneurship', 'impact'],
    // Sustainability
    'Sustainability - Interest': ['sustainability', 'interest'],
    'Sustainability - Embody': ['sustainability', 'embody'],
    'Sustainability - Change': ['sustainability', 'change'],
    // Corporate Relations
    'Corporate Relations - Interest': ['corporate-relations', 'interest'],
    'Corporate Relations - Skills': ['corporate-relations', 'skills'],
    'Corporate Relations - Event': ['corporate-relations', 'event'],
    // Integration
    'Integration - Turnout': ['integration', 'turnout'],
    // Sponsorships
    'Sponsorships - Secure Sponsorship': ['sponsorships', 'secure-sponsorship'],
    'Sponsorships - Persuasion': ['sponsorships', 'persuasion'],
    'Sponsorships - Value': ['sponsorships', 'value'],
    'Sponsorships - Motivation': ['sponsorships', 'motivation'],
    // Student Affairs
    'Student Affairs - Why': ['student-affairs', 'why'],
    'Student Affairs - Subcommittee': ['student-affairs', 'subcommittee'],
    'Student Affairs - Event': ['student-affairs', 'event'],
    // Public Service
    'Public Service - Meaning': ['public-service', 'meaning'],
    'Public Service - Initiative': ['public-service', 'initiative'],
    'Public Service - Ideas': ['public-service', 'ideas'],
    // SOAC
    'SOAC - Organization': ['soac', 'organization'],
    'SOAC - Initiative': ['soac', 'initiative'],
    'SOAC - Learning': ['soac', 'learning'],
    'SOAC - Fellowship': ['soac', 'fellowship'],
    // MBA & Alumni Relations
    'MBA Alumni Relations - Challenge': ['mba-alumni-relations', 'challenge'],
    'MBA Alumni Relations - Teamwork': ['mba-alumni-relations', 'teamwork'],
    'MBA Alumni Relations - Feedback': ['mba-alumni-relations', 'feedback'],
    'MBA Alumni Relations - Value': ['mba-alumni-relations', 'value']
  };
  
  for (let i = 0; i < headers.length; i++) {
    const header = headers[i];
    const [committeeId, questionId] = headerToIds[header] || ['', ''];
    
    if (
      committeeResponses[committeeId] &&
      Object.prototype.hasOwnProperty.call(committeeResponses[committeeId], questionId)
    ) {
      responses.push(committeeResponses[committeeId][questionId]);
    } else {
      responses.push('');
    }
  }
  return responses;
}

function getCommitteeQuestionHeaders() {
  // Spring 2026 committees and their question headers
  return [
    // Strategic Initiatives
    'Strategic Initiatives - Interest',
    'Strategic Initiatives - Commitment',
    'Strategic Initiatives - Proposal',
    // Tech
    'Tech - Excitement',
    'Tech - Improvement',
    'Tech - Dream Project',
    // Transfer Development
    'Transfer Development - Community',
    'Transfer Development - Mentorship',
    'Transfer Development - Initiatives',
    // Marketing
    'Marketing - Workload',
    'Marketing - Initiative',
    'Marketing - Portfolio',
    // DEI
    'DEI - Meaning',
    'DEI - Inclusive Space',
    'DEI - Contribution',
    // Entrepreneurship
    'Entrepreneurship - Event',
    'Entrepreneurship - Spirit',
    'Entrepreneurship - Impact',
    // Sustainability
    'Sustainability - Interest',
    'Sustainability - Embody',
    'Sustainability - Change',
    // Corporate Relations
    'Corporate Relations - Interest',
    'Corporate Relations - Skills',
    'Corporate Relations - Event',
    // Integration
    'Integration - Turnout',
    // Sponsorships
    'Sponsorships - Secure Sponsorship',
    'Sponsorships - Persuasion',
    'Sponsorships - Value',
    'Sponsorships - Motivation',
    // Student Affairs
    'Student Affairs - Why',
    'Student Affairs - Subcommittee',
    'Student Affairs - Event',
    // Public Service
    'Public Service - Meaning',
    'Public Service - Initiative',
    'Public Service - Ideas',
    // SOAC
    'SOAC - Organization',
    'SOAC - Initiative',
    'SOAC - Learning',
    'SOAC - Fellowship',
    // MBA & Alumni Relations
    'MBA Alumni Relations - Challenge',
    'MBA Alumni Relations - Teamwork',
    'MBA Alumni Relations - Feedback',
    'MBA Alumni Relations - Value'
  ];
}

// ============================================================================
// TEST FUNCTION - Run this to verify setup
// ============================================================================
function testSetup() {
  const testData = {
    basicInfo: {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@berkeley.edu',
      graduatingYear: '2027',
      coreValue: 'Question the Status Quo - I always challenge conventional thinking'
    },
    selectedCommittees: ['marketing', 'dei'],
    committeeResponses: {
      marketing: {
        workload: 'I prioritize tasks by deadline and importance using a planner.',
        initiative: 'I would create a TikTok series featuring day-in-the-life content.',
        portfolio: 'https://example.com/portfolio'
      },
      dei: {
        meaning: 'DEI means creating spaces where everyone can thrive.',
        'inclusive-space': 'I organized a cultural celebration at my community college.',
        contribution: 'I hope to bring new perspectives and learn from others.'
      }
    },
    generalResponses: {
      whyJoinHBSA: 'I want to contribute to the Haas community and grow as a leader.'
    },
    resumeUrl: 'https://drive.google.com/file/d/example/view'
  };
  
  console.log('Running test setup with data:', testData);
  const success = writeToSheet(testData);
  
  if (success) {
    console.log('Test setup successful! Check your spreadsheet.');
  } else {
    console.log('Test setup failed. Check the logs for errors.');
  }
}

// ============================================================================
// UTILITY FUNCTION - Clear test data (run manually if needed)
// ============================================================================
function clearTestData() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (sheet) {
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      sheet.deleteRows(2, lastRow - 1);
      console.log('Cleared all data rows (kept headers)');
    }
  }
}
