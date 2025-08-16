'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import {
  TrendingUp,
  Target,
  Users,
  Zap,
  Globe,
  Download,
  Building2,
  Euro,
  CheckCircle,
  ArrowRight,
  Activity,
  Handshake,
  Search,
  Scale,
  type LucideIcon,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { useDataQuery } from '../../hooks/use-data-query'
import { ErrorBoundary, QueryErrorBoundary } from '../../components/error-boundary'
import type { GrowthStrategyData, IconType } from '../../types/data'

// Icon mapping
const iconMap: Record<IconType, LucideIcon> = {
  TrendingUp,
  Target,
  Users,
  Zap,
  Globe,
  Download,
  Building2,
  Building: Building2, // fallback
  CheckCircle,
  ArrowRight,
  BarChart3: TrendingUp, // fallback
  PieChart: TrendingUp, // fallback
  Calendar: Target, // fallback
  FileText: Target, // fallback
  Rocket: Target, // fallback
  Shield: CheckCircle, // fallback
  LogOut: Target, // fallback
  Star: CheckCircle, // fallback
  Clock: Target, // fallback
  Eye: Target, // fallback
  Presentation: Target, // fallback
  Play: Target, // fallback
  ChevronRight: ArrowRight, // fallback
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

export default function GrowthStrategyPage() {
  const { data, loading, error } = useDataQuery<GrowthStrategyData>('pages/growth-strategy')

  if (loading) {
    return (
      <div className="min-h-screen p-6 lg:p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading growth strategy...</p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen p-6 lg:p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-2">Error loading growth strategy</p>
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
              <TrendingUp className="w-8 h-8 text-primary" />
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

      {/* Growth Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {data.growthMetrics.map((metric) => {
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

      {/* Growth Funnel Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>{data.growthFunnel.title}</span>
            </CardTitle>
            <CardDescription>{data.growthFunnel.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={
                {
                  awareness: {
                    label: 'Awareness',
                    color: 'hsl(var(--chart-1))',
                  },
                  consideration: {
                    label: 'Consideration',
                    color: 'hsl(var(--chart-2))',
                  },
                  trial: {
                    label: 'Trial',
                    color: 'hsl(var(--chart-3))',
                  },
                  adoption: {
                    label: 'Adoption',
                    color: 'hsl(var(--chart-4))',
                  },
                } satisfies ChartConfig
              }
              className="h-[300px]"
            >
              <AreaChart data={data.growthFunnel.data}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--muted-foreground))"
                  strokeOpacity={0.2}
                />
                <XAxis
                  dataKey="year"
                  tickLine={false}
                  axisLine={false}
                  className="text-muted-foreground text-xs"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  className="text-muted-foreground text-xs"
                  tickFormatter={(value) => `${value}k`}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      labelFormatter={(label) => `Year ${label}`}
                      formatter={(value, name) => [
                        `${Number(value).toLocaleString()}k users`,
                        name,
                      ]}
                    />
                  }
                />
                <ChartLegend content={<ChartLegendContent />} />
                <Area
                  type="monotone"
                  dataKey="awareness"
                  stackId="1"
                  stroke="var(--color-awareness)"
                  fill="var(--color-awareness)"
                  fillOpacity={0.6}
                  name="Awareness"
                  className="drop-shadow-sm"
                />
                <Area
                  type="monotone"
                  dataKey="consideration"
                  stackId="1"
                  stroke="var(--color-consideration)"
                  fill="var(--color-consideration)"
                  fillOpacity={0.7}
                  name="Consideration"
                  className="drop-shadow-sm"
                />
                <Area
                  type="monotone"
                  dataKey="trial"
                  stackId="1"
                  stroke="var(--color-trial)"
                  fill="var(--color-trial)"
                  fillOpacity={0.8}
                  name="Trial"
                  className="drop-shadow-sm"
                />
                <Area
                  type="monotone"
                  dataKey="adoption"
                  stackId="1"
                  stroke="var(--color-adoption)"
                  fill="var(--color-adoption)"
                  fillOpacity={0.9}
                  name="Adoption"
                  className="drop-shadow-sm"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>{data.marketPenetration.title}</span>
            </CardTitle>
            <CardDescription>{data.marketPenetration.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={
                {
                  'Users (K)': {
                    label: 'Users (K)',
                    color: 'hsl(var(--chart-1))',
                  },
                  'Penetration %': {
                    label: 'Penetration %',
                    color: 'hsl(var(--chart-2))',
                  },
                } satisfies ChartConfig
              }
              className="h-[300px]"
            >
              <BarChart data={data.marketPenetration.data}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--muted-foreground))"
                  strokeOpacity={0.2}
                />
                <XAxis
                  dataKey="market"
                  tickLine={false}
                  axisLine={false}
                  className="text-muted-foreground text-xs"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  className="text-muted-foreground text-xs"
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value, name) => {
                        if (name === 'Users (K)') {
                          return [`${Number(value).toLocaleString()}k users`, name]
                        }
                        return [`${value}%`, name]
                      }}
                    />
                  }
                />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar
                  dataKey="users"
                  fill="hsl(var(--chart-1))"
                  name="Users (K)"
                  fillOpacity={0.8}
                  radius={[4, 4, 0, 0]}
                  className="drop-shadow-sm"
                />
                <Bar
                  dataKey="penetration"
                  fill="hsl(var(--chart-2))"
                  name="Penetration %"
                  fillOpacity={0.8}
                  radius={[4, 4, 0, 0]}
                  className="drop-shadow-sm"
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Growth Strategies */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">Growth Strategy Framework</h2>
        <div className="space-y-6">
          {data.growthStrategies.map((category) => {
            const IconComponent = iconMap[category.icon]
            return (
              <Card key={category.id}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <IconComponent className="w-6 h-6 text-primary" />
                    <span>{category.category}</span>
                    <Badge variant="outline" className="ml-auto">
                      {category.strategies.length} Strategies
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {category.strategies.map((strategy) => (
                      <div key={strategy.id} className="border rounded-lg p-4 bg-muted/30">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold">{strategy.name}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {strategy.investment}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{strategy.description}</p>
                        <div className="space-y-1">
                          {strategy.metrics.map((metric, metricIndex) => (
                            <div key={metricIndex} className="flex items-center space-x-2">
                              <CheckCircle className="w-3 h-3 text-success" />
                              <span className="text-xs text-muted-foreground">{metric}</span>
                            </div>
                          ))}
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

      {/* Market Entry Playbook */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building2 className="w-5 h-5" />
            <span>{data.marketEntryPlaybook.title}</span>
          </CardTitle>
          <CardDescription>{data.marketEntryPlaybook.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              {data.marketEntryPlaybook.phases.map((phase, index) => (
                <div key={phase.id} className="mb-6">
                  <h4 className="font-semibold text-foreground mb-3">
                    {phase.phase} ({phase.timeline})
                  </h4>
                  <div className="space-y-2">
                    {phase.tasks.map((task, taskIndex) => (
                      <div key={taskIndex} className="flex items-center space-x-2">
                        {index < 1 ? (
                          <CheckCircle className="w-4 h-4 text-success" />
                        ) : (
                          <ArrowRight className="w-4 h-4 text-primary" />
                        )}
                        <span className="text-sm">{task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-3">Success Metrics</h4>
              <div className="bg-success/10 rounded-lg p-3 space-y-1">
                <div className="text-sm font-medium">
                  {data.marketEntryPlaybook.successMetrics.title}
                </div>
                {data.marketEntryPlaybook.successMetrics.metrics.map((metric, index) => (
                  <div key={index} className="text-xs text-muted-foreground">
                    • {metric}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Growth Investment Allocation */}
      <Card className="bg-muted/50 border-dashed">
        <CardHeader>
          <CardTitle>{data.investmentAllocation.title}</CardTitle>
          <CardDescription>{data.investmentAllocation.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.investmentAllocation.categories.map((category) => (
              <div key={category.id}>
                <h4 className="font-semibold text-foreground mb-3">{category.title}</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {category.investments.map((investment, idx) => (
                    <li key={idx}>• {investment}</li>
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
