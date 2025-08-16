'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface NotificationItem {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  timestamp: number
  read: boolean
  persistent?: boolean
  action?: {
    label: string
    url: string
  }
}

export interface ModalState {
  isOpen: boolean
  type: string | null
  data: any
  size: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export interface UIState {
  // Navigation state
  currentPage: string
  breadcrumbs: Array<{ label: string; href: string }>

  // Loading states
  globalLoading: boolean
  pageLoading: boolean
  actionLoading: Record<string, boolean>

  // Notification system
  notifications: NotificationItem[]
  maxNotifications: number

  // Modal system
  modal: ModalState

  // Toast system
  toasts: Array<{
    id: string
    type: 'info' | 'success' | 'warning' | 'error'
    message: string
    duration?: number
  }>

  // Search state
  searchQuery: string
  searchResults: any[]
  searchHistory: string[]
  isSearchOpen: boolean

  // Form states
  formStates: Record<
    string,
    {
      isDirty: boolean
      isSubmitting: boolean
      errors: Record<string, string>
      touched: Record<string, boolean>
    }
  >

  // Command palette
  commandPaletteOpen: boolean

  // Quick actions
  quickActionsOpen: boolean

  // Help system
  helpOpen: boolean
  tourActive: boolean
  tourStep: number

  // Performance monitoring
  pageLoadTime: number
  lastInteraction: number
}

export interface UIActions {
  // Navigation actions
  setCurrentPage: (page: string) => void
  setBreadcrumbs: (breadcrumbs: Array<{ label: string; href: string }>) => void

  // Loading actions
  setGlobalLoading: (loading: boolean) => void
  setPageLoading: (loading: boolean) => void
  setActionLoading: (action: string, loading: boolean) => void
  clearActionLoading: () => void

  // Notification actions
  addNotification: (notification: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => void
  removeNotification: (id: string) => void
  markNotificationRead: (id: string) => void
  markAllNotificationsRead: () => void
  clearNotifications: () => void

  // Modal actions
  openModal: (type: string, data?: any, size?: ModalState['size']) => void
  closeModal: () => void

  // Toast actions
  showToast: (
    type: 'info' | 'success' | 'warning' | 'error',
    message: string,
    duration?: number
  ) => void
  removeToast: (id: string) => void
  clearToasts: () => void

  // Search actions
  setSearchQuery: (query: string) => void
  setSearchResults: (results: any[]) => void
  addToSearchHistory: (query: string) => void
  clearSearchHistory: () => void
  setSearchOpen: (open: boolean) => void

  // Form actions
  setFormState: (formId: string, state: Partial<UIState['formStates'][string]>) => void
  setFormDirty: (formId: string, dirty: boolean) => void
  setFormSubmitting: (formId: string, submitting: boolean) => void
  setFormErrors: (formId: string, errors: Record<string, string>) => void
  setFormTouched: (formId: string, field: string, touched: boolean) => void
  clearFormState: (formId: string) => void

  // Command palette actions
  toggleCommandPalette: () => void
  setCommandPaletteOpen: (open: boolean) => void

  // Quick actions
  toggleQuickActions: () => void
  setQuickActionsOpen: (open: boolean) => void

  // Help system actions
  toggleHelp: () => void
  setHelpOpen: (open: boolean) => void
  startTour: () => void
  nextTourStep: () => void
  prevTourStep: () => void
  endTour: () => void

  // Performance actions
  setPageLoadTime: (time: number) => void
  updateLastInteraction: () => void

  // Bulk actions
  resetNotifications: () => void
  resetSearch: () => void
  resetForms: () => void
  resetAll: () => void
}

const initialState: UIState = {
  currentPage: '',
  breadcrumbs: [],
  globalLoading: false,
  pageLoading: false,
  actionLoading: {},
  notifications: [],
  maxNotifications: 5,
  modal: {
    isOpen: false,
    type: null,
    data: null,
    size: 'md',
  },
  toasts: [],
  searchQuery: '',
  searchResults: [],
  searchHistory: [],
  isSearchOpen: false,
  formStates: {},
  commandPaletteOpen: false,
  quickActionsOpen: false,
  helpOpen: false,
  tourActive: false,
  tourStep: 0,
  pageLoadTime: 0,
  lastInteraction: Date.now(),
}

export const useUIStore = create<UIState & UIActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Navigation actions
      setCurrentPage: (currentPage) => set({ currentPage }),
      setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs }),

      // Loading actions
      setGlobalLoading: (globalLoading) => set({ globalLoading }),
      setPageLoading: (pageLoading) => set({ pageLoading }),
      setActionLoading: (action, loading) =>
        set((state) => ({
          actionLoading: { ...state.actionLoading, [action]: loading },
        })),
      clearActionLoading: () => set({ actionLoading: {} }),

      // Notification actions
      addNotification: (notification) => {
        const id = `notification-${Date.now()}-${Math.random()}`
        const newNotification: NotificationItem = {
          ...notification,
          id,
          timestamp: Date.now(),
          read: false,
        }

        set((state) => {
          const notifications = [newNotification, ...state.notifications]
          return {
            notifications: notifications.slice(0, state.maxNotifications),
          }
        })
      },
      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),
      markNotificationRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
        })),
      markAllNotificationsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        })),
      clearNotifications: () => set({ notifications: [] }),

      // Modal actions
      openModal: (type, data = null, size = 'md') =>
        set({
          modal: { isOpen: true, type, data, size },
        }),
      closeModal: () =>
        set({
          modal: { isOpen: false, type: null, data: null, size: 'md' },
        }),

      // Toast actions
      showToast: (type, message, duration = 5000) => {
        const id = `toast-${Date.now()}-${Math.random()}`
        const toast = { id, type, message, duration }

        set((state) => ({
          toasts: [...state.toasts, toast],
        }))

        // Auto remove toast
        if (duration > 0) {
          setTimeout(() => {
            get().removeToast(id)
          }, duration)
        }
      },
      removeToast: (id) =>
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        })),
      clearToasts: () => set({ toasts: [] }),

      // Search actions
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setSearchResults: (searchResults) => set({ searchResults }),
      addToSearchHistory: (query) =>
        set((state) => {
          const history = [query, ...state.searchHistory.filter((q) => q !== query)]
          return { searchHistory: history.slice(0, 10) }
        }),
      clearSearchHistory: () => set({ searchHistory: [] }),
      setSearchOpen: (isSearchOpen) => set({ isSearchOpen }),

      // Form actions
      setFormState: (formId, newState) =>
        set((state) => ({
          formStates: {
            ...state.formStates,
            [formId]: { ...state.formStates[formId], ...newState },
          },
        })),
      setFormDirty: (formId, isDirty) =>
        set((state) => ({
          formStates: {
            ...state.formStates,
            [formId]: { ...state.formStates[formId], isDirty },
          },
        })),
      setFormSubmitting: (formId, isSubmitting) =>
        set((state) => ({
          formStates: {
            ...state.formStates,
            [formId]: { ...state.formStates[formId], isSubmitting },
          },
        })),
      setFormErrors: (formId, errors) =>
        set((state) => ({
          formStates: {
            ...state.formStates,
            [formId]: { ...state.formStates[formId], errors },
          },
        })),
      setFormTouched: (formId, field, touched) =>
        set((state) => ({
          formStates: {
            ...state.formStates,
            [formId]: {
              ...state.formStates[formId],
              touched: { ...state.formStates[formId]?.touched, [field]: touched },
            },
          },
        })),
      clearFormState: (formId) =>
        set((state) => {
          const { [formId]: removed, ...rest } = state.formStates
          return { formStates: rest }
        }),

      // Command palette actions
      toggleCommandPalette: () =>
        set((state) => ({ commandPaletteOpen: !state.commandPaletteOpen })),
      setCommandPaletteOpen: (commandPaletteOpen) => set({ commandPaletteOpen }),

      // Quick actions
      toggleQuickActions: () => set((state) => ({ quickActionsOpen: !state.quickActionsOpen })),
      setQuickActionsOpen: (quickActionsOpen) => set({ quickActionsOpen }),

      // Help system actions
      toggleHelp: () => set((state) => ({ helpOpen: !state.helpOpen })),
      setHelpOpen: (helpOpen) => set({ helpOpen }),
      startTour: () => set({ tourActive: true, tourStep: 0 }),
      nextTourStep: () => set((state) => ({ tourStep: state.tourStep + 1 })),
      prevTourStep: () => set((state) => ({ tourStep: Math.max(0, state.tourStep - 1) })),
      endTour: () => set({ tourActive: false, tourStep: 0 }),

      // Performance actions
      setPageLoadTime: (pageLoadTime) => set({ pageLoadTime }),
      updateLastInteraction: () => set({ lastInteraction: Date.now() }),

      // Bulk actions
      resetNotifications: () => set({ notifications: [] }),
      resetSearch: () =>
        set({
          searchQuery: '',
          searchResults: [],
          isSearchOpen: false,
        }),
      resetForms: () => set({ formStates: {} }),
      resetAll: () => set(initialState),
    }),
    {
      name: 'ui-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        searchHistory: state.searchHistory,
        tourActive: state.tourActive,
        tourStep: state.tourStep,
      }),
    }
  )
)

// Optimized selectors
export const useNotifications = () => useUIStore((state) => state.notifications)
export const useUnreadNotifications = () =>
  useUIStore((state) => state.notifications.filter((n) => !n.read))
export const useModal = () => useUIStore((state) => state.modal)
export const useToasts = () => useUIStore((state) => state.toasts)
export const useGlobalLoading = () => useUIStore((state) => state.globalLoading)
export const usePageLoading = () => useUIStore((state) => state.pageLoading)
export const useActionLoading = (action: string) =>
  useUIStore((state) => state.actionLoading[action])
export const useSearchState = () =>
  useUIStore((state) => ({
    query: state.searchQuery,
    results: state.searchResults,
    isOpen: state.isSearchOpen,
    history: state.searchHistory,
  }))
export const useFormState = (formId: string) => useUIStore((state) => state.formStates[formId])
export const useCommandPalette = () => useUIStore((state) => state.commandPaletteOpen)
export const useTourState = () =>
  useUIStore((state) => ({
    active: state.tourActive,
    step: state.tourStep,
  }))
