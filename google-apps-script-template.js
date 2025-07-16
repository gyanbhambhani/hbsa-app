/**
 * Google Apps Script for HBSA Application Form (Refactored for 2025+)
 *
 * Instructions:
 * 1. Go to https://script.google.com/
 * 2. Create a new project
 * 3. Replace the default code with this template
 * 4. Deploy as a web app (Execute as: Me, Who has access: Anyone)https://script.google.com/macros/s/AKfycbwIOahlEcbh4ihBnST53AUBvB-x3gIjOFPB9s4Vk22mx3r5KFOU-e1eRRZIugm_s-_T/exec
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
    if (!e || !e.postData) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'No data received',
          message: 'Please send form data in the request body'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const formData = JSON.parse(e.postData.contents);

    if (!validateFormData(formData)) {
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
  // New structure validation
  if (!data.basicInfo || !data.basicInfo.name || !data.basicInfo.email || !data.basicInfo.graduatingYear || !data.basicInfo.coreValue) return false;
  if (!data.selectedCommittees || !Array.isArray(data.selectedCommittees) || data.selectedCommittees.length === 0) return false;
  if (!data.committeeResponses || typeof data.committeeResponses !== 'object') return false;
  if (!data.generalResponses || !data.generalResponses.whyJoinHBSA) return false;
  if (!data.resumeUrl) return false;
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
      formData.basicInfo.name,
      formData.basicInfo.email,
      formData.basicInfo.graduatingYear,
      formData.basicInfo.coreValue,
      formData.selectedCommittees.join(', '),
      formData.generalResponses.whyJoinHBSA,
      formData.resumeUrl
    ];

    // Add committee-specific responses in the correct order
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
    'Name',
    'Email',
    'Graduating Year',
    'Core Value',
    'Selected Committees',
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
  // Returns responses in the order of getCommitteeQuestionHeaders()
  const headers = getCommitteeQuestionHeaders();
  const responses = [];
  for (let i = 0; i < headers.length; i++) {
    const [committeeId, questionId] = headers[i].split('__');
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
  // Update this list to match your new committee/question IDs
  return [
    // Strategic Initiatives
    'strategic-initiatives__interest',
    'strategic-initiatives__commitment',
    'strategic-initiatives__proposal',
    // Tech
    'tech__excitement',
    'tech__improvement',
    'tech__dream-project',
    // SOAC
    'soac__interest',
    'soac__communication',
    'soac__unique-perspective',
    'soac__improve-collab',
    // Student Affairs
    'student-affairs__failure',
    'student-affairs__improve-experience',
    'student-affairs__midterm-event',
    // Sustainability
    'sustainability__interest',
    'sustainability__perspective',
    // Professional Development
    'professional-development__interest',
    'professional-development__event-experience',
    'professional-development__skills',
    // Transfer Development
    'transfer-development__community',
    'transfer-development__leadership',
    'transfer-development__inspiration',
    // Marketing
    'marketing__workload',
    'marketing__initiative',
    'marketing__portfolio',
    // Public Service
    'public-service__impact',
    'public-service__initiative',
    'public-service__ideas',
    'public-service__fundraising',
    // Corporate Relations
    'corporate-relations__interest',
    'corporate-relations__strength',
    'corporate-relations__event',
    // Finance
    'finance__interest',
    'finance__unique',
    // Entrepreneurship
    'entrepreneurship__motivation',
    'entrepreneurship__spirit',
    'entrepreneurship__event',
    // DEI
    'dei__bias',
    'dei__belonging',
    'dei__festival',
    // MBA & Alumni Relations
    'mba-alumni-relations__above-beyond',
    'mba-alumni-relations__feedback',
    'mba-alumni-relations__description',
    'mba-alumni-relations__projects',
    // Integration
    'integration__cross-program',
    'integration__event'
  ];
}

// Optional: Function to test the setup
function testSetup() {
  const testData = {
    basicInfo: {
      name: 'Test User',
      email: 'test@berkeley.edu',
      graduatingYear: '2025',
      coreValue: 'Leadership'
    },
    selectedCommittees: ['marketing', 'sustainability'],
    committeeResponses: {
      marketing: {
        workload: 'I prioritize tasks by deadline and importance',
        initiative: 'I would create a social media campaign',
        portfolio: 'https://example.com/portfolio'
      },
      sustainability: {
        interest: 'I want to learn about sustainable business practices',
        perspective: 'I have experience with campus eco-projects'
      }
    },
    generalResponses: {
      whyJoinHBSA: 'I want to contribute to the community'
    },
    resumeUrl: 'https://example.com/resume.pdf'
  };
  writeToSheet(testData);
} 