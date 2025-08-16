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
import type { OnePagerData, IconType } from '../../types/data'

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

export default function OnePagerPage() {
  const { data, loading, error } = useDataQuery<OnePagerData>('pages/one-pager')

  if (loading) {
    return (
      <div className="min-h-screen p-6 lg:p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading one-pager...</p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen p-6 lg:p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-2">Error loading one-pager</p>
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
              <Target className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold text-foreground">{data.meta.title}</h1>
                <div className="flex items-center space-x-2 mt-1">
                  {data.meta.badge && (
                    <Badge variant="secondary" className="bg-accent/10 text-accent">
                      {data.meta.badge}
                    </Badge>
                  )}
                  {data.meta.date && (
                    <Badge variant="outline" className="text-xs">
                      {data.meta.date}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <p className="text-lg text-muted-foreground">{data.meta.subtitle}</p>
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            {data.meta.exportButtonText || 'Export'}
          </Button>
        </div>
      </div>

      {/* Main One-Pager Content */}
      <div className="max-w-4xl mx-auto">
        <Card className="bg-linear-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardContent className="p-8">
            {/* Company Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gradient-sunset mb-2">
                {data.companyOverview.name}
              </h1>
              <p className="text-xl text-foreground mb-1">{data.companyOverview.tagline}</p>
              <p className="text-muted-foreground">{data.companyOverview.description}</p>
            </div>

            {/* Key Metrics Row */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {data.keyMetrics.map((metric) => (
                <div key={metric.id} className="text-center">
                  <div className={`text-2xl font-bold ${metric.color}`}>{metric.value}</div>
                  <div className="text-xs text-muted-foreground">{metric.label}</div>
                </div>
              ))}
            </div>

            {/* Three Columns Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Problem & Solution */}
              <div>
                <h3 className="text-lg font-bold text-foreground mb-3 flex items-center">
                  {(() => {
                    const IconComponent = iconMap[data.problemSolution.icon]
                    return <IconComponent className="w-5 h-5 mr-2 text-primary" />
                  })()}
                  {data.problemSolution.title}
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  {data.problemSolution.problems.map((problem) => (
                    <li key={problem.id}>• {problem.point}</li>
                  ))}
                </ul>

                <h4 className="font-semibold text-foreground mb-2">
                  {data.problemSolution.solution.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {data.problemSolution.solution.description}
                </p>
              </div>

              {/* Business Model */}
              <div>
                <h3 className="text-lg font-bold text-foreground mb-3 flex items-center">
                  {(() => {
                    const IconComponent = iconMap[data.businessModel.icon]
                    return <IconComponent className="w-5 h-5 mr-2 text-primary" />
                  })()}
                  {data.businessModel.title}
                </h3>

                <div className="space-y-3 mb-4">
                  {data.businessModel.pillars.map((pillar) => (
                    <div key={pillar.id} className="bg-white/50 rounded p-2">
                      <div className="font-medium text-sm">{pillar.name}</div>
                      <div className="text-xs text-muted-foreground">{pillar.description}</div>
                    </div>
                  ))}
                </div>

                <div className="text-xs text-muted-foreground">
                  <strong>Unit Economics:</strong> {data.businessModel.unitEconomics}
                </div>
              </div>

              {/* Traction & Investment */}
              <div>
                <h3 className="text-lg font-bold text-foreground mb-3 flex items-center">
                  {(() => {
                    const IconComponent = iconMap[data.traction.icon]
                    return <IconComponent className="w-5 h-5 mr-2 text-primary" />
                  })()}
                  {data.traction.title}
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  {data.traction.points.map((point) => (
                    <li key={point.id} className="flex items-center">
                      <CheckCircle className="w-3 h-3 mr-2 text-success" />
                      {point.point}
                    </li>
                  ))}
                </ul>

                <h4 className="font-semibold text-foreground mb-2">Current Round</h4>
                <div className="bg-primary/10 rounded p-3">
                  <div className="font-bold text-primary">{data.traction.currentRound.amount}</div>
                  <div className="text-xs text-muted-foreground">
                    {data.traction.currentRound.timing} • {data.traction.currentRound.valuation}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {data.traction.currentRound.purpose}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA Section */}
            <div className="border-t border-border/50 pt-6 mt-8">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-foreground">{data.callToAction.title}</h4>
                  <p className="text-sm text-muted-foreground">{data.callToAction.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">Contact</div>
                  <div className="text-xs text-muted-foreground">
                    {data.callToAction.contact.email}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {data.callToAction.contact.phone}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {data.quickStats.map((stat) => (
            <Card key={stat.id} className="text-center">
              <CardContent className="p-4">
                <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
