// Temporary script to analyze the actual Google Sheets data structure
const { google } = require('googleapis');

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const API_KEY = process.env.GOOGLE_SHEETS_API_KEY;

const sheets = google.sheets({
  version: 'v4',
  auth: API_KEY,
});

async function analyzeSheets() {
  try {
    if (!SPREADSHEET_ID || !API_KEY) {
      console.error('❌ Missing required environment variables:');
      console.error('   GOOGLE_SHEETS_SPREADSHEET_ID');
      console.error('   GOOGLE_SHEETS_API_KEY');
      console.error('\n   Please set these in your .env.local file');
      return;
    }
    
    console.log('📊 Analyzing Google Sheets Data Structure\n');
    
    // Fetch Data_Input sheet
    console.log('🔍 Fetching Data_Input sheet...');
    const dataInputResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Data_Input!A1:M50',
    });
    
    const dataInputData = dataInputResponse.data.values || [];
    console.log(`✅ Data_Input has ${dataInputData.length} rows\n`);
    
    if (dataInputData.length > 0) {
      console.log('📋 Data_Input Column Headers:');
      dataInputData[0].forEach((header, index) => {
        console.log(`  [${String.fromCharCode(65 + index)}] ${header}`);
      });
      
      console.log('\n📊 Sample Data (first 5 rows):');
      dataInputData.slice(0, 6).forEach((row, index) => {
        console.log(`Row ${index}: [${row.join('] | [')}]`);
      });
      
      // Analyze countries
      const countries = new Set();
      dataInputData.slice(1).forEach(row => {
        if (row[1]) countries.add(row[1]);
      });
      console.log(`\n🌍 Countries found: ${Array.from(countries).join(', ')}`);
    }
    
    console.log('\n' + '='.repeat(60) + '\n');
    
    // Fetch Metrics sheet
    console.log('🔍 Fetching Metrics sheet...');
    const metricsResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Metrics!A1:E20',
    });
    
    const metricsData = metricsResponse.data.values || [];
    console.log(`✅ Metrics has ${metricsData.length} rows\n`);
    
    if (metricsData.length > 0) {
      console.log('📋 Metrics Sheet Structure:');
      metricsData.forEach((row, index) => {
        if (row.length > 0) {
          console.log(`Row ${index + 1}: [${row.join('] | [')}]`);
        }
      });
    }
    
    console.log('\n🧮 Analysis Complete!');
    
  } catch (error) {
    console.error('❌ Error analyzing sheets:', error.message);
  }
}

analyzeSheets();