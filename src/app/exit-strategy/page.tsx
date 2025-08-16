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
import type { ExitStrategyData, IconType } from '../../types/data'

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

export default function ExitStrategyPage() {
  const { data, loading, error } = useDataQuery<ExitStrategyData>('pages/exit-strategy')

  if (loading) {
    return (
      <div className="min-h-screen p-6 lg:p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading exit strategy...</p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen p-6 lg:p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-2">Error loading exit strategy</p>
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
              <LogOut className="w-8 h-8 text-primary" />
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

      {/* Exit Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {data.exitMetrics.map((metric) => {
          const IconComponent = iconMap[metric.icon]
          return (
            <Card key={metric.id}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-muted/50">
                    <IconComponent className={`w-5 h-5 ${metric.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {typeof metric.value === 'number'
                        ? `${metric.prefix || ''}${metric.value}${metric.suffix || ''}`
                        : metric.value}
                    </p>
                    <p className="text-sm text-muted-foreground">{metric.subtitle}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Exit Scenarios Analysis */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">Exit Scenario Analysis</h2>
        <div className="space-y-6">
          {data.exitScenarios.map((scenario) => (
            <Card key={scenario.id} className="group hover:shadow-warm transition-all duration-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{scenario.scenario}</CardTitle>
                    <CardDescription className="mt-1">{scenario.rationale}</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-1">
                      <Badge variant="secondary" className="bg-success/10 text-success">
                        {scenario.probability}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {scenario.timeline}
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold text-success">{scenario.valuation}</div>
                    <div className="text-sm text-muted-foreground">{scenario.revenue_multiple}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Target Acquirer</h4>
                    <p className="text-sm text-muted-foreground mb-3">{scenario.acquirer}</p>
                    <h4 className="font-medium mb-2">Market Examples</h4>
                    <div className="space-y-1">
                      {scenario.examples.map((example) => (
                        <Badge key={example} variant="outline" className="text-xs mr-1 mb-1">
                          {example}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Advantages</h4>
                    <ul className="space-y-1">
                      {scenario.pros.map((pro) => (
                        <li
                          key={pro}
                          className="text-sm text-muted-foreground flex items-center space-x-2"
                        >
                          <CheckCircle className="w-3 h-3 text-success" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Considerations</h4>
                    <ul className="space-y-1">
                      {scenario.cons.map((con) => (
                        <li
                          key={con}
                          className="text-sm text-muted-foreground flex items-center space-x-2"
                        >
                          <div className="w-3 h-3 rounded-full bg-amber-400" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Valuation Drivers */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>{data.valuationDrivers.title}</span>
          </CardTitle>
          <CardDescription>{data.valuationDrivers.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.valuationDrivers.drivers.map((driver) => (
              <div
                key={driver.id}
                className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg"
              >
                <div className="shrink-0 w-20 text-center">
                  <Badge
                    variant={
                      driver.impact === 'High'
                        ? 'default'
                        : driver.impact === 'Medium'
                          ? 'secondary'
                          : 'outline'
                    }
                    className="text-xs"
                  >
                    {driver.impact} Impact
                  </Badge>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold">{driver.driver}</h4>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Current: {driver.current}</div>
                      <div className="font-medium">2031: {driver.target2031}</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{driver.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Exit Preparation Roadmap */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>{data.exitPreparation.title}</span>
          </CardTitle>
          <CardDescription>{data.exitPreparation.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {data.exitPreparation.categories.map((category) => (
              <div key={category.id}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{category.category}</h3>
                  <Badge variant="outline" className="text-xs">
                    {category.timeline}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {category.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium text-sm">{item.item}</h4>
                        <Badge
                          variant={
                            item.priority === 'Critical'
                              ? 'destructive'
                              : item.priority === 'High'
                                ? 'secondary'
                                : 'outline'
                          }
                          className="text-xs mt-1"
                        >
                          {item.priority}
                        </Badge>
                      </div>
                      <Badge
                        variant={
                          item.status === 'Completed'
                            ? 'default'
                            : item.status === 'In Progress' || item.status === 'Ongoing'
                              ? 'secondary'
                              : 'outline'
                        }
                        className="text-xs"
                      >
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Strategic Considerations */}
      <Card className="bg-muted/50 border-dashed">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5" />
            <span>{data.strategicConsiderations.title}</span>
          </CardTitle>
          <CardDescription>{data.strategicConsiderations.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.strategicConsiderations.sections.map((section) => (
              <div key={section.title}>
                <h4 className="font-semibold text-foreground mb-3">{section.title}</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {section.points.map((point) => (
                    <li key={point}>• {point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-success/10 rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">
              {data.strategicConsiderations.summary.title}
            </h4>
            <p className="text-sm text-muted-foreground">
              {data.strategicConsiderations.summary.content
                .split('50x+ returns')
                .map((part, index) => {
                  if (index === 0) return part
                  return (
                    <span key={`part-${index}`}>
                      <strong className="text-success">50x+ returns</strong>
                      {part}
                    </span>
                  )
                })}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
