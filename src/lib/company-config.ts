/**
 * Company/Brand configuration
 * All branding and company-specific values should be configured here
 */

export const COMPANY_CONFIG = {
  // Company branding
  name: process.env.NEXT_PUBLIC_COMPANY_NAME || 'MyRoomie',
  domain: process.env.NEXT_PUBLIC_COMPANY_DOMAIN || 'myroomie.com',
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@myroomie.com',
  
  // Admin configuration
  adminEmails: process.env.ADMIN_EMAILS || 'admin@company.com,contact@company.com',
  
  // Product names (configurable per startup)
  products: {
    connect: process.env.NEXT_PUBLIC_PRODUCT_CONNECT || `${process.env.NEXT_PUBLIC_COMPANY_NAME || 'MyRoomie'} Connect`,
    spaces: process.env.NEXT_PUBLIC_PRODUCT_SPACES || `${process.env.NEXT_PUBLIC_COMPANY_NAME || 'MyRoomie'} Spaces`,
    enterprise: process.env.NEXT_PUBLIC_PRODUCT_ENTERPRISE || `${process.env.NEXT_PUBLIC_COMPANY_NAME || 'MyRoomie'} Enterprise`,
  },
  
  // Platform title for meta tags
  platformTitle: process.env.NEXT_PUBLIC_PLATFORM_TITLE || `${process.env.NEXT_PUBLIC_COMPANY_NAME || 'MyRoomie'} - Premium Investor Pitch Deck`,
  platformDescription: process.env.NEXT_PUBLIC_PLATFORM_DESCRIPTION || "Europe's Integrated Living Platform - Investment Presentation",
  
  // Admin panel description
  adminDescription: process.env.NEXT_PUBLIC_ADMIN_DESCRIPTION || `Manage content across all pages of the ${process.env.NEXT_PUBLIC_COMPANY_NAME || 'MyRoomie'} investor platform`,
} as const

// Helper function to get admin emails as array
export const getAdminEmails = (): string[] => {
  return COMPANY_CONFIG.adminEmails.split(',').map(email => email.trim()).filter(Boolean)
}

// Helper function to get company name for display
export const getCompanyName = (): string => {
  return COMPANY_CONFIG.name
}

// Helper function to get support email
export const getSupportEmail = (): string => {
  return COMPANY_CONFIG.supportEmail
}