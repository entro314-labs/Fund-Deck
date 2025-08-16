import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

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
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
