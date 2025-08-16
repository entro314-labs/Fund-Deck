'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import {
  Calendar,
  CheckCircle,
  Clock,
  Target,
  TrendingUp,
  Download,
  Users,
  Euro,
  Building2,
  Globe,
  Zap,
  Activity,
  Handshake,
  Search,
  Scale,
  type LucideIcon,
} from 'lucide-react'
import { useDataQuery } from '../../hooks/use-data-query'
import { ErrorBoundary, QueryErrorBoundary } from '../../components/error-boundary'
import type { MilestonesData, IconType } from '../../types/data'

// Icon mapping
const iconMap: Record<IconType, LucideIcon> = {
  Calendar,
  CheckCircle,
  Clock,
  Target,
  TrendingUp,
  Download,
  Users,
  Building2,
  Building: Building2, // fallback
  Globe,
  Zap,
  BarChart3: TrendingUp, // fallback
  PieChart: TrendingUp, // fallback
  FileText: Target, // fallback
  Rocket: Target, // fallback
  Shield: CheckCircle, // fallback
  LogOut: Target, // fallback
  Star: CheckCircle, // fallback
  Eye: Target, // fallback
  ArrowRight: Target, // fallback
  Presentation: Target, // fallback
  Play: Target, // fallback
  ChevronRight: Target, // fallback
  MapPin: Target, // fallback
  AlertTriangle: Target, // fallback
  Smartphone: Target, // fallback
  Brain: Target, // fallback
  Code: Target, // fallback
  Database: Target, // fallback
  Cloud: Target, // fallback
  TrendingDown: TrendingUp, // fallback
  Euro: Euro, // fallback
  Activity, // activity chart icon
  Handshake,
  Search,
  Scale,
}

export default function MilestonesTimelinePage() {
  const { data, loading, error } = useDataQuery<MilestonesData>('pages/milestones')

  if (loading) {
    return (
      <div className="min-h-screen p-6 lg:p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading milestones timeline...</p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen p-6 lg:p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-2">Error loading milestones timeline</p>
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
              <Calendar className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold text-foreground">{data.meta.title}</h1>
                <div className="flex items-center space-x-2 mt-1">
                  {data.meta.badge && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
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

      {/* KPI Timeline Overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>{data.kpiTimeline.title}</span>
          </CardTitle>
          <CardDescription>{data.kpiTimeline.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Year</th>
                  <th className="text-right py-3">Active Users</th>
                  <th className="text-right py-3">Revenue (ARR)</th>
                  <th className="text-center py-3">Markets</th>
                  <th className="text-center py-3">Phase</th>
                </tr>
              </thead>
              <tbody>
                {data.kpiTimeline.data.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 font-medium">{item.year}</td>
                    <td className="text-right py-3">{item.users}</td>
                    <td className="text-right py-3 font-medium text-success">{item.revenue}</td>
                    <td className="text-center py-3">{item.markets}</td>
                    <td className="text-center py-3">
                      <Badge variant="outline" className="text-xs">
                        {item.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Milestone Categories Timeline */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">Execution Timeline by Phase</h2>
        <div className="space-y-6">
          {data.milestoneCategories.map((category) => {
            const IconComponent = iconMap[category.icon]
            return (
              <Card key={category.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <IconComponent className={`w-6 h-6 ${category.color}`} />
                      <div>
                        <CardTitle className="text-lg">{category.category}</CardTitle>
                        <CardDescription>
                          {category.milestones.length} key milestones
                        </CardDescription>
                      </div>
                    </div>
                    <Badge
                      variant={
                        category.status === 'Completed'
                          ? 'default'
                          : category.status === 'In Progress'
                            ? 'secondary'
                            : 'outline'
                      }
                    >
                      {category.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.milestones.map((milestone, milestoneIndex) => (
                      <div key={milestone.id} className="relative">
                        {milestoneIndex < category.milestones.length - 1 && (
                          <div className="absolute left-3 top-8 bottom-0 w-px bg-border" />
                        )}
                        <div className="flex items-start space-x-4">
                          <div
                            className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                              milestone.status === 'Completed'
                                ? 'bg-success'
                                : milestone.status === 'In Progress'
                                  ? 'bg-primary'
                                  : 'bg-muted'
                            }`}
                          >
                            {milestone.status === 'Completed' ? (
                              <CheckCircle className="w-4 h-4 text-white" />
                            ) : milestone.status === 'In Progress' ? (
                              <Clock className="w-4 h-4 text-white" />
                            ) : (
                              <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                            )}
                          </div>
                          <div className="flex-1 pb-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold">{milestone.milestone}</h4>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline" className="text-xs">
                                  {milestone.date}
                                </Badge>
                                <Badge
                                  variant={
                                    milestone.status === 'Completed'
                                      ? 'default'
                                      : milestone.status === 'In Progress'
                                        ? 'secondary'
                                        : 'outline'
                                  }
                                  className="text-xs"
                                >
                                  {milestone.status}
                                </Badge>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{milestone.description}</p>
                          </div>
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

      {/* Critical Success Factors */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5" />
            <span>{data.successFactors.title}</span>
          </CardTitle>
          <CardDescription>{data.successFactors.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.successFactors.factors.map((factor) => (
              <div key={factor.id} className="border rounded-lg p-4 bg-muted/30">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">{factor.factor}</h4>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={factor.importance === 'Critical' ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {factor.importance}
                    </Badge>
                    <Badge
                      variant={
                        factor.riskLevel === 'High'
                          ? 'destructive'
                          : factor.riskLevel === 'Medium'
                            ? 'secondary'
                            : 'outline'
                      }
                      className="text-xs"
                    >
                      {factor.riskLevel} Risk
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {factor.timeline}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{factor.description}</p>
                <div>
                  <h5 className="font-medium text-xs mb-2">Key Dependencies:</h5>
                  <div className="flex flex-wrap gap-1">
                    {factor.dependencies.map((dep, depIndex) => (
                      <Badge key={depIndex} variant="outline" className="text-xs">
                        {dep}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Accountability Framework */}
      <Card className="bg-muted/50 border-dashed">
        <CardHeader>
          <CardTitle>{data.accountabilityFramework.title}</CardTitle>
          <CardDescription>{data.accountabilityFramework.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.accountabilityFramework.categories.map((category) => (
              <div key={category.id}>
                <h4 className="font-semibold text-foreground mb-3">{category.title}</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {category.activities.map((activity, idx) => (
                    <li key={idx}>• {activity}</li>
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
