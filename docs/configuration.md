# Configuration Guide

<div align="center">

<svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" fill="#6366F1"/>
</svg>

**Advanced configuration options for FundDeck**

Customize your investor presentation platform to match your brand and requirements.

</div>

---

## 🔧 Environment Variables

### Authentication Configuration

#### Clerk Setup (Required)

```bash
# Clerk Authentication - Get these from https://clerk.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here

# Redirect URLs after authentication
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Custom domain (if using Clerk's custom domain feature)
NEXT_PUBLIC_CLERK_DOMAIN=your-custom-domain.com
```

**Setting up Clerk:**

1. Create account at [clerk.com](https://clerk.com)
2. Create a new application
3. Copy API keys from the dashboard
4. Configure authentication methods (email, social logins, etc.)
5. Set up webhooks if needed for user management

#### Admin Access Control

```bash
# Comma-separated list of admin email addresses
ADMIN_EMAILS=founder@company.com,cto@company.com,admin@company.com

# Alternative: Use environment-specific admin lists
ADMIN_EMAILS_PRODUCTION=founder@company.com
ADMIN_EMAILS_STAGING=founder@company.com,dev@company.com
```

### Company Branding

```bash
# Company Information
NEXT_PUBLIC_COMPANY_NAME=YourStartupName
NEXT_PUBLIC_COMPANY_DOMAIN=yourstartup.com
NEXT_PUBLIC_SUPPORT_EMAIL=support@yourstartup.com

# Product Names (used throughout the platform)
NEXT_PUBLIC_PRODUCT_CONNECT=YourProduct Connect
NEXT_PUBLIC_PRODUCT_SPACES=YourProduct Spaces
NEXT_PUBLIC_PRODUCT_ENTERPRISE=YourProduct Enterprise

# Platform Metadata
NEXT_PUBLIC_PLATFORM_TITLE=YourStartup - Investor Presentation
NEXT_PUBLIC_PLATFORM_DESCRIPTION=Leading platform for innovative solutions
NEXT_PUBLIC_ADMIN_DESCRIPTION=Manage content across all investor platform pages
```

### Analytics and Monitoring

```bash
# Vercel Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id

# Google Analytics (if using custom implementation)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Monitoring and Error Tracking
SENTRY_DSN=your_sentry_dsn
NEXT_PUBLIC_SENTRY_DSN=your_public_sentry_dsn
```

### Development Configuration

```bash
# Development Mode Settings
NODE_ENV=development  # development | production
NEXT_PUBLIC_DEBUG=true
NEXT_PUBLIC_SHOW_ADMIN_DEBUG=true

# API Configuration
API_BASE_URL=http://localhost:3000/api
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api

# Build Configuration
ANALYZE=true  # Enable bundle analysis
BUNDLE_ANALYZE=browser  # browser | server | both
```

## 🎨 Customizing Company Configuration

### The Company Config File

The main configuration is managed in `src/lib/company-config.ts`:

```typescript
export const COMPANY_CONFIG = {
  // Company branding
  name: process.env.NEXT_PUBLIC_COMPANY_NAME || 'MyRoomie',
  domain: process.env.NEXT_PUBLIC_COMPANY_DOMAIN || 'myroomie.com',
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@myroomie.com',
  
  // Admin configuration
  adminEmails: process.env.ADMIN_EMAILS || 'admin@company.com',
  
  // Product names
  products: {
    connect: process.env.NEXT_PUBLIC_PRODUCT_CONNECT || 'MyRoomie Connect',
    spaces: process.env.NEXT_PUBLIC_PRODUCT_SPACES || 'MyRoomie Spaces',
    enterprise: process.env.NEXT_PUBLIC_PRODUCT_ENTERPRISE || 'MyRoomie Enterprise',
  },
  
  // Platform metadata
  platformTitle: process.env.NEXT_PUBLIC_PLATFORM_TITLE || 'MyRoomie - Premium Investor Pitch Deck',
  platformDescription: process.env.NEXT_PUBLIC_PLATFORM_DESCRIPTION || "Europe's Integrated Living Platform",
  adminDescription: process.env.NEXT_PUBLIC_ADMIN_DESCRIPTION || 'Manage content across all pages',
} as const;
```

### Extending Company Configuration

Add custom configuration options:

```typescript
// src/lib/company-config.ts
export const COMPANY_CONFIG = {
  // ... existing config
  
  // Custom branding
  logo: {
    light: '/images/logo-light.svg',
    dark: '/images/logo-dark.svg',
    favicon: '/favicon.ico'
  },
  
  // Social media
  social: {
    twitter: process.env.NEXT_PUBLIC_TWITTER_HANDLE || '@yourcompany',
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://linkedin.com/company/yourcompany',
    github: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/yourcompany'
  },
  
  // Business details
  business: {
    foundedYear: 2024,
    headquarters: 'Berlin, Germany',
    employees: '10-50',
    stage: 'Series A'
  },
  
  // Feature flags
  features: {
    enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
    enableChat: process.env.NEXT_PUBLIC_ENABLE_CHAT === 'true',
    enableExports: process.env.NEXT_PUBLIC_ENABLE_EXPORTS !== 'false'
  }
} as const;
```

## 📄 Content Configuration

### Page Data Structure

Each page's content is stored in JSON files under `src/data/pages/`:

```json
// src/data/pages/dashboard.json
{
  "meta": {
    "title": "Dashboard",
    "subtitle": "Executive Overview & Key Metrics",
    "date": "2024-08-16",
    "badge": "Live",
    "exportButtonText": "Export Dashboard"
  },
  "keyMetrics": [
    {
      "id": "monthly-revenue",
      "title": "Monthly Revenue",
      "value": 125000,
      "prefix": "€",
      "suffix": "",
      "subtitle": "30% growth MoM",
      "color": "text-green-600"
    }
  ],
  "sections": [
    {
      "id": "overview",
      "title": "Company Overview",
      "content": "Your company description here...",
      "order": 1
    }
  ]
}
```

### Global Data Configuration

Shared configuration in `src/data/shared/`:

```json
// src/data/shared/navigation.json
{
  "primaryNavigation": [
    {
      "name": "Dashboard",
      "href": "/dashboard",
      "icon": "BarChart3",
      "badge": "Core"
    },
    {
      "name": "Financial Model",
      "href": "/financial-model", 
      "icon": "TrendingUp",
      "badge": "Core"
    }
  ],
  "footerLinks": [
    {
      "name": "Support",
      "href": "/support"
    }
  ]
}
```

## 🎭 Theme Customization

### Tailwind CSS Configuration

Customize the design system in `tailwind.config.js`:

```javascript
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Custom brand colors
        brand: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        // Custom accent colors
        accent: {
          primary: '#6366f1',
          secondary: '#8b5cf6',
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444'
        }
      },
      fontFamily: {
        // Custom fonts
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      spacing: {
        // Custom spacing
        '18': '4.5rem',
        '88': '22rem'
      },
      animation: {
        // Custom animations
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.5s ease-in-out'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio')
  ]
};
```

### CSS Custom Properties

Define theme variables in `src/styles/globals.css`:

```css
:root {
  /* Brand colors */
  --color-brand-primary: #6366f1;
  --color-brand-secondary: #8b5cf6;
  
  /* Layout */
  --header-height: 4rem;
  --sidebar-width: 16rem;
  --max-content-width: 1200px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  
  /* Border radius */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
}

/* Dark mode overrides */
[data-theme="dark"] {
  --color-brand-primary: #818cf8;
  --color-brand-secondary: #a78bfa;
}
```

## 📊 Data Validation Configuration

### Zod Schema Configuration

Customize data validation in `src/lib/validation.ts`:

```typescript
import { z } from 'zod';

// Base schemas
const MetricSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  value: z.union([z.number(), z.string()]),
  prefix: z.string().optional(),
  suffix: z.string().optional(),
  subtitle: z.string().optional(),
  color: z.string().optional()
});

// Page-specific schemas
const DashboardSchema = z.object({
  meta: z.object({
    title: z.string().min(1, 'Title is required'),
    subtitle: z.string().optional(),
    date: z.string().optional()
  }),
  keyMetrics: z.array(MetricSchema),
  sections: z.array(z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    order: z.number().optional()
  }))
});

// Validation function
export function validateDataByPath(path: string, data: any) {
  const schemas = {
    'dashboard': DashboardSchema,
    'financial-model': FinancialModelSchema,
    // ... other schemas
  };
  
  const schema = schemas[path];
  if (!schema) {
    return { success: true, data }; // No validation for unknown paths
  }
  
  return schema.safeParse(data);
}
```

## 🔗 API Configuration

### Custom API Routes

Add custom API endpoints in `src/app/api/`:

```typescript
// src/app/api/health/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0'
  });
}
```

### Middleware Configuration

Configure request middleware in `middleware.ts`:

```typescript
import { authMiddleware } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export default authMiddleware({
  // Public routes that don't require authentication
  publicRoutes: [
    '/',
    '/api/health',
    '/api/data/pages/(.*)'  // Allow public read access to data
  ],
  
  // Routes that require authentication
  afterAuth(auth, req) {
    // Custom logic after authentication
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    
    // Check admin access for admin routes
    if (req.nextUrl.pathname.startsWith('/admin')) {
      // Implement admin check logic
    }
    
    return NextResponse.next();
  }
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
```

## 🚀 Build and Deployment

### Next.js Configuration

Customize build behavior in `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build configuration
  output: 'standalone', // For Docker deployments
  compress: true,
  
  // Image optimization
  images: {
    domains: ['your-cdn-domain.com'],
    formats: ['image/webp', 'image/avif']
  },
  
  // Environment variables validation
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Webpack customization
  webpack: (config, { buildId, dev, isServer }) => {
    // Custom webpack config
    if (process.env.ANALYZE === 'true') {
      const withBundleAnalyzer = require('@next/bundle-analyzer')({
        enabled: true
      });
      return withBundleAnalyzer(config);
    }
    
    return config;
  },
  
  // Experimental features
  experimental: {
    turbo: {
      loaders: {
        '.svg': ['@svgr/webpack']
      }
    }
  }
};

module.exports = nextConfig;
```

### Production Environment

```bash
# Production environment variables
NODE_ENV=production
NEXT_PUBLIC_ENVIRONMENT=production

# Security
NEXTAUTH_SECRET=your-secret-key
ENCRYPTION_KEY=your-encryption-key

# Performance
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_CACHE_TTL=3600

# Error tracking
SENTRY_ORG=your-org
SENTRY_PROJECT=your-project
```

## 🧪 Testing Configuration

### Vitest Configuration

Configure testing in `vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
    css: false,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*'
      ]
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
```

---

<div align="center">

**Ready to customize your platform?**

[Examples](./examples.md) • [API Reference](./api-reference.md) • [Getting Started](./getting-started.md)

</div>