'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import {
  Shield,
  AlertTriangle,
  TrendingDown,
  Users,
  Building2,
  Download,
  CheckCircle,
  Zap,
  Globe,
  Euro,
  Activity,
  Handshake,
  Search,
  Scale,
  type LucideIcon,
} from 'lucide-react'
import { useDataQuery } from '../../hooks/use-data-query'
import { ErrorBoundary, QueryErrorBoundary } from '../../components/error-boundary'
import type { RiskAssessmentData, IconType } from '../../types/data'

// Icon mapping
const iconMap: Record<IconType, LucideIcon> = {
  Shield,
  AlertTriangle,
  TrendingDown,
  Users,
  Building2,
  Building: Building2, // fallback
  Download,
  CheckCircle,
  Zap,
  Globe,
  TrendingUp: TrendingDown, // fallback
  BarChart3: TrendingDown, // fallback
  PieChart: TrendingDown, // fallback
  Calendar: TrendingDown, // fallback
  FileText: TrendingDown, // fallback
  Rocket: TrendingDown, // fallback
  LogOut: TrendingDown, // fallback
  Star: CheckCircle, // fallback
  Clock: TrendingDown, // fallback
  Eye: TrendingDown, // fallback
  ArrowRight: TrendingDown, // fallback
  Presentation: TrendingDown, // fallback
  Play: TrendingDown, // fallback
  ChevronRight: TrendingDown, // fallback
  MapPin: TrendingDown, // fallback
  Smartphone: TrendingDown, // fallback
  Brain: TrendingDown, // fallback
  Code: TrendingDown, // fallback
  Database: TrendingDown, // fallback
  Cloud: TrendingDown, // fallback
  Target: Shield, // fallback
  Euro: Euro, // fallback
  Activity, // activity chart icon
  Handshake,
  Search,
  Scale,
}

export default function RiskAssessmentPage() {
  const { data, loading, error } = useDataQuery<RiskAssessmentData>('pages/risk-assessment')

  if (loading) {
    return (
      <div className="min-h-screen p-6 lg:p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading risk assessment...</p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen p-6 lg:p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-2">Error loading risk assessment</p>
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
              <Shield className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold text-foreground">{data.meta.title}</h1>
                <div className="flex items-center space-x-2 mt-1">
                  {data.meta.badge && (
                    <Badge
                      variant="secondary"
                      className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100"
                    >
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

      {/* Risk Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {data.riskMetrics.map((metric) => {
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
                        ? `${metric.value}${metric.suffix || ''}`
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

      {/* Risk Categories */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">Risk Analysis by Category</h2>
        <div className="space-y-6">
          {data.riskCategories.map((category) => {
            const IconComponent = iconMap[category.icon]
            return (
              <Card key={category.id}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <IconComponent className={`w-6 h-6 ${category.color}`} />
                    <span>{category.category}</span>
                    <Badge variant="outline" className="ml-auto">
                      {category.risks.length} Risks
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.risks.map((riskItem) => (
                      <div key={riskItem.id} className="border rounded-lg p-4 bg-muted/30">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold">{riskItem.risk}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant={
                                riskItem.probability === 'High'
                                  ? 'destructive'
                                  : riskItem.probability === 'Medium'
                                    ? 'secondary'
                                    : 'outline'
                              }
                              className="text-xs"
                            >
                              {riskItem.probability} Probability
                            </Badge>
                            <Badge
                              variant={
                                riskItem.impact === 'High'
                                  ? 'destructive'
                                  : riskItem.impact === 'Medium'
                                    ? 'secondary'
                                    : 'outline'
                              }
                              className="text-xs"
                            >
                              {riskItem.impact} Impact
                            </Badge>
                            <Badge
                              variant={
                                riskItem.status === 'Mitigated' || riskItem.status === 'Compliant'
                                  ? 'default'
                                  : riskItem.status === 'Active' || riskItem.status === 'Managed'
                                    ? 'secondary'
                                    : 'outline'
                              }
                            >
                              {riskItem.status}
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm mb-1">Mitigation Strategy</h5>
                          <p className="text-sm text-muted-foreground">{riskItem.mitigation}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Scenario Analysis */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingDown className="w-5 h-5" />
            <span>{data.scenarioAnalysis.title}</span>
          </CardTitle>
          <CardDescription>{data.scenarioAnalysis.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.scenarioAnalysis.scenarios.map((scenario) => (
              <div
                key={scenario.id}
                className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg"
              >
                <div className="shrink-0 w-20 text-center">
                  <div
                    className={`text-lg font-bold ${
                      scenario.scenario === 'Base Case'
                        ? 'text-primary'
                        : scenario.scenario === 'Bear Case'
                          ? 'text-amber-600'
                          : 'text-success'
                    }`}
                  >
                    {scenario.probability}
                  </div>
                  <div className="text-xs text-muted-foreground">Probability</div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold">{scenario.scenario}</h4>
                    <div className="text-right">
                      <div className="font-bold text-lg">{scenario.revenue2031}</div>
                      <div className="text-sm text-muted-foreground">2031 Revenue</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{scenario.description}</p>
                  <Badge variant="outline" className="text-xs">
                    {scenario.impact}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Management Framework */}
      <Card className="bg-muted/50 border-dashed">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5" />
            <span>{data.riskManagementFramework.title}</span>
          </CardTitle>
          <CardDescription>{data.riskManagementFramework.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.riskManagementFramework.categories.map((category) => (
              <div key={category.id}>
                <h4 className="font-semibold text-foreground mb-3">{category.title}</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {category.items.map((item, idx) => (
                    <li key={`${category.id}-item-${idx}`}>• {item}</li>
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
