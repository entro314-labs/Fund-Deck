#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Data directory path
const DATA_DIR = path.join(__dirname, '..', 'src', 'data', 'pages');

// Sanitization mappings
const SANITIZATION_MAP = {
  // Company name replacements
  'MyRoomie': '[Company Name]',
  'myroomie': '[company-name]',
  'MYROOMIE': '[COMPANY-NAME]',
  
  // Email replacements
  'investors@myroomie.eu': 'investors@company.com',
  'dominikos@myroomieapp.com': 'contact@company.com',
  'idominikos@outlook.com': 'admin@company.com',
  
  // Phone number replacements
  '+30 XXX XXX XXXX': '+XX XXX XXX XXXX',
  
  // Domain replacements
  'myroomieapp.com': 'company.com',
  'myroomie.eu': 'company.com',
  
  // Specific product names
  'MyRoomie Connect': '[Product] Connect',
  'MyRoomie Spaces': '[Product] Spaces', 
  'MyRoomie Enterprise': '[Product] Enterprise',
  
  // Location-specific references that might be too specific
  'European housing market': 'target housing market',
  'Europe': '[Target Region]',
  'European': '[Target Region]',
  
  // Founder/personal references
  'Dominikos': '[Founder Name]',
  'dominikos': '[founder-name]',
};

// Country codes that might be too specific - replace with generic ones
const COUNTRY_REPLACEMENTS = {
  'GR': 'XX', // Greece
  'CY': 'YY', // Cyprus
  // Keep major markets like DE, FR, UK, etc. as they're generic
};

// Financial data scaling factors (to anonymize real numbers while keeping proportions)
const FINANCIAL_SCALING = {
  // Scale all revenue/financial numbers by random factors
  enabled: true,
  minScale: 0.7,
  maxScale: 1.4,
  // Keep some numbers exactly the same for consistency
  preserveRounds: [100, 1000, 10000, 100000, 1000000], // Common round numbers
};

function generateRandomScale() {
  const { minScale, maxScale } = FINANCIAL_SCALING;
  return minScale + Math.random() * (maxScale - minScale);
}

function shouldPreserveNumber(num) {
  return FINANCIAL_SCALING.preserveRounds.some(round => 
    Math.abs(num - round) < round * 0.01 // Within 1% of round number
  );
}

function sanitizeFinancialData(value, key) {
  if (!FINANCIAL_SCALING.enabled) return value;
  
  // Only scale numeric values that look like financial data
  if (typeof value === 'number' && value > 100 && !shouldPreserveNumber(value)) {
    // Check if this looks like financial data based on key names
    const financialKeys = [
      'revenue', 'valuation', 'funding', 'cash', 'cost', 'price', 
      'amount', 'investment', 'salary', 'budget', 'tam', 'users'
    ];
    
    const isFinancialKey = financialKeys.some(finKey => 
      key.toLowerCase().includes(finKey)
    );
    
    if (isFinancialKey) {
      const scale = generateRandomScale();
      const scaled = Math.round(value * scale);
      console.log(`  📊 Scaled ${key}: ${value} → ${scaled} (${(scale * 100).toFixed(1)}%)`);
      return scaled;
    }
  }
  
  return value;
}

function sanitizeText(text) {
  if (typeof text !== 'string') return text;
  
  let sanitized = text;
  
  // Apply all text replacements
  Object.entries(SANITIZATION_MAP).forEach(([original, replacement]) => {
    const regex = new RegExp(original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    sanitized = sanitized.replace(regex, replacement);
  });
  
  // Apply country code replacements
  Object.entries(COUNTRY_REPLACEMENTS).forEach(([original, replacement]) => {
    const regex = new RegExp(`\\b${original}\\b`, 'g');
    sanitized = sanitized.replace(regex, replacement);
  });
  
  return sanitized;
}

function sanitizeValue(value, key = '', path = '') {
  if (value === null || value === undefined) {
    return value;
  }
  
  if (typeof value === 'string') {
    return sanitizeText(value);
  }
  
  if (typeof value === 'number') {
    return sanitizeFinancialData(value, key);
  }
  
  if (Array.isArray(value)) {
    return value.map((item, index) => 
      sanitizeValue(item, `${key}[${index}]`, `${path}.${key}[${index}]`)
    );
  }
  
  if (typeof value === 'object') {
    const sanitizedObj = {};
    Object.entries(value).forEach(([objKey, objValue]) => {
      sanitizedObj[objKey] = sanitizeValue(objValue, objKey, `${path}.${objKey}`);
    });
    return sanitizedObj;
  }
  
  return value;
}

function sanitizeJsonFile(filePath) {
  console.log(`\n🧹 Sanitizing: ${path.basename(filePath)}`);
  
  try {
    // Read the file
    const rawData = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(rawData);
    
    // Sanitize the data
    const sanitizedData = sanitizeValue(data, 'root', path.basename(filePath));
    
    // Write back to file with pretty formatting
    fs.writeFileSync(filePath, JSON.stringify(sanitizedData, null, 2) + '\n', 'utf8');
    
    console.log(`  ✅ Successfully sanitized ${path.basename(filePath)}`);
    
  } catch (error) {
    console.error(`  ❌ Error sanitizing ${path.basename(filePath)}:`, error.message);
  }
}

function sanitizeAllDataFiles() {
  console.log('🚀 Starting data sanitization process...');
  console.log(`📁 Data directory: ${DATA_DIR}`);
  
  if (!fs.existsSync(DATA_DIR)) {
    console.error(`❌ Data directory not found: ${DATA_DIR}`);
    process.exit(1);
  }
  
  // Get all JSON files in the data directory
  const files = fs.readdirSync(DATA_DIR)
    .filter(file => file.endsWith('.json'))
    .map(file => path.join(DATA_DIR, file));
  
  console.log(`📄 Found ${files.length} JSON files to sanitize`);
  
  // Process each file
  files.forEach(sanitizeJsonFile);
  
  console.log('\n🎉 Data sanitization completed!');
  console.log('\n📋 Summary of changes:');
  console.log('  • Company references: MyRoomie → [Company Name]');
  console.log('  • Email addresses: anonymized');
  console.log('  • Phone numbers: anonymized');
  console.log('  • Financial data: scaled randomly (70%-140%)');
  console.log('  • Product names: generalized');
  console.log('  • Geographic references: generalized');
  
  console.log('\n⚠️  Next steps:');
  console.log('  1. Review the sanitized files manually');
  console.log('  2. Test the application with sanitized data');
  console.log('  3. Create additional demo data variants if needed');
  console.log('  4. Update README with sanitization information');
}

// Add command line options
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const preserveFinancials = args.includes('--preserve-financials');

if (preserveFinancials) {
  FINANCIAL_SCALING.enabled = false;
  console.log('💰 Financial data scaling disabled');
}

if (isDryRun) {
  console.log('🔍 DRY RUN MODE - No files will be modified');
  console.log('Run without --dry-run to apply changes');
  // TODO: Implement dry run logic
  process.exit(0);
}

// Main execution
if (require.main === module) {
  sanitizeAllDataFiles();
}

module.exports = {
  sanitizeJsonFile,
  sanitizeText,
  sanitizeValue,
  SANITIZATION_MAP
};