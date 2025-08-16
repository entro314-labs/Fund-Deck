'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useIsMobile } from '../hooks/use-mobile'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { UserButton, useUser, SignedIn } from '@clerk/nextjs'
import { HelpCircle, Shield } from 'lucide-react'
import {
  Menu,
  X,
  Home,
  TrendingUp,
  Euro,
  Users,
  BarChart3,
  FileText,
  Target,
  Calendar,
  Rocket,
  LogOut,
  Moon,
  Sun,
  Presentation,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { useSidebarCollapsed, useAppStore } from '../stores/app-store'
import { COMPANY_CONFIG } from '../lib/company-config'

interface NavigationItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  description?: string
}

interface NavigationGroup {
  title: string
  items: NavigationItem[]
}

const navigation: NavigationGroup[] = [
  {
    title: 'Overview',
    items: [{ name: 'Dashboard', href: '/', icon: Home, description: 'Platform overview' }],
  },
  {
    title: 'Core Documents',
    items: [
      {
        name: 'Business Plan',
        href: '/strategic-plan',
        icon: TrendingUp,
        badge: 'Core',
        description: '2025-2031 strategy',
      },
      {
        name: 'Financial Model',
        href: '/financial-model',
        icon: Euro,
        badge: 'Core',
        description: 'Economics & projections',
      },
      {
        name: 'Investor Package',
        href: '/investor-package',
        icon: Users,
        badge: 'Core',
        description: 'Pitch & terms',
      },
      {
        name: 'Pitch Deck',
        href: '/investor-package/presentation',
        icon: Presentation,
        badge: 'Live',
        description: 'Editable presentation',
      },
      {
        name: 'Market Analysis',
        href: '/market-analysis',
        icon: BarChart3,
        badge: 'Core',
        description: 'Competitive intelligence',
      },
    ],
  },
  {
    title: 'Supporting Documents',
    items: [
      {
        name: 'Executive Summary',
        href: '/executive-summary',
        icon: FileText,
        description: 'Strategic overview',
      },
      { name: 'One-Pager', href: '/one-pager', icon: Target, description: 'Concise overview' },
      {
        name: 'Product Overview',
        href: '/product-overview',
        icon: Rocket,
        description: 'Technical details',
      },
    ],
  },
  {
    title: 'Operational',
    items: [
      {
        name: 'Risk Assessment',
        href: '/risk-assessment',
        icon: Shield,
        description: 'Risk management',
      },
      {
        name: 'Milestones & Timeline',
        href: '/milestones',
        icon: Calendar,
        description: 'Execution tracking',
      },
      {
        name: 'Growth Strategy',
        href: '/growth-strategy',
        icon: TrendingUp,
        description: 'Growth execution',
      },
      { name: 'Exit Strategy', href: '/exit-strategy', icon: LogOut, description: 'Exit planning' },
    ],
  },
]

interface PlatformLayoutProps {
  children: React.ReactNode
}

export default function PlatformLayout({ children }: PlatformLayoutProps) {
  const sidebarCollapsed = useSidebarCollapsed()
  const { toggleSidebar } = useAppStore()
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const isMobile = useIsMobile()
  const { user } = useUser()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch for theme-dependent components
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  // Loading state is handled by Clerk automatically
  // Authentication gating is handled by middleware

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Mobile sidebar backdrop */}
      {!sidebarCollapsed && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => toggleSidebar()}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-80 bg-card/95 backdrop-blur-sm border-r border-border
        transform transition-transform duration-300 ease-in-out
        ${!sidebarCollapsed ? 'translate-x-0' : '-translate-x-full'}
      `}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <h1 className="font-serif text-2xl font-bold text-gradient-sunset">{COMPANY_CONFIG.name}</h1>
              <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                Investor Platform
              </Badge>
            </div>
            <Button variant="ghost" size="sm" onClick={() => toggleSidebar()}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-6">
            <div className="space-y-8">
              {navigation.map((group) => (
                <div key={group.title} className="px-6">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    {group.title}
                  </h3>
                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const isActive = pathname === item.href
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => {
                            // Only close sidebar on mobile devices
                            if (isMobile) {
                              toggleSidebar()
                            }
                          }}
                          className={`
                            group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all
                            ${
                              isActive
                                ? 'bg-primary text-primary-foreground shadow-sm'
                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                            }
                          `}
                        >
                          <div className="flex items-center space-x-3">
                            <item.icon
                              className={`w-4 h-4 ${isActive ? 'text-primary-foreground' : ''}`}
                            />
                            <div className="flex flex-col">
                              <span>{item.name}</span>
                              {item.description && (
                                <span
                                  className={`text-xs ${isActive ? 'text-primary-foreground/70' : 'text-muted-foreground/70'}`}
                                >
                                  {item.description}
                                </span>
                              )}
                            </div>
                          </div>
                          {item.badge && (
                            <Badge
                              variant={isActive ? 'secondary' : 'outline'}
                              className={`text-xs ${isActive ? 'bg-primary-foreground/20 text-primary-foreground' : ''}`}
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="border-t border-border p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">Last updated: August 2025</div>
                <Button variant="ghost" size="sm" onClick={toggleTheme} className="h-8 w-8 p-0">
                  {!mounted ? (
                    <Sun className="w-4 h-4" />
                  ) : theme === 'dark' ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <SignedIn>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center space-x-2">
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox: 'w-6 h-6 rounded-full border-2 border-primary/20',
                          userButtonPopover: 'bg-card border border-border shadow-lg',
                          userButtonPopoverCard: 'bg-card',
                        },
                      }}
                    >
                      <UserButton.MenuItems>
                        <UserButton.Link
                          label="Admin Panel"
                          labelIcon={<Shield className="w-4 h-4" />}
                          href="/admin"
                        />
                        <UserButton.Action
                          label="Help & Support"
                          labelIcon={<HelpCircle className="w-4 h-4" />}
                          onClick={() => window.open(`mailto:${COMPANY_CONFIG.supportEmail}`, '_blank')}
                        />
                      </UserButton.MenuItems>
                    </UserButton>
                    {user && (
                      <div className="text-xs">
                        <div className="font-medium text-foreground">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-muted-foreground">
                          {user.emailAddresses[0]?.emailAddress}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`transition-all duration-300 ${!sidebarCollapsed ? 'lg:pl-80' : 'lg:pl-0'}`}>
        {/* Header */}
        <div className="sticky top-0 z-30 flex h-16 items-center justify-between bg-card/95 backdrop-blur-sm border-b border-border px-4">
          <Button variant="ghost" size="sm" onClick={() => toggleSidebar()}>
            <Menu className="w-5 h-5" />
          </Button>
          <h1 className="font-serif text-xl font-bold text-gradient-sunset">{COMPANY_CONFIG.name}</h1>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {!mounted ? (
                <Sun className="w-4 h-4" />
              ) : theme === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox:
                      'w-8 h-8 rounded-full border-2 border-primary/20 hover:border-primary/40 transition-colors',
                    userButtonPopover: 'bg-card border border-border shadow-lg',
                    userButtonPopoverCard: 'bg-card',
                  },
                }}
              >
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="Admin Panel"
                    labelIcon={<Shield className="w-4 h-4" />}
                    href="/admin"
                  />
                  <UserButton.Action
                    label="Help & Support"
                    labelIcon={<HelpCircle className="w-4 h-4" />}
                    onClick={() => window.open('mailto:support@myroomie.com', '_blank')}
                  />
                </UserButton.MenuItems>
              </UserButton>
            </SignedIn>
          </div>
        </div>

        {/* Page content */}
        <main className="min-h-screen">{children}</main>
      </div>
    </div>
  )
}
