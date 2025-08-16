# Clerk Authentication Setup

<div align="center">

<svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" fill="#6366F1"/>
<path d="M9 12l2 2 4-4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

**Complete authentication setup guide for FundDeck**

Modern, secure authentication using Clerk with role-based access control.

</div>

---

## ✅ Implementation Status

FundDeck comes with a complete, production-ready authentication system:

<table>
<tr>
<td align="center" width="25%">

<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" fill="#10B981"/>
</svg>

**Authentication**  
Modern Clerk integration

</td>
<td align="center" width="25%">

<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" fill="#10B981"/>
</svg>

**Protected Routes**  
Middleware-based security

</td>
<td align="center" width="25%">

<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" fill="#10B981"/>
</svg>

**Admin Control**  
Role-based access

</td>
<td align="center" width="25%">

<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" fill="#10B981"/>
</svg>

**Admin Dashboard**  
Full content management

</td>
</tr>
</table>

### Implemented Features

- ✅ **Modern Clerk Integration** - Latest App Router SDK with `clerkMiddleware()`
- ✅ **Protected Routes** - All pages require authentication
- ✅ **Admin Access Control** - Email-based admin authorization
- ✅ **Custom Authentication UI** - Branded sign-in/sign-up pages
- ✅ **Complete Admin Dashboard** - All 12 pages editable

## 🛠️ Quick Setup

### Step 1: Get Your Clerk Keys

1. **Create a Clerk Account**
   - Visit [clerk.com](https://clerk.com) and sign up
   - Create a new application for your project

2. **Copy Your API Keys**
   ```bash
   # From your Clerk dashboard, copy these values to .env.local
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
   CLERK_SECRET_KEY=sk_test_your_secret_key_here
   
   # Optional: Customize redirect URLs
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
   ```

### Step 2: Configure Admin Access

Set admin email addresses in your `.env.local`:

```bash
# Comma-separated list of admin email addresses
ADMIN_EMAILS=founder@yourcompany.com,admin@yourcompany.com,investor@yourcompany.com
```

### Step 3: Start Development

```bash
# Install dependencies (if not already done)
pnpm install

# Start the development server
pnpm dev

# Visit your application
open http://localhost:3000
```

That's it! Authentication is fully configured and ready to use.

## 🔐 Security Architecture

### Environment-Based Access Control

**Development Mode:**
- Any authenticated user can access all pages
- Any authenticated user can access the admin panel
- Perfect for development and testing

**Production Mode:**
- Only authenticated users can access the platform
- Only emails listed in `ADMIN_EMAILS` can access admin features
- Secure and production-ready

### Access Control Levels

<table>
<tr>
<td align="center" width="33%">

<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" fill="#6366F1"/>
</svg>

**Public**  
Sign-in/up pages only

</td>
<td align="center" width="33%">

<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" fill="#10B981"/>
</svg>

**Authenticated**  
All platform pages

</td>
<td align="center" width="33%">

<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" fill="#EF4444"/>
</svg>

**Admin**  
Content management

</td>
</tr>
</table>

## 🏗️ Technical Implementation

### Modern Clerk Integration

FundDeck uses the latest Clerk App Router features for seamless authentication:

#### Middleware Protection
```typescript
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)'
]);

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth().protect();
  }
});
```

#### App-Wide Provider
```typescript
// app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

#### Admin Guard Component
```typescript
// components/admin-guard.tsx
import { useUser } from '@clerk/nextjs';
import { getAdminEmails } from '@/lib/company-config';

export default function AdminGuard({ children }) {
  const { user } = useUser();
  const adminEmails = getAdminEmails();
  
  const isAdmin = user?.primaryEmailAddress?.emailAddress
    ? adminEmails.includes(user.primaryEmailAddress.emailAddress)
    : false;

  if (!isAdmin) {
    return <div>Access denied. Admin privileges required.</div>;
  }

  return children;
}
```

## 🎨 Custom Authentication UI

### Branded Sign-in/Sign-up Pages

Located at `/sign-in` and `/sign-up`, these pages feature:

- Custom styling that matches your brand
- Responsive design for all devices
- Social login providers (if configured)
- Email/password authentication
- Forgot password functionality

### User Profile Integration

- User avatars and names in navigation
- Sign-out functionality
- Profile management (handled by Clerk)

## 📊 Admin Dashboard Features

### Content Management

- **12 Editable Pages**: All investor presentation pages
- **Page Meta Editor**: Titles, subtitles, badges, and dates
- **Key Metrics Editor**: Interactive financial and business metrics
- **JSON Editor**: Advanced raw data editing for power users

### Data Management

- **Real-time Updates**: Changes save automatically
- **Data Validation**: Schema validation for all content
- **Export Features**: PDF and data export capabilities
- **Version Control**: Track changes and modifications

## 🚀 Production Deployment

### Environment Variables Checklist

```bash
# Required for production
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_your_production_key
CLERK_SECRET_KEY=sk_live_your_production_secret

# Admin access control
ADMIN_EMAILS=founder@company.com,admin@company.com

# Optional customization
NEXT_PUBLIC_COMPANY_NAME=YourCompanyName
NEXT_PUBLIC_COMPANY_DOMAIN=yourcompany.com
```

### Security Best Practices

- ✅ **Secure API Keys**: Use production keys for live environments
- ✅ **Admin Email Verification**: Restrict admin access to authorized emails
- ✅ **HTTPS Required**: Clerk requires HTTPS in production
- ✅ **Domain Verification**: Configure allowed domains in Clerk dashboard

## 🔧 Customization Options

### Authentication Methods

Configure additional sign-in methods in your Clerk dashboard:

- **Social Providers**: Google, GitHub, LinkedIn, etc.
- **Enterprise SSO**: SAML, OIDC for enterprise customers
- **Phone Authentication**: SMS-based verification
- **Passwordless**: Magic links and one-time codes

### UI Customization

Customize the authentication experience:

```typescript
// app/layout.tsx
<ClerkProvider
  appearance={{
    baseTheme: dark,
    variables: {
      colorPrimary: '#6366F1',
      colorTextOnPrimaryBackground: '#FFFFFF'
    }
  }}
>
  {children}
</ClerkProvider>
```

## 📞 Support and Troubleshooting

### Common Issues

**Environment variables not loading:**
1. Ensure `.env.local` is in the project root
2. Restart the development server
3. Check for typos in variable names

**Admin access denied:**
1. Verify email address matches `ADMIN_EMAILS`
2. Check Clerk user profile for correct email
3. Ensure environment variables are loaded

**Authentication redirects:**
1. Verify redirect URLs in Clerk dashboard
2. Check middleware configuration
3. Ensure proper route protection

### Getting Help

- **Clerk Documentation**: [docs.clerk.com](https://docs.clerk.com)
- **FundDeck Issues**: [GitHub Issues](https://github.com/yourusername/fund-deck/issues)
- **Configuration Guide**: [Configuration Documentation](./docs/configuration.md)

---

<div align="center">

**Ready to secure your platform?**

[Configuration Guide](./docs/configuration.md) • [Getting Started](./docs/getting-started.md) • [API Reference](./docs/api-reference.md)

</div>