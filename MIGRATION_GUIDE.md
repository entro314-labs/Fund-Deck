# Data Management Migration Guide

This guide explains how to migrate from the old data management patterns to the new Zustand + TanStack Query implementation.

## ✅ What's Been Implemented

### 1. Zustand Stores

#### App Store (`src/stores/app-store.ts`)
- **Global app state** (theme, sidebar, user preferences)
- **Persistent settings** (notifications, language, timezone)
- **Auto-saves to localStorage**

```typescript
import { useAppStore, useTheme, useAutoRefresh } from '@/stores/app-store'

// Use individual selectors for better performance
const theme = useTheme()
const autoRefresh = useAutoRefresh()

// Or use the full store
const { setTheme, updatePreferences } = useAppStore()
```

#### Dashboard Store (`src/stores/dashboard-store.ts`)
- **Dashboard filters** (date range, countries, metrics)
- **User selections** (focused metrics, comparison mode)
- **UI state** (chart layout, fullscreen mode)

```typescript
import { useDashboardFilters, useSelectedCountries } from '@/stores/dashboard-store'

const filters = useDashboardFilters()
const selectedCountries = useSelectedCountries()
```

#### UI Store (`src/stores/ui-store.ts`)
- **Notifications system**
- **Modal management**
- **Form states**
- **Search history**
- **Tour/help system**

```typescript
import { useNotifications, useModal, useToasts } from '@/stores/ui-store'

const notifications = useNotifications()
const { openModal, closeModal } = useModal()
```

### 2. Enhanced TanStack Query Hooks

#### Data Query Hook (`src/hooks/use-data-query.ts`)
**Replaces:** `useData` hook
**Features:**
- Optimistic updates
- Better error handling
- Query invalidation
- Bulk operations
- Cache management

```typescript
import { useDataQuery, useDataMutation } from '@/hooks/use-data-query'

// Old way
const { data, loading, error, refetch, update } = useData('financial-model')

// New way
const { data, loading, error, refetch, invalidate } = useDataQuery('financial-model')
const { mutateAsync: updateData } = useDataMutation('financial-model')
```

#### Investor Access Hook (`src/hooks/use-investor-access-query.ts`)
**Replaces:** `useInvestorAccess` hook
**Features:**
- Mutations for validation
- Access monitoring
- Protected data cache management

```typescript
import { useInvestorAccess, useRequireInvestorAccess } from '@/hooks/use-investor-access-query'

// Enhanced version with mutations
const { 
  hasAccess, 
  validateCode, 
  revokeAccess,
  refreshAccess 
} = useInvestorAccess()

// For protected components
const { canAccess, shouldShowLogin } = useRequireInvestorAccess()
```

#### Enhanced Live Metrics (`src/hooks/use-enhanced-live-metrics.ts`)
**Enhances:** `useLiveMetrics` hook
**Features:**
- Background sync
- Performance monitoring
- Real-time subscriptions
- Advanced caching

```typescript
import { useEnhancedLiveMetrics } from '@/hooks/use-enhanced-live-metrics'

const {
  data,
  loading,
  forceRefresh,
  prefetchCountryData,
  enableBackgroundSync
} = useEnhancedLiveMetrics()
```

### 3. Error Boundaries

#### Main Error Boundary (`src/components/error-boundary.tsx`)
- **Global error catching**
- **Retry mechanisms**
- **Error reporting**
- **Specialized boundaries** for queries and async operations

```typescript
import { ErrorBoundary, QueryErrorBoundary } from '@/components/error-boundary'

// Wrap components prone to errors
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>

// Specialized for data fetching
<QueryErrorBoundary>
  <DataComponent />
</QueryErrorBoundary>
```

### 4. Enhanced Query Client

#### Query Provider (`src/components/query-client-provider.tsx`)
**Enhanced with:**
- Exponential backoff retry
- Smart error handling
- Development tools
- Global mutation error handling

## 🔄 Migration Steps

### Step 1: Update Component Imports

**Old:**
```typescript
import { useData } from '@/hooks/use-data'
import { useInvestorAccess } from '@/hooks/use-investor-access'
```

**New:**
```typescript
import { useDataQuery, useDataMutation } from '@/hooks/use-data-query'
import { useInvestorAccess } from '@/hooks/use-investor-access-query'
```

### Step 2: Replace State Management

**Old pattern:**
```typescript
const [theme, setTheme] = useState('light')
const [sidebarOpen, setSidebarOpen] = useState(false)
```

**New pattern:**
```typescript
import { useTheme, useSidebarCollapsed } from '@/stores/app-store'

const theme = useTheme()
const sidebarCollapsed = useSidebarCollapsed()
const { setTheme, toggleSidebar } = useAppStore()
```

### Step 3: Update Data Fetching

**Old:**
```typescript
const { data, loading, error, update } = useData('pages/financial-model')

const handleSave = async () => {
  const success = await update(newData)
  if (success) {
    // Handle success
  }
}
```

**New:**
```typescript
const { data, loading, error } = useDataQuery('pages/financial-model')
const { mutateAsync: updateData, loading: saving } = useDataMutation('pages/financial-model')

const handleSave = async () => {
  try {
    await updateData(newData)
    // Automatically invalidates and refetches
  } catch (error) {
    // Handle error
  }
}
```

### Step 4: Add Error Boundaries

Wrap route components and data-heavy components:

```typescript
// In your layout or page files
<ErrorBoundary>
  <QueryErrorBoundary>
    <YourDataComponent />
  </QueryErrorBoundary>
</ErrorBoundary>
```

## 📊 Performance Benefits

### Before
- Manual state management with useState/useEffect
- No caching between components
- Manual error handling
- No optimistic updates
- Duplicate API calls

### After
- ✅ **Persistent state** with Zustand
- ✅ **Smart caching** with TanStack Query
- ✅ **Automatic error boundaries**
- ✅ **Optimistic updates**
- ✅ **Request deduplication**
- ✅ **Background refetching**
- ✅ **DevTools integration**

## 🎯 Next Steps

1. **Gradually migrate components** from old hooks to new ones
2. **Update error handling** to use error boundaries
3. **Leverage new features** like optimistic updates and background sync
4. **Remove old hooks** once migration is complete
5. **Add real-time subscriptions** where needed

## 📚 Key Files

- `src/stores/` - Zustand stores
- `src/hooks/use-*-query.ts` - Enhanced TanStack Query hooks
- `src/components/error-boundary.tsx` - Error handling
- `src/components/query-client-provider.tsx` - Enhanced query client

## 🔍 Development Tools

- **React Query DevTools** - Available in development mode
- **Zustand DevTools** - Can be enabled in browser
- **Error boundaries** - Show detailed error information in development