# API Reference

<div align="center">

<svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18z" fill="#6366F1"/>
<path d="M12 8v5l4.25 2.52.77-1.28-3.52-2.09V8z" fill="#6366F1"/>
</svg>

**Complete API documentation for FundDeck**

All endpoints, hooks, and utilities for building with FundDeck.

</div>

---

## 🔗 API Endpoints

### Data Management API

FundDeck provides a RESTful API for managing page content and configuration data.

#### Base URL
```
/api/data/[...path]
```

#### Authentication
All write operations require admin authentication via Clerk.

#### GET /api/data/pages/[page]

Retrieve page data for a specific document type.

**Parameters:**
- `page` (string): The page identifier (e.g., `dashboard`, `financial-model`)

**Example Request:**
```bash
GET /api/data/pages/dashboard
```

**Example Response:**
```json
{
  "meta": {
    "title": "Dashboard",
    "subtitle": "Executive Overview & Key Metrics",
    "date": "2024-08-16"
  },
  "keyMetrics": [
    {
      "id": "monthly-revenue",
      "title": "Monthly Revenue",
      "value": 125000,
      "prefix": "€",
      "suffix": "",
      "subtitle": "30% growth MoM"
    }
  ],
  "sections": [
    {
      "id": "overview",
      "title": "Company Overview",
      "content": "Leading platform for shared living experiences..."
    }
  ]
}
```

**Supported Pages:**
- `dashboard` - Main dashboard metrics
- `financial-model` - Financial projections and models
- `strategic-plan` - Strategic planning documents
- `executive-summary` - Executive summary content
- `market-analysis` - Market research and analysis
- `product-overview` - Product and technical specifications
- `one-pager` - Concise company overview
- `risk-assessment` - Risk analysis and mitigation
- `growth-strategy` - Growth plans and strategies
- `milestones` - Timeline and milestone tracking
- `exit-strategy` - Exit planning and scenarios
- `investor-package` - Investor-specific materials
- `presentation` - Pitch deck slides and content

#### POST /api/data/pages/[page]

Update page data (Admin only).

**Authentication Required:** Yes (Clerk admin)

**Request Body:**
```json
{
  "meta": {
    "title": "Updated Title",
    "subtitle": "Updated subtitle"
  },
  "keyMetrics": [...],
  "sections": [...]
}
```

**Example Request:**
```bash
POST /api/data/pages/dashboard
Content-Type: application/json

{
  "meta": {
    "title": "Q4 Dashboard",
    "subtitle": "Year-end overview and projections"
  },
  "keyMetrics": [...]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully updated pages/dashboard",
  "timestamp": "2024-08-16T10:30:00.000Z"
}
```

### Error Responses

#### 400 Bad Request
```json
{
  "error": "Invalid file path"
}
```

#### 401 Unauthorized
```json
{
  "error": "Unauthorized - Authentication required"
}
```

#### 403 Forbidden
```json
{
  "error": "Forbidden - Admin access required for data modification"
}
```

#### 404 Not Found
```json
{
  "error": "Data file not found",
  "debug": {
    "filePath": "/path/to/file.json",
    "fileExists": false
  }
}
```

#### 422 Unprocessable Entity
```json
{
  "error": "Data validation failed",
  "validationError": "Invalid metric structure",
  "path": "pages/dashboard"
}
```

## 🪝 React Hooks

### useDataQuery

Hook for fetching page data with caching and error handling.

```typescript
import { useDataQuery } from '@/hooks/use-data-query';

function MyComponent() {
  const { data, loading, error } = useDataQuery<DashboardData>('pages/dashboard');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{data?.meta.title}</div>;
}
```

**Parameters:**
- `path` (string): API path relative to `/api/data/`
- `options` (object, optional):
  - `enabled` (boolean): Whether to execute the query
  - `refetchInterval` (number): Auto-refetch interval in milliseconds

**Returns:**
- `data`: The fetched data
- `loading`: Loading state boolean
- `error`: Error object if request failed
- `refetch`: Function to manually refetch data

### useDataMutation

Hook for updating page data with optimistic updates.

```typescript
import { useDataMutation } from '@/hooks/use-data-mutation';

function AdminPanel() {
  const { mutateAsync, loading } = useDataMutation<DashboardData>('pages/dashboard');

  const handleSave = async (updatedData: DashboardData) => {
    try {
      await mutateAsync(updatedData);
      showToast('success', 'Data saved successfully!');
    } catch (error) {
      showToast('error', 'Failed to save data');
    }
  };

  return (
    <button onClick={() => handleSave(data)} disabled={loading}>
      {loading ? 'Saving...' : 'Save Changes'}
    </button>
  );
}
```

**Parameters:**
- `path` (string): API path relative to `/api/data/`

**Returns:**
- `mutate`: Synchronous mutation function
- `mutateAsync`: Asynchronous mutation function (returns Promise)
- `loading`: Loading state boolean
- `error`: Error object if mutation failed

### useUIStore

Zustand store for UI state management.

```typescript
import { useUIStore } from '@/stores/ui-store';

function MyComponent() {
  const { showToast, darkMode, toggleDarkMode } = useUIStore();

  const handleSuccess = () => {
    showToast('success', 'Operation completed!');
  };

  return (
    <div>
      <button onClick={handleSuccess}>Show Success Toast</button>
      <button onClick={toggleDarkMode}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </div>
  );
}
```

**State:**
- `darkMode` (boolean): Current dark mode state
- `toasts` (array): Active toast notifications

**Actions:**
- `showToast(type, message)`: Display a toast notification
- `dismissToast(id)`: Dismiss a specific toast
- `toggleDarkMode()`: Toggle dark/light mode

## 📊 Data Types

### Core Data Interfaces

```typescript
// Base page metadata
interface PageMeta {
  title: string;
  subtitle?: string;
  date?: string;
  badge?: string;
  exportButtonText?: string;
}

// Metric data structure
interface Metric {
  id: string;
  title: string;
  value: number | string;
  prefix?: string;
  suffix?: string;
  subtitle?: string;
  color?: string;
  icon?: string;
}

// Document section
interface DocumentSection {
  id: string;
  title: string;
  content: string;
  order?: number;
}

// Chart data point
interface ChartDataPoint {
  name: string;
  value: number;
  color?: string;
  [key: string]: any;
}
```

### Page-Specific Types

```typescript
// Dashboard data structure
interface DashboardData {
  meta: PageMeta;
  keyMetrics: Metric[];
  sections: DocumentSection[];
  charts?: {
    revenue: ChartDataPoint[];
    users: ChartDataPoint[];
    growth: ChartDataPoint[];
  };
}

// Financial model data
interface FinancialModelData {
  meta: PageMeta;
  keyMetrics: Metric[];
  projections: {
    revenue: ChartDataPoint[];
    expenses: ChartDataPoint[];
    profit: ChartDataPoint[];
  };
  assumptions: {
    [key: string]: number | string;
  };
}

// Presentation slide data
interface PresentationSlide {
  id: string;
  title: string;
  layout: 'title' | 'content' | 'chart' | 'metrics';
  content?: string;
  chartType?: 'bar' | 'line' | 'pie' | 'area';
  data?: any[];
}

interface PresentationData {
  meta: PageMeta;
  slides: PresentationSlide[];
}
```

## 🛠️ Utility Functions

### Data Validation

```typescript
import { validateDataByPath } from '@/lib/validation';

// Validate data against schema
const validation = validateDataByPath('dashboard', data);
if (!validation.success) {
  console.error('Validation failed:', validation.error.message);
}
```

### Company Configuration

```typescript
import { 
  COMPANY_CONFIG, 
  getAdminEmails, 
  getCompanyName 
} from '@/lib/company-config';

// Get company information
const companyName = getCompanyName(); // "MyRoomie"
const adminEmails = getAdminEmails(); // ["admin@company.com"]
const supportEmail = COMPANY_CONFIG.supportEmail;
```

### Data Formatting

```typescript
import { formatMetricValue, formatCurrency } from '@/lib/utils';

// Format metric values
const formattedValue = formatMetricValue({
  value: 1500000,
  prefix: '€',
  suffix: 'M'
}); // "€1.5M"

// Format currency
const currency = formatCurrency(1234567, 'EUR'); // "€1,234,567"
```

## 🔐 Authentication Integration

### Admin Guard Component

```typescript
import AdminGuard from '@/components/admin-guard';

function AdminPage() {
  return (
    <AdminGuard>
      <div>This content is only visible to admins</div>
    </AdminGuard>
  );
}
```

### Checking Admin Status

```typescript
import { useUser } from '@clerk/nextjs';
import { getAdminEmails } from '@/lib/company-config';

function useIsAdmin() {
  const { user } = useUser();
  const adminEmails = getAdminEmails();
  
  return user?.primaryEmailAddress?.emailAddress 
    ? adminEmails.includes(user.primaryEmailAddress.emailAddress)
    : false;
}
```

## 📈 Chart Components

### Bar Chart

```typescript
import { BarChart } from '@/components/charts/bar-chart';

function MyChart() {
  const data = [
    { name: 'Jan', value: 100000 },
    { name: 'Feb', value: 120000 },
    { name: 'Mar', value: 140000 }
  ];

  return (
    <BarChart
      data={data}
      height={300}
      color="#6366F1"
      showGrid={true}
      showTooltip={true}
    />
  );
}
```

### Line Chart

```typescript
import { LineChart } from '@/components/charts/line-chart';

function GrowthChart() {
  return (
    <LineChart
      data={growthData}
      xKey="month"
      yKey="growth"
      color="#10B981"
      strokeWidth={2}
    />
  );
}
```

### Metric Display

```typescript
import { MetricCard } from '@/components/metric-card';

function MetricsGrid() {
  const metrics = [
    {
      id: 'revenue',
      title: 'Monthly Revenue',
      value: 125000,
      prefix: '€',
      subtitle: '15% growth'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {metrics.map(metric => (
        <MetricCard key={metric.id} metric={metric} />
      ))}
    </div>
  );
}
```

## 🎨 Styling System

### Design Tokens

FundDeck uses Tailwind CSS with a custom design system:

```typescript
// Theme colors
const colors = {
  primary: '#6366F1',    // Indigo
  success: '#10B981',    // Emerald  
  warning: '#F59E0B',    // Amber
  error: '#EF4444',      // Red
  muted: '#6B7280'       // Gray
};

// Component variants
const buttonVariants = {
  default: 'bg-primary text-white',
  secondary: 'bg-gray-100 text-gray-900',
  outline: 'border border-gray-300 bg-transparent'
};
```

### Custom CSS Classes

```css
/* Available utility classes */
.bg-gradient-warm {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.text-gradient {
  background: linear-gradient(90deg, #6366F1, #8B5CF6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

## 🚀 Performance Optimizations

### Data Fetching Best Practices

```typescript
// Use React Query for caching
const { data } = useDataQuery('pages/dashboard', {
  // Cache for 5 minutes
  staleTime: 5 * 60 * 1000,
  // Refetch on window focus
  refetchOnWindowFocus: true
});

// Prefetch related data
const queryClient = useQueryClient();
queryClient.prefetchQuery(['data', 'pages/financial-model']);
```

### Component Optimization

```typescript
// Memoize expensive calculations
const memoizedMetrics = useMemo(() => {
  return metrics.map(metric => ({
    ...metric,
    formattedValue: formatMetricValue(metric)
  }));
}, [metrics]);

// Lazy load heavy components
const ChartComponent = lazy(() => import('@/components/charts/advanced-chart'));
```

---

<div align="center">

**Need more help?**

[Configuration Guide](./configuration.md) • [Examples](./examples.md) • [Contributing](../CONTRIBUTING.md)

</div>