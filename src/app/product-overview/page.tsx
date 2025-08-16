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
import { useDataQuery } from '../../hooks/use-data-query'
import { ErrorBoundary, QueryErrorBoundary } from '../../components/error-boundary'
import type { ProductOverviewData, IconType } from '../../types/data'

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

export default function ProductOverviewPage() {
  const { data, loading, error } = useDataQuery<ProductOverviewData>('pages/product-overview')

  if (loading) {
    return (
      <div className="min-h-screen p-6 lg:p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading product overview...</p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen p-6 lg:p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-2">Error loading product overview</p>
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
              <Rocket className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold text-foreground">{data.meta.title}</h1>
                <div className="flex items-center space-x-2 mt-1">
                  {data.meta.badge && (
                    <Badge variant="secondary" className="bg-accent/10 text-accent">
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

      {/* Key Product Metrics */}
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

      {/* Technology Stack */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">{data.technologyStack.title}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {data.technologyStack.categories.map((stack) => {
            const IconComponent = iconMap[stack.icon]
            return (
              <Card key={stack.id} className="group hover:shadow-warm transition-all duration-200">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{stack.category}</CardTitle>
                      <CardDescription>{stack.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {stack.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Core Product Features */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">{data.productFeatures.title}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {data.productFeatures.features.map((feature) => {
            const IconComponent = iconMap[feature.icon]
            return (
              <Card
                key={feature.id}
                className="group hover:shadow-warm transition-all duration-200"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-muted/50">
                        <IconComponent className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{feature.title}</CardTitle>
                      </div>
                    </div>
                    <Badge
                      variant={
                        feature.status === 'Live'
                          ? 'default'
                          : feature.status === 'Development'
                            ? 'secondary'
                            : 'outline'
                      }
                    >
                      {feature.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{feature.description}</CardDescription>
                  <div className="space-y-1">
                    {feature.metrics.map((metric, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-3 h-3 text-success" />
                        <span className="text-xs text-muted-foreground">{metric}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Product Roadmap */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>{data.productRoadmap.title}</span>
          </CardTitle>
          <CardDescription>{data.productRoadmap.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {data.productRoadmap.items.map((item, index) => (
              <div key={item.id} className="relative">
                {index < data.productRoadmap.items.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-px bg-border" />
                )}
                <div className="flex items-start space-x-4">
                  <div
                    className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                      item.status === 'In Progress'
                        ? 'bg-primary'
                        : item.status === 'Planned'
                          ? 'bg-success'
                          : 'bg-muted'
                    }`}
                  >
                    <span
                      className={`text-sm font-bold ${
                        item.status === 'Future' ? 'text-muted-foreground' : 'text-white'
                      }`}
                    >
                      Q{item.quarter.slice(-1)}
                    </span>
                  </div>
                  <div className="flex-1 bg-muted/50 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="text-lg font-semibold">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.quarter}</p>
                      </div>
                      <Badge
                        variant={
                          item.status === 'In Progress'
                            ? 'default'
                            : item.status === 'Planned'
                              ? 'secondary'
                              : 'outline'
                        }
                      >
                        {item.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.features.map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Technical Advantages */}
      <Card className="bg-muted/50 border-dashed">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5" />
            <span>{data.technicalAdvantages.title}</span>
          </CardTitle>
          <CardDescription>{data.technicalAdvantages.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.technicalAdvantages.categories.map((category) => (
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
