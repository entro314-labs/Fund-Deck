'use client'
import type React from 'react'
import { worldMill } from '@react-jvectormap/world'
import dynamic from 'next/dynamic'

const VectorMap = dynamic(() => import('@react-jvectormap/core').then((mod) => mod.VectorMap), {
  ssr: false,
})

interface Region {
  code: string
  country: string
  status: 'live' | 'launching' | 'planned' | 'future'
  coordinates: [number, number]
  projectedRevenue2031: number
  marketScore: number
  bpoEmployees: number
  phase: string
  population: number
}

interface EuropeanExpansionMapProps {
  regions: Region[]
}

type MarkerStyle = {
  initial: {
    fill: string
    r: number
  }
}

type Marker = {
  latLng: [number, number]
  name: string
  style?: {
    fill: string
    borderWidth: number
    borderColor: string
    stroke?: string
    strokeOpacity?: number
  }
}

const EuropeanExpansionMap: React.FC<EuropeanExpansionMapProps> = ({ regions }) => {
  // Create region style mapping
  const regionStyles: Record<string, string> = {}
  const regionData: Record<string, number> = {}

  regions.forEach((region) => {
    const countryCode = region.code.toLowerCase()
    regionData[countryCode] = region.marketScore

    switch (region.status) {
      case 'live':
        regionStyles[countryCode] = '#22c55e'
        break
      case 'launching':
        regionStyles[countryCode] = '#f59e0b'
        break
      case 'planned':
        regionStyles[countryCode] = '#3b82f6'
        break
      case 'future':
        regionStyles[countryCode] = '#9ca3af'
        break
      default:
        regionStyles[countryCode] = '#e5e7eb'
    }
  })

  // Create markers for revenue data
  const markers: Marker[] = regions.map((region) => ({
    latLng: region.coordinates,
    name: `${region.country} - €${(region.projectedRevenue2031 / 1000).toFixed(1)}M`,
    style: {
      fill: regionStyles[region.code.toLowerCase()] || '#e5e7eb',
      borderWidth: 2,
      borderColor: 'white',
      stroke: '#374151',
      strokeOpacity: 0.8,
    },
  }))

  return (
    <div className="w-full h-[400px] bg-muted/20 rounded-lg overflow-hidden">
      <VectorMap
        map={worldMill}
        backgroundColor="transparent"
        zoomOnScroll={false}
        zoomMax={3}
        zoomMin={1}
        zoomAnimate={true}
        zoomStep={1.5}
        focusOn={{
          x: 0.5,
          y: 0.5,
          scale: 2.5,
          animate: true,
        }}
        markerStyle={
          {
            initial: {
              fill: '#465FFF',
              r: 6,
            },
          } as MarkerStyle
        }
        markersSelectable={false}
        markers={markers as Marker[]}
        regionStyle={{
          initial: {
            fill: '#e5e7eb',
            fillOpacity: 0.8,
            stroke: '#ffffff',
            strokeWidth: 1,
            strokeOpacity: 1,
          },
          hover: {
            fillOpacity: 0.9,
            cursor: 'pointer',
          },
          selected: {
            fill: '#465FFF',
          },
          selectedHover: {},
        }}
        series={{
          regions: [
            {
              values: regionData,
              scale: Object.values(regionStyles),
              normalizeFunction: 'polynomial',
              attribute: 'fill',
            },
          ],
        }}
        onRegionTipShow={(_e: any, el: any, code: string) => {
          const region = regions.find((r) => r.code.toLowerCase() === code.toLowerCase())
          if (region) {
            el.html(`
              <div style="background: white; padding: 8px; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); font-size: 12px;">
                <strong>${region.country}</strong><br/>
                Status: ${region.status}<br/>
                2031 Revenue: €${(region.projectedRevenue2031 / 1000).toFixed(1)}M<br/>
                Market Score: ${region.marketScore}/100<br/>
                BPO Employees: ${region.bpoEmployees.toLocaleString()}
              </div>
            `)
          }
        }}
        onMarkerTipShow={(_e: any, el: any, code: string) => {
          const regionIndex = parseInt(code) || 0
          const region = regions[regionIndex]
          if (region) {
            el.html(`
              <div style="background: white; padding: 8px; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); font-size: 12px;">
                <strong>${region.country}</strong><br/>
                Phase: ${region.phase}<br/>
                2031 Revenue: €${(region.projectedRevenue2031 / 1000).toFixed(1)}M<br/>
                Population: ${region.population.toFixed(1)}M
              </div>
            `)
          }
        }}
      />
    </div>
  )
}

export default EuropeanExpansionMap
