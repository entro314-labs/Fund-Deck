#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Patterns that might indicate security vulnerabilities
const SECURITY_PATTERNS = [
  // API Keys
  {
    pattern: /AIza[0-9A-Za-z\-_]{35}/g,
    type: 'Google API Key',
    severity: 'CRITICAL'
  },
  {
    pattern: /sk-[a-zA-Z0-9]{48}/g,
    type: 'OpenAI API Key',
    severity: 'CRITICAL'
  },
  {
    pattern: /xoxb-[0-9]{11}-[0-9]{11}-[a-zA-Z0-9]{24}/g,
    type: 'Slack Bot Token',
    severity: 'CRITICAL'
  },
  // AWS Credentials
  {
    pattern: /AKIA[0-9A-Z]{16}/g,
    type: 'AWS Access Key',
    severity: 'CRITICAL'
  },
  {
    pattern: /[0-9a-zA-Z/+]{40}/g,
    type: 'AWS Secret Key (potential)',
    severity: 'HIGH'
  },
  // Database URLs
  {
    pattern: /postgres:\/\/[^:\s]+:[^@\s]+@[^\/\s]+\/\w+/gi,
    type: 'PostgreSQL Connection String',
    severity: 'HIGH'
  },
  {
    pattern: /mongodb:\/\/[^:\s]+:[^@\s]+@[^\/\s]+\/\w+/gi,
    type: 'MongoDB Connection String',
    severity: 'HIGH'
  },
  // Email addresses (potential leaks)
  {
    pattern: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    type: 'Email Address',
    severity: 'MEDIUM'
  },
  // Phone numbers (more specific pattern)
  {
    pattern: /\+?[1-9]\d{8,14}(?!\w)/g,
    type: 'Phone Number (potential)',
    severity: 'LOW'
  },
  // Hardcoded passwords or secrets
  {
    pattern: /(password|secret|key|token)\s*[:=]\s*['""][^'""]+['""](?!\s*process\.env)/gi,
    type: 'Hardcoded Secret',
    severity: 'HIGH'
  }
];

// Files and directories to exclude from scanning
const EXCLUDE_PATTERNS = [
  /node_modules/,
  /\.git/,
  /\.next/,
  /build/,
  /dist/,
  /coverage/,
  /\.env\.example$/,
  /security-audit\.js$/,
  /pnpm-lock\.yaml$/,
  /package-lock\.json$/,
  /yarn\.lock$/,
  /\.log$/,
  /\.png$/,
  /\.jpg$/,
  /\.jpeg$/,
  /\.gif$/,
  /\.svg$/,
  /\.ico$/,
  /\.woff/,
  /\.ttf/,
  /\.eot/,
  /\.css$/,
  /\.scss$/,
  /\.sass$/
];

function shouldExcludeFile(filePath) {
  return EXCLUDE_PATTERNS.some(pattern => pattern.test(filePath));
}

function scanFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const findings = [];

    SECURITY_PATTERNS.forEach(({ pattern, type, severity }) => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        // Skip if it's already using environment variables
        if (match[0].includes('process.env')) continue;
        
        // Get line number
        const beforeMatch = content.substring(0, match.index);
        const lineNumber = (beforeMatch.match(/\n/g) || []).length + 1;
        
        findings.push({
          file: filePath,
          line: lineNumber,
          type,
          severity,
          match: match[0],
          context: getContextLine(content, match.index)
        });
      }
    });

    return findings;
  } catch (error) {
    console.warn(`⚠️ Could not scan ${filePath}: ${error.message}`);
    return [];
  }
}

function getContextLine(content, index) {
  const lines = content.split('\n');
  const beforeMatch = content.substring(0, index);
  const lineNumber = (beforeMatch.match(/\n/g) || []).length;
  return lines[lineNumber] || '';
}

function scanDirectory(dirPath) {
  const findings = [];
  
  function scan(currentPath) {
    try {
      const items = fs.readdirSync(currentPath);
      
      for (const item of items) {
        const itemPath = path.join(currentPath, item);
        
        if (shouldExcludeFile(itemPath)) continue;
        
        const stat = fs.statSync(itemPath);
        
        if (stat.isDirectory()) {
          scan(itemPath);
        } else if (stat.isFile()) {
          const fileFindings = scanFile(itemPath);
          findings.push(...fileFindings);
        }
      }
    } catch (error) {
      console.warn(`⚠️ Could not scan directory ${currentPath}: ${error.message}`);
    }
  }
  
  scan(dirPath);
  return findings;
}

function generateReport(findings) {
  console.log('🔍 Security Audit Report');
  console.log('========================\n');
  
  if (findings.length === 0) {
    console.log('✅ No security vulnerabilities found!');
    return;
  }
  
  // Group by severity
  const bySeverity = findings.reduce((acc, finding) => {
    if (!acc[finding.severity]) acc[finding.severity] = [];
    acc[finding.severity].push(finding);
    return acc;
  }, {});
  
  const severityOrder = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];
  const severityIcons = {
    CRITICAL: '🚨',
    HIGH: '⚠️',
    MEDIUM: '⚡',
    LOW: 'ℹ️'
  };
  
  severityOrder.forEach(severity => {
    if (!bySeverity[severity]) return;
    
    console.log(`${severityIcons[severity]} ${severity} (${bySeverity[severity].length} issues)`);
    console.log('─'.repeat(50));
    
    bySeverity[severity].forEach(finding => {
      console.log(`📁 ${finding.file}:${finding.line}`);
      console.log(`🔍 ${finding.type}`);
      console.log(`💭 ${finding.context.trim()}`);
      
      // Mask sensitive data in output
      const maskedMatch = finding.match.replace(/./g, '*').substring(0, 20) + '...';
      console.log(`🔑 Found: ${maskedMatch}`);
      console.log('');
    });
  });
  
  console.log(`\n📊 Summary: Found ${findings.length} potential security issues`);
  console.log('🔧 Please review and move sensitive data to environment variables');
}

// Main execution
async function main() {
  console.log('🔍 Starting security audit...\n');
  
  const projectRoot = process.cwd();
  const findings = scanDirectory(projectRoot);
  
  generateReport(findings);
  
  // Exit with error code if critical or high severity issues found
  const criticalOrHigh = findings.filter(f => 
    f.severity === 'CRITICAL' || f.severity === 'HIGH'
  );
  
  if (criticalOrHigh.length > 0) {
    console.log('\n❌ Security audit failed due to critical/high severity issues');
    process.exit(1);
  } else {
    console.log('\n✅ Security audit passed');
    process.exit(0);
  }
}

if (require.main === module) {
  main().catch(error => {
    console.error('❌ Security audit failed:', error);
    process.exit(1);
  });
}

module.exports = { scanDirectory, generateReport };