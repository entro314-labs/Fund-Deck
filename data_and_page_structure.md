# Data-Driven Conversion Handoff Documentation

## Overview
This document provides detailed instructions for converting the remaining MyRoomie investor platform pages from static hardcoded content to a fully data-driven system with JSON data files and admin editing capabilities.

## System Architecture

### 1. **Data Layer Structure**
```
data/
├── pages/
│   ├── dashboard.json          ✅ COMPLETED
│   ├── financial-model.json    ✅ COMPLETED
│   ├── investor-package.json   ✅ COMPLETED
│   ├── exit-strategy.json     ✅ COMPLETED
│   ├── strategic-plan.json     ✅ COMPLETED
│   ├── executive-summary.json  ✅ COMPLETED
│   ├── market-analysis.json    ✅ COMPLETED
│   ├── product-overview.json   ✅ COMPLETED
│   ├── one-pager.json         ✅ COMPLETED
│   ├── risk-assessment.json   ✅ COMPLETED
│   ├── growth-strategy.json   ✅ COMPLETED
│   └── milestones.json        ✅ COMPLETED
└── shared/
    └── navigation.json         TODO (future enhancement)
```

### 2. **API Layer**
- **Location**: `/src/app/api/data/[...path]/route.ts` ✅ COMPLETED
- **Endpoints**:
  - `GET /api/data/pages/{page-name}` - Fetch page data
  - `POST /api/data/pages/{page-name}` - Save page data
- **Features**: Auto-creates directories, pretty JSON formatting, error handling

### 3. **Data Loading Hook**
- **Location**: `/src/hooks/use-data.ts` ✅ COMPLETED
- **Usage**: `const { data, loading, error, update } = useData<DataType>('pages/page-name')`
- **Features**: Loading states, error handling, real-time updates

### 4. **TypeScript Interfaces**
- **Location**: `/src/types/data.ts` ✅ COMPLETED
- **Pattern**: Each page has dedicated interfaces (e.g., `DashboardData`, `FinancialModelData`, `InvestorPackageData`)

### 5. **Admin Interface**
- **Location**: `/src/app/admin/page.tsx` ✅ BASIC VERSION COMPLETED
- **Access**: `http://localhost:3000/admin`
- **Features**: Real-time editing, save/discard, page switching

---

## Page Conversion Process

### **Step-by-Step Conversion Guide**

#### **Phase 1: Data Analysis & Extraction**

1. **Analyze Current Page Structure**
   - Read the existing page file (e.g., `/src/app/strategic-plan/page.tsx`)
   - Identify all hardcoded data arrays, objects, and constants
   - Document component types: metrics, charts, tables, text sections, timelines, etc.
   - Note any special styling, badges, icons, or interactive elements

2. **Create JSON Data File**
   - Create `/data/pages/{page-name}.json`
   - Structure data with consistent patterns:
     ```json
     {
       "meta": {
         "title": "Page Title",
         "subtitle": "Page description",
         "badge": "Optional badge",
         "date": "Optional date",
         "exportButtonText": "Optional export button"
       },
       // ... page-specific data sections
     }
     ```

#### **Phase 2: TypeScript Interface Design**

3. **Create Data Interfaces**
   - Add interfaces to `/src/types/data.ts`
   - Follow naming convention: `{PageName}Data` (e.g., `StrategicPlanData`)
   - Include all data structures, nested objects, and arrays
   - Use proper TypeScript types and unions where needed
   - Add any missing `IconType` entries

#### **Phase 3: Page Conversion**

4. **Convert Page Component**
   - Import required dependencies:
     ```typescript
     import { useData } from "../../hooks/use-data"
     import { PageNameData } from "../../types/data"
     ```
   - Replace hardcoded data with hook: `const { data, loading, error } = useData<PageNameData>('pages/page-name')`
   - Add loading and error states
   - Update all JSX to use `data.fieldName` instead of hardcoded values
   - Ensure icon mapping includes all needed icons

5. **Icon Management**
   - Add missing icons to `IconType` in `/src/types/data.ts`
   - Update icon mapping in converted pages
   - Import new icons from `lucide-react`

#### **Phase 4: Testing & Validation**

6. **Test Conversion**
   - Run dev server: `pnpm run dev`
   - Navigate to converted page
   - Verify loading states work
   - Confirm page looks identical to original
   - Test responsive design
   - Check all interactive elements

---

## Detailed Conversion Examples

### **Example: Converting a Metrics Section**

**Before (Static):**
```typescript
const keyMetrics = [
  {
    title: "Total Revenue",
    value: 162.8,
    prefix: "€",
    suffix: "M",
    subtitle: "by 2031",
    icon: Euro,
    color: "text-success"
  }
]

// In JSX:
{keyMetrics.map((metric) => (
  <div key={metric.title}>
    <IconComponent className={metric.color} />
    <p>{metric.prefix}{metric.value}{metric.suffix}</p>
    <p>{metric.subtitle}</p>
  </div>
))}
```

**After (Data-Driven):**
```json
// In JSON file:
{
  "keyMetrics": [
    {
      "id": "total-revenue",
      "title": "Total Revenue",
      "value": 162.8,
      "prefix": "",
      "suffix": "€M",
      "subtitle": "by 2031",
      "icon": "Euro",
      "color": "text-success"
    }
  ]
}
```

```typescript
// In component:
{data.keyMetrics.map((metric) => {
  const IconComponent = iconMap[metric.icon]
  return (
    <div key={metric.id}>
      <IconComponent className={metric.color} />
      <p>{(metric.prefix || '')}{metric.value}{(metric.suffix || '')}</p>
      <p>{metric.subtitle}</p>
    </div>
  )
})}
```

### **Example: Converting Charts**

**Before:**
```typescript
const chartData = [
  { year: "2025", value: 100 },
  { year: "2026", value: 200 }
]
```

**After:**
```json
{
  "charts": {
    "growthChart": {
      "id": "growth-chart",
      "title": "Growth Chart",
      "description": "Revenue growth over time",
      "type": "line",
      "data": [
        { "year": "2025", "value": 100 },
        { "year": "2026", "value": 200 }
      ]
    }
  }
}
```

### **Example: Converting Tables**

**Before:**
```typescript
const tableData = [
  { segment: "B2C", cac: 30, ltv: 210 }
]
```

**After:**
```json
{
  "tableSection": {
    "title": "Unit Economics",
    "description": "Cost and value analysis",
    "headers": ["Segment", "CAC", "LTV"],
    "data": [
      { "segment": "B2C", "cac": 30, "ltv": 210 }
    ]
  }
}
```

---

## Remaining Pages Analysis


---

## Admin Interface Expansion

### **Current Admin Features** ✅ COMPLETED
- Financial Model editing (metrics, charts, tables)
- Real-time data updates
- Save/discard functionality
- Basic page switching

### **Required Admin Enhancements** ✅ COMPLETED
1. **Multi-Page Support**
   - Add tabs/navigation for all pages
   - Page-specific editing interfaces
   - Bulk save across pages

2. **Enhanced Editing Capabilities**
   - Rich text editing for longer content
   - Chart data table editing
   - Image upload and management
   - Drag-and-drop reordering

3. **Advanced Features**
   - Export/import functionality
   - Version history
   - Preview mode
   - Validation and error checking

---

## Quality Assurance Checklist

### **For Each Converted Page:**
- [ ] JSON data file created with all required fields
- [ ] TypeScript interfaces defined
- [ ] Page component uses `useData` hook
- [ ] Loading and error states implemented
- [ ] All icons properly mapped
- [ ] Responsive design maintained
- [ ] All interactive elements work
- [ ] Data flows correctly from JSON to UI
- [ ] Page build succeeds without errors
- [ ] Visual appearance identical to original

### **System-Wide Testing:**
- [ ] All pages load data successfully
- [ ] Admin interface can edit all pages
- [ ] API endpoints handle all pages
- [ ] No TypeScript errors
- [ ] Build process completes successfully
- [ ] Performance is acceptable

---

## Technical Notes & Patterns

### **Icon Management Pattern**
```typescript
// Always use this pattern for icons
const iconMap: Record<IconType, any> = {
  TrendingUp, Euro, Users, Target,
  // ... add all required icons
}

// In JSX:
const IconComponent = iconMap[item.icon]
<IconComponent className={`w-5 h-5 ${item.color}`} />
```

### **Data Loading Pattern**
```typescript
// Standard loading pattern for all pages
const { data, loading, error } = useData<PageDataType>('pages/page-name')

if (loading) return <LoadingSpinner />
if (error || !data) return <ErrorMessage />

return <PageContent data={data} />
```

### **JSON Structure Pattern**
```json
{
  "meta": { /* page metadata */ },
  "mainSection": [ /* arrays for repeating items */ ],
  "complexSection": {
    "title": "Section Title",
    "items": [ /* nested data */ ]
  }
}
```

---
