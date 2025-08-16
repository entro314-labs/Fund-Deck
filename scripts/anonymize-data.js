#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Randomization configuration
const ANONYMIZATION_CONFIG = {
  // Business model terminology
  businessModels: [
    'Platform-as-a-Service',
    'Service-as-a-Platform', 
    'Infrastructure-as-a-Service',
    'Solution-as-a-Service',
    'Technology-as-a-Service',
    'Network-as-a-Service'
  ],
  
  // Industry segments
  industries: [
    'logistics', 'consulting', 'technology', 'manufacturing', 
    'healthcare', 'finance', 'education', 'retail'
  ],
  
  // Geographic regions
  regions: [
    'Nordic', 'Central', 'Eastern', 'Western', 'Southern', 'Baltic'
  ],
  
  // Countries (maintaining European context but randomized)
  countries: [
    'Estonia', 'Latvia', 'Lithuania', 'Slovakia', 'Slovenia', 
    'Croatia', 'Bulgaria', 'Hungary', 'Denmark', 'Sweden', 
    'Finland', 'Norway', 'Netherlands', 'Belgium', 'Luxembourg'
  ],
  
  // Country codes (corresponding to above)
  countryCodes: [
    'EE', 'LV', 'LT', 'SK', 'SI', 'HR', 'BG', 'HU', 
    'DK', 'SE', 'FI', 'NO', 'NL', 'BE', 'LU'
  ],
  
  // Product names
  productNames: [
    'Connect', 'Link', 'Match', 'Bridge', 'Sync', 'Unite', 
    'Spaces', 'Places', 'Hubs', 'Zones', 'Sites', 'Venues',
    'Enterprise', 'Business', 'Corporate', 'Professional', 'Solutions', 'Services'
  ],
  
  // Competitor names
  competitorNames: [
    'MarketLeader', 'RegionalPlayer', 'TechCorp', 'PlatformCo', 
    'ServiceHub', 'ConnectPro', 'MatchTech', 'FindSpace',
    'RoomSearch', 'HomeFinder', 'SpaceConnect', 'RentalHub'
  ],
  
  // Timeline shift (years to add/subtract)
  timelineShift: Math.floor(Math.random() * 6) - 3 // -3 to +2 years
};

// Utility functions
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min, max, decimals = 1) {
  const value = Math.random() * (max - min) + min;
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

function randomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Anonymization functions
function anonymizeValue(value, context = '') {
  if (typeof value === 'number') {
    // Apply variation to numeric values (-20% to +30%)
    const variation = randomFloat(0.8, 1.3, 2);
    return Math.round(value * variation);
  }
  
  if (typeof value === 'string') {
    let anonymized = value;
    
    // Replace specific business terms
    anonymized = anonymized.replace(/Living-as-a-Service/gi, randomFromArray(ANONYMIZATION_CONFIG.businessModels));
    anonymized = anonymized.replace(/BPO/g, randomFromArray(ANONYMIZATION_CONFIG.industries).toUpperCase());
    
    // Replace years (with timeline shift)
    anonymized = anonymized.replace(/20(\d{2})/g, (match, year) => {
      const originalYear = 2000 + parseInt(year);
      const shiftedYear = originalYear + ANONYMIZATION_CONFIG.timelineShift;
      return shiftedYear.toString();
    });
    
    // Replace Q[1-4] with timeline shift
    anonymized = anonymized.replace(/Q([1-4]) 20(\d{2})/g, (match, quarter, year) => {
      const originalYear = 2000 + parseInt(year);
      const shiftedYear = originalYear + ANONYMIZATION_CONFIG.timelineShift;
      return `Q${quarter} ${shiftedYear}`;
    });
    
    return anonymized;
  }
  
  return value;
}

function anonymizeCountryData(data) {
  if (!Array.isArray(data)) return data;
  
  const shuffledCountries = shuffleArray(ANONYMIZATION_CONFIG.countries);
  const shuffledCodes = shuffleArray(ANONYMIZATION_CONFIG.countryCodes);
  
  return data.map((item, index) => {
    if (item.country && index < shuffledCountries.length) {
      return {
        ...item,
        country: shuffledCountries[index],
        code: shuffledCodes[index] || item.code
      };
    }
    return item;
  });
}

function anonymizeCompetitorData(competitors) {
  if (!Array.isArray(competitors)) return competitors;
  
  const shuffledNames = shuffleArray(ANONYMIZATION_CONFIG.competitorNames);
  
  return competitors.map((competitor, index) => {
    if (competitor.name && index < shuffledNames.length) {
      return {
        ...competitor,
        name: shuffledNames[index]
      };
    }
    return competitor;
  });
}

function anonymizeObject(obj, path = '') {
  if (obj === null || typeof obj !== 'object') {
    return anonymizeValue(obj, path);
  }
  
  if (Array.isArray(obj)) {
    // Special handling for country/competitor arrays
    if (path.includes('country') || path.includes('Market') || path.includes('markets')) {
      return anonymizeCountryData(obj);
    }
    if (path.includes('competitor')) {
      return anonymizeCompetitorData(obj);
    }
    
    return obj.map((item, index) => anonymizeObject(item, `${path}[${index}]`));
  }
  
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const newPath = path ? `${path}.${key}` : key;
    
    // Skip meta information and preserve structure
    if (key === 'meta' || key === 'id') {
      result[key] = value;
      continue;
    }
    
    // Apply specific anonymization for certain fields
    if (key.includes('revenue') || key.includes('Revenue')) {
      result[key] = anonymizeValue(value, 'revenue');
    } else if (key.includes('user') || key.includes('User')) {
      result[key] = anonymizeValue(value, 'users');
    } else if (key.includes('population') || key.includes('tam') || key.includes('TAM')) {
      result[key] = anonymizeValue(value, 'market');
    } else {
      result[key] = anonymizeObject(value, newPath);
    }
  }
  
  return result;
}

// Main execution
async function anonymizeDataFiles() {
  const dataDir = path.join(__dirname, '../src/data/pages');
  
  try {
    const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.json'));
    
    console.log(`Found ${files.length} JSON files to anonymize...`);
    
    for (const file of files) {
      const filePath = path.join(dataDir, file);
      console.log(`Processing ${file}...`);
      
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(content);
        
        // Create backup
        const backupPath = `${filePath}.backup`;
        fs.writeFileSync(backupPath, content);
        
        // Anonymize data
        const anonymizedData = anonymizeObject(data);
        
        // Write anonymized data
        fs.writeFileSync(filePath, JSON.stringify(anonymizedData, null, 2));
        
        console.log(`✅ Anonymized ${file}`);
      } catch (error) {
        console.error(`❌ Error processing ${file}:`, error.message);
      }
    }
    
    console.log('\n🎉 Anonymization complete!');
    console.log('\n📝 Summary of changes:');
    console.log('- Numeric values varied by ±20-30%');
    console.log('- Countries and regions randomized');
    console.log('- Competitor names shuffled');
    console.log(`- Timeline shifted by ${ANONYMIZATION_CONFIG.timelineShift} years`);
    console.log('- Business terminology generalized');
    console.log('\n💾 Original files backed up with .backup extension');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  anonymizeDataFiles();
}

export { anonymizeDataFiles, ANONYMIZATION_CONFIG };