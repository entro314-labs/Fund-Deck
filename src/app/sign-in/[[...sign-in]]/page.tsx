import { SignIn } from '@clerk/nextjs'
import { getCompanyName } from '../../../lib/company-config'

const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'

export default function Page() {
  if (DEMO_MODE) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-warm p-4">
        <div className="w-full max-w-md text-center">
          <h1 className="font-serif text-3xl font-bold text-gradient-sunset mb-2">{getCompanyName()}</h1>
          <p className="text-muted-foreground mb-4">Demo Mode Active</p>
          <p className="text-sm text-muted-foreground">
            Authentication is disabled in demo mode. All pages are publicly accessible.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-warm p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-gradient-sunset mb-2">{getCompanyName()}</h1>
          <p className="text-muted-foreground">Sign in to access the investor platform</p>
          <p className="text-xs text-muted-foreground/70 mt-2">
            Premium investment documentation & analytics
          </p>
        </div>
        <SignIn />
      </div>
    </div>
  )
}
