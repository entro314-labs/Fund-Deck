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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ScatterChart, Scatter, Cell } from 'recharts'
import EuropeanExpansionMap from '../../components/EuropeanExpansionMap'
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
import type { MarketAnalysisData, IconType } from '../../types/data'

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

function MarketAnalysisContent() {
  const { data, loading, error } = useDataQuery<MarketAnalysisData>('pages/market-analysis')

  if (loading) {
    return (
      <div className="min-h-screen p-6 lg:p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading market analysis...</p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen p-6 lg:p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-2">Error loading market analysis</p>
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
              <BarChart3 className="w-8 h-8 text-primary" />
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

      {/* Key Market Metrics */}
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

      {/* Housing Crisis Analysis */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <span>{data.housingCrisis.title}</span>
          </CardTitle>
          <CardDescription>{data.housingCrisis.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={
              {
                'Price Increase %': {
                  label: 'Price Increase %',
                  color: 'hsl(var(--chart-1))',
                },
                'Income on Housing %': {
                  label: 'Income on Housing %',
                  color: 'hsl(var(--chart-2))',
                },
              } satisfies ChartConfig
            }
            className="h-[300px]"
          >
            <BarChart data={data.housingCrisis.data}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--muted-foreground))"
                strokeOpacity={0.2}
              />
              <XAxis
                dataKey="country"
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground text-xs"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground text-xs"
                tickFormatter={(value) => `${value}%`}
              />
              <ChartTooltip
                content={<ChartTooltipContent formatter={(value, name) => [`${value}%`, name]} />}
              />
              <Bar
                dataKey="priceIncrease"
                fill="hsl(var(--chart-1))"
                name="Price Increase %"
                fillOpacity={0.8}
                radius={[4, 4, 0, 0]}
                className="drop-shadow-sm"
              />
              <Bar
                dataKey="incomeOnHousing"
                fill="hsl(var(--chart-2))"
                name="Income on Housing %"
                fillOpacity={0.8}
                radius={[4, 4, 0, 0]}
                className="drop-shadow-sm"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Market Size Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>{data.marketSize.title}</span>
            </CardTitle>
            <CardDescription>{data.marketSize.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={
                {
                  tam: {
                    label: 'TAM (€M)',
                    color: 'hsl(var(--chart-1))',
                  },
                } satisfies ChartConfig
              }
              className="h-[300px]"
            >
              <BarChart data={data.marketSize.data}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--muted-foreground))"
                  strokeOpacity={0.2}
                />
                <XAxis
                  dataKey="country"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  tickLine={false}
                  axisLine={false}
                  className="text-muted-foreground text-xs"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  className="text-muted-foreground text-xs"
                  tickFormatter={(value) => `€${value}M`}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value, name) => [`€${Number(value).toLocaleString()}M`, name]}
                    />
                  }
                />
                <Bar
                  dataKey="tam"
                  fill="var(--color-tam)"
                  name="TAM (€M)"
                  fillOpacity={0.8}
                  radius={[4, 4, 0, 0]}
                  className="drop-shadow-sm"
                />
                <ChartLegend content={<ChartLegendContent />} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>{data.bpoMarket.title}</span>
            </CardTitle>
            <CardDescription>{data.bpoMarket.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={
                {
                  revenue: {
                    label: 'Revenue Potential (€M)',
                    color: 'hsl(var(--chart-2))',
                  },
                } satisfies ChartConfig
              }
              className="h-[300px]"
            >
              <BarChart data={data.bpoMarket.data}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--muted-foreground))"
                  strokeOpacity={0.2}
                />
                <XAxis
                  dataKey="country"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  tickLine={false}
                  axisLine={false}
                  className="text-muted-foreground text-xs"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  className="text-muted-foreground text-xs"
                  tickFormatter={(value) => `€${value}M`}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value, name) => [`€${Number(value).toLocaleString()}M`, name]}
                    />
                  }
                />
                <Bar
                  dataKey="revenue"
                  fill="var(--color-revenue)"
                  name="Revenue Potential (€M)"
                  fillOpacity={0.8}
                  radius={[4, 4, 0, 0]}
                  className="drop-shadow-sm"
                />
                <ChartLegend content={<ChartLegendContent />} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Competitive Landscape */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>{data.competitiveLandscape.title}</span>
          </CardTitle>
          <CardDescription>{data.competitiveLandscape.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.competitiveLandscape.competitors.map((competitor, index) => (
              <div key={index} className="border rounded-lg p-4 bg-muted/30">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-lg font-semibold">{competitor.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {competitor.markets.join(', ')} • {competitor.model}
                    </p>
                  </div>
                  <Badge variant="outline">{competitor.differentiation}</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-success mb-2">Strengths</h5>
                    <ul className="space-y-1">
                      {competitor.strengths.map((strength, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-muted-foreground flex items-center space-x-2"
                        >
                          <CheckCircle className="w-3 h-3 text-success" />
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-amber-500 mb-2">Weaknesses</h5>
                    <ul className="space-y-1">
                      {competitor.weaknesses.map((weakness, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-muted-foreground flex items-center space-x-2"
                        >
                          <AlertTriangle className="w-3 h-3 text-amber-500" />
                          <span>{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market Entry Strategy */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>{data.marketEntryStrategy.title}</span>
          </CardTitle>
          <CardDescription>{data.marketEntryStrategy.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.marketEntryStrategy.markets.map((market, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
                <div className="shrink-0 w-16 text-center">
                  <div
                    className={`text-2xl font-bold ${
                      market.score >= 90
                        ? 'text-success'
                        : market.score >= 80
                          ? 'text-primary'
                          : 'text-muted-foreground'
                    }`}
                  >
                    {market.score}
                  </div>
                  <div className="text-xs text-muted-foreground">Score</div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold">{market.market}</h4>
                    <Badge
                      variant={
                        market.status.includes('Launching')
                          ? 'default'
                          : market.status.includes('Phase 2')
                            ? 'secondary'
                            : 'outline'
                      }
                    >
                      {market.status}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {market.factors.map((factor, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {factor}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* European Expansion Map */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5" />
            <span>{data.europeanExpansionMap.title}</span>
          </CardTitle>
          <CardDescription>{data.europeanExpansionMap.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* European Expansion Map */}
            <div className="lg:col-span-2 relative">
              <EuropeanExpansionMap regions={data.europeanExpansionMap.regions} />

              {/* Legend Overlay */}
              <div className="absolute top-4 left-4 bg-background/95 backdrop-blur border rounded-lg p-3 shadow-lg">
                <h4 className="font-semibold text-sm mb-2">Market Status</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span>Live</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <span>Launching</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span>Planned</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-gray-400" />
                    <span>Future</span>
                  </div>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">Hover for details</div>
              </div>
            </div>

            {/* Market Stats */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-success/10 rounded-lg">
                  <div className="text-2xl font-bold text-success">
                    {data.europeanExpansionMap.regions.filter((r) => r.status === 'live').length}
                  </div>
                  <div className="text-xs text-muted-foreground">Live Markets</div>
                </div>
                <div className="text-center p-3 bg-warning/10 rounded-lg">
                  <div className="text-2xl font-bold text-warning">
                    {
                      data.europeanExpansionMap.regions.filter((r) => r.status === 'launching')
                        .length
                    }
                  </div>
                  <div className="text-xs text-muted-foreground">Launching</div>
                </div>
                <div className="text-center p-3 bg-primary/10 rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    {data.europeanExpansionMap.regions
                      .reduce((acc, r) => acc + r.projectedRevenue2031, 0)
                      .toLocaleString()}
                    K€
                  </div>
                  <div className="text-xs text-muted-foreground">Total Revenue 2031</div>
                </div>
                <div className="text-center p-3 bg-accent/10 rounded-lg">
                  <div className="text-2xl font-bold text-accent">
                    {data.europeanExpansionMap.regions
                      .reduce((acc, r) => acc + r.population, 0)
                      .toFixed(1)}
                    M
                  </div>
                  <div className="text-xs text-muted-foreground">Total Population</div>
                </div>
              </div>

              {/* Top Markets by Revenue Potential */}
              <div>
                <h4 className="font-semibold mb-3">Top Markets by 2031 Revenue</h4>
                <div className="space-y-2">
                  {data.europeanExpansionMap.regions
                    .sort((a, b) => b.projectedRevenue2031 - a.projectedRevenue2031)
                    .slice(0, 5)
                    .map((region) => (
                      <div key={region.code} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{
                              backgroundColor:
                                region.status === 'live'
                                  ? '#22c55e'
                                  : region.status === 'launching'
                                    ? '#f59e0b'
                                    : region.status === 'planned'
                                      ? '#3b82f6'
                                      : '#9ca3af',
                            }}
                          />
                          <span>{region.country}</span>
                        </div>
                        <span className="font-medium">
                          €{(region.projectedRevenue2031 / 1000).toFixed(1)}M
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Competitive Positioning Scatter Chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>{data.competitivePositioning.title}</span>
          </CardTitle>
          <CardDescription>{data.competitivePositioning.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={
              {
                us: { label: 'MyRoomie', color: '#fa906e' },
                established: { label: 'Established', color: '#94a3b8' },
                growth: { label: 'Growth Stage', color: '#3b82f6' },
                local: { label: 'Local Players', color: '#10b981' },
              } satisfies ChartConfig
            }
            className="h-[500px]"
          >
            <ScatterChart
              data={data.competitivePositioning.competitors}
              margin={{ top: 20, right: 20, bottom: 80, left: 60 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--muted-foreground))"
                strokeOpacity={0.2}
              />
              <XAxis
                type="number"
                dataKey="funding"
                name="Funding (€M)"
                domain={[0, 150]}
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground text-xs"
                tickFormatter={(value) => `€${value}M`}
              />
              <YAxis
                type="number"
                dataKey="featureScore"
                name="Feature Completeness"
                domain={[0, 100]}
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground text-xs"
                tickFormatter={(value) => `${value}%`}
              />
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="bg-background border rounded-lg p-3 shadow-lg">
                        <p className="font-semibold">{data.name}</p>
                        <p className="text-sm text-muted-foreground">{data.description}</p>
                        <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                          <div>Funding: €{data.funding}M</div>
                          <div>Features: {data.featureScore}%</div>
                          <div>Markets: {data.marketCoverage}</div>
                          <div>Position: {data.marketPosition}</div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Scatter dataKey="marketCoverage" name="Market Coverage">
                {data.competitivePositioning.competitors.map((entry, index) => {
                  const colors = {
                    us: '#fa906e',
                    established: '#94a3b8',
                    growth: '#3b82f6',
                    local: '#10b981',
                  }
                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[entry.category as keyof typeof colors]}
                      r={Math.sqrt(entry.marketCoverage) * 3 + 5}
                      fillOpacity={entry.name === 'MyRoomie' ? 1 : 0.7}
                      stroke={entry.name === 'MyRoomie' ? '#000' : 'none'}
                      strokeWidth={entry.name === 'MyRoomie' ? 2 : 0}
                    />
                  )
                })}
              </Scatter>
            </ScatterChart>
          </ChartContainer>

          {/* Legend and Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <h4 className="font-semibold mb-3">Competitive Categories</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#fa906e' }} />
                  <span className="text-sm">MyRoomie (Challenger)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#94a3b8' }} />
                  <span className="text-sm">Established Players</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#3b82f6' }} />
                  <span className="text-sm">Growth Stage</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#10b981' }} />
                  <span className="text-sm">Local Players</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Strategic Insights</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• MyRoomie leads in feature completeness despite lower funding</li>
                <li>• Large funding doesn't guarantee feature sophistication</li>
                <li>• Market coverage varies significantly across competitors</li>
                <li>• Opportunity for integrated LaaS approach in underserved markets</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* MyRoomie's Competitive Advantages */}
      <Card className="bg-muted/50 border-dashed">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5" />
            <span>{data.competitiveAdvantages.title}</span>
          </CardTitle>
          <CardDescription>{data.competitiveAdvantages.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.competitiveAdvantages.categories.map((category) => (
              <div key={category.id}>
                <h4 className="font-semibold text-foreground mb-3">{category.title}</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {category.advantages.map((advantage, idx) => (
                    <li key={idx}>• {advantage}</li>
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

export default function MarketAnalysisPage() {
  return (
    <ErrorBoundary>
      <QueryErrorBoundary>
        <MarketAnalysisContent />
      </QueryErrorBoundary>
    </ErrorBoundary>
  )
}
