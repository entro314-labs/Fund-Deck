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
import { Line, Bar, XAxis, YAxis, CartesianGrid, ComposedChart } from 'recharts'
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
import type { StrategicPlanData, IconType } from '../../types/data'

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

export default function StrategicPlanPage() {
  const { data, loading, error } = useDataQuery<StrategicPlanData>('pages/strategic-plan')

  if (loading) {
    return (
      <div className="min-h-screen p-6 lg:p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-lg text-muted-foreground">
            Loading Strategic Plan...
          </div>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen p-6 lg:p-8 flex items-center justify-center">
        <div className="text-center text-destructive">
          <p>Error loading Strategic Plan data</p>
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

      {/* Key Strategic Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {data.keyMetrics.map((metric) => {
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

      {/* Market Expansion Timeline */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5" />
            <span>{data.marketExpansion.title}</span>
          </CardTitle>
          <CardDescription>{data.marketExpansion.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={data.marketExpansion.chart.series.reduce(
              (config: ChartConfig, series: any, index: number) => ({
                ...config,
                [series.key]: {
                  label: series.name,
                  color: `hsl(var(--chart-${index + 1}))`,
                },
              }),
              {} as ChartConfig
            )}
            className="h-[300px]"
          >
            <ComposedChart data={data.marketExpansion.chart.data}>
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
                yAxisId="left"
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground text-xs"
                tickFormatter={(value) => `${value}k`}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground text-xs"
                tickFormatter={(value) => `€${value}M`}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelFormatter={(label) => `Year ${label}`}
                    formatter={(value, name, props) => {
                      const series = data.marketExpansion.chart.series.find(
                        (s: any) => s.name === name
                      )
                      if (series?.yAxisId === 'right') {
                        return [`€${Number(value).toLocaleString()}M`, name]
                      }
                      return [`${Number(value).toLocaleString()}k`, name]
                    }}
                  />
                }
              />
              <ChartLegend content={<ChartLegendContent />} />
              {data.marketExpansion.chart.series.map((series: any) => {
                if (series.type === 'bar') {
                  return (
                    <Bar
                      key={series.key}
                      yAxisId={series.yAxisId}
                      dataKey={series.key}
                      fill={`var(--color-${series.key})`}
                      fillOpacity={0.8}
                      name={series.name}
                      radius={[4, 4, 0, 0]}
                      className="drop-shadow-sm"
                    />
                  )
                } else if (series.type === 'line') {
                  return (
                    <Line
                      key={series.key}
                      yAxisId={series.yAxisId}
                      type="monotone"
                      dataKey={series.key}
                      stroke={`var(--color-${series.key})`}
                      strokeWidth={3}
                      name={series.name}
                      dot={{ fill: `var(--color-${series.key})`, strokeWidth: 2, r: 5 }}
                      className="drop-shadow-sm"
                    />
                  )
                }
                return null
              })}
              <ChartLegend content={<ChartLegendContent />} />
            </ComposedChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Strategic Pillars */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">{data.strategicPillars.title}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {data.strategicPillars.pillars.map((pillar) => {
            const IconComponent = iconMap[pillar.icon]
            return (
              <Card key={pillar.id} className="group hover:shadow-warm transition-all duration-200">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {pillar.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{pillar.title}</CardTitle>
                  <CardDescription>{pillar.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {pillar.metrics.map((metric, idx) => (
                      <div
                        key={`${pillar.id}-metric-${idx}`}
                        className="flex items-center space-x-2"
                      >
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span className="text-sm">{metric}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Market Expansion Phases */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>{data.expansionPhases.title}</span>
          </CardTitle>
          <CardDescription>{data.expansionPhases.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {data.expansionPhases.phases.map((phase, index) => (
              <div key={phase.id} className="relative">
                {index < data.expansionPhases.phases.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-px bg-border" />
                )}
                <div className="flex items-start space-x-4">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">{index + 1}</span>
                  </div>
                  <div className="flex-1 bg-muted/50 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="text-lg font-semibold">{phase.phase}</h4>
                        <p className="text-sm text-muted-foreground">{phase.period}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg">{phase.investment}</p>
                        <p className="text-sm text-muted-foreground">Investment</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-medium mb-2">Markets</h5>
                        <div className="space-y-1">
                          {phase.markets.map((market) => (
                            <Badge key={market} variant="outline" className="mr-1">
                              {market}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2">Focus</h5>
                        <p className="text-sm text-muted-foreground">{phase.focus}</p>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2">Key Milestones</h5>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {phase.milestones.map((milestone, idx) => (
                            <li
                              key={`${phase.id}-milestone-${idx}`}
                              className="flex items-center space-x-2"
                            >
                              <Clock className="w-3 h-3" />
                              <span>{milestone}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Strategic Objectives */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>{data.strategicObjectives.foundationGrowth.title}</CardTitle>
            <CardDescription>
              {data.strategicObjectives.foundationGrowth.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.strategicObjectives.foundationGrowth.objectives.map((objective) => {
                const IconComponent = iconMap[objective.icon]
                return (
                  <div key={objective.id} className="flex items-start space-x-3">
                    <IconComponent className="w-5 h-5 text-success mt-0.5" />
                    <div>
                      <p className="font-medium">{objective.title}</p>
                      <p className="text-sm text-muted-foreground">{objective.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{data.strategicObjectives.scaleProfitability.title}</CardTitle>
            <CardDescription>
              {data.strategicObjectives.scaleProfitability.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.strategicObjectives.scaleProfitability.objectives.map((objective) => {
                const IconComponent = iconMap[objective.icon]
                return (
                  <div key={objective.id} className="flex items-start space-x-3">
                    <IconComponent className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">{objective.title}</p>
                      <p className="text-sm text-muted-foreground">{objective.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Strategic Success Factors */}
      <Card className="bg-muted/50 border-dashed">
        <CardHeader>
          <CardTitle>{data.successFactors.title}</CardTitle>
          <CardDescription>{data.successFactors.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.successFactors.categories.map((category) => (
              <div key={category.id}>
                <h4 className="font-semibold text-foreground mb-3">{category.title}</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {category.factors.map((factor, idx) => (
                    <li key={`${category.id}-factor-${idx}`}>• {factor}</li>
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
