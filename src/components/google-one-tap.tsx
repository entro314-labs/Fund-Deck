'use client'

import { GoogleOneTap } from '@clerk/nextjs'
import { useTheme } from 'next-themes'
import { getClerkTheme } from '../lib/clerk-theme'

interface GoogleOneTapProps {
  cancelOnTapOutside?: boolean
  itpSupport?: boolean
  fedCmSupport?: boolean
  signInForceRedirectUrl?: string
  signUpForceRedirectUrl?: string
}

export default function GoogleOneTapAuth({
  cancelOnTapOutside = true,
  itpSupport = true,
  fedCmSupport = true,
  signInForceRedirectUrl = '/',
  signUpForceRedirectUrl = '/',
}: GoogleOneTapProps = {}) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <GoogleOneTap
      cancelOnTapOutside={cancelOnTapOutside}
      itpSupport={itpSupport}
      fedCmSupport={fedCmSupport}
      signInForceRedirectUrl={signInForceRedirectUrl}
      signUpForceRedirectUrl={signUpForceRedirectUrl}
      appearance={getClerkTheme(isDark)}
    />
  )
}
