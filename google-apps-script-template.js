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
  console.log('Data type:', typeof data);
  console.log('Data is null/undefined:', data === null || data === undefined);
  
  if (!data) {
    console.log('Data is null or undefined');
    return false;
  }
  
  console.log('Basic info:', data.basicInfo);
  console.log('Selected committees:', data.selectedCommittees);
  console.log('Committee responses:', data.committeeResponses);
  console.log('General responses:', data.generalResponses);
  console.log('Resume URL:', data.resumeUrl);
  
  // New structure validation
  if (!data.basicInfo || !data.basicInfo.firstName || !data.basicInfo.lastName || !data.basicInfo.email || !data.basicInfo.graduatingYear || !data.basicInfo.coreValue) {
    console.log('Basic info validation failed');
    return false;
  }
  if (!data.selectedCommittees || !Array.isArray(data.selectedCommittees) || data.selectedCommittees.length === 0) {
    console.log('Selected committees validation failed');
    return false;
  }
  if (!data.committeeResponses || typeof data.committeeResponses !== 'object') {
    console.log('Committee responses validation failed');
    return false;
  }
  if (!data.generalResponses || !data.generalResponses.whyJoinHBSA) {
    console.log('General responses validation failed');
    return false;
  }
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
      formData.selectedCommittees[0] || '', // First committee
      formData.selectedCommittees[1] || '', // Second committee
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
  // Returns responses in the order of getCommitteeQuestionHeaders()
  const headers = getCommitteeQuestionHeaders();
  const responses = [];
  
  // Mapping from readable headers back to committee/question IDs
  const headerToIds = {
    'Strategic Initiatives - Interest': ['strategic-initiatives', 'interest'],
    'Strategic Initiatives - Commitment': ['strategic-initiatives', 'commitment'],
    'Strategic Initiatives - Proposal': ['strategic-initiatives', 'proposal'],
    'Tech - Excitement': ['tech', 'excitement'],
    'Tech - Improvement': ['tech', 'improvement'],
    'Tech - Dream Project': ['tech', 'dream-project'],
    'SOAC - Interest': ['soac', 'interest'],
    'SOAC - Communication': ['soac', 'communication'],
    'SOAC - Unique Perspective': ['soac', 'unique-perspective'],
    'SOAC - Improve Collaboration': ['soac', 'improve-collab'],
    'Student Affairs - Failure': ['student-affairs', 'failure'],
    'Student Affairs - Improve Experience': ['student-affairs', 'improve-experience'],
    'Student Affairs - Midterm Event': ['student-affairs', 'midterm-event'],
    'Sustainability - Interest': ['sustainability', 'interest'],
    'Sustainability - Perspective': ['sustainability', 'perspective'],
    'Professional Development - Interest': ['professional-development', 'interest'],
    'Professional Development - Event Experience': ['professional-development', 'event-experience'],
    'Professional Development - Skills': ['professional-development', 'skills'],
    'Transfer Development - Community': ['transfer-development', 'community'],
    'Transfer Development - Leadership': ['transfer-development', 'leadership'],
    'Transfer Development - Inspiration': ['transfer-development', 'inspiration'],
    'Marketing - Workload': ['marketing', 'workload'],
    'Marketing - Initiative': ['marketing', 'initiative'],
    'Marketing - Portfolio': ['marketing', 'portfolio'],
    'Public Service - Impact': ['public-service', 'impact'],
    'Public Service - Initiative': ['public-service', 'initiative'],
    'Public Service - Ideas': ['public-service', 'ideas'],
    'Public Service - Fundraising': ['public-service', 'fundraising'],
    'Corporate Relations - Interest': ['corporate-relations', 'interest'],
    'Corporate Relations - Strength': ['corporate-relations', 'strength'],
    'Corporate Relations - Event': ['corporate-relations', 'event'],
    'Finance - Interest': ['finance', 'interest'],
    'Finance - Unique': ['finance', 'unique'],
    'Entrepreneurship - Motivation': ['entrepreneurship', 'motivation'],
    'Entrepreneurship - Spirit': ['entrepreneurship', 'spirit'],
    'Entrepreneurship - Event': ['entrepreneurship', 'event'],
    'DEI - Bias': ['dei', 'bias'],
    'DEI - Belonging': ['dei', 'belonging'],
    'DEI - Festival': ['dei', 'festival'],
    'MBA Alumni Relations - Above Beyond': ['mba-alumni-relations', 'above-beyond'],
    'MBA Alumni Relations - Feedback': ['mba-alumni-relations', 'feedback'],
    'MBA Alumni Relations - Description': ['mba-alumni-relations', 'description'],
    'MBA Alumni Relations - Projects': ['mba-alumni-relations', 'projects'],
    'Integration - Cross Program': ['integration', 'cross-program'],
    'Integration - Event': ['integration', 'event'],
    'Sponsorships - Philanthropy Scenario': ['sponsorships', 'philanthropy-scenario'],
    'Sponsorships - Target Sponsors': ['sponsorships', 'target-sponsors'],
    'Sponsorships - Multinational Messaging': ['sponsorships', 'multinational-messaging'],
    'Sponsorships - Motivation Contribution': ['sponsorships', 'motivation-contribution']
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
  // Update this list to match your new committee/question IDs with readable titles
  return [
    // Strategic Initiatives
    'Strategic Initiatives - Interest',
    'Strategic Initiatives - Commitment',
    'Strategic Initiatives - Proposal',
    // Tech
    'Tech - Excitement',
    'Tech - Improvement',
    'Tech - Dream Project',
    // SOAC
    'SOAC - Interest',
    'SOAC - Communication',
    'SOAC - Unique Perspective',
    'SOAC - Improve Collaboration',
    // Student Affairs
    'Student Affairs - Failure',
    'Student Affairs - Improve Experience',
    'Student Affairs - Midterm Event',
    // Sustainability
    'Sustainability - Interest',
    'Sustainability - Perspective',
    // Professional Development
    'Professional Development - Interest',
    'Professional Development - Event Experience',
    'Professional Development - Skills',
    // Transfer Development
    'Transfer Development - Community',
    'Transfer Development - Leadership',
    'Transfer Development - Inspiration',
    // Marketing
    'Marketing - Workload',
    'Marketing - Initiative',
    'Marketing - Portfolio',
    // Public Service
    'Public Service - Impact',
    'Public Service - Initiative',
    'Public Service - Ideas',
    'Public Service - Fundraising',
    // Corporate Relations
    'Corporate Relations - Interest',
    'Corporate Relations - Strength',
    'Corporate Relations - Event',
    // Finance
    'Finance - Interest',
    'Finance - Unique',
    // Entrepreneurship
    'Entrepreneurship - Motivation',
    'Entrepreneurship - Spirit',
    'Entrepreneurship - Event',
    // DEI
    'DEI - Bias',
    'DEI - Belonging',
    'DEI - Festival',
    // MBA & Alumni Relations
    'MBA Alumni Relations - Above Beyond',
    'MBA Alumni Relations - Feedback',
    'MBA Alumni Relations - Description',
    'MBA Alumni Relations - Projects',
    // Integration
    'Integration - Cross Program',
    'Integration - Event',
    // Sponsorships
    'Sponsorships - Philanthropy Scenario',
    'Sponsorships - Target Sponsors',
    'Sponsorships - Multinational Messaging',
    'Sponsorships - Motivation Contribution'
  ];
}

// Optional: Function to test the setup
function testSetup() {
  const testData = {
    basicInfo: {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@berkeley.edu',
      graduatingYear: '2025',
      coreValue: 'Leadership'
    },
    selectedCommittees: ['marketing', 'sponsorships'],
    committeeResponses: {
      marketing: {
        workload: 'I prioritize tasks by deadline and importance',
        initiative: 'I would create a social media campaign',
        portfolio: 'https://example.com/portfolio'
      },
      sponsorships: {
        'philanthropy-scenario': 'I would maintain weekly communication with the foundation, providing detailed updates on our progress and the steps we\'re taking with legal and finance teams.',
        'target-sponsors': 'I would pursue partnerships with Salesforce, Google, and McKinsey. Each has established campus recruiting budgets and potential for multi-year growth.',
        'multinational-messaging': 'Multinational outreach is convincing when it demonstrates local impact and global reach. Here\'s a pitch with clear value proposition and next steps.',
        'motivation-contribution': 'I want to join Sponsorships to build meaningful corporate partnerships that benefit both students and companies.'
      }
    },
    generalResponses: {
      whyJoinHBSA: 'I want to contribute to the community'
    },
    resumeUrl: 'https://example.com/resume.pdf'
  };
  writeToSheet(testData);
} 