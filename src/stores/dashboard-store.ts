'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface DashboardFilters {
  dateRange: {
    from: Date | null
    to: Date | null
  }
  countries: string[]
  metrics: string[]
  viewType: 'overview' | 'detailed' | 'comparison'
  timeframe: 'week' | 'month' | 'quarter' | 'year'
}

export interface DashboardSelections {
  selectedCountries: string[]
  selectedMetrics: string[]
  selectedCharts: string[]
  comparisonMode: boolean
  focusedMetric: string | null
}

export interface DashboardState {
  filters: DashboardFilters
  selections: DashboardSelections

  // UI state
  isFiltersExpanded: boolean
  isChartFullscreen: boolean
  fullscreenChart: string | null

  // Layout state
  chartLayout: 'grid' | 'vertical' | 'horizontal'
  chartSize: 'small' | 'medium' | 'large'
  showLegend: boolean
  showTooltips: boolean
}

export interface DashboardActions {
  // Filter actions
  setDateRange: (from: Date | null, to: Date | null) => void
  setCountries: (countries: string[]) => void
  addCountry: (country: string) => void
  removeCountry: (country: string) => void
  setMetrics: (metrics: string[]) => void
  addMetric: (metric: string) => void
  removeMetric: (metric: string) => void
  setViewType: (viewType: DashboardFilters['viewType']) => void
  setTimeframe: (timeframe: DashboardFilters['timeframe']) => void

  // Selection actions
  setSelectedCountries: (countries: string[]) => void
  setSelectedMetrics: (metrics: string[]) => void
  setSelectedCharts: (charts: string[]) => void
  toggleComparisonMode: () => void
  setFocusedMetric: (metric: string | null) => void

  // UI actions
  toggleFiltersExpanded: () => void
  setFiltersExpanded: (expanded: boolean) => void
  setChartFullscreen: (chartId: string | null) => void
  toggleChartFullscreen: (chartId: string) => void

  // Layout actions
  setChartLayout: (layout: DashboardState['chartLayout']) => void
  setChartSize: (size: DashboardState['chartSize']) => void
  setShowLegend: (show: boolean) => void
  setShowTooltips: (show: boolean) => void

  // Bulk actions
  resetFilters: () => void
  resetSelections: () => void
  resetLayout: () => void
  resetAll: () => void

  // Preset actions
  applyPreset: (preset: Partial<DashboardState>) => void
  saveCurrentAsPreset: (name: string) => void
}

const initialFilters: DashboardFilters = {
  dateRange: {
    from: null,
    to: null,
  },
  countries: [],
  metrics: [],
  viewType: 'overview',
  timeframe: 'month',
}

const initialSelections: DashboardSelections = {
  selectedCountries: [],
  selectedMetrics: [],
  selectedCharts: [],
  comparisonMode: false,
  focusedMetric: null,
}

const initialState: DashboardState = {
  filters: initialFilters,
  selections: initialSelections,
  isFiltersExpanded: false,
  isChartFullscreen: false,
  fullscreenChart: null,
  chartLayout: 'grid',
  chartSize: 'medium',
  showLegend: true,
  showTooltips: true,
}

export const useDashboardStore = create<DashboardState & DashboardActions>()(
  persist(
    (set) => ({
      ...initialState,

      // Filter actions
      setDateRange: (from, to) =>
        set((state) => ({
          filters: { ...state.filters, dateRange: { from, to } },
        })),
      setCountries: (countries) =>
        set((state) => ({
          filters: { ...state.filters, countries },
        })),
      addCountry: (country) =>
        set((state) => ({
          filters: {
            ...state.filters,
            countries: [...state.filters.countries, country],
          },
        })),
      removeCountry: (country) =>
        set((state) => ({
          filters: {
            ...state.filters,
            countries: state.filters.countries.filter((c) => c !== country),
          },
        })),
      setMetrics: (metrics) =>
        set((state) => ({
          filters: { ...state.filters, metrics },
        })),
      addMetric: (metric) =>
        set((state) => ({
          filters: {
            ...state.filters,
            metrics: [...state.filters.metrics, metric],
          },
        })),
      removeMetric: (metric) =>
        set((state) => ({
          filters: {
            ...state.filters,
            metrics: state.filters.metrics.filter((m) => m !== metric),
          },
        })),
      setViewType: (viewType) =>
        set((state) => ({
          filters: { ...state.filters, viewType },
        })),
      setTimeframe: (timeframe) =>
        set((state) => ({
          filters: { ...state.filters, timeframe },
        })),

      // Selection actions
      setSelectedCountries: (selectedCountries) =>
        set((state) => ({
          selections: { ...state.selections, selectedCountries },
        })),
      setSelectedMetrics: (selectedMetrics) =>
        set((state) => ({
          selections: { ...state.selections, selectedMetrics },
        })),
      setSelectedCharts: (selectedCharts) =>
        set((state) => ({
          selections: { ...state.selections, selectedCharts },
        })),
      toggleComparisonMode: () =>
        set((state) => ({
          selections: {
            ...state.selections,
            comparisonMode: !state.selections.comparisonMode,
          },
        })),
      setFocusedMetric: (focusedMetric) =>
        set((state) => ({
          selections: { ...state.selections, focusedMetric },
        })),

      // UI actions
      toggleFiltersExpanded: () =>
        set((state) => ({
          isFiltersExpanded: !state.isFiltersExpanded,
        })),
      setFiltersExpanded: (isFiltersExpanded) => set({ isFiltersExpanded }),
      setChartFullscreen: (fullscreenChart) =>
        set({
          fullscreenChart,
          isChartFullscreen: fullscreenChart !== null,
        }),
      toggleChartFullscreen: (chartId) =>
        set((state) => ({
          fullscreenChart: state.fullscreenChart === chartId ? null : chartId,
          isChartFullscreen: state.fullscreenChart !== chartId,
        })),

      // Layout actions
      setChartLayout: (chartLayout) => set({ chartLayout }),
      setChartSize: (chartSize) => set({ chartSize }),
      setShowLegend: (showLegend) => set({ showLegend }),
      setShowTooltips: (showTooltips) => set({ showTooltips }),

      // Bulk actions
      resetFilters: () =>
        set({
          filters: initialFilters,
        }),
      resetSelections: () =>
        set({
          selections: initialSelections,
        }),
      resetLayout: () =>
        set({
          chartLayout: 'grid',
          chartSize: 'medium',
          showLegend: true,
          showTooltips: true,
        }),
      resetAll: () => set(initialState),

      // Preset actions
      applyPreset: (preset) =>
        set((state) => ({
          ...state,
          ...preset,
        })),
      saveCurrentAsPreset: (name) => {
        // This would typically save to localStorage or backend
        // For now, just log the preset
        console.log(`Saving preset "${name}":`, JSON.stringify({}))
      },
    }),
    {
      name: 'dashboard-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        filters: state.filters,
        selections: state.selections,
        chartLayout: state.chartLayout,
        chartSize: state.chartSize,
        showLegend: state.showLegend,
        showTooltips: state.showTooltips,
      }),
    }
  )
)

// Optimized selectors
export const useDashboardFilters = () => useDashboardStore((state) => state.filters)
export const useDashboardSelections = () => useDashboardStore((state) => state.selections)
export const useSelectedCountries = () =>
  useDashboardStore((state) => state.selections.selectedCountries)
export const useSelectedMetrics = () =>
  useDashboardStore((state) => state.selections.selectedMetrics)
export const useChartLayout = () => useDashboardStore((state) => state.chartLayout)
export const useIsFiltersExpanded = () => useDashboardStore((state) => state.isFiltersExpanded)
export const useFullscreenChart = () => useDashboardStore((state) => state.fullscreenChart)
