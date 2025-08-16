# Deployment Guide

This guide covers deploying Fund Deck in both demo mode (public showcase) and production mode (with authentication).

## Demo Mode Deployment (Public Showcase)

Perfect for showcasing the template without requiring users to sign up.

### Vercel (Recommended)

1. **Fork the repository** to your GitHub account

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "New Project" and import your forked repository
   - Deploy with default settings

3. **Verify demo mode:**
   - The `vercel.json` file automatically sets `NEXT_PUBLIC_DEMO_MODE=true`
   - All pages will be publicly accessible
   - Admin section will show "Fork on GitHub" message

4. **Optional customizations:**
   - Update repository URLs in demo components
   - Customize demo messages and branding
   - Modify anonymized data if needed

### Other Platforms

For other deployment platforms, ensure the environment variable `NEXT_PUBLIC_DEMO_MODE=true` is set.

## Production Mode Deployment (With Authentication)

For your own investor deck with full authentication and admin features.

### Prerequisites

1. **Clerk Account:**
   - Create an account at [clerk.com](https://clerk.com)
   - Create a new application
   - Get your publishable key and secret key

2. **Repository Setup:**
   - Fork the repository
   - Clone your fork locally
   - Make any customizations needed

### Environment Variables

Set these environment variables in your deployment platform:

```env
# Disable demo mode
NEXT_PUBLIC_DEMO_MODE=false

# Clerk Authentication (required)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxxxx
CLERK_SECRET_KEY=sk_live_xxxxx

# Optional: Google Sheets integration
GOOGLE_SHEETS_API_KEY=your_google_api_key
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id
```

### Vercel Production Deployment

1. **Update vercel.json:**
   ```json
   {
     "version": 2,
     "framework": "nextjs",
     "env": {
       "NEXT_PUBLIC_DEMO_MODE": "false"
     },
     "functions": {
       "src/app/api/data/[...path]/route.ts": {
         "includeFiles": "src/data/**"
       }
     }
   }
   ```

2. **Add environment variables in Vercel:**
   - Go to your project settings
   - Add the Clerk environment variables
   - Redeploy the project

3. **Configure admin access:**
   - Update admin emails in `src/components/admin-guard.tsx`
   - Test admin authentication

### Other Platforms

#### Netlify
1. Set environment variables in site settings
2. Deploy from GitHub repository
3. Ensure `NEXT_PUBLIC_DEMO_MODE=false`

#### Railway
1. Connect your GitHub repository
2. Add environment variables in project settings
3. Deploy with automatic builds

## Configuration Checklist

### Demo Mode Checklist
- [ ] `NEXT_PUBLIC_DEMO_MODE=true` is set
- [ ] Repository URLs updated in components
- [ ] Demo messages customized
- [ ] Data properly anonymized
- [ ] Build and deployment successful

### Production Mode Checklist
- [ ] `NEXT_PUBLIC_DEMO_MODE=false` or unset
- [ ] Clerk keys added to environment
- [ ] Admin emails configured
- [ ] Authentication flow tested
- [ ] Google Sheets integration configured (optional)
- [ ] Custom domain configured (optional)

## Troubleshooting

### Demo Mode Issues
- **Build fails:** Check that no Clerk keys are required in build process
- **Admin accessible:** Verify admin routes are properly protected
- **Demo message not showing:** Check `NEXT_PUBLIC_DEMO_MODE` environment variable

### Production Mode Issues
- **Authentication not working:** Verify Clerk keys are correct and environment is set
- **Admin access denied:** Check admin emails in `admin-guard.tsx`
- **Build fails:** Ensure all required environment variables are set

### General Issues
- **Environment variables not loading:** Restart development server
- **Changes not reflected:** Clear Next.js cache with `pnpm dev --clean`
- **Database connection issues:** Check Google Sheets API configuration

## Security Considerations

### Demo Mode
- Admin routes remain protected even in demo mode
- No sensitive data should be exposed in demo
- Consider rate limiting for public endpoints

### Production Mode
- Use environment-specific Clerk keys (development vs production)
- Enable proper CORS settings
- Configure secure admin email list
- Set up monitoring and error tracking
- Use HTTPS in production

## Performance Optimization

1. **Image Optimization:**
   - Use Next.js Image component
   - Optimize images in public folder

2. **Bundle Analysis:**
   ```bash
   pnpm build
   pnpm analyze
   ```

3. **Caching:**
   - Configure appropriate cache headers
   - Use Vercel's edge caching features

## Monitoring

### Recommended Tools
- **Vercel Analytics** (for Vercel deployments)
- **Sentry** for error tracking
- **LogRocket** for user session recording
- **Google Analytics** for user behavior

### Health Checks
- Monitor authentication success rates
- Track API endpoint performance
- Monitor build and deployment success

## Scaling Considerations

1. **Database:** Consider upgrading from Google Sheets to a proper database for high traffic
2. **CDN:** Use a CDN for static assets
3. **Caching:** Implement Redis for session management
4. **Rate Limiting:** Add rate limiting for API endpoints

For additional help, see [DEMO_MODE.md](./DEMO_MODE.md) for detailed demo mode configuration.