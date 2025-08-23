/**
 * Company/Brand configuration
 * All branding and company-specific values should be configured here
 */

export const COMPANY_CONFIG = {
  // Company branding
  name: process.env.NEXT_PUBLIC_COMPANY_NAME || 'Fund Deck',
  domain: process.env.NEXT_PUBLIC_COMPANY_DOMAIN || 'funddeck.com',
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@company.com',

  // Admin configuration
  adminEmails: process.env.ADMIN_EMAILS || 'admin@company.com,contact@company.com',

  // Product names (configurable per startup)
  products: {
    connect:
      process.env.NEXT_PUBLIC_PRODUCT_CONNECT ||
      `${process.env.NEXT_PUBLIC_COMPANY_NAME || 'Fund Deck'} Connect`,
    spaces:
      process.env.NEXT_PUBLIC_PRODUCT_SPACES ||
      `${process.env.NEXT_PUBLIC_COMPANY_NAME || 'Fund Deck'} Spaces`,
    enterprise:
      process.env.NEXT_PUBLIC_PRODUCT_ENTERPRISE ||
      `${process.env.NEXT_PUBLIC_COMPANY_NAME || 'Fund Deck'} Enterprise`,
  },

  // Platform title for meta tags
  platformTitle:
    process.env.NEXT_PUBLIC_PLATFORM_TITLE ||
    `${process.env.NEXT_PUBLIC_COMPANY_NAME || 'Fund Deck'} - Investor Pitch Deck Template`,
  platformDescription:
    process.env.NEXT_PUBLIC_PLATFORM_DESCRIPTION ||
    'Professional investor presentation template for startups',

  // Admin panel description
  adminDescription:
    process.env.NEXT_PUBLIC_ADMIN_DESCRIPTION ||
    `Manage content across all pages of the ${process.env.NEXT_PUBLIC_COMPANY_NAME || 'Fund Deck'} investor platform`,
} as const

// Helper function to get admin emails as array
export const getAdminEmails = (): string[] => {
  return COMPANY_CONFIG.adminEmails
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean)
}

// Helper function to get company name for display
export const getCompanyName = (): string => {
  return COMPANY_CONFIG.name
}

// Helper function to get support email
export const getSupportEmail = (): string => {
  return COMPANY_CONFIG.supportEmail
}
