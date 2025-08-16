# Demo Mode Configuration

This Fund Deck template supports a **Demo Mode** that allows public access to all pages except the admin section, making it perfect for showcasing the template while keeping authentication ready for production use.

## What is Demo Mode?

When Demo Mode is enabled:
- ✅ All pages are publicly accessible (no authentication required)
- ✅ Admin section remains protected and shows a "Fork on GitHub" message
- ✅ Clerk authentication components are conditionally hidden
- ✅ Perfect for public demos and showcasing the template
- ✅ Build process works without Clerk keys

When Demo Mode is disabled:
- 🔒 All pages require authentication via Clerk
- 🔒 Admin section requires specific admin email addresses
- 🔒 Full authentication flow is active
- 🔒 Requires valid Clerk publishable and secret keys

## How It Works

The demo mode implementation uses an **environment-based approach**:

1. **Middleware Protection**: `src/middleware.ts` conditionally protects routes based on `DEMO_MODE`
2. **Conditional ClerkProvider**: `src/app/layout.tsx` only wraps content with ClerkProvider when not in demo mode
3. **Runtime Checks**: Components check `DEMO_MODE` at runtime to show/hide auth-related UI
4. **Admin Protection**: Admin routes are always protected, even in demo mode

## Enabling/Disabling Demo Mode

### Method 1: Environment Variable
Set the `NEXT_PUBLIC_DEMO_MODE` environment variable:

```bash
# Enable demo mode (public access)
NEXT_PUBLIC_DEMO_MODE=true

# Disable demo mode (requires authentication)
NEXT_PUBLIC_DEMO_MODE=false
```

### Method 2: Vercel Deployment
The `vercel.json` file is pre-configured to enable demo mode for Vercel deployments:

```json
{
  "env": {
    "NEXT_PUBLIC_DEMO_MODE": "true"
  }
}
```

To disable demo mode on Vercel:
1. Update `vercel.json` to set `NEXT_PUBLIC_DEMO_MODE=false`
2. Add your Clerk environment variables to Vercel
3. Redeploy

## Setting Up Your Own Production Version

1. **Fork the repository** to your GitHub account

2. **Set up Clerk authentication**:
   ```bash
   # Copy the environment template
   cp .env.example .env.local
   
   # Add your Clerk keys
   NEXT_PUBLIC_DEMO_MODE=false
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   ```

3. **Configure admin access** in `src/components/admin-guard.tsx`:
   ```typescript
   const ADMIN_EMAILS = [
     'your-email@company.com',
     'admin@company.com',
   ]
   ```

4. **Update GitHub repository URL** in demo components:
   - `src/lib/demo-config.ts`
   - `src/components/admin-guard.tsx`
   - `src/components/platform-layout.tsx`

5. **Deploy to Vercel**:
   - Update `vercel.json` to disable demo mode
   - Add your Clerk environment variables to Vercel
   - Deploy your customized version

## File Structure

The demo mode system consists of:

- `src/lib/demo-config.ts` - Demo mode configuration and utilities  
- `src/middleware.ts` - Environment-based route protection using clerkMiddleware
- `src/components/admin-guard.tsx` - Admin section protection with demo mode handling
- `src/components/platform-layout.tsx` - UI components with conditional auth rendering
- `src/app/layout.tsx` - Conditional ClerkProvider wrapping
- `src/app/sign-in/[[...sign-in]]/page.tsx` - Sign-in page with demo mode fallback
- `src/app/sign-up/[[...sign-up]]/page.tsx` - Sign-up page with demo mode fallback
- `src/components/google-one-tap.tsx` - Conditional Google One Tap rendering
- `vercel.json` - Deployment configuration with demo mode enabled

## Implementation Details

### Middleware (`src/middleware.ts`)
```typescript
export default clerkMiddleware(async (auth, req) => {
  // In demo mode, make all routes public except admin
  if (DEMO_MODE) {
    if (isAdminRoute(req)) {
      await auth.protect()
    }
    return
  }

  // In normal mode, protect all specified routes
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
})
```

### Layout (`src/app/layout.tsx`)
```typescript
// In demo mode, skip ClerkProvider entirely
if (DEMO_MODE) {
  return content
}

// In normal mode, wrap with ClerkProvider
return <ClerkProvider>{content}</ClerkProvider>
```

### Component Conditional Rendering
```typescript
// Example: Platform Layout
const { user } = DEMO_MODE ? { user: null } : useUser()

// Example: Auth Components
{!DEMO_MODE && (
  <SignedIn>
    <UserButton />
  </SignedIn>
)}
```

## Benefits

- **Easy showcasing**: Share a live demo without requiring user registration
- **Quick setup**: Fork and deploy with minimal configuration
- **Authentication ready**: Clerk integration is ready to activate
- **Secure admin**: Admin features remain protected even in demo mode
- **SEO friendly**: Public pages can be indexed by search engines

## Customization

You can customize the demo mode behavior by modifying:

- Demo messages and links in `src/lib/demo-config.ts`
- UI components in `src/components/platform-layout.tsx`
- Admin protection logic in `src/components/admin-guard.tsx`

## Security Notes

- **Admin routes are always protected**, even in demo mode
- **Middleware-level protection** ensures admin access requires authentication
- **No Clerk keys needed** for demo builds - works without valid authentication
- **Runtime-only changes** - demo mode doesn't affect build-time security
- **Production deployments** should disable demo mode and configure proper Clerk authentication

## Troubleshooting

### Build Issues
- ✅ **Fixed**: No longer requires Clerk publishable keys for demo builds
- ✅ **Fixed**: All Clerk components import normally but render conditionally
- ✅ **Working**: Uses standard `clerkMiddleware` with environment-based logic

### Demo Mode Not Working
1. Check `NEXT_PUBLIC_DEMO_MODE=true` is set correctly
2. Verify environment variable is available at build time
3. Restart development server after changing environment variables

### Production Setup Issues
1. Ensure `NEXT_PUBLIC_DEMO_MODE=false` (or unset)
2. Add valid `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`
3. Configure admin emails in `src/components/admin-guard.tsx`
4. Test authentication flow before deploying