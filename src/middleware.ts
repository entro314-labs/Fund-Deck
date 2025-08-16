import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'

// In demo mode, only admin routes are protected
const isAdminRoute = createRouteMatcher(['/admin(.*)'])

// In normal mode, all routes are protected
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

export default clerkMiddleware(async (auth, req) => {
  if (DEMO_MODE) {
    // In demo mode, only protect admin routes
    if (isAdminRoute(req)) {
      await auth.protect()
    }
  } else {
    // In normal mode, protect all routes
    if (isProtectedRoute(req)) {
      await auth.protect()
    }
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
