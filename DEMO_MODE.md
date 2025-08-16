# Demo Mode Configuration

This Fund Deck template supports a **Demo Mode** that allows public access to all pages except the admin section, making it perfect for showcasing the template while keeping authentication ready for production use.

## What is Demo Mode?

When Demo Mode is enabled:
- ✅ All pages are publicly accessible (no authentication required)
- ✅ Admin section remains protected and shows a "Fork on GitHub" message
- ✅ Clerk authentication components are hidden but not removed
- ✅ Perfect for public demos and showcasing the template

When Demo Mode is disabled:
- 🔒 All pages require authentication via Clerk
- 🔒 Admin section requires specific admin email addresses
- 🔒 Full authentication flow is active

## Enabling/Disabling Demo Mode

### Method 1: Environment Variable
Set the `NEXT_PUBLIC_DEMO_MODE` environment variable:

```bash
# Enable demo mode
NEXT_PUBLIC_DEMO_MODE=true

# Disable demo mode (default)
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

To disable demo mode on Vercel, either:
1. Remove the `env` section from `vercel.json`, or
2. Set `NEXT_PUBLIC_DEMO_MODE=false` in Vercel's environment variables

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
- `src/middleware.ts` - Route protection logic
- `src/components/admin-guard.tsx` - Admin section protection
- `src/components/platform-layout.tsx` - UI components with demo mode support
- `src/app/layout.tsx` - Conditional Clerk provider rendering
- `vercel.json` - Deployment configuration

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

- Admin routes are always protected, even in demo mode
- Sensitive API endpoints should check authentication status
- Demo mode only affects client-side authentication requirements
- Production deployments should disable demo mode and configure proper authentication