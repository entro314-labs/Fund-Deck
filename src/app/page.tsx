'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import {
  FileText,
  TrendingUp,
  Users,
  Globe,
  Target,
  Download,
  CheckCircle,
  Zap,
  Building2,
  Building,
  Clock,
  BarChart3,
  PieChart,
  Calendar,
  Rocket,
  Shield,
  LogOut,
  Star,
  Eye,
  ArrowRight,
  Presentation,
  Play,
  ChevronRight,
  MapPin,
  AlertTriangle,
  Smartphone,
  Brain,
  Code,
  Database,
  Cloud,
  TrendingDown,
  Euro,
  Activity,
  Handshake,
  Search,
  Scale,
} from 'lucide-react'
import { useDataQuery } from '../hooks/use-data-query'
import { ErrorBoundary, QueryErrorBoundary } from '../components/error-boundary'
import type { DashboardData, IconType } from '../types/data'

// Icon mapping for dynamic icon loading
const iconMap: Record<IconType, any> = {
  FileText,
  TrendingUp,
  Euro,
  Users,
  Globe,
  Target,
  Download,
  CheckCircle,
  Zap,
  Building2,
  Building,
  Clock,
  BarChart3,
  PieChart,
  Calendar,
  Rocket,
  Shield,
  LogOut,
  Star,
  Eye,
  ArrowRight,
  Presentation,
  Play,
  ChevronRight,
  MapPin,
  AlertTriangle,
  Smartphone,
  Brain,
  Code,
  Database,
  Cloud,
  TrendingDown,
  Activity,
  Handshake,
  Search,
  Scale,
}

function DashboardContent() {
  const { data, loading, error } = useDataQuery<DashboardData>('pages/dashboard')

  if (loading) {
    return (
      <div className="min-h-screen p-6 lg:p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen p-6 lg:p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-2">Error loading dashboard</p>
          <p className="text-muted-foreground">{error?.message || 'Unknown error'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <h1 className="text-3xl font-bold text-foreground">{data.meta.title}</h1>
          {data.meta.badge && (
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {data.meta.badge}
            </Badge>
          )}
        </div>
        <p className="text-lg text-muted-foreground">{data.meta.subtitle}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {data.quickStats.map((stat) => {
          const IconComponent = iconMap[stat.icon]
          return (
            <Card key={stat.id}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-muted/50`}>
                    <IconComponent className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {(stat.prefix || '') + stat.value + (stat.suffix || '')}
                    </p>
                    <p className="text-sm text-muted-foreground">{stat.subtitle}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Document Sections */}
      {data.documentSections.map((section) => (
        <div key={section.id} className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            {section.id === 'core-documents' && <Star className="w-5 h-5 text-primary" />}
            <h2 className="text-2xl font-bold text-foreground">{section.title}</h2>
            {section.badge && (
              <Badge variant="outline" className="text-xs">
                {section.badge}
              </Badge>
            )}
          </div>

          <div
            className={`grid gap-6 ${
              section.id === 'core-documents'
                ? 'grid-cols-1 lg:grid-cols-2'
                : section.id === 'supporting-documents'
                  ? 'grid-cols-1 md:grid-cols-3'
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
            }`}
          >
            {section.documents.map((doc) => {
              const IconComponent = iconMap[doc.icon]
              return (
                <Card key={doc.id} className="group hover:shadow-warm transition-all duration-200">
                  <CardHeader className={section.id === 'operational-documents' ? 'pb-3' : ''}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-2 rounded-lg ${
                            section.id === 'core-documents' ? 'bg-primary/10' : 'bg-muted/50'
                          }`}
                        >
                          <IconComponent
                            className={`${
                              section.id === 'core-documents'
                                ? 'w-5 h-5 text-primary'
                                : section.id === 'operational-documents'
                                  ? 'w-4 h-4 text-muted-foreground'
                                  : 'w-4 h-4 text-muted-foreground'
                            }`}
                          />
                        </div>
                        <div>
                          <CardTitle
                            className={
                              section.id === 'operational-documents'
                                ? 'text-sm'
                                : section.id === 'supporting-documents'
                                  ? 'text-base'
                                  : 'text-lg'
                            }
                          >
                            {doc.title}
                          </CardTitle>
                          {doc.badge && section.id === 'core-documents' && (
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge
                                variant="secondary"
                                className="bg-primary/10 text-primary text-xs"
                              >
                                {doc.badge}
                              </Badge>
                              {doc.lastUpdated && (
                                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                  <Clock className="w-3 h-3" />
                                  <span>{doc.lastUpdated}</span>
                                </div>
                              )}
                            </div>
                          )}
                          {doc.lastUpdated && section.id === 'supporting-documents' && (
                            <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-1">
                              <Clock className="w-3 h-3" />
                              <span>{doc.lastUpdated}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className={section.id === 'operational-documents' ? 'pt-0' : ''}>
                    <CardDescription
                      className={`mb-3 ${
                        section.id === 'operational-documents'
                          ? 'text-xs mb-3'
                          : section.id === 'supporting-documents'
                            ? 'text-sm mb-3'
                            : 'mb-3'
                      }`}
                    >
                      {doc.description}
                    </CardDescription>
                    {doc.audience && (
                      <p className="text-xs text-muted-foreground mb-4">
                        <strong>Audience:</strong> {doc.audience}
                      </p>
                    )}
                    <div className="flex items-center space-x-2">
                      <Button
                        asChild
                        variant={section.id === 'core-documents' ? 'default' : 'outline'}
                        size={section.id === 'operational-documents' ? 'sm' : 'sm'}
                        className={
                          section.id === 'core-documents'
                            ? 'flex-1'
                            : section.id === 'operational-documents'
                              ? 'w-full h-8 text-xs'
                              : 'w-full'
                        }
                      >
                        <Link href={doc.href}>
                          {section.id === 'core-documents' ? (
                            <>
                              <Eye className="w-4 h-4 mr-2" />
                              View Document
                            </>
                          ) : section.id === 'supporting-documents' ? (
                            <>
                              <ArrowRight className="w-4 h-4 mr-2" />
                              View
                            </>
                          ) : (
                            'View'
                          )}
                        </Link>
                      </Button>
                      {section.id === 'core-documents' && (
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      ))}

      {/* Usage Guidelines */}
      <Card className="bg-muted/50 border-dashed">
        <CardHeader>
          <CardTitle className="text-lg">{data.usageGuidelines.title}</CardTitle>
          <CardDescription>{data.usageGuidelines.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            {data.usageGuidelines.sections.map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold text-foreground mb-2">{section.title}</h4>
                <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                  {section.steps.map((step, stepIndex) => (
                    <li key={stepIndex}>{step}</li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <ErrorBoundary>
      <QueryErrorBoundary>
        <DashboardContent />
      </QueryErrorBoundary>
    </ErrorBoundary>
  )
}
