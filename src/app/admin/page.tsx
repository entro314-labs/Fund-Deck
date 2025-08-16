'use client'

import { useState, useEffect } from 'react'
import AdminGuard from '../../components/admin-guard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select'
import {
  Settings,
  BarChart3,
  FileText,
  Users,
  TrendingUp,
  Target,
  Rocket,
  Shield,
  Calendar,
  LogOut,
  Save,
  RefreshCw,
  Edit3,
  Home,
  Presentation,
  Plus,
  Trash2,
} from 'lucide-react'
import { useDataQuery, useDataMutation } from '../../hooks/use-data-query'
import { COMPANY_CONFIG } from '../../lib/company-config'
import { ErrorBoundary, QueryErrorBoundary } from '../../components/error-boundary'
import { useUIStore } from '../../stores/ui-store'
import {
  FinancialModelData,
  DashboardData,
  StrategicPlanData,
  ExecutiveSummaryData,
  MarketAnalysisData,
  ProductOverviewData,
  OnePagerData,
  RiskAssessmentData,
  GrowthStrategyData,
  MilestonesData,
  ExitStrategyData,
  InvestorPackageData,
  PresentationData,
} from '../../types/data'

type PageKey =
  | 'dashboard'
  | 'financial-model'
  | 'strategic-plan'
  | 'executive-summary'
  | 'market-analysis'
  | 'product-overview'
  | 'one-pager'
  | 'risk-assessment'
  | 'growth-strategy'
  | 'milestones'
  | 'exit-strategy'
  | 'investor-package'
  | 'presentation'

interface PageConfig {
  key: PageKey
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  dataPath: string
  badge?: string
}

const pages: PageConfig[] = [
  {
    key: 'dashboard',
    title: 'Dashboard',
    description: 'Edit quick stats and document sections',
    icon: Home,
    dataPath: 'pages/dashboard',
    badge: 'Core',
  },
  {
    key: 'financial-model',
    title: 'Financial Model',
    description: 'Edit metrics, charts, and projections',
    icon: BarChart3,
    dataPath: 'pages/financial-model',
    badge: 'Core',
  },
  {
    key: 'strategic-plan',
    title: 'Strategic Plan',
    description: 'Edit strategic pillars and expansion phases',
    icon: TrendingUp,
    dataPath: 'pages/strategic-plan',
    badge: 'Core',
  },
  {
    key: 'executive-summary',
    title: 'Executive Summary',
    description: 'Edit overview and key highlights',
    icon: FileText,
    dataPath: 'pages/executive-summary',
  },
  {
    key: 'market-analysis',
    title: 'Market Analysis',
    description: 'Edit market data and competitive landscape',
    icon: BarChart3,
    dataPath: 'pages/market-analysis',
    badge: 'Core',
  },
  {
    key: 'product-overview',
    title: 'Product Overview',
    description: 'Edit tech stack and product features',
    icon: Rocket,
    dataPath: 'pages/product-overview',
  },
  {
    key: 'one-pager',
    title: 'One-Pager',
    description: 'Edit concise company overview',
    icon: Target,
    dataPath: 'pages/one-pager',
  },
  {
    key: 'risk-assessment',
    title: 'Risk Assessment',
    description: 'Edit risk categories and mitigation strategies',
    icon: Shield,
    dataPath: 'pages/risk-assessment',
  },
  {
    key: 'growth-strategy',
    title: 'Growth Strategy',
    description: 'Edit growth metrics and strategies',
    icon: TrendingUp,
    dataPath: 'pages/growth-strategy',
  },
  {
    key: 'milestones',
    title: 'Milestones',
    description: 'Edit timeline and execution milestones',
    icon: Calendar,
    dataPath: 'pages/milestones',
  },
  {
    key: 'exit-strategy',
    title: 'Exit Strategy',
    description: 'Edit exit scenarios and preparation',
    icon: LogOut,
    dataPath: 'pages/exit-strategy',
  },
  {
    key: 'investor-package',
    title: 'Investor Package',
    description: 'Edit investor documents and materials',
    icon: Users,
    dataPath: 'pages/investor-package',
    badge: 'Core',
  },
  {
    key: 'presentation',
    title: 'Pitch Presentation',
    description: 'Edit investor pitch deck slides',
    icon: Presentation,
    dataPath: 'pages/presentation',
    badge: 'Core',
  },
]

function AdminPageContent() {
  const [activeSection, setActiveSection] = useState<'overview' | PageKey>('overview')
  const [formData, setFormData] = useState<any>(null)
  const { showToast } = useUIStore()

  // Get the data path for the active section
  const dataPath =
    activeSection !== 'overview' ? pages.find((p) => p.key === activeSection)?.dataPath || '' : ''

  // Use enhanced data hooks
  const {
    data: serverData,
    loading,
    error,
  } = useDataQuery<any>(dataPath, {
    enabled: activeSection !== 'overview' && dataPath !== '',
  })

  const { mutateAsync: updateData, loading: saving } = useDataMutation<any>(dataPath)

  // Update form data when server data changes (initial load) or section changes
  useEffect(() => {
    if (serverData && !formData) {
      // Only set form data if we don't have any yet (initial load)
      setFormData(serverData)
    }
  }, [serverData, formData])

  // Reset form data when section changes
  useEffect(() => {
    setFormData(null) // Clear form data so it gets reset from serverData
  }, [activeSection])

  // Use form data if available, fallback to server data
  const data = formData || serverData

  const handleSave = async () => {
    if (!formData) return

    try {
      console.log('🚀 Saving data:', formData)
      const result = await updateData(formData)
      console.log('✅ Save result:', result)
      showToast('success', '✅ Data saved successfully!')
    } catch (error) {
      console.error('❌ Save error:', error)
      showToast('error', '❌ Failed to save data')
    }
  }

  const updatePageMeta = (field: string, value: string) => {
    if (!data?.meta) return

    // Update local form state only
    setFormData({
      ...data,
      meta: { ...data.meta, [field]: value },
    })
  }

  // Generic function to update any nested data
  const updateNestedData = (path: string[], value: any) => {
    if (!data) return

    const newData = { ...data }
    let current = newData

    // Navigate to the parent object
    for (let i = 0; i < path.length - 1; i++) {
      if (!current[path[i]]) current[path[i]] = {}
      current = current[path[i]]
    }

    // Set the final value
    current[path[path.length - 1]] = value

    // Update local form state only
    setFormData(newData)
  }

  const renderPageEditor = () => {
    if (activeSection === 'overview') return null

    if (loading) {
      return (
        <Card>
          <CardContent className="p-6 text-center">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p>Loading page data...</p>
          </CardContent>
        </Card>
      )
    }

    if (error || !data) {
      return (
        <Card className="border-destructive">
          <CardContent className="p-6 text-center">
            <p className="text-destructive">Error: {error?.message || 'No data found'}</p>
          </CardContent>
        </Card>
      )
    }

    const pageConfig = pages.find((p) => p.key === activeSection)
    if (!pageConfig) return null

    return (
      <div className="space-y-6">
        {/* Save Button */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{pageConfig.title} Editor</h2>
          <Button onClick={handleSave} disabled={saving || loading}>
            {saving ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>

        {/* Page Meta Editor (common to all pages) */}
        {data.meta && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Edit3 className="w-5 h-5" />
                <span>Page Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Page Title</label>
                <Input
                  value={data.meta.title || ''}
                  onChange={(e) => updatePageMeta('title', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subtitle</label>
                <Textarea
                  value={data.meta.subtitle || ''}
                  onChange={(e) => updatePageMeta('subtitle', e.target.value)}
                />
              </div>
              {data.meta.badge !== undefined && (
                <div>
                  <label className="block text-sm font-medium mb-2">Badge</label>
                  <Input
                    value={data.meta.badge || ''}
                    onChange={(e) => updatePageMeta('badge', e.target.value)}
                  />
                </div>
              )}
              {data.meta.date !== undefined && (
                <div>
                  <label className="block text-sm font-medium mb-2">Date</label>
                  <Input
                    value={data.meta.date || ''}
                    onChange={(e) => updatePageMeta('date', e.target.value)}
                  />
                </div>
              )}
              {data.meta.exportButtonText !== undefined && (
                <div>
                  <label className="block text-sm font-medium mb-2">Export Button Text</label>
                  <Input
                    value={data.meta.exportButtonText || ''}
                    onChange={(e) => updatePageMeta('exportButtonText', e.target.value)}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Key Metrics Editor (for pages that have keyMetrics) */}
        {data.keyMetrics && (
          <Card>
            <CardHeader>
              <CardTitle>Key Metrics</CardTitle>
              <CardDescription>Edit the main metrics displayed on this page</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.keyMetrics.map((metric: any, index: number) => (
                  <div key={metric.id} className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-3">Metric {index + 1}</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <Input
                          value={metric.title || ''}
                          onChange={(e) => {
                            const updatedMetrics = [...data.keyMetrics]
                            updatedMetrics[index] = { ...metric, title: e.target.value }
                            updateNestedData(['keyMetrics'], updatedMetrics)
                          }}
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-sm font-medium mb-1">Prefix</label>
                          <Input
                            value={metric.prefix || ''}
                            onChange={(e) => {
                              const updatedMetrics = [...data.keyMetrics]
                              updatedMetrics[index] = { ...metric, prefix: e.target.value }
                              updateNestedData(['keyMetrics'], updatedMetrics)
                            }}
                            placeholder="€, $"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Value</label>
                          <Input
                            value={metric.value}
                            onChange={(e) => {
                              const updatedMetrics = [...data.keyMetrics]
                              const value = isNaN(Number(e.target.value))
                                ? e.target.value
                                : Number(e.target.value)
                              updatedMetrics[index] = { ...metric, value }
                              updateNestedData(['keyMetrics'], updatedMetrics)
                            }}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Suffix</label>
                          <Input
                            value={metric.suffix || ''}
                            onChange={(e) => {
                              const updatedMetrics = [...data.keyMetrics]
                              updatedMetrics[index] = { ...metric, suffix: e.target.value }
                              updateNestedData(['keyMetrics'], updatedMetrics)
                            }}
                            placeholder="M, K, %"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Subtitle</label>
                        <Input
                          value={metric.subtitle || ''}
                          onChange={(e) => {
                            const updatedMetrics = [...data.keyMetrics]
                            updatedMetrics[index] = { ...metric, subtitle: e.target.value }
                            updateNestedData(['keyMetrics'], updatedMetrics)
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Slides Editor (for presentation page) */}
        {activeSection === 'presentation' && data.slides && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Presentation className="w-5 h-5" />
                <span>Presentation Slides</span>
              </CardTitle>
              <CardDescription>Edit the content and layout of each slide</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {data.slides.map((slide: any, index: number) => (
                <div key={slide.id} className="p-6 border rounded-lg bg-muted/20">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-lg">
                      Slide {slide.id}: {slide.title}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {slide.layout}
                      </Badge>
                      {slide.chartType && (
                        <Badge variant="secondary" className="text-xs">
                          {slide.chartType} chart
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Title</label>
                      <Input
                        value={slide.title || ''}
                        onChange={(e) => {
                          const updatedSlides = [...data.slides]
                          updatedSlides[index] = { ...slide, title: e.target.value }
                          updateNestedData(['slides'], updatedSlides)
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Layout</label>
                      <Select
                        value={slide.layout}
                        onValueChange={(value) => {
                          const updatedSlides = [...data.slides]
                          updatedSlides[index] = { ...slide, layout: value }
                          updateNestedData(['slides'], updatedSlides)
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="title">Title Slide</SelectItem>
                          <SelectItem value="content">Content Slide</SelectItem>
                          <SelectItem value="chart">Chart Slide</SelectItem>
                          <SelectItem value="metrics">Metrics Slide</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-2">Content</label>
                    <Textarea
                      className="min-h-[120px]"
                      value={slide.content || ''}
                      onChange={(e) => {
                        const updatedSlides = [...data.slides]
                        updatedSlides[index] = { ...slide, content: e.target.value }
                        updateNestedData(['slides'], updatedSlides)
                      }}
                      placeholder="Enter slide content (use \n for line breaks, • for bullets)"
                    />
                  </div>

                  {slide.layout === 'chart' && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2">Chart Type</label>
                      <Select
                        value={slide.chartType || 'bar'}
                        onValueChange={(value) => {
                          const updatedSlides = [...data.slides]
                          updatedSlides[index] = { ...slide, chartType: value }
                          updateNestedData(['slides'], updatedSlides)
                        }}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bar">Bar Chart</SelectItem>
                          <SelectItem value="line">Line Chart</SelectItem>
                          <SelectItem value="pie">Pie Chart</SelectItem>
                          <SelectItem value="area">Area Chart</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {slide.layout === 'metrics' && slide.data && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2">Metrics</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {slide.data.map((metric: any, metricIndex: number) => (
                          <div key={metricIndex} className="p-3 bg-background border rounded">
                            <div className="space-y-2">
                              <Input
                                placeholder="Label"
                                value={metric.label || ''}
                                onChange={(e) => {
                                  const updatedSlides = [...data.slides]
                                  const updatedData = [...slide.data]
                                  updatedData[metricIndex] = { ...metric, label: e.target.value }
                                  updatedSlides[index] = { ...slide, data: updatedData }
                                  updateNestedData(['slides'], updatedSlides)
                                }}
                              />
                              <Input
                                placeholder="Value"
                                value={metric.value || ''}
                                onChange={(e) => {
                                  const updatedSlides = [...data.slides]
                                  const updatedData = [...slide.data]
                                  updatedData[metricIndex] = { ...metric, value: e.target.value }
                                  updatedSlides[index] = { ...slide, data: updatedData }
                                  updateNestedData(['slides'], updatedSlides)
                                }}
                              />
                              <Input
                                placeholder="Icon (e.g., Users, Euro)"
                                value={metric.icon || ''}
                                onChange={(e) => {
                                  const updatedSlides = [...data.slides]
                                  const updatedData = [...slide.data]
                                  updatedData[metricIndex] = { ...metric, icon: e.target.value }
                                  updatedSlides[index] = { ...slide, data: updatedData }
                                  updateNestedData(['slides'], updatedSlides)
                                }}
                              />
                              <Input
                                placeholder="Color class (e.g., text-blue-600)"
                                value={metric.color || ''}
                                onChange={(e) => {
                                  const updatedSlides = [...data.slides]
                                  const updatedData = [...slide.data]
                                  updatedData[metricIndex] = { ...metric, color: e.target.value }
                                  updatedSlides[index] = { ...slide, data: updatedData }
                                  updateNestedData(['slides'], updatedSlides)
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Generic JSON Editor for Advanced Editing */}
        <Card>
          <CardHeader>
            <CardTitle>Advanced JSON Editor</CardTitle>
            <CardDescription>
              Edit the raw JSON data for this page. Be careful with formatting!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              className="font-mono text-sm min-h-[400px]"
              value={JSON.stringify(data, null, 2)}
              onChange={(e) => {
                try {
                  const parsed = JSON.parse(e.target.value)
                  setFormData(parsed)
                } catch (error) {
                  // Invalid JSON, don't update
                  console.warn('Invalid JSON:', error)
                }
              }}
            />
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gradient-warm p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Settings className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
              <p className="text-muted-foreground">Edit investor platform content</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge
              variant="secondary"
              className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
            >
              🔒 Admin Access
            </Badge>
            <Badge variant="outline" className="text-xs">
              {process.env.NODE_ENV === 'development' ? 'Development Mode' : 'Production'}
            </Badge>
          </div>
        </div>

        {/* Page Selector */}
        <div className="mb-8">
          <Select value={activeSection} onValueChange={(value) => setActiveSection(value as any)}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a page to edit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overview">📊 Overview</SelectItem>
              {pages.map((page) => (
                <SelectItem key={page.key} value={page.key}>
                  {page.badge && `🏆 `}
                  {page.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Content */}
        {activeSection === 'overview' && (
          <Card>
            <CardHeader>
              <CardTitle>Platform Overview</CardTitle>
              <CardDescription>
                {COMPANY_CONFIG.adminDescription}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pages.map((page) => (
                  <Card
                    key={page.key}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setActiveSection(page.key)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <page.icon className="w-6 h-6 text-primary shrink-0" />
                          <div>
                            <h3 className="font-semibold">{page.title}</h3>
                            <p className="text-sm text-muted-foreground">{page.description}</p>
                          </div>
                        </div>
                        {page.badge && (
                          <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                            {page.badge}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeSection !== 'overview' && renderPageEditor()}
      </div>
    </AdminGuard>
  )
}

export default function AdminPage() {
  return (
    <ErrorBoundary>
      <QueryErrorBoundary>
        <AdminPageContent />
      </QueryErrorBoundary>
    </ErrorBoundary>
  )
}
