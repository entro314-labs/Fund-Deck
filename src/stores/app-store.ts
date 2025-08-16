'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface AppState {
  // Theme preferences
  theme: 'light' | 'dark' | 'system'
  sidebarCollapsed: boolean

  // User preferences
  preferences: {
    autoRefresh: boolean
    refreshInterval: number
    defaultView: 'grid' | 'list'
    compactMode: boolean
    showWelcomeScreen: boolean
  }

  // App settings
  settings: {
    enableNotifications: boolean
    enableSounds: boolean
    language: string
    timezone: string
  }
}

export interface AppActions {
  // Theme actions
  setTheme: (theme: AppState['theme']) => void
  setSidebarCollapsed: (collapsed: boolean) => void
  toggleSidebar: () => void

  // Preference actions
  updatePreferences: (preferences: Partial<AppState['preferences']>) => void
  setAutoRefresh: (enabled: boolean) => void
  setRefreshInterval: (interval: number) => void
  setDefaultView: (view: 'grid' | 'list') => void
  setCompactMode: (enabled: boolean) => void
  setShowWelcomeScreen: (show: boolean) => void

  // Settings actions
  updateSettings: (settings: Partial<AppState['settings']>) => void
  setNotifications: (enabled: boolean) => void
  setSounds: (enabled: boolean) => void
  setLanguage: (language: string) => void
  setTimezone: (timezone: string) => void

  // Reset actions
  resetPreferences: () => void
  resetSettings: () => void
  resetAll: () => void
}

const initialState: AppState = {
  theme: 'system',
  sidebarCollapsed: false,
  preferences: {
    autoRefresh: true,
    refreshInterval: 300000, // 5 minutes
    defaultView: 'grid',
    compactMode: false,
    showWelcomeScreen: true,
  },
  settings: {
    enableNotifications: true,
    enableSounds: true,
    language: 'en',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  },
}

export const useAppStore = create<AppState & AppActions>()(
  persist(
    (set) => ({
      ...initialState,

      // Theme actions
      setTheme: (theme) => set({ theme }),
      setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

      // Preference actions
      updatePreferences: (newPreferences) =>
        set((state) => ({
          preferences: { ...state.preferences, ...newPreferences },
        })),
      setAutoRefresh: (autoRefresh) =>
        set((state) => ({
          preferences: { ...state.preferences, autoRefresh },
        })),
      setRefreshInterval: (refreshInterval) =>
        set((state) => ({
          preferences: { ...state.preferences, refreshInterval },
        })),
      setDefaultView: (defaultView) =>
        set((state) => ({
          preferences: { ...state.preferences, defaultView },
        })),
      setCompactMode: (compactMode) =>
        set((state) => ({
          preferences: { ...state.preferences, compactMode },
        })),
      setShowWelcomeScreen: (showWelcomeScreen) =>
        set((state) => ({
          preferences: { ...state.preferences, showWelcomeScreen },
        })),

      // Settings actions
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
      setNotifications: (enableNotifications) =>
        set((state) => ({
          settings: { ...state.settings, enableNotifications },
        })),
      setSounds: (enableSounds) =>
        set((state) => ({
          settings: { ...state.settings, enableSounds },
        })),
      setLanguage: (language) =>
        set((state) => ({
          settings: { ...state.settings, language },
        })),
      setTimezone: (timezone) =>
        set((state) => ({
          settings: { ...state.settings, timezone },
        })),

      // Reset actions
      resetPreferences: () =>
        set({
          preferences: initialState.preferences,
        }),
      resetSettings: () =>
        set({
          settings: initialState.settings,
        }),
      resetAll: () => set(initialState),
    }),
    {
      name: 'app-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: state.theme,
        sidebarCollapsed: state.sidebarCollapsed,
        preferences: state.preferences,
        settings: state.settings,
      }),
    }
  )
)

// Selectors for optimized component re-renders
export const useTheme = () => useAppStore((state) => state.theme)
export const useSidebarCollapsed = () => useAppStore((state) => state.sidebarCollapsed)
export const usePreferences = () => useAppStore((state) => state.preferences)
export const useSettings = () => useAppStore((state) => state.settings)
export const useAutoRefresh = () => useAppStore((state) => state.preferences.autoRefresh)
export const useRefreshInterval = () => useAppStore((state) => state.preferences.refreshInterval)
