'use client'

import { useState, useEffect } from 'react'
import { Button } from '../../../components/ui/button'
import { Card } from '../../../components/ui/card'
import { Badge } from '../../../components/ui/badge'
import {
  ChevronLeft,
  ChevronRight,
  Edit3,
  Save,
  X,
  TrendingUp,
  Users,
  Building,
  Moon,
  Sun,
  Menu,
  Maximize2,
  Minimize2,
  Home,
  Zap,
  Target,
  Star,
  AlertTriangle,
  CheckCircle,
  Euro,
  Calendar,
  Rocket,
  Shield,
  BarChart3,
  PieChart as PieChartIcon,
  Globe,
  Activity,
  Handshake,
  Search,
  Scale,
} from 'lucide-react'
import { Textarea } from '../../../components/ui/textarea'
import { Input } from '../../../components/ui/input'
import { useTheme } from 'next-themes'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
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
} from '../../../components/ui/chart'
import { useDataQuery } from '../../../hooks/use-data-query'
import { ErrorBoundary, QueryErrorBoundary } from '../../../components/error-boundary'
import type { PresentationData, SlideData, IconType } from '../../../types/data'

// Feature flags
const ENABLE_EDIT_MODE =
  process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_ENABLE_EDIT === 'true'

// Icon mapping for slide metrics
const iconMap: Record<IconType, any> = {
  TrendingUp,
  Users,
  Building,
  Euro,
  Rocket,
  Target,
  Star,
  Calendar,
  Shield,
  BarChart3,
  PieChart: PieChartIcon,
  Globe,
  Zap,
  AlertTriangle,
  CheckCircle,
  TrendingDown: TrendingUp,
  Building2: Building,
  FileText: Target,
  LogOut: X,
  Clock: Calendar,
  Eye: Target,
  Download: Target,
  ArrowRight: ChevronRight,
  Presentation: Target,
  Play: Target,
  ChevronRight: ChevronRight,
  MapPin: Target,
  Smartphone: Target,
  Brain: Target,
  Code: Target,
  Database: Target,
  Cloud: Target,
  Activity: Target,
  Handshake,
  Search,
  Scale,
}

export default function InvestorPresentationPage() {
  const { data, loading, error } = useDataQuery<PresentationData>('pages/presentation')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedSlide, setEditedSlide] = useState<SlideData | null>(null)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!data?.slides) return

      if (e.key === 'ArrowLeft' && currentSlide > 0) {
        setCurrentSlide(currentSlide - 1)
      } else if (e.key === 'ArrowRight' && currentSlide < data.slides.length - 1) {
        setCurrentSlide(currentSlide + 1)
      } else if (e.key === 'Escape') {
        if (isEditing) {
          setIsEditing(false)
          setEditedSlide(null)
        } else if (isFullscreen) {
          setIsFullscreen(false)
        }
      } else if (e.key === 'f' || e.key === 'F') {
        setIsFullscreen(!isFullscreen)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentSlide, data?.slides?.length, isEditing, isFullscreen])

  const nextSlide = () => {
    if (data?.slides && currentSlide < data.slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const startEditing = () => {
    if (!(ENABLE_EDIT_MODE && data?.slides)) return
    setEditedSlide({ ...data.slides[currentSlide] })
    setIsEditing(true)
  }

  const saveEdit = () => {
    if (editedSlide && data) {
      // Note: In a full implementation, you'd use the update function from useData
      // For now, just close the editing interface
      setIsEditing(false)
      setEditedSlide(null)
    }
  }

  const cancelEdit = () => {
    setIsEditing(false)
    setEditedSlide(null)
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const renderSlideContent = (slide: SlideData) => {
    const contentLines = slide.content.split('\n')

    switch (slide.layout) {
      case 'title':
        return (
          <div className="text-center flex flex-col justify-center h-full">
            <h1 className="text-5xl md:text-6xl font-bold text-gradient-sunset mb-8">
              {slide.title}
            </h1>
            <div className="space-y-4 text-xl md:text-2xl text-muted-foreground">
              {contentLines.map((line, index) => (
                <p key={index} className={index === 0 ? 'text-2xl md:text-3xl font-semibold' : ''}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        )

      case 'metrics':
        return (
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-center mb-8">{slide.title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {slide.data?.map((metric: any, index: number) => {
                const IconComponent = iconMap[metric.icon as IconType]
                return (
                  <Card key={index} className="p-6 text-center">
                    <IconComponent className={`w-8 h-8 mx-auto mb-4 ${metric.color}`} />
                    <div className="text-3xl font-bold mb-2">{metric.value}</div>
                    <div className="text-sm text-muted-foreground">{metric.label}</div>
                  </Card>
                )
              })}
            </div>
            <div className="space-y-4 text-lg">
              {contentLines.slice(1).map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>
        )

      case 'chart':
        return (
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-center mb-8">{slide.title}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4 text-lg">
                {contentLines.map((line, index) => (
                  <p key={index} className={line.startsWith('•') ? 'ml-4' : ''}>
                    {line}
                  </p>
                ))}
              </div>
              <div className="h-80">
                {slide.chartType === 'bar' && (
                  <ChartContainer
                    config={
                      {
                        percentage: {
                          label: 'Percentage',
                          color: 'hsl(var(--chart-1))',
                        },
                      } satisfies ChartConfig
                    }
                    className="h-full"
                  >
                    <BarChart data={slide.chartData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="hsl(var(--muted-foreground))"
                        strokeOpacity={0.2}
                      />
                      <XAxis
                        dataKey="metric"
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
                        content={
                          <ChartTooltipContent formatter={(value, name) => [`${value}%`, name]} />
                        }
                      />
                      <Bar
                        dataKey="percentage"
                        fill="var(--color-percentage)"
                        fillOpacity={0.8}
                        radius={[4, 4, 0, 0]}
                        className="drop-shadow-sm"
                      />
                      <ChartLegend content={<ChartLegendContent />} />
                    </BarChart>
                  </ChartContainer>
                )}
                {slide.chartType === 'line' && (
                  <ChartContainer
                    config={
                      {
                        revenue: {
                          label: 'Revenue',
                          color: 'hsl(var(--chart-1))',
                        },
                      } satisfies ChartConfig
                    }
                    className="h-full"
                  >
                    <LineChart data={slide.chartData}>
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
                        tickFormatter={(value) => `€${value}M`}
                      />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            labelFormatter={(label) => `Year ${label}`}
                            formatter={(value, name) => [
                              `€${Number(value).toLocaleString()}M`,
                              name,
                            ]}
                          />
                        }
                      />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="var(--color-revenue)"
                        strokeWidth={3}
                        dot={{ fill: 'var(--color-revenue)', strokeWidth: 2, r: 5 }}
                        className="drop-shadow-sm"
                      />
                      <ChartLegend content={<ChartLegendContent />} />
                    </LineChart>
                  </ChartContainer>
                )}
                {slide.chartType === 'pie' && (
                  <ChartContainer
                    config={
                      slide.chartData?.reduce(
                        (config: ChartConfig, item: any, index: number) => ({
                          ...config,
                          [item.name?.toLowerCase().replace(/\s+/g, '') || `item${index}`]: {
                            label: item.name || `Item ${index + 1}`,
                            color: `hsl(var(--chart-${(index % 5) + 1}))`,
                          },
                        }),
                        {}
                      ) || {}
                    }
                    className="h-full"
                  >
                    <PieChart>
                      <Pie
                        data={slide.chartData?.map((item: any, index: number) => ({
                          ...item,
                          fill: `hsl(var(--chart-${(index % 5) + 1}))`,
                        }))}
                        cx="50%"
                        cy="50%"
                        outerRadius={110}
                        dataKey="value"
                        nameKey="name"
                        className="drop-shadow-sm"
                      >
                        {slide.chartData?.map((entry: any, index: number) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={`hsl(var(--chart-${(index % 5) + 1}))`}
                          />
                        ))}
                      </Pie>
                      <ChartTooltip
                        content={
                          <ChartTooltipContent formatter={(value, name) => [`${value}%`, name]} />
                        }
                      />
                      <ChartLegend content={<ChartLegendContent />} />
                    </PieChart>
                  </ChartContainer>
                )}
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-center mb-8">{slide.title}</h2>
            <div className="space-y-4 text-lg max-w-4xl mx-auto">
              {contentLines.map((line, index) => (
                <p
                  key={index}
                  className={line.startsWith('•') || line.match(/^\d+\./) ? 'ml-4 font-medium' : ''}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        )
    }
  }

  const renderEditingInterface = () => {
    if (!editedSlide) return null

    return (
      <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Edit Slide {editedSlide.id}</h2>
            <div className="flex space-x-2">
              <Button onClick={saveEdit} size="sm">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button onClick={cancelEdit} variant="outline" size="sm">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <Input
                value={editedSlide.title}
                onChange={(e) => setEditedSlide({ ...editedSlide, title: e.target.value })}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Content</label>
              <Textarea
                value={editedSlide.content}
                onChange={(e) => setEditedSlide({ ...editedSlide, content: e.target.value })}
                className="w-full h-64"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Loading and error states
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-warm flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading presentation...</p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gradient-warm flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">Error loading presentation data</p>
          <p className="text-muted-foreground">{error?.message || 'Unknown error'}</p>
        </div>
      </div>
    )
  }

  const containerClass = isFullscreen
    ? 'fixed inset-0 bg-background z-50'
    : 'min-h-screen bg-gradient-warm'

  return (
    <div className={containerClass}>
      {/* Header - hidden in fullscreen mode */}
      {!isFullscreen && (
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <Badge variant="secondary" className="mb-2">
                {data.meta.badge}
              </Badge>
              <h1 className="text-2xl font-bold text-foreground">{data.meta.title}</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={toggleTheme}>
                {!mounted ? (
                  <Sun className="w-4 h-4" />
                ) : theme === 'dark' ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setIsFullscreen(true)}>
                <Maximize2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main presentation area */}
      <div className={`relative ${isFullscreen ? 'h-full' : 'h-[calc(100vh-120px)]'}`}>
        {/* Slide content */}
        <div className="h-full p-8 flex items-center justify-center">
          <div className="w-full max-w-6xl">{renderSlideContent(data.slides[currentSlide])}</div>
        </div>

        {/* Navigation controls */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
          <Button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            variant="outline"
            size="sm"
            className="bg-background/80 backdrop-blur-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <div className="flex items-center space-x-2 bg-background/80 backdrop-blur-sm rounded-lg px-4 py-2">
            <span className="text-sm font-medium">
              {currentSlide + 1} / {data.slides.length}
            </span>
            {ENABLE_EDIT_MODE && (
              <Button onClick={startEditing} variant="ghost" size="sm">
                <Edit3 className="w-4 h-4" />
              </Button>
            )}
            {isFullscreen && (
              <Button variant="ghost" size="sm" onClick={() => setIsFullscreen(false)}>
                <Minimize2 className="w-4 h-4" />
              </Button>
            )}
          </div>

          <Button
            onClick={nextSlide}
            disabled={currentSlide === data.slides.length - 1}
            variant="outline"
            size="sm"
            className="bg-background/80 backdrop-blur-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {data.slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-primary w-8' : 'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Editing interface */}
      {isEditing && renderEditingInterface()}

      {/* Keyboard shortcuts help */}
      {isFullscreen && (
        <div className="absolute top-4 right-4 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm rounded-lg p-2">
          <div>← → Navigate | F Fullscreen | ESC Exit</div>
        </div>
      )}
    </div>
  )
}
