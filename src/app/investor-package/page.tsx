'use client'

import Link from 'next/link'
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
import { DownloadButton } from '../../components/download-button'
import type { InvestorPackageData, IconType } from '../../types/data'

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

export default function InvestorPackagePage() {
  const { data, loading, error } = useDataQuery<InvestorPackageData>('pages/investor-package')

  if (loading) {
    return (
      <div className="min-h-screen p-6 lg:p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading investor package...</p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen p-6 lg:p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-2">Error loading investor package</p>
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
              <Users className="w-8 h-8 text-primary" />
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
            <DownloadButton pageSlug="investor-package" fileType="pdf" variant="outline">
              {data.meta.exportButtonText}
            </DownloadButton>
          )}
        </div>
      </div>

      {/* Investment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {data.investmentOverview.map((metric) => {
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

      {/* Core Investment Materials */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Presentation className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">{data.coreDocuments.title}</h2>
          <Badge variant="outline" className="text-xs">
            {data.coreDocuments.badge}
          </Badge>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {data.coreDocuments.documents.map((doc, index) => {
            const IconComponent = iconMap[doc.icon]
            return (
              <Card key={doc.id} className="group hover:shadow-warm transition-all duration-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{doc.title}</CardTitle>
                        <Badge
                          variant="secondary"
                          className="bg-primary/10 text-primary text-xs mt-1"
                        >
                          {doc.badge}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{doc.description}</CardDescription>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-muted-foreground">
                      {doc.slides && <span>{doc.slides} slides • </span>}
                      <span>{doc.duration}</span>
                    </div>
                  </div>
                  <Button asChild className="w-full">
                    <Link href={doc.href}>
                      {index === 0 ? (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Start Presentation
                        </>
                      ) : (
                        <>
                          <FileText className="w-4 h-4 mr-2" />
                          View Document
                        </>
                      )}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Funding Timeline */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>{data.fundingRoadmap.title}</span>
          </CardTitle>
          <CardDescription>{data.fundingRoadmap.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.fundingRoadmap.rounds.map((round, index) => (
              <div key={round.id} className="relative">
                {index < data.fundingRoadmap.rounds.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-px bg-border" />
                )}
                <div className="flex items-start space-x-4">
                  <div
                    className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                      round.status === 'Active'
                        ? 'bg-primary'
                        : round.status === 'Planned'
                          ? 'bg-success'
                          : 'bg-muted'
                    }`}
                  >
                    <span
                      className={`text-sm font-bold ${
                        round.status === 'Future' ? 'text-muted-foreground' : 'text-white'
                      }`}
                    >
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1 bg-muted/50 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="text-lg font-semibold">{round.round}</h4>
                        <p className="text-sm text-muted-foreground">{round.timing}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-xl">{round.amount}</p>
                        <p className="text-sm text-muted-foreground">{round.valuation} valuation</p>
                      </div>
                      <Badge
                        variant={
                          round.status === 'Active'
                            ? 'default'
                            : round.status === 'Planned'
                              ? 'secondary'
                              : 'outline'
                        }
                        className="ml-4"
                      >
                        {round.status}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">{round.purpose}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Due Diligence Materials */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          {data.dueDiligenceMaterials.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.dueDiligenceMaterials.materials.map((material) => {
            const IconComponent = iconMap[material.icon]
            return (
              <Card
                key={material.id}
                className="group hover:shadow-warm transition-all duration-200"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-muted/50">
                        <IconComponent className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{material.title}</CardTitle>
                        <Badge variant="outline" className="text-xs mt-1">
                          {material.type}
                        </Badge>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{material.description}</CardDescription>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href={material.href}>View Analysis</Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Investment Highlights */}
      <Card className="bg-muted/50 border-dashed">
        <CardHeader>
          <CardTitle>{data.investmentHighlights.title}</CardTitle>
          <CardDescription>{data.investmentHighlights.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.investmentHighlights.sections.map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold text-foreground mb-3">{section.title}</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {section.points.map((point, pointIndex) => (
                    <li key={pointIndex}>• {point}</li>
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
