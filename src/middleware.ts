import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'

// Admin routes are always protected
const isAdminRoute = createRouteMatcher(['/admin(.*)'])

// All routes that normally require auth
const isProtectedRoute = createRouteMatcher([
  '/',
  '/dashboard(.*)',
  '/admin(.*)',
  '/live-dashboard(.*)',
  '/financial-model(.*)',
  '/strategic-plan(.*)',
  '/executive-summary(.*)',
  '/market-analysis(.*)',
  '/product-overview(.*)',
  '/one-pager(.*)',
  '/risk-assessment(.*)',
  '/growth-strategy(.*)',
  '/milestones(.*)',
  '/exit-strategy(.*)',
  '/investor-package(.*)',
])

// Demo mode middleware function
function demoMiddleware(req: NextRequest) {
  // In demo mode, admin routes redirect to admin page which shows demo message
  if (isAdminRoute(req)) {
    const url = req.nextUrl.clone()
    url.pathname = '/admin'
    return NextResponse.rewrite(url)
  }
  
  // All other routes are accessible
  return NextResponse.next()
}

// Production mode middleware function
const productionMiddleware = clerkMiddleware(async (auth, req) => {
  // In normal mode, protect all specified routes
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
})

// Export the appropriate middleware based on mode
export default DEMO_MODE ? demoMiddleware : productionMiddleware

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
