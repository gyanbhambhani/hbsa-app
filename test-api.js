/**
 * Test script for HBSA Application API - Spring 2026
 * Run with: node test-api.js
 */

const API_URL = 'http://localhost:3000/api/submit';

const testData = {
  basicInfo: {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@berkeley.edu',
    graduatingYear: '2027',
    coreValue: 'I embody Question the Status Quo by challenging conventional thinking.'
  },
  selectedCommittees: ['marketing', 'dei'],
  committeeResponses: {
    marketing: {
      'workload': 'I prioritize tasks using the Eisenhower Matrix and set clear deadlines.',
      'initiative': 'I would create a TikTok series featuring day-in-the-life content.',
      'portfolio': 'https://example.com/portfolio'
    },
    dei: {
      'meaning': 'DEI means creating spaces where everyone feels valued and can thrive.',
      'inclusive-space': 'I organized a cultural celebration event at my community college.',
      'contribution': 'I hope to bring new perspectives and learn from diverse experiences.'
    }
  },
  generalResponses: {
    whyJoinHBSA: 'I want to contribute to building a stronger Haas community.'
  },
  resumeUrl: 'https://drive.google.com/file/d/test123/view'
};

async function testAPI() {
  console.log('Testing HBSA Spring 2026 Application API...\n');
  
  try {
    console.log('Sending test data...');
    console.log('Data:', JSON.stringify(testData, null, 2));
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });
    
    const result = await response.json();
    
    console.log('\nResponse:');
    console.log('Status:', response.status);
    console.log('Data:', JSON.stringify(result, null, 2));
    
    if (response.ok && result.success) {
      console.log('\n SUCCESS! Check your Google Sheet:');
      console.log('https://docs.google.com/spreadsheets/d/199FoaFZSaPtOW251F6wsbxmJSS_Eg6MSmWOqvDNaGRM/edit');
    } else {
      console.log('\n FAILED!');
      console.log('Error:', result.error);
    }
    
  } catch (error) {
    console.log('\n Test failed:', error.message);
    console.log('\nMake sure:');
    console.log('1. Dev server is running (npm run dev)');
    console.log('2. Google Apps Script is deployed');
    console.log('3. .env.local has the correct URL');
  }
}

testAPI();
