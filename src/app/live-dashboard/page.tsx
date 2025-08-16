'use client'

import { useState } from 'react'
import { useEnhancedLiveMetrics } from '@/hooks/use-enhanced-live-metrics'
import type { LiveMetric, CountryMetrics } from '@/hooks/use-enhanced-live-metrics'
import { ErrorBoundary, QueryErrorBoundary } from '@/components/error-boundary'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
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
import {
  RefreshCw,
  Calendar,
  TrendingUp,
  TrendingDown,
  Euro,
  Users,
  MapPin,
  Target,
  Clock,
  Search,
  Scale,
  Handshake,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Play,
  Pause,
  Activity,
} from 'lucide-react'

// Icon mapping
const iconMap = {
  Euro,
  Users,
  MapPin,
  TrendingUp,
  TrendingDown,
  Target,
  Clock,
  Search,
  Scale,
  Handshake,
  CheckCircle,
  AlertCircle,
  Calendar,
  Activity,
}

function MetricCard({ metric }: { metric: LiveMetric }) {
  const IconComponent = iconMap[metric.icon as keyof typeof iconMap]

  // Determine performance status
  const hasTarget = metric.target !== undefined
  const currentValue =
    typeof metric.value === 'number' ? metric.value : parseFloat(metric.value.toString()) || 0
  const targetValue =
    typeof metric.target === 'number' ? metric.target : parseFloat(metric.target?.toString() || '0')

  // Use API status if available, otherwise calculate
  let performanceStatus: 'success' | 'warning' | 'danger' | 'neutral' =
    (metric as any).status || 'neutral'
  let performancePercentage = 0

  if (hasTarget && targetValue > 0) {
    performancePercentage = (currentValue / targetValue) * 100
    // Only override if no API status
    if (!(metric as any).status) {
      if (performancePercentage >= 100) performanceStatus = 'success'
      else if (performancePercentage >= 75) performanceStatus = 'warning'
      else if (performancePercentage < 50) performanceStatus = 'danger'
      else performanceStatus = 'warning'
    }
  }

  // Enhanced visual indicators
  const getStatusColor = () => {
    switch (performanceStatus) {
      case 'success':
        return 'text-success'
      case 'warning':
        return 'text-warning'
      case 'danger':
        return 'text-destructive'
      default:
        return 'text-muted-foreground'
    }
  }

  const getStatusBg = () => {
    switch (performanceStatus) {
      case 'success':
        return 'bg-success/10 border-success/20'
      case 'warning':
        return 'bg-warning/10 border-warning/20'
      case 'danger':
        return 'bg-destructive/10 border-destructive/20'
      default:
        return 'bg-muted/5 border-border'
    }
  }

  const getStatusIndicator = () => {
    switch (performanceStatus) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-success" />
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-warning" />
      case 'danger':
        return <AlertCircle className="w-4 h-4 text-destructive" />
      default:
        return <AlertCircle className="w-4 h-4 text-muted-foreground" />
    }
  }

  return (
    <Card
      className={`relative overflow-hidden border-2 transition-all hover:shadow-lg ${getStatusBg()}`}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {IconComponent && <IconComponent className={`w-4 h-4 ${getStatusColor()}`} />}
                <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
              </div>
              <span className="text-lg" title={`Status: ${performanceStatus}`}>
                {getStatusIndicator()}
              </span>
            </div>

            <div className="space-y-1">
              <p className="text-2xl font-bold text-foreground">
                {metric.prefix || ''}
                {metric.value}
                {metric.suffix || ''}
              </p>
              <p className="text-xs text-muted-foreground">{metric.subtitle}</p>
            </div>

            {hasTarget && (
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">
                  Target: {metric.prefix || ''}
                  {metric.target}
                  {metric.targetSuffix || metric.suffix || ''}
                </p>
                <div className="w-full bg-muted/30 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      performanceStatus === 'success'
                        ? 'bg-success shadow-success/20 shadow-sm'
                        : performanceStatus === 'warning'
                          ? 'bg-warning shadow-warning/20 shadow-sm'
                          : performanceStatus === 'danger'
                            ? 'bg-destructive shadow-destructive/20 shadow-sm'
                            : 'bg-primary shadow-primary/20 shadow-sm'
                    }`}
                    style={{ width: `${Math.min(100, performancePercentage)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {hasTarget && (
            <div className="ml-4">
              <Badge
                variant="outline"
                className={`text-xs ${
                  performanceStatus === 'success'
                    ? 'border-success text-success'
                    : performanceStatus === 'warning'
                      ? 'border-warning text-warning'
                      : performanceStatus === 'danger'
                        ? 'border-destructive text-destructive'
                        : 'border-primary text-primary'
                }`}
              >
                {Math.round(performancePercentage)}%
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function CountryTab({ country }: { country: CountryMetrics }) {
  const statusConfig = {
    live: { color: 'bg-success text-success-foreground', icon: CheckCircle, label: 'Live' },
    launching: { color: 'bg-warning text-warning-foreground', icon: Clock, label: 'Launching' },
    planned: { color: 'bg-muted text-muted-foreground', icon: Calendar, label: 'Planned' },
  }

  const config = statusConfig[country.status]
  const StatusIcon = config.icon

  // Prepare chart data
  const historicalData = country.historicalData || []
  console.log('Historical data:', historicalData) // Debug log

  // Temporary fallback test data
  const testData = [
    {
      month: 'Jan 25',
      MRR: 4200,
      MRRTarget: 4000,
      ActiveUsers: 15775,
      NewSignups: 450,
      CAC: 11,
      ARPU: 0.27,
      ChurnRate: 0.95,
    },
    {
      month: 'Feb 25',
      MRR: 4800,
      MRRTarget: 4500,
      ActiveUsers: 16105,
      NewSignups: 480,
      CAC: 10,
      ARPU: 0.3,
      ChurnRate: 0.93,
    },
    {
      month: 'Mar 25',
      MRR: 5500,
      MRRTarget: 5000,
      ActiveUsers: 16465,
      NewSignups: 510,
      CAC: 9.8,
      ARPU: 0.33,
      ChurnRate: 0.91,
    },
  ]

  const chartData =
    historicalData.length > 0
      ? historicalData.map((point) => ({
          month: new Date(point.month).toLocaleDateString('en-US', {
            month: 'short',
            year: '2-digit',
          }),
          MRR: point.mrrActual,
          MRRTarget: point.mrrTarget,
          ActiveUsers: point.activeUsers,
          NewSignups: point.newSignups,
          CAC: point.cac,
          ARPU: point.arpu,
          ChurnRate: point.churnRate,
        }))
      : testData

  console.log('Chart data:', chartData) // Debug log

  return (
    <div className="space-y-6">
      {/* Country Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-3xl">{country.flag}</div>
          <div>
            <h2 className="text-2xl font-bold">{country.name}</h2>
            <p className="text-sm text-muted-foreground">
              Launch date: {new Date(country.launchDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        <Badge className={config.color}>
          <StatusIcon className="w-3 h-3 mr-1" />
          {config.label}
        </Badge>
      </div>

      {/* Country Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {country.metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      {/* Analytics Overview */}
      {country.analytics && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Performance Analytics</span>
            </CardTitle>
            <CardDescription>Key performance indicators and unit economics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">MRR Growth</p>
                <p className="text-lg font-bold text-success">
                  +{country.analytics.mrrGrowth.toFixed(1)}%
                </p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">User Growth</p>
                <p className="text-lg font-bold text-primary">
                  +{country.analytics.userGrowth.toFixed(1)}%
                </p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">CAC</p>
                <p className="text-lg font-bold text-warning">
                  €{country.analytics.currentCAC.toFixed(0)}
                </p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">ARPU</p>
                <p className="text-lg font-bold text-info">
                  €{country.analytics.currentARPU.toFixed(2)}
                </p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Churn Rate</p>
                <p className="text-lg font-bold text-destructive">
                  {country.analytics.churnRate.toFixed(1)}%
                </p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">LTV:CAC</p>
                <p className="text-lg font-bold text-accent">
                  {country.analytics.ltvCacRatio.toFixed(1)}:1
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Historical Charts */}
      {chartData.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* MRR Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Revenue Trend</CardTitle>
              <CardDescription>Monthly Recurring Revenue over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={
                  {
                    MRR: {
                      label: 'Actual MRR',
                      color: 'hsl(var(--chart-1))',
                    },
                    MRRTarget: {
                      label: 'Target MRR',
                      color: 'hsl(var(--chart-2))',
                    },
                  } satisfies ChartConfig
                }
                className="h-[300px]"
              >
                <AreaChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--muted-foreground))"
                    strokeOpacity={0.2}
                  />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    className="text-muted-foreground text-xs"
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    className="text-muted-foreground text-xs"
                    tickFormatter={(value) => `€${Number(value).toLocaleString()}`}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        labelFormatter={(label) => `Month: ${label}`}
                        formatter={(value, name) => [`€${Number(value).toLocaleString()}`, name]}
                      />
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey="MRR"
                    stackId="1"
                    stroke="var(--color-MRR)"
                    fill="var(--color-MRR)"
                    fillOpacity={0.6}
                    name="Actual MRR"
                    className="drop-shadow-sm"
                  />
                  <Area
                    type="monotone"
                    dataKey="MRRTarget"
                    stackId="1"
                    stroke="var(--color-MRRTarget)"
                    fill="var(--color-MRRTarget)"
                    fillOpacity={0.4}
                    name="Target MRR"
                    className="drop-shadow-sm"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* User Growth */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">User Growth</CardTitle>
              <CardDescription>Active users and new signups trend</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={
                  {
                    ActiveUsers: {
                      label: 'Active Users',
                      color: 'hsl(var(--chart-1))',
                    },
                    NewSignups: {
                      label: 'New Signups',
                      color: 'hsl(var(--chart-2))',
                    },
                  } satisfies ChartConfig
                }
                className="h-[300px]"
              >
                <LineChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--muted-foreground))"
                    strokeOpacity={0.2}
                  />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    className="text-muted-foreground text-xs"
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    className="text-muted-foreground text-xs"
                    tickFormatter={(value) => Number(value).toLocaleString()}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        labelFormatter={(label) => `Month: ${label}`}
                        formatter={(value, name) => [Number(value).toLocaleString(), name]}
                      />
                    }
                  />
                  <Line
                    type="monotone"
                    dataKey="ActiveUsers"
                    stroke="var(--color-ActiveUsers)"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Active Users"
                  />
                  <Line
                    type="monotone"
                    dataKey="NewSignups"
                    stroke="var(--color-NewSignups)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    name="New Signups"
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Unit Economics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Unit Economics</CardTitle>
              <CardDescription>CAC and ARPU trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={
                  {
                    CAC: {
                      label: 'Customer Acquisition Cost',
                      color: 'hsl(var(--chart-3))',
                    },
                    ARPU: {
                      label: 'Average Revenue Per User',
                      color: 'hsl(var(--chart-4))',
                    },
                  } satisfies ChartConfig
                }
                className="h-[300px]"
              >
                <BarChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--muted-foreground))"
                    strokeOpacity={0.2}
                  />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    className="text-muted-foreground text-xs"
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    className="text-muted-foreground text-xs"
                    tickFormatter={(value) => `€${Number(value).toFixed(1)}`}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        labelFormatter={(label) => `Month: ${label}`}
                        formatter={(value, name) => [`€${Number(value).toFixed(2)}`, name]}
                      />
                    }
                  />
                  <Bar
                    dataKey="CAC"
                    fill="var(--color-CAC)"
                    name="Customer Acquisition Cost"
                    fillOpacity={0.8}
                    radius={[4, 4, 0, 0]}
                    className="drop-shadow-sm"
                  />
                  <Bar
                    dataKey="ARPU"
                    fill="var(--color-ARPU)"
                    name="Average Revenue Per User"
                    fillOpacity={0.8}
                    radius={[4, 4, 0, 0]}
                    className="drop-shadow-sm"
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Performance Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Monthly Performance</CardTitle>
              <CardDescription>Detailed month-by-month breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Month</th>
                      <th className="text-right py-2">MRR</th>
                      <th className="text-right py-2">Users</th>
                      <th className="text-right py-2">Signups</th>
                      <th className="text-right py-2">CAC</th>
                      <th className="text-right py-2">ARPU</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historicalData.map((point, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2 font-medium">
                          {new Date(point.month).toLocaleDateString('en-US', {
                            month: 'short',
                            year: 'numeric',
                          })}
                        </td>
                        <td className="text-right py-2">€{point.mrrActual.toLocaleString()}</td>
                        <td className="text-right py-2">{point.activeUsers.toLocaleString()}</td>
                        <td className="text-right py-2">{point.newSignups}</td>
                        <td className="text-right py-2">€{point.cac.toFixed(0)}</td>
                        <td className="text-right py-2">€{point.arpu.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Market Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Market Insights</CardTitle>
          <CardDescription>Country-specific performance analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {country.status === 'live' && (
              <div className="space-y-2">
                <h4 className="font-medium">Market Performance</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Strong market traction with consistent month-over-month growth</li>
                  <li>• User acquisition remains cost-effective with improving unit economics</li>
                  <li>• High user engagement with successful platform adoption</li>
                  <li>• Revenue growth outpacing user growth, indicating improved monetization</li>
                </ul>
              </div>
            )}
            {country.status === 'launching' && (
              <div className="space-y-2">
                <h4 className="font-medium">Launch Progress</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Pre-launch activities are progressing as planned</li>
                  <li>• Local team building and market preparation underway</li>
                  <li>• Initial user acquisition and platform testing in progress</li>
                  <li>• Focus on establishing market presence and user base</li>
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function LiveDashboardContent() {
  const {
    data,
    loading: isLoading,
    error,
    refetch,
    isFetching: isRefetching,
    isAutoRefresh,
    setAutoRefresh: setIsAutoRefresh,
    lastUpdated,
    forceRefresh,
    isStale,
  } = useEnhancedLiveMetrics()
  const [activeTab, setActiveTab] = useState('overview')

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-warm flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <RefreshCw className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Loading live metrics...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gradient-warm p-6 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center space-y-4">
            <AlertCircle className="w-12 h-12 mx-auto text-destructive" />
            <div>
              <h3 className="text-lg font-semibold">Unable to load metrics</h3>
              <p className="text-sm text-muted-foreground">
                There was an error fetching the live dashboard data.
              </p>
            </div>
            <Button onClick={() => refetch()} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-warm p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Activity className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Live Metrics Dashboard</h1>
              <p className="text-muted-foreground">Real-time performance across all markets</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch
                checked={isAutoRefresh}
                onCheckedChange={setIsAutoRefresh}
                id="auto-refresh"
              />
              <label
                htmlFor="auto-refresh"
                className="text-sm text-muted-foreground flex items-center"
              >
                {isAutoRefresh ? (
                  <Play className="w-3 h-3 mr-1" />
                ) : (
                  <Pause className="w-3 h-3 mr-1" />
                )}
                Auto-refresh
              </label>
            </div>

            <Button
              onClick={() => forceRefresh()}
              disabled={isRefetching}
              variant="outline"
              size="sm"
            >
              {isRefetching ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4 mr-2" />
              )}
              {isStale ? 'Force Refresh' : 'Refresh'}
            </Button>
          </div>
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <Badge
              variant="outline"
              className={`text-xs ${isStale ? 'border-warning text-warning' : 'border-success text-success'}`}
            >
              📊 {isStale ? 'Stale Data' : 'Live Data'}
            </Badge>
            <span>
              Last updated: {lastUpdated ? new Date(lastUpdated).toLocaleString() : 'Never'}
            </span>
            {isRefetching && <span className="text-primary">Updating...</span>}
          </div>
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${error ? 'bg-destructive' : 'bg-success animate-pulse'}`}
            />
            <span>{error ? 'Disconnected' : 'Connected'}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="w-auto">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          {data.countries.map((country) => (
            <TabsTrigger
              key={country.id}
              value={country.id}
              className="flex items-center space-x-2"
            >
              <span>{country.flag}</span>
              <span className="hidden sm:inline">{country.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Global Performance</CardTitle>
              <CardDescription>Aggregated metrics across all markets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.overview.keyMetrics.map((metric) => (
                  <MetricCard key={metric.id} metric={metric} />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Country Status Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Market Status</CardTitle>
              <CardDescription>Launch status across target countries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data.countries.map((country) => {
                  const statusConfig = {
                    live: {
                      color: 'border-success bg-success/5',
                      badge: 'bg-success text-success-foreground',
                    },
                    launching: {
                      color: 'border-warning bg-warning/5',
                      badge: 'bg-warning text-warning-foreground',
                    },
                    planned: {
                      color: 'border-muted bg-muted/5',
                      badge: 'bg-muted text-muted-foreground',
                    },
                  }

                  return (
                    <Card
                      key={country.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${statusConfig[country.status].color}`}
                    >
                      <CardContent className="p-4" onClick={() => setActiveTab(country.id)}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{country.flag}</span>
                            <span className="font-medium">{country.name}</span>
                          </div>
                          <Badge className={`text-xs ${statusConfig[country.status].badge}`}>
                            {country.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Launch: {new Date(country.launchDate).toLocaleDateString()}
                        </p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Country-specific Tabs */}
        {data.countries.map((country) => (
          <TabsContent key={country.id} value={country.id}>
            <CountryTab country={country} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export default function LiveDashboardPage() {
  return (
    <ErrorBoundary>
      <QueryErrorBoundary>
        <LiveDashboardContent />
      </QueryErrorBoundary>
    </ErrorBoundary>
  )
}
