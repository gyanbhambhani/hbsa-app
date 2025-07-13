/**
 * Simple test to check Google Apps Script access
 * Run this in Google Apps Script to test spreadsheet access
 */

function testSheetAccess() {
  try {
    const SPREADSHEET_ID = '10Tsnpi-COzUKb4e5Sz36h3xsbcbtahlk6atnucMTDro';
    const SHEET_NAME = 'HBSA_Fall_2025_Applications';
    
    console.log('Testing spreadsheet access...');
    
    // Try to open the spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    console.log('✅ Spreadsheet opened successfully');
    console.log('Spreadsheet name:', spreadsheet.getName());
    
    // Check if the sheet exists
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (sheet) {
      console.log('✅ Sheet exists:', SHEET_NAME);
      console.log('Sheet has', sheet.getLastRow(), 'rows');
    } else {
      console.log('❌ Sheet does not exist:', SHEET_NAME);
      console.log('Available sheets:', spreadsheet.getSheets().map(s => s.getName()));
      
      // Try to create the sheet
      console.log('Creating sheet...');
      const newSheet = spreadsheet.insertSheet(SHEET_NAME);
      console.log('✅ Sheet created successfully');
    }
    
    return true;
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    return false;
  }
} 