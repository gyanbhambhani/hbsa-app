/**
 * Test script for HBSA Application API
 * Run this script to test your API setup
 */

const API_URL = 'http://localhost:3000/api/submit';

const testData = {
  basicInfo: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@berkeley.edu',
    graduatingYear: '2025',
    coreValue: 'I embody the Haas core value of "Question the Status Quo" by constantly challenging conventional thinking and seeking innovative solutions to problems. In my daily life, I question assumptions in group projects, propose alternative approaches to traditional methods, and encourage my peers to think critically about established practices.'
  },
  selectedCommittees: ['marketing', 'sponsorships'],
  committeeResponses: {
    marketing: {
      'workload': 'I prioritize and manage my workload by using the Eisenhower Matrix to categorize tasks by urgency and importance. I set clear deadlines for myself and use tools like Google Calendar and Trello to track progress. When faced with multiple deadlines, I break larger projects into smaller, manageable tasks and focus on one thing at a time to maintain quality.',
      'initiative': 'I would like to implement a "Student Spotlight" series on our social media platforms, featuring weekly posts about HBSA members\' achievements, internships, and unique experiences. This would increase engagement, showcase our diverse community, and provide networking opportunities for members.',
      'portfolio': 'https://example.com/marketing-portfolio'
    },
    sponsorships: {
      'philanthropy-scenario': 'I would maintain weekly communication with the foundation, providing detailed updates on our progress and the steps we\'re taking with legal and finance teams. I\'d offer interim recognition through social media features and campus displays, and create a contingency plan involving alternative funding sources or timeline adjustments.',
      'target-sponsors': 'I would pursue partnerships with Salesforce, Google, and McKinsey. Salesforce aligns with our tech focus and offers strong CSR programs. Google provides recruiting opportunities and brand alignment. McKinsey offers consulting opportunities and has a history of supporting business education. Each has established campus recruiting budgets and potential for multi-year growth.',
      'multinational-messaging': 'Multinational outreach is convincing when it demonstrates local impact and global reach. Here\'s a pitch: "Dear [Name], Berkeley Haas serves 1,200+ undergraduate students with 40% international representation. Our partnership would provide direct access to top talent while supporting our sustainability initiatives. We propose a pilot program with measurable outcomes and quarterly reviews. Next step: 30-minute call to discuss mutual goals."',
      'motivation-contribution': 'I want to join Sponsorships to build meaningful corporate partnerships that benefit both students and companies. I bring experience from managing a $50K fundraising campaign where I tracked 200+ prospects in Salesforce, negotiated terms with 15 companies, and maintained 95% stakeholder satisfaction through regular communication and transparent reporting.'
    }
  },
  generalResponses: {
    whyJoinHBSA: 'I want to join HBSA to contribute to building a stronger, more connected Haas community. I hope to develop my leadership skills, create meaningful impact through committee work, and connect with like-minded students who are passionate about business and making a difference. I envision myself organizing events that bring students together and implementing initiatives that benefit the entire Haas community.'
  },
  resumeUrl: 'https://drive.google.com/file/d/1example123456789/view?usp=sharing'
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
      console.log('\n🔍 Look for these new columns:');
      console.log('- First Name: John');
      console.log('- Last Name: Doe');
      console.log('- First Committee: marketing');
      console.log('- Second Committee: sponsorships');
      console.log('- Committee responses with readable headers like "Marketing - Workload"');
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