import { SignUp } from '@clerk/nextjs'
import { getCompanyName } from '../../../lib/company-config'

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-warm p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-gradient-sunset mb-2">{getCompanyName()}</h1>
          <p className="text-muted-foreground">
            Create your account to access the investor platform
          </p>
          <p className="text-xs text-muted-foreground/70 mt-2">
            Premium investment documentation & analytics
          </p>
        </div>
        <SignUp />
      </div>
    </div>
  )
}
