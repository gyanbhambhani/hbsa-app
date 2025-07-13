/**
 * Test script for HBSA Application API
 * Run this script to test your API setup
 */

const API_URL = 'http://localhost:3000/api/submit';

const testData = {
  basicInfo: {
    name: 'Test User',
    graduatingYear: '2025',
    coreValue: 'Leadership'
  },
  selectedCommittees: ['marketing', 'sustainability'],
  committeeResponses: {
    marketing: {
      'workload-management': 'I prioritize tasks by deadline and importance, using tools like Trello and setting clear milestones.',
      'initiative-idea': 'I would create a comprehensive social media campaign highlighting HBSA events and student achievements.',
      'portfolio': 'https://example.com/marketing-portfolio'
    },
    sustainability: {
      'growth': 'I want to learn about sustainable business practices and help implement green initiatives within the Haas community.',
      'projects': 'I would like to work on reducing waste on campus and promoting sustainable commuting options.'
    }
  },
  generalResponses: {
    whyJoinHBSA: 'I want to contribute to the community and develop my leadership skills while connecting with other students who share my passion for business and sustainability.'
  },
  resumeUrl: 'https://uploadthing.com/f/test-resume.pdf'
};

async function testAPI() {
  console.log('🧪 Testing HBSA Application API...\n');
  
  try {
    console.log('📤 Sending test data...');
    console.log('Data:', JSON.stringify(testData, null, 2));
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });
    
    const result = await response.json();
    
    console.log('\n📥 Response:');
    console.log('Status:', response.status);
    console.log('Data:', JSON.stringify(result, null, 2));
    
    if (response.ok && result.success) {
      console.log('\n✅ API test successful!');
      console.log('Submission ID:', result.submissionId);
      console.log('Message:', result.message);
      
      // Check Google Sheets
      console.log('\n📊 Check your Google Sheet to verify the data was saved correctly.');
      console.log('Sheet: HBSA_Fall_2025_Applications');
      console.log('URL: https://docs.google.com/spreadsheets/d/10Tsnpi-COzUKb4e5Sz36h3xsbcbtahlk6atnucMTDro/edit');
    } else {
      console.log('\n❌ API test failed!');
      console.log('Error:', result.error);
      console.log('Details:', result.details);
    }
    
  } catch (error) {
    console.log('\n❌ Test failed with error:', error.message);
    console.log('\nTroubleshooting tips:');
    console.log('1. Make sure your development server is running (npm run dev)');
    console.log('2. Check that your Google Apps Script is deployed and accessible');
    console.log('3. Verify your environment variables are set correctly');
    console.log('4. Check the browser console for any CORS errors');
  }
}

// Run the test
testAPI(); 