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
import {
  Line,
  LineChart,
  AreaChart,
  Area,
  ComposedChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
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
import { DownloadButton } from '../../components/download-button'
import type { FinancialModelData, IconType } from '../../types/data'

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

function FinancialModelContent() {
  const { data, loading, error } = useDataQuery<FinancialModelData>('pages/financial-model')

  if (loading) {
    return (
      <div className="min-h-screen p-6 lg:p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading financial model...</p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen p-6 lg:p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-2">Error loading financial model</p>
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
              <Euro className="w-8 h-8 text-primary" />
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
          {data.meta.exportButtonText && (
            <DownloadButton 
              pageSlug="financial-model"
              fileType="xlsx"
              variant="outline"
            >
              {data.meta.exportButtonText}
            </DownloadButton>
          )}
        </div>
      </div>

      {/* Key Metrics */}
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
                      {(metric.prefix || '') + metric.value + (metric.suffix || '')}
                    </p>
                    <p className="text-sm text-muted-foreground">{metric.subtitle}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Revenue Growth Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>{data.charts.revenueGrowth.title}</span>
            </CardTitle>
            <CardDescription>{data.charts.revenueGrowth.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                Connect: {
                  label: 'MyRoomie Connect',
                  color: 'hsl(var(--chart-1))',
                },
                Spaces: {
                  label: 'MyRoomie Spaces',
                  color: 'hsl(var(--chart-2))',
                },
                Enterprise: {
                  label: 'MyRoomie Enterprise',
                  color: 'hsl(var(--chart-3))',
                },
              }}
              className="h-[300px]"
            >
              <AreaChart data={data.charts.revenueGrowth.data}>
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
                  tickFormatter={(value) => `€${value}k`}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      labelFormatter={(label) => `Year ${label}`}
                      formatter={(value, name) => [`€${Number(value).toLocaleString()}k`, name]}
                    />
                  }
                />
                {data.charts.revenueGrowth.series?.map((series) => (
                  <Area
                    key={series.key}
                    type="monotone"
                    dataKey={series.key}
                    stackId="1"
                    stroke={`var(--color-${series.key})`}
                    fill={`var(--color-${series.key})`}
                    fillOpacity={0.7}
                    name={series.name}
                    className="drop-shadow-sm"
                  />
                ))}
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="w-5 h-5" />
              <span>{data.charts.revenueDistribution.title}</span>
            </CardTitle>
            <CardDescription>{data.charts.revenueDistribution.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                enterprise: {
                  label: 'Enterprise',
                  color: 'hsl(var(--chart-1))',
                },
                midMarket: {
                  label: 'Mid-Market',
                  color: 'hsl(var(--chart-2))',
                },
                smb: {
                  label: 'Small Business',
                  color: 'hsl(var(--chart-3))',
                },
                individual: {
                  label: 'Individual',
                  color: 'hsl(var(--chart-4))',
                },
              }}
              className="h-[300px]"
            >
              <RechartsPieChart>
                <Pie
                  data={data.charts.revenueDistribution.data.map((item, index) => ({
                    ...item,
                    fill: `hsl(var(--chart-${(index % 5) + 1}))`,
                  }))}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="value"
                  nameKey="name"
                  className="drop-shadow-sm"
                >
                  {data.charts.revenueDistribution.data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`hsl(var(--chart-${(index % 5) + 1}))`} />
                  ))}
                </Pie>
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value, name) => [`€${Number(value).toLocaleString()}k`, name]}
                    />
                  }
                />
                <ChartLegend content={<ChartLegendContent />} />
              </RechartsPieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Profitability Timeline */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>{data.charts.profitability.title}</span>
          </CardTitle>
          <CardDescription>{data.charts.profitability.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              EBITDA: {
                label: 'EBITDA (€000s)',
                color: 'hsl(var(--chart-1))',
              },
              margin: {
                label: 'EBITDA Margin %',
                color: 'hsl(var(--chart-2))',
              },
            }}
            className="h-[300px]"
          >
            <ComposedChart data={data.charts.profitability.data}>
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
                tickFormatter={(value) => `€${value}k`}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground text-xs"
                tickFormatter={(value) => `${value}%`}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelFormatter={(label) => `Year ${label}`}
                    formatter={(value, name) => {
                      if (name === 'EBITDA (€000s)') {
                        return [`€${Number(value).toLocaleString()}k`, name]
                      }
                      return [`${value}%`, name]
                    }}
                  />
                }
              />
              <Bar
                yAxisId="left"
                dataKey="EBITDA"
                fill="var(--color-EBITDA)"
                fillOpacity={0.8}
                name="EBITDA (€000s)"
                className="drop-shadow-sm"
                radius={[4, 4, 0, 0]}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="margin"
                stroke="var(--color-margin)"
                strokeWidth={3}
                name="EBITDA Margin %"
                dot={{ fill: 'var(--color-margin)', strokeWidth: 2, r: 5 }}
                className="drop-shadow-sm"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </ComposedChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Unit Economics Analysis */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>{data.unitEconomics.title}</span>
          </CardTitle>
          <CardDescription>{data.unitEconomics.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  {data.unitEconomics.headers.map((header, index) => (
                    <th key={index} className={`py-3 ${index === 0 ? 'text-left' : 'text-right'}`}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.unitEconomics.data.map((row, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 font-medium">{row.segment}</td>
                    <td className="text-right py-3">€{row.CAC}</td>
                    <td className="text-right py-3">€{row.LTV}</td>
                    <td className="text-right py-3">
                      <Badge variant="secondary" className="bg-success/10 text-success">
                        {row.ratio}
                      </Badge>
                    </td>
                    <td className="text-right py-3">{row.margin}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Funding Timeline */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>{data.fundingTimeline.title}</span>
          </CardTitle>
          <CardDescription>{data.fundingTimeline.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.fundingTimeline.rounds.map((funding, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{funding.round}</h4>
                    <p className="text-sm text-muted-foreground">{funding.period}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-lg">{funding.amount}</p>
                  <p className="text-sm text-muted-foreground">{funding.valuation} valuation</p>
                </div>
                <div className="max-w-xs text-right">
                  <p className="text-sm">{funding.use}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cash Flow & Runway Analysis */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5" />
            <span>{data.cashFlowAnalysis.title}</span>
          </CardTitle>
          <CardDescription>{data.cashFlowAnalysis.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              cashBalance: {
                label: 'Cash Balance (€K)',
                color: 'hsl(var(--chart-1))',
              },
              monthlyBurn: {
                label: 'Monthly Burn (€K)',
                color: 'hsl(var(--chart-3))',
              },
              runwayMonths: {
                label: 'Runway (Months)',
                color: 'hsl(var(--chart-2))',
              },
            }}
            className="h-[400px]"
          >
            <ComposedChart data={data.cashFlowAnalysis.data}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--muted-foreground))"
                strokeOpacity={0.2}
              />
              <XAxis
                dataKey="month"
                angle={-45}
                textAnchor="end"
                height={80}
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground text-xs"
              />
              <YAxis
                yAxisId="left"
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground text-xs"
                tickFormatter={(value) => `€${value}K`}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground text-xs"
                tickFormatter={(value) => `${value}mo`}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelFormatter={(label) => `Period: ${label}`}
                    formatter={(value, name) => {
                      if (name === 'Runway (Months)') {
                        return [`${Number(value).toFixed(1)} months`, name]
                      }
                      return [`€${Number(value).toLocaleString()}K`, name]
                    }}
                  />
                }
              />

              {/* Critical runway threshold */}
              <ReferenceLine yAxisId="right" y={12} stroke="#ef4444" strokeDasharray="5 5" />

              <Bar
                yAxisId="left"
                dataKey="cashBalance"
                fill="var(--color-cashBalance)"
                fillOpacity={0.8}
                name="Cash Balance (€K)"
                radius={[4, 4, 0, 0]}
                className="drop-shadow-sm"
              />
              <Bar
                yAxisId="left"
                dataKey="monthlyBurn"
                fill="var(--color-monthlyBurn)"
                fillOpacity={0.6}
                name="Monthly Burn (€K)"
                radius={[4, 4, 0, 0]}
                className="drop-shadow-sm"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="runwayMonths"
                stroke="var(--color-runwayMonths)"
                strokeWidth={3}
                name="Runway (Months)"
                dot={{ fill: 'var(--color-runwayMonths)', strokeWidth: 2, r: 5 }}
                className="drop-shadow-sm"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </ComposedChart>
          </ChartContainer>

          {/* Critical insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-destructive/10 rounded-lg">
              <div className="text-lg font-bold text-destructive">
                {data.cashFlowAnalysis.data.filter((d) => d.runwayMonths < 12).length}
              </div>
              <div className="text-xs text-muted-foreground">Periods &lt; 12M runway</div>
            </div>
            <div className="text-center p-4 bg-success/10 rounded-lg">
              <div className="text-lg font-bold text-success">Q3 2028</div>
              <div className="text-xs text-muted-foreground">Cash flow positive</div>
            </div>
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <div className="text-lg font-bold text-primary">
                €
                {Math.max(...data.cashFlowAnalysis.data.map((d) => d.cashBalance)).toLocaleString()}
                K
              </div>
              <div className="text-xs text-muted-foreground">Peak cash balance</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Unit Economics Evolution */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>{data.unitEconomicsEvolution.title}</span>
          </CardTitle>
          <CardDescription>{data.unitEconomicsEvolution.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* LTV:CAC Ratios Chart */}
            <div>
              <h4 className="font-semibold mb-4">LTV:CAC Ratio Evolution</h4>
              <ChartContainer
                config={{
                  ratio_b2c: {
                    label: 'Connect (B2C)',
                    color: 'hsl(var(--chart-1))',
                  },
                  ratio_spaces: {
                    label: 'Spaces (Properties)',
                    color: 'hsl(var(--chart-2))',
                  },
                  ratio_enterprise: {
                    label: 'Enterprise (B2B)',
                    color: 'hsl(var(--chart-3))',
                  },
                  blended_ratio: {
                    label: 'Blended Average',
                    color: 'hsl(var(--primary))',
                  },
                }}
                className="h-[300px]"
              >
                <LineChart data={data.unitEconomicsEvolution.data}>
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
                    tickFormatter={(value) => `${value}:1`}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        labelFormatter={(label) => `Year ${label}`}
                        formatter={(value, name) => [`${Number(value).toFixed(1)}:1`, name]}
                      />
                    }
                  />

                  {/* Industry benchmark line */}
                  <ReferenceLine y={3} stroke="#94a3b8" strokeDasharray="3 3" />

                  <Line
                    type="monotone"
                    dataKey="ratio_b2c"
                    stroke="var(--color-ratio_b2c)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    name="Connect (B2C)"
                  />
                  <Line
                    type="monotone"
                    dataKey="ratio_spaces"
                    stroke="var(--color-ratio_spaces)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    name="Spaces (Properties)"
                  />
                  <Line
                    type="monotone"
                    dataKey="ratio_enterprise"
                    stroke="var(--color-ratio_enterprise)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    name="Enterprise (B2B)"
                  />
                  <Line
                    type="monotone"
                    dataKey="blended_ratio"
                    stroke="var(--color-blended_ratio)"
                    strokeWidth={4}
                    dot={{ r: 6 }}
                    name="Blended Average"
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                </LineChart>
              </ChartContainer>
            </div>

            {/* CAC Evolution Chart */}
            <div>
              <h4 className="font-semibold mb-4">Customer Acquisition Cost Trends</h4>
              <ChartContainer
                config={{
                  cac_b2c: {
                    label: 'Connect CAC',
                    color: 'hsl(var(--chart-1))',
                  },
                  cac_spaces: {
                    label: 'Spaces CAC',
                    color: 'hsl(var(--chart-2))',
                  },
                  cac_enterprise: {
                    label: 'Enterprise CAC',
                    color: 'hsl(var(--chart-3))',
                  },
                }}
                className="h-[300px]"
              >
                <LineChart data={data.unitEconomicsEvolution.data}>
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
                    tickFormatter={(value) => `€${value}`}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        labelFormatter={(label) => `Year ${label}`}
                        formatter={(value, name) => [`€${Number(value).toLocaleString()}`, name]}
                      />
                    }
                  />
                  <Line
                    type="monotone"
                    dataKey="cac_b2c"
                    stroke="var(--color-cac_b2c)"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    name="Connect CAC"
                  />
                  <Line
                    type="monotone"
                    dataKey="cac_spaces"
                    stroke="var(--color-cac_spaces)"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    name="Spaces CAC"
                  />
                  <Line
                    type="monotone"
                    dataKey="cac_enterprise"
                    stroke="var(--color-cac_enterprise)"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    name="Enterprise CAC"
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                </LineChart>
              </ChartContainer>
            </div>
          </div>

          {/* Unit Economics Table */}
          <div className="mt-6">
            <h4 className="font-semibold mb-4">Key Unit Economics Milestones</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3">Year</th>
                    <th className="text-right py-3">Blended LTV:CAC</th>
                    <th className="text-right py-3">Payback Period</th>
                    <th className="text-left py-3">Stage</th>
                  </tr>
                </thead>
                <tbody>
                  {data.unitEconomicsEvolution.data.map((row, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-3 font-medium">{row.year}</td>
                      <td className="text-right py-3">
                        <Badge
                          variant={
                            row.blended_ratio >= 10
                              ? 'default'
                              : row.blended_ratio >= 3
                                ? 'secondary'
                                : 'outline'
                          }
                          className={row.blended_ratio >= 10 ? 'bg-success/10 text-success' : ''}
                        >
                          {row.blended_ratio.toFixed(1)}:1
                        </Badge>
                      </td>
                      <td className="text-right py-3">{row.payback_months} months</td>
                      <td className="py-3">
                        {row.blended_ratio >= 10
                          ? 'Excellent'
                          : row.blended_ratio >= 3
                            ? 'Good'
                            : 'Developing'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card className="bg-muted/50 border-dashed">
        <CardHeader>
          <CardTitle>{data.insights.title}</CardTitle>
          <CardDescription>{data.insights.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.insights.sections.map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold text-foreground mb-3">{section.title}</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
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

export default function FinancialModelPage() {
  return (
    <ErrorBoundary>
      <QueryErrorBoundary>
        <FinancialModelContent />
      </QueryErrorBoundary>
    </ErrorBoundary>
  )
}
