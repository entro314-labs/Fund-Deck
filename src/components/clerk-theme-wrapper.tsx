'use client'

import { useTheme } from 'next-themes'
import { getClerkTheme } from '../lib/clerk-theme'

interface ClerkThemeWrapperProps {
  children: React.ReactNode
  appearance?: Record<string, any>
}

export function useClerkTheme() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  return getClerkTheme(isDark)
}

export default function ClerkThemeWrapper({ children, appearance }: ClerkThemeWrapperProps) {
  const clerkTheme = useClerkTheme()

  // If custom appearance is provided, merge it with the theme
  const mergedAppearance = appearance
    ? {
        ...clerkTheme,
        variables: { ...clerkTheme.variables, ...appearance.variables },
        elements: { ...clerkTheme.elements, ...appearance.elements },
      }
    : clerkTheme

  return <>{children}</>
}
