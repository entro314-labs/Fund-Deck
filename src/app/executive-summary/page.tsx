'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
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
import { useDataQuery } from '../../hooks/use-data-query'
import { ErrorBoundary, QueryErrorBoundary } from '../../components/error-boundary'
import { DownloadButton } from '../../components/download-button'
import type { ExecutiveSummaryData, IconType } from '../../types/data'

// Icon mapping for dynamic icon loading
const iconMap: Record<IconType, any> = {
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
}

function ExecutiveSummaryContent() {
  const { data, loading, error } = useDataQuery<ExecutiveSummaryData>('pages/executive-summary')

  if (loading) {
    return (
      <div className="min-h-screen p-6 lg:p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-lg text-muted-foreground">
            Loading Executive Summary...
          </div>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen p-6 lg:p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-2">Error loading Executive Summary data</p>
          <p className="text-muted-foreground">{error?.message || 'Unknown error'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <FileText className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold text-foreground">{data.meta.title}</h1>
                <div className="flex items-center space-x-2 mt-1">
                  {data.meta.badge && (
                    <Badge variant="secondary" className="bg-success/10 text-success">
                      {data.meta.badge}
                    </Badge>
                  )}
                  {data.meta.date && (
                    <Badge variant="outline" className="text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {data.meta.date}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <p className="text-lg text-muted-foreground">{data.meta.subtitle}</p>
          </div>
          <DownloadButton pageSlug="executive-summary" fileType="pdf" variant="outline">
            {data.meta.exportButtonText || 'Export'}
          </DownloadButton>
        </div>
      </div>

      {/* Executive Overview */}
      <Card className="mb-8 bg-linear-to-br from-primary/5 to-accent/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-xl">{data.executiveOverview.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg leading-relaxed mb-4">{data.executiveOverview.mainStatement}</p>
          <p className="text-muted-foreground leading-relaxed">
            {data.executiveOverview.supportingText}
          </p>
        </CardContent>
      </Card>

      {/* Key Investment Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {data.keyHighlights.map((highlight) => {
          const IconComponent = iconMap[highlight.icon]
          return (
            <Card key={highlight.id}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-muted/50">
                    <IconComponent className={`w-5 h-5 ${highlight.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {typeof highlight.value === 'number'
                        ? `${highlight.prefix || ''}${highlight.value}${highlight.suffix || ''}`
                        : highlight.value}
                    </p>
                    <p className="text-sm text-muted-foreground">{highlight.subtitle}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Three-Pillar Business Model */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">{data.businessPillars.title}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {data.businessPillars.pillars.map((pillar) => {
            const IconComponent = iconMap[pillar.icon]
            return (
              <Card key={pillar.id} className="group hover:shadow-warm transition-all duration-200">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{pillar.title}</CardTitle>
                      <CardDescription className="text-sm font-medium">
                        {pillar.subtitle}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="bg-success/10 text-success">
                      {pillar.share}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{pillar.description}</p>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-lg font-bold text-foreground">{pillar.revenue}</p>
                    <p className="text-xs text-muted-foreground">Revenue by 2031</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Investment Timeline */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>{data.investmentTimeline.title}</span>
          </CardTitle>
          <CardDescription>{data.investmentTimeline.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.investmentTimeline.milestones.map((milestone, index) => (
              <div key={milestone.id} className="relative">
                {index < data.investmentTimeline.milestones.length - 1 && (
                  <div className="absolute left-3 top-8 bottom-0 w-px bg-border" />
                )}
                <div className="flex items-start space-x-4">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-center space-x-3 mb-1">
                      <h4 className="font-semibold">{milestone.milestone}</h4>
                      <Badge variant="outline" className="text-xs">
                        {milestone.period}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Competitive Advantages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>{data.competitiveAdvantages.title}</span>
            </CardTitle>
            <CardDescription>{data.competitiveAdvantages.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.competitiveAdvantages.advantages.map((advantage) => {
                const IconComponent = iconMap[advantage.icon]
                return (
                  <div key={advantage.id} className="flex items-start space-x-3">
                    <div className="p-2 rounded-lg bg-success/10 mt-1">
                      <IconComponent className="w-4 h-4 text-success" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">{advantage.title}</h4>
                      <p className="text-sm text-muted-foreground">{advantage.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{data.financialHighlights.title}</CardTitle>
            <CardDescription>{data.financialHighlights.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.financialHighlights.highlights.map((highlight) => {
                const IconComponent = iconMap[highlight.icon]
                return (
                  <div key={highlight.id} className="flex items-center space-x-3">
                    <IconComponent className="w-5 h-5 text-success" />
                    <div>
                      <p className="font-medium">{highlight.title}</p>
                      <p className="text-sm text-muted-foreground">{highlight.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Investment Thesis */}
      <Card className="bg-muted/50 border-dashed">
        <CardHeader>
          <CardTitle>{data.investmentThesis.title}</CardTitle>
          <CardDescription>{data.investmentThesis.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.investmentThesis.categories.map((category) => (
              <div key={category.id}>
                <h4 className="font-semibold text-foreground mb-3">{category.title}</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {category.points.map((point, idx) => (
                    <li key={`${category.id}-point-${idx}`}>• {point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function ExecutiveSummaryPage() {
  return (
    <ErrorBoundary>
      <QueryErrorBoundary>
        <ExecutiveSummaryContent />
      </QueryErrorBoundary>
    </ErrorBoundary>
  )
}
