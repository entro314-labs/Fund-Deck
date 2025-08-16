import { type NextRequest, NextResponse } from 'next/server'
import { fetchDashboardData, fetchSheetAsCSV } from '@/lib/google-sheets'
import type { LiveMetricsData, CountryMetrics } from '@/hooks/use-live-metrics'

// Interface for raw historical data from Google Sheets
interface RawHistoricalDataPoint {
  month: string
  newSignupsActual: number
  newSignupsTarget: number
  activeUsersActual: number
  activeUsersTarget: number
  usersChurned: number
  listingsGrowth: number
  successfulMatches: number
  mrrActual: number
  mrrTarget: number
  monthlyBurn: number
  teamSize: number
}

// Interface for country data from Google Sheets
interface CountrySheetData {
  latestMonth: string
  metrics: {
    newSignupsActual: number
    newSignupsTarget: number
    activeUsersActual: number
    activeUsersTarget: number
    usersChurned: number
    listingsGrowth: number
    successfulMatches: number
    mrrActual: number
    mrrTarget: number
    monthlyBurn: number
    teamSize: number
  }
  historicalData: RawHistoricalDataPoint[]
}

// Cache the data for 5 minutes to avoid hitting rate limits
let cachedData: LiveMetricsData | null = null
let cacheTimestamp = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

// Map real sheet data to our dashboard structure
function mapRealDataToMetrics(
  overviewData: any,
  countryData: Record<string, CountrySheetData>
): LiveMetricsData {
  // Calculate enhanced investor-focused metrics
  const mrr = overviewData.totalMRR?.actual ?? 0
  const mrrTarget = overviewData.totalMRR?.target ?? 0
  const users = overviewData.totalActiveUsers?.actual ?? 0
  const usersTarget = overviewData.totalActiveUsers?.target ?? 0
  const burn = overviewData.totalBurn?.actual ?? 0
  const burnTarget = overviewData.totalBurn?.target ?? 0
  const signups = overviewData.totalSignups?.actual ?? 555
  const signupsTarget = overviewData.totalSignups?.target ?? 550

  // Advanced KPI calculations
  const cashRunway = overviewData.cashRunway ?? (burn > 0 ? Math.round((mrr / burn) * 12) : 12)
  const cac = signups > 0 ? Math.round(burn / signups) : 0 // Customer Acquisition Cost
  const ltv = users > 0 ? Math.round(mrr / (users * 0.05)) : 0 // Lifetime Value (5% churn assumption)
  const ltvCacRatio = cac > 0 ? Math.round(ltv / cac) : 0
  const churnRate = users > 0 ? Math.round(((users * 0.05) / users) * 100) : 5 // 5% assumed
  const marketsPenetration = 1 // Currently live in 1 market (Greece)

  // Performance status indicators (traffic light system)
  const getPerformanceStatus = (
    actual: number,
    target: number,
    reverse = false
  ): 'success' | 'warning' | 'danger' | 'neutral' => {
    if (target === 0) return 'neutral'
    const ratio = actual / target
    if (reverse) {
      return ratio <= 0.8 ? 'success' : ratio <= 1.0 ? 'warning' : 'danger'
    }
    return ratio >= 1.0 ? 'success' : ratio >= 0.8 ? 'warning' : 'danger'
  }

  // Map overview metrics with enhanced investor focus
  const overviewMetrics = [
    {
      id: 'total-revenue',
      title: 'Monthly Recurring Revenue',
      value: mrr,
      prefix: '€',
      suffix: '',
      subtitle: `vs €${mrrTarget.toLocaleString()} target`,
      icon: 'Euro',
      color:
        getPerformanceStatus(mrr, mrrTarget) === 'success'
          ? 'text-success'
          : getPerformanceStatus(mrr, mrrTarget) === 'warning'
            ? 'text-warning'
            : 'text-destructive',
      target: mrrTarget,
      targetSuffix: '',
      status: getPerformanceStatus(mrr, mrrTarget),
    },
    {
      id: 'active-users',
      title: 'Active Users',
      value: users,
      suffix: '',
      subtitle: `vs ${usersTarget.toLocaleString()} target`,
      icon: 'Users',
      color:
        getPerformanceStatus(users, usersTarget) === 'success'
          ? 'text-success'
          : getPerformanceStatus(users, usersTarget) === 'warning'
            ? 'text-warning'
            : 'text-destructive',
      target: usersTarget,
      targetSuffix: '',
      status: getPerformanceStatus(users, usersTarget),
    },
    {
      id: 'cash-runway',
      title: 'Cash Runway',
      value: cashRunway,
      suffix: ' months',
      subtitle: 'Until break-even',
      icon: 'Calendar',
      color:
        cashRunway >= 12 ? 'text-success' : cashRunway >= 6 ? 'text-warning' : 'text-destructive',
      target: 12,
      targetSuffix: ' months',
      status: (cashRunway >= 12 ? 'success' : cashRunway >= 6 ? 'warning' : 'danger') as
        | 'success'
        | 'warning'
        | 'danger',
    },
    {
      id: 'monthly-burn',
      title: 'Monthly Burn Rate',
      value: burn,
      prefix: '€',
      suffix: '',
      subtitle: `vs €${burnTarget.toLocaleString()} budget`,
      icon: 'TrendingDown',
      color:
        getPerformanceStatus(burn, burnTarget, true) === 'success'
          ? 'text-success'
          : getPerformanceStatus(burn, burnTarget, true) === 'warning'
            ? 'text-warning'
            : 'text-destructive',
      target: burnTarget,
      targetSuffix: '',
      status: getPerformanceStatus(burn, burnTarget, true),
    },
    {
      id: 'markets-live',
      title: 'Markets Live',
      value: marketsPenetration,
      suffix: '/11',
      subtitle: 'Countries launched',
      icon: 'MapPin',
      color: 'text-accent',
      target: 3,
      targetSuffix: '/11',
      status: (marketsPenetration >= 3
        ? 'success'
        : marketsPenetration >= 1
          ? 'warning'
          : 'danger') as 'success' | 'warning' | 'danger',
    },
    {
      id: 'ltv-cac-ratio',
      title: 'LTV:CAC Ratio',
      value: ltvCacRatio,
      suffix: ':1',
      subtitle: 'Customer economics',
      icon: 'Target',
      color:
        ltvCacRatio >= 3 ? 'text-success' : ltvCacRatio >= 2 ? 'text-warning' : 'text-destructive',
      target: 3,
      targetSuffix: ':1',
      status: (ltvCacRatio >= 3 ? 'success' : ltvCacRatio >= 2 ? 'warning' : 'danger') as
        | 'success'
        | 'warning'
        | 'danger',
    },
  ]

  // Dynamic country mapping based on actual data in Data_Input sheet
  const countries: CountryMetrics[] = []

  // Country configuration with metadata
  const countryConfig = {
    greece: {
      name: 'Greece',
      code: 'GR',
      flag: '🇬🇷',
      status: 'live' as const,
      launchDate: '2025-05-01',
      color: 'text-success',
    },
    poland: {
      name: 'Poland',
      code: 'PL',
      flag: '🇵🇱',
      status: 'launching' as const,
      launchDate: '2025-08-01',
      color: 'text-warning',
    },
  }

  // Process all countries found in the Data_Input sheet
  Object.keys(countryData).forEach((countryKey) => {
    const config = countryConfig[countryKey as keyof typeof countryConfig]
    if (!(config && countryData[countryKey])) return

    const metrics = countryData[countryKey].metrics
    const historicalData = countryData[countryKey].historicalData || []
    const countryId = countryKey.toLowerCase()

    // Calculate derived metrics from historical data
    const calculateGrowthRate = (current: number, previous: number) => {
      return previous > 0 ? ((current - previous) / previous) * 100 : 0
    }

    const latestMonthData = historicalData[historicalData.length - 1]
    const previousMonthData = historicalData[historicalData.length - 2]

    // Calculate month-over-month growth rates
    const mrrGrowth =
      latestMonthData && previousMonthData
        ? calculateGrowthRate(latestMonthData.mrrActual, previousMonthData.mrrActual)
        : 0
    const userGrowth =
      latestMonthData && previousMonthData
        ? calculateGrowthRate(
            latestMonthData.activeUsersActual,
            previousMonthData.activeUsersActual
          )
        : 0

    // Calculate unit economics
    const cac = latestMonthData ? latestMonthData.monthlyBurn / latestMonthData.newSignupsActual : 0
    const arpu = latestMonthData ? latestMonthData.mrrActual / latestMonthData.activeUsersActual : 0
    const churnRate = latestMonthData
      ? (latestMonthData.usersChurned / latestMonthData.activeUsersActual) * 100
      : 0

    // Determine performance status for country
    const mrrStatus = getPerformanceStatus(metrics.mrrActual ?? 0, metrics.mrrTarget ?? 0)
    const usersStatus = getPerformanceStatus(
      metrics.activeUsersActual ?? 0,
      metrics.activeUsersTarget ?? 0
    )

    countries.push({
      id: countryId,
      name: config.name,
      code: config.code,
      flag: config.flag,
      status: config.status,
      launchDate: config.launchDate,
      historicalData: historicalData.map((month: RawHistoricalDataPoint) => ({
        month: month.month,
        mrrActual: month.mrrActual,
        mrrTarget: month.mrrTarget,
        activeUsers: month.activeUsersActual,
        newSignups: month.newSignupsActual,
        successfulMatches: month.successfulMatches,
        monthlyBurn: month.monthlyBurn,
        churnRate: (month.usersChurned / month.activeUsersActual) * 100 || 0,
        cac: month.newSignupsActual > 0 ? month.monthlyBurn / month.newSignupsActual : 0,
        arpu: month.activeUsersActual > 0 ? month.mrrActual / month.activeUsersActual : 0,
      })),
      analytics: {
        mrrGrowth: mrrGrowth,
        userGrowth: userGrowth,
        currentCAC: cac,
        currentARPU: arpu,
        churnRate: churnRate,
        ltvCacRatio: churnRate > 0 ? (arpu * 12) / (churnRate / 100) / cac : 0,
      },
      metrics: [
        {
          id: `${countryId.substring(0, 2)}-revenue`,
          title: 'Monthly MRR',
          value: metrics.mrrActual ?? 0,
          prefix: '€',
          suffix: '',
          subtitle: `vs €${(metrics.mrrTarget ?? 0).toLocaleString()} target (${mrrGrowth > 0 ? '+' : ''}${mrrGrowth.toFixed(1)}% MoM)`,
          icon: 'Euro',
          color:
            mrrStatus === 'success'
              ? 'text-success'
              : mrrStatus === 'warning'
                ? 'text-warning'
                : 'text-destructive',
          target: metrics.mrrTarget ?? 0,
          status: mrrStatus,
        },
        {
          id: `${countryId.substring(0, 2)}-users`,
          title: 'Active Users',
          value: metrics.activeUsersActual ?? 0,
          suffix: '',
          subtitle: `vs ${(metrics.activeUsersTarget ?? 0).toLocaleString()} target (${userGrowth > 0 ? '+' : ''}${userGrowth.toFixed(1)}% MoM)`,
          icon: 'Users',
          color:
            usersStatus === 'success'
              ? 'text-success'
              : usersStatus === 'warning'
                ? 'text-warning'
                : 'text-destructive',
          target: metrics.activeUsersTarget ?? 0,
          status: usersStatus,
        },
        {
          id: `${countryId.substring(0, 2)}-signups`,
          title: 'New Signups',
          value: metrics.newSignupsActual ?? 0,
          suffix: '/month',
          subtitle: `vs ${(metrics.newSignupsTarget ?? 0).toLocaleString()} target (CAC: €${cac.toFixed(0)})`,
          icon: 'TrendingUp',
          color: config.color,
          target: metrics.newSignupsTarget ?? 0,
          status: getPerformanceStatus(
            metrics.newSignupsActual ?? 0,
            metrics.newSignupsTarget ?? 0
          ),
        },
        {
          id: `${countryId.substring(0, 2)}-arpu`,
          title: 'ARPU',
          value: arpu.toFixed(2),
          prefix: '€',
          suffix: '/user',
          subtitle: `Average revenue per user (Churn: ${churnRate.toFixed(1)}%)`,
          icon: 'Target',
          color: 'text-info',
        },
        ...(config.status === 'live'
          ? [
              {
                id: `${countryId.substring(0, 2)}-matches`,
                title: 'Successful Matches',
                value: metrics.successfulMatches ?? 0,
                suffix: '/month',
                subtitle: 'Monthly matches',
                icon: 'Target',
                color: 'text-info',
              },
            ]
          : []),
        ...(config.status === 'launching' && metrics.teamSize
          ? [
              {
                id: `${countryId.substring(0, 2)}-team`,
                title: 'Team Size',
                value: metrics.teamSize,
                suffix: ' people',
                subtitle: 'Local team members',
                icon: 'Users',
                color: 'text-info',
              },
            ]
          : []),
      ],
    })
  })

  return {
    overview: {
      keyMetrics: overviewMetrics,
    },
    countries: countries,
    lastUpdated: new Date().toISOString(),
  }
}

async function fetchLiveMetrics(): Promise<LiveMetricsData> {
  // Check cache first
  const now = Date.now()
  if (cachedData && now - cacheTimestamp < CACHE_DURATION) {
    return cachedData
  }

  try {
    const dashboardData = await fetchDashboardData()

    // Check if we have valid data
    if (!dashboardData.countries || Object.keys(dashboardData.countries).length === 0) {
      throw new Error('No country data available in Google Sheets')
    }

    // Map the real sheet data to our dashboard structure
    const mappedData = mapRealDataToMetrics(dashboardData.overview, dashboardData.countries)

    // Cache and return the real data
    cachedData = mappedData
    cacheTimestamp = now

    return mappedData
  } catch (error) {
    console.error('Error fetching live metrics:', error)
    throw new Error('Failed to fetch live metrics data from Google Sheets')
  }
}

export async function GET(request: NextRequest) {
  try {
    const data = await fetchLiveMetrics()

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600', // 5 min cache, 10 min stale
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
      },
    })
  } catch (error) {
    console.error('Live metrics API error:', error)

    return NextResponse.json(
      {
        error: 'Failed to fetch live metrics',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
