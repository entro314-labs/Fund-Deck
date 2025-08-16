# Warm Sunset Design System 2025

A comprehensive design system built around warm, cozy colors that evoke the feeling of a beautiful sunset. This system provides everything needed to create consistent, accessible, and delightful user experiences across all digital products and platforms.

## Table of Contents

1. [Brand Foundation](#brand-foundation)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Component Library](#component-library)
6. [Iconography](#iconography)
7. [Illustrations & Imagery](#illustrations--imagery)
8. [Motion & Animation](#motion--animation)
9. [Voice & Tone](#voice--tone)
10. [Accessibility Guidelines](#accessibility-guidelines)
11. [Implementation Guidelines](#implementation-guidelines)
12. [Design Tokens](#design-tokens)

---

## Brand Foundation

### Brand Values

**Warmth**: Creating comfortable, inviting digital spaces that feel like home
**Clarity**: Making interfaces intuitive and easy to understand without sacrificing beauty
**Balance**: Harmonizing aesthetics with functionality for optimal user experience
**Inclusivity**: Designing for diverse users with varying needs and accessibility requirements
**Consistency**: Maintaining coherent experiences across all touchpoints and platforms

### Brand Personality

- **Welcoming & Approachable**: Like a warm hug in digital form
- **Professional yet Comfortable**: Serious about quality, casual in approach
- **Thoughtful & Attentive**: Caring about every detail and user need
- **Modern & Timeless**: Contemporary design that won't feel dated
- **Calm & Reassuring**: Reducing anxiety and promoting focus

### Design Principles

1. **Human-Centered**: Every decision prioritizes user needs and well-being
2. **Purposeful**: Every element serves a clear function
3. **Harmonious**: Colors, typography, and spacing work together seamlessly
4. **Accessible**: Usable by everyone, regardless of ability
5. **Scalable**: Works across all devices and contexts
6. **Consistent**: Predictable patterns that users can learn and trust

---

## Color System

### Core Palette

#### Light Theme Colors

| Color Name | Hex | RGB | HSL | WCAG AA | Purpose |
|------------|-----|-----|-----|---------|---------|
| **Background** | `#FAF4F2` | `rgb(250, 244, 242)` | `hsl(24, 100%, 98%)` | ✅ | Primary background for pages and containers |
| **Foreground** | `#384242` | `rgb(56, 66, 66)` | `hsl(347, 8%, 22%)` | ✅ | Primary text color, high contrast |
| **Primary** | `#FA906E` | `rgb(250, 144, 110)` | `hsl(12, 100%, 69%)` | ✅ | Primary actions, highlights, focus states |
| **Secondary** | `#FDE6DE` | `rgb(253, 230, 222)` | `hsl(9, 100%, 96%)` | ✅ | Secondary UI elements, subtle backgrounds |
| **Accent** | `#F5BC5E` | `rgb(245, 188, 94)` | `hsl(26, 99%, 74%)` | ✅ | Accent elements, warnings, highlights |
| **Muted** | `#F5F1EB` | `rgb(245, 241, 235)` | `hsl(15, 100%, 96%)` | ✅ | Subtle backgrounds, disabled states |
| **Muted Text** | `#95726A` | `rgb(149, 114, 106)` | `hsl(6, 19%, 40%)` | ✅ | Secondary text, placeholders, hints |

#### Dark Theme Colors

| Color Name | Hex | RGB | HSL | WCAG AA | Purpose |
|------------|-----|-----|-----|---------|---------|
| **Background** | `#2A2023` | `rgb(42, 32, 35)` | `hsl(340, 14%, 15%)` | ✅ | Primary background for pages and containers |
| **Foreground** | `#C6D0F5` | `rgb(198, 208, 245)` | `hsl(221, 35%, 92%)` | ✅ | Primary text color, high contrast |
| **Primary** | `#FA906E` | `rgb(250, 144, 110)` | `hsl(12, 100%, 69%)` | ✅ | Primary actions, highlights, focus states |
| **Secondary** | `#403A40` | `rgb(64, 58, 64)` | `hsl(325, 9%, 25%)` | ✅ | Secondary UI elements, subtle backgrounds |
| **Accent** | `#F5BC5E` | `rgb(245, 188, 94)` | `hsl(26, 99%, 74%)` | ✅ | Accent elements, warnings, highlights |
| **Muted** | `#342D34` | `rgb(52, 45, 52)` | `hsl(324, 10%, 20%)` | ✅ | Subtle backgrounds, disabled states |
| **Muted Text** | `#B5A9AF` | `rgb(181, 169, 175)` | `hsl(22, 25%, 79%)` | ✅ | Secondary text, placeholders, hints |

### Semantic Colors

#### Status & Feedback Colors

| Purpose | Light Theme | Dark Theme | Usage |
|---------|-------------|------------|-------|
| **Success** | `#A6D18C` | `#A6D18C` | Success messages, positive actions, completed states |
| **Warning** | `#F4BC5F` | `#E5C890` | Warnings, caution messages, pending states |
| **Error** | `#E06053` | `#E78284` | Error messages, destructive actions, failed states |
| **Info** | `#6ECAD8` | `#89DCEB` | Information messages, help content, neutral notifications |

#### Interactive Colors

| State | Light Theme | Dark Theme | Usage |
|-------|-------------|------------|-------|
| **Link** | `#FA906E` | `#F594C1` | Hyperlinks, navigation elements |
| **Link Hover** | `#F5BC5E` | `#FA906E` | Hovered link states |
| **Focus** | `#FA906E` | `#FA906E` | Focus rings and indicators |
| **Selection** | `#FBD6B9` | `#626880` | Text selection, highlighted content |

### Color Usage Guidelines

#### Do's ✅
- Use Primary color for main CTAs and important interactive elements
- Use Secondary color for card backgrounds and subtle UI sections
- Use Accent color for warnings, highlights, and secondary CTAs
- Maintain sufficient contrast ratios (4.5:1 for normal text, 3:1 for large text)
- Use semantic colors consistently for their intended purposes
- Test colors with color-blind users and accessibility tools

#### Don'ts ❌
- Never use color alone to convey meaning
- Don't use Primary color for destructive actions
- Avoid using Success green for anything other than positive feedback
- Don't use colors outside the defined palette without approval
- Never compromise accessibility for aesthetic preferences

---

## Typography

### Font Families

#### Primary Font: Inter
```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
```
**Usage**: Body text, UI elements, headings, general interface text
**Characteristics**: Highly legible, modern, optimized for screens, excellent character spacing

#### Secondary Font: Source Serif Pro
```css
--font-secondary: 'Source Serif Pro', 'Times New Roman', Times, serif;
```
**Usage**: Article content, long-form reading, elegant headings, editorial content
**Characteristics**: Readable serif, professional appearance, good for extended reading

#### Monospace Font: Fira Code
```css
--font-mono: 'Fira Code', 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
```
**Usage**: Code snippets, technical content, data displays, terminal interfaces
**Characteristics**: Programming ligatures, clear character distinction, optimized for code

### Font Weights

```css
--font-weight-light: 300;
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
--font-weight-extrabold: 800;
```

### Type Scale

Based on a modular scale with a ratio of 1.25 (major third):

```css
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-2xl: 1.5rem;    /* 24px */
--font-size-3xl: 1.875rem;  /* 30px */
--font-size-4xl: 2.25rem;   /* 36px */
--font-size-5xl: 3rem;      /* 48px */
--font-size-6xl: 3.75rem;   /* 60px */
--font-size-7xl: 4.5rem;    /* 72px */
```

### Line Heights

```css
--line-height-tight: 1.25;
--line-height-snug: 1.375;
--line-height-normal: 1.5;
--line-height-relaxed: 1.625;
--line-height-loose: 2;
```

### Letter Spacing

```css
--letter-spacing-tighter: -0.05em;
--letter-spacing-tight: -0.025em;
--letter-spacing-normal: 0em;
--letter-spacing-wide: 0.025em;
--letter-spacing-wider: 0.05em;
--letter-spacing-widest: 0.1em;
```

### Typography Hierarchy

#### Headings

```css
.h1 {
  font-family: var(--font-primary);
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-tight);
  color: var(--color-foreground);
  margin-bottom: 2rem;
}

.h2 {
  font-family: var(--font-primary);
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-tight);
  color: var(--color-foreground);
  margin-bottom: 1.5rem;
}

.h3 {
  font-family: var(--font-primary);
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-snug);
  letter-spacing: var(--letter-spacing-normal);
  color: var(--color-foreground);
  margin-bottom: 1.25rem;
}

.h4 {
  font-family: var(--font-primary);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-snug);
  letter-spacing: var(--letter-spacing-normal);
  color: var(--color-foreground);
  margin-bottom: 1rem;
}

.h5 {
  font-family: var(--font-primary);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-normal);
  letter-spacing: var(--letter-spacing-normal);
  color: var(--color-foreground);
  margin-bottom: 0.75rem;
}

.h6 {
  font-family: var(--font-primary);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-normal);
  letter-spacing: var(--letter-spacing-wide);
  color: var(--color-foreground);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}
```

#### Body Text

```css
.body-large {
  font-family: var(--font-primary);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-relaxed);
  color: var(--color-foreground);
}

.body {
  font-family: var(--font-primary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-normal);
  color: var(--color-foreground);
}

.body-small {
  font-family: var(--font-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-normal);
  color: var(--color-foreground);
}

.caption {
  font-family: var(--font-primary);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-wide);
  color: var(--color-muted-text);
  text-transform: uppercase;
}
```

#### Interactive Text

```css
.link {
  font-family: var(--font-primary);
  color: var(--color-link);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: all 0.2s ease;
}

.link:hover {
  color: var(--color-link-hover);
  border-bottom-color: currentColor;
}

.button-text {
  font-family: var(--font-primary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-wide);
}

.label {
  font-family: var(--font-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-wide);
  color: var(--color-foreground);
}

.input-text {
  font-family: var(--font-primary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-normal);
  color: var(--color-foreground);
}

.helper-text {
  font-family: var(--font-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-normal);
  color: var(--color-muted-text);
}
```

#### Code Typography

```css
.code-inline {
  font-family: var(--font-mono);
  font-size: 0.875em;
  font-weight: var(--font-weight-regular);
  background-color: var(--color-muted);
  color: var(--color-foreground);
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
}

.code-block {
  font-family: var(--font-mono);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-relaxed);
  background-color: var(--color-muted);
  color: var(--color-foreground);
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
}
```

---

## Spacing & Layout

### Spacing Scale

Based on a base unit of 4px (0.25rem) with exponential growth:

```css
--space-0: 0;
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-20: 5rem;    /* 80px */
--space-24: 6rem;    /* 96px */
--space-32: 8rem;    /* 128px */
--space-40: 10rem;   /* 160px */
--space-48: 12rem;   /* 192px */
--space-56: 14rem;   /* 224px */
--space-64: 16rem;   /* 256px */
```

### Layout Guidelines

#### Grid System

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-4);
}

.grid {
  display: grid;
  gap: var(--space-6);
}

.grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
.grid-cols-12 { grid-template-columns: repeat(12, 1fr); }

/* Responsive grid */
@media (max-width: 768px) {
  .grid-cols-2,
  .grid-cols-3,
  .grid-cols-4 {
    grid-template-columns: 1fr;
  }
}
```

#### Flexbox Utilities

```css
.flex { display: flex; }
.flex-col { flex-direction: column; }
.flex-row { flex-direction: row; }
.flex-wrap { flex-wrap: wrap; }
.items-center { align-items: center; }
.items-start { align-items: flex-start; }
.items-end { align-items: flex-end; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.justify-around { justify-content: space-around; }
.justify-evenly { justify-content: space-evenly; }
```

#### Spacing Utilities

```css
/* Margin utilities */
.m-0 { margin: var(--space-0); }
.m-1 { margin: var(--space-1); }
.m-2 { margin: var(--space-2); }
.m-3 { margin: var(--space-3); }
.m-4 { margin: var(--space-4); }
.m-6 { margin: var(--space-6); }
.m-8 { margin: var(--space-8); }

/* Padding utilities */
.p-0 { padding: var(--space-0); }
.p-1 { padding: var(--space-1); }
.p-2 { padding: var(--space-2); }
.p-3 { padding: var(--space-3); }
.p-4 { padding: var(--space-4); }
.p-6 { padding: var(--space-6); }
.p-8 { padding: var(--space-8); }

/* Gap utilities */
.gap-1 { gap: var(--space-1); }
.gap-2 { gap: var(--space-2); }
.gap-3 { gap: var(--space-3); }
.gap-4 { gap: var(--space-4); }
.gap-6 { gap: var(--space-6); }
.gap-8 { gap: var(--space-8); }
```

### Container Sizes

```css
--container-xs: 480px;
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1536px;
```

### Border Radius

```css
--radius-none: 0;
--radius-sm: 0.125rem;   /* 2px */
--radius-md: 0.25rem;    /* 4px */
--radius-lg: 0.5rem;     /* 8px */
--radius-xl: 0.75rem;    /* 12px */
--radius-2xl: 1rem;      /* 16px */
--radius-3xl: 1.5rem;    /* 24px */
--radius-full: 9999px;
```

### Elevation & Shadows

```css
/* Light theme shadows */
--shadow-xs: 0 1px 2px 0 rgba(56, 66, 66, 0.05);
--shadow-sm: 0 1px 3px 0 rgba(56, 66, 66, 0.1), 0 1px 2px 0 rgba(56, 66, 66, 0.06);
--shadow-md: 0 4px 6px -1px rgba(56, 66, 66, 0.1), 0 2px 4px -1px rgba(56, 66, 66, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(56, 66, 66, 0.1), 0 4px 6px -2px rgba(56, 66, 66, 0.05);
--shadow-xl: 0 20px 25px -5px rgba(56, 66, 66, 0.1), 0 10px 10px -5px rgba(56, 66, 66, 0.04);
--shadow-2xl: 0 25px 50px -12px rgba(56, 66, 66, 0.25);

/* Dark theme shadows */
--shadow-xs-dark: 0 1px 2px 0 rgba(0, 0, 0, 0.5);
--shadow-sm-dark: 0 1px 3px 0 rgba(0, 0, 0, 0.6), 0 1px 2px 0 rgba(0, 0, 0, 0.4);
--shadow-md-dark: 0 4px 6px -1px rgba(0, 0, 0, 0.6), 0 2px 4px -1px rgba(0, 0, 0, 0.4);
--shadow-lg-dark: 0 10px 15px -3px rgba(0, 0, 0, 0.6), 0 4px 6px -2px rgba(0, 0, 0, 0.4);
--shadow-xl-dark: 0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.3);
--shadow-2xl-dark: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
```

### Z-Index Scale

```css
--z-hide: -1;
--z-auto: auto;
--z-base: 0;
--z-docked: 10;
--z-dropdown: 1000;
--z-sticky: 1100;
--z-banner: 1200;
--z-overlay: 1300;
--z-modal: 1400;
--z-popover: 1500;
--z-skipLink: 1600;
--z-toast: 1700;
--z-tooltip: 1800;
```

---

## Component Library

### Buttons

#### Primary Button

```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  font-family: var(--font-primary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  color: var(--color-background);
  background-color: var(--color-primary);
  border: 2px solid var(--color-primary);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  min-height: 44px; /* Accessibility: minimum touch target */
}

.btn-primary:hover {
  background-color: var(--color-accent);
  border-color: var(--color-accent);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

.btn-primary:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(250, 144, 110, 0.4);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
```

#### Secondary Button

```css
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  font-family: var(--font-primary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  color: var(--color-foreground);
  background-color: var(--color-secondary);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  min-height: 44px;
}

.btn-secondary:hover {
  background-color: var(--color-muted);
  border-color: var(--color-primary);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.btn-secondary:active {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

.btn-secondary:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(250, 144, 110, 0.4);
}

.btn-secondary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
```

#### Button Sizes

```css
.btn-xs {
  padding: var(--space-1) var(--space-3);
  font-size: var(--font-size-xs);
  min-height: 32px;
}

.btn-sm {
  padding: var(--space-2) var(--space-4);
  font-size: var(--font-size-sm);
  min-height: 36px;
}

.btn-lg {
  padding: var(--space-4) var(--space-8);
  font-size: var(--font-size-lg);
  min-height: 52px;
}

.btn-xl {
  padding: var(--space-5) var(--space-10);
  font-size: var(--font-size-xl);
  min-height: 60px;
}
```

### Form Components

#### Input Field

```css
.input {
  display: block;
  width: 100%;
  padding: var(--space-3) var(--space-4);
  font-family: var(--font-primary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-normal);
  color: var(--color-foreground);
  background-color: var(--color-background);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition: all 0.2s ease;
  min-height: 44px;
}

.input::placeholder {
  color: var(--color-muted-text);
}

.input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(250, 144, 110, 0.2);
}

.input:hover:not(:focus) {
  border-color: var(--color-primary-light);
}

.input:disabled {
  background-color: var(--color-muted);
  cursor: not-allowed;
  opacity: 0.7;
}

.input.error {
  border-color: var(--color-error);
}

.input.error:focus {
  box-shadow: 0 0 0 3px rgba(224, 96, 83, 0.2);
}

.input.success {
  border-color: var(--color-success);
}

.input.success:focus {
  box-shadow: 0 0 0 3px rgba(166, 209, 140, 0.2);
}
```

#### Label

```css
.label {
  display: block;
  font-family: var(--font-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-tight);
  color: var(--color-foreground);
  margin-bottom: var(--space-2);
}

.label.required::after {
  content: ' *';
  color: var(--color-error);
}
```

#### Checkbox

```css
.checkbox-wrapper {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  cursor: pointer;
}

.checkbox {
  position: relative;
  width: 20px;
  height: 20px;
  margin: 0;
  cursor: pointer;
  appearance: none;
  background-color: var(--color-background);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-sm);
  transition: all 0.2s ease;
  shrink: 0;
  margin-top: 2px; /* Align with first line of text */
}

.checkbox:checked {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
}

.checkbox:checked::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 6px;
  width: 4px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(250, 144, 110, 0.4);
}

.checkbox:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.checkbox-label {
  font-family: var(--font-primary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-regular);
  color: var(--color-foreground);
  cursor: pointer;
}
```

#### Radio Button

```css
.radio-wrapper {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  cursor: pointer;
}

.radio {
  position: relative;
  width: 20px;
  height: 20px;
  margin: 0;
  cursor: pointer;
  appearance: none;
  background-color: var(--color-background);
  border: 2px solid var(--color-border);
  border-radius: 50%;
  transition: all 0.2s ease;
  shrink: 0;
  margin-top: 2px;
}

.radio:checked {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
}

.radio:checked::after {
  content: '';
  position: absolute;
  top: 4px;
  left: 4px;
  width: 8px;
  height: 8px;
  background-color: white;
  border-radius: 50%;
}

.radio:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(250, 144, 110, 0.4);
}

.radio:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.radio-label {
  font-family: var(--font-primary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-regular);
  color: var(--color-foreground);
  cursor: pointer;
}
```

### Cards

#### Basic Card

```css
.card {
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.card-header {
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--color-border);
}

.card-title {
  font-family: var(--font-primary);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  color: var(--color-foreground);
  margin: 0 0 var(--space-2) 0;
}

.card-subtitle {
  font-family: var(--font-primary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-regular);
  color: var(--color-muted-text);
  margin: 0;
}

.card-content {
  font-family: var(--font-primary);
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  color: var(--color-foreground);
}

.card-footer {
  margin-top: var(--space-4);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-border);
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
}
```

#### Interactive Card

```css
.card-interactive {
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}

.card-interactive:hover {
  border-color: var(--color-primary);
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.card-interactive:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(250, 144, 110, 0.4), var(--shadow-lg);
}
```

### Alerts & Notifications

#### Alert Component

```css
.alert {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  border-left: 4px solid;
  font-family: var(--font-primary);
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
}

.alert-icon {
  shrink: 0;
  width: 20px;
  height: 20px;
  margin-top: 2px;
}

.alert-content {
  grow: 1;
}

.alert-title {
  font-weight: var(--font-weight-semibold);
  margin: 0 0 var(--space-1) 0;
}

.alert-message {
  margin: 0;
}

.alert-success {
  background-color: rgba(166, 209, 140, 0.1);
  border-color: var(--color-success);
  color: var(--color-foreground);
}

.alert-success .alert-title {
  color: var(--color-success);
}

.alert-warning {
  background-color: rgba(244, 188, 95, 0.1);
  border-color: var(--color-warning);
  color: var(--color-foreground);
}

.alert-warning .alert-title {
  color: var(--color-warning);
}

.alert-error {
  background-color: rgba(224, 96, 83, 0.1);
  border-color: var(--color-error);
  color: var(--color-foreground);
}

.alert-error .alert-title {
  color: var(--color-error);
}

.alert-info {
  background-color: rgba(110, 202, 216, 0.1);
  border-color: var(--color-info);
  color: var(--color-foreground);
}

.alert-info .alert-title {
  color: var(--color-info);
}
```

#### Toast Notification

```css
.toast {
  position: fixed;
  top: var(--space-4);
  right: var(--space-4);
  max-width: 400px;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  padding: var(--space-4);
  z-index: var(--z-toast);
  animation: toast-slide-in 0.3s ease-out;
}

.toast-close {
  position: absolute;
  top: var(--space-2);
  right: var(--space-2);
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-muted-text);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
}

.toast-close:hover {
  background-color: var(--color-muted);
  color: var(--color-foreground);
}

@keyframes toast-slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
```

### Navigation Components

#### Navigation Bar

```css
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) var(--space-6);
  background-color: var(--color-background);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-primary);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-foreground);
  text-decoration: none;
}

.navbar-nav {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  list-style: none;
  margin: 0;
  padding: 0;
}

.navbar-item {
  font-family: var(--font-primary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
}

.navbar-link {
  color: var(--color-muted-text);
  text-decoration: none;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
}

.navbar-link:hover,
.navbar-link.active {
  color: var(--color-primary);
  background-color: var(--color-secondary);
}

.navbar-link:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(250, 144, 110, 0.4);
}
```

#### Tabs

```css
.tabs {
  display: flex;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: var(--space-6);
}

.tab {
  padding: var(--space-4) var(--space-6);
  font-family: var(--font-primary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-muted-text);
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
  min-height: 44px;
}

.tab:hover {
  color: var(--color-foreground);
  background-color: var(--color-muted);
}

.tab.active {
  color: var(--color-primary);
}

.tab.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--color-primary);
}

.tab:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(250, 144, 110, 0.4);
}

.tab-content {
  display: none;
}

.tab-content.active {
  display: block;
}
```

#### Breadcrumbs

```css
.breadcrumbs {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-primary);
  font-size: var(--font-size-sm);
  margin-bottom: var(--space-4);
}

.breadcrumb-item {
  color: var(--color-muted-text);
}

.breadcrumb-link {
  color: var(--color-muted-text);
  text-decoration: none;
  transition: color 0.2s ease;
}

.breadcrumb-link:hover {
  color: var(--color-foreground);
}

.breadcrumb-separator {
  color: var(--color-muted-text);
  user-select: none;
}

.breadcrumb-current {
  color: var(--color-foreground);
  font-weight: var(--font-weight-medium);
}
```

### Modal & Dialog Components

#### Modal Overlay

```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(42, 32, 35, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-modal);
  backdrop-filter: blur(4px);
  animation: modal-fade-in 0.3s ease-out;
}

.modal {
  background-color: var(--color-background);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-2xl);
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  margin: var(--space-4);
  animation: modal-slide-up 0.3s ease-out;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-6);
  border-bottom: 1px solid var(--color-border);
}

.modal-title {
  font-family: var(--font-primary);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-foreground);
  margin: 0;
}

.modal-close {
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-muted-text);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.modal-close:hover {
  background-color: var(--color-muted);
  color: var(--color-foreground);
}

.modal-close:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(250, 144, 110, 0.4);
}

.modal-body {
  padding: var(--space-6);
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
  padding: var(--space-6);
  border-top: 1px solid var(--color-border);
}

@keyframes modal-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes modal-slide-up {
  from {
    opacity: 0;
    transform: translateY(2rem) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
```

### Data Display Components

#### Table

```css
.table-wrapper {
  overflow-x: auto;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-primary);
  font-size: var(--font-size-sm);
}

.table th {
  background-color: var(--color-secondary);
  color: var(--color-foreground);
  font-weight: var(--font-weight-semibold);
  text-align: left;
  padding: var(--space-4);
  border-bottom: 1px solid var(--color-border);
}

.table td {
  padding: var(--space-4);
  border-bottom: 1px solid var(--color-border);
  color: var(--color-foreground);
}

.table tbody tr:hover {
  background-color: var(--color-muted);
}

.table tbody tr:last-child td {
  border-bottom: none;
}

.table-compact th,
.table-compact td {
  padding: var(--space-2) var(--space-3);
}
```

#### Badge

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-3);
  font-family: var(--font-primary);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-tight);
  border-radius: var(--radius-full);
  white-space: nowrap;
}

.badge-primary {
  background-color: rgba(250, 144, 110, 0.15);
  color: var(--color-primary);
}

.badge-secondary {
  background-color: var(--color-secondary);
  color: var(--color-foreground);
}

.badge-success {
  background-color: rgba(166, 209, 140, 0.15);
  color: var(--color-success);
}

.badge-warning {
  background-color: rgba(244, 188, 95, 0.15);
  color: var(--color-warning);
}

.badge-error {
  background-color: rgba(224, 96, 83, 0.15);
  color: var(--color-error);
}

.badge-info {
  background-color: rgba(110, 202, 216, 0.15);
  color: var(--color-info);
}
```

### Utility Components

#### Loading Spinner

```css
.spinner {
  display: inline-block;
  width: 2rem;
  height: 2rem;
  border: 2px solid var(--color-muted);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.spinner-sm {
  width: 1rem;
  height: 1rem;
  border-width: 2px;
}

.spinner-lg {
  width: 3rem;
  height: 3rem;
  border-width: 3px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

#### Progress Bar

```css
.progress {
  width: 100%;
  height: 8px;
  background-color: var(--color-muted);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: var(--color-primary);
  border-radius: var(--radius-full);
  transition: width 0.3s ease;
  position: relative;
}

.progress-bar.animated::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: linear-gradient(
    -45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
  background-size: 1rem 1rem;
  animation: progress-animation 1s linear infinite;
}

@keyframes progress-animation {
  0% { background-position: 1rem 0; }
  100% { background-position: 0 0; }
}
```

#### Tooltip

```css
.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip-content {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-8px);
  background-color: var(--color-foreground);
  color: var(--color-background);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  font-family: var(--font-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  white-space: nowrap;
  z-index: var(--z-tooltip);
  pointer-events: none;
  opacity: 0;
  transition: all 0.2s ease;
}

.tooltip-content::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 4px solid transparent;
  border-top-color: var(--color-foreground);
}

.tooltip:hover .tooltip-content {
  opacity: 1;
  transform: translateX(-50%) translateY(-4px);
}
```

---

## Iconography

### Icon Guidelines

#### Style Principles
- **Geometric**: Use consistent geometric shapes and proportions
- **Minimal**: Reduce to essential elements, remove unnecessary details
- **Consistent**: Maintain uniform stroke width, corner radius, and style
- **Scalable**: Design icons that work at multiple sizes (16px to 64px)
- **Accessible**: Ensure icons are recognizable and have sufficient contrast

#### Technical Specifications

```css
.icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  stroke-width: 2;
  stroke: currentColor;
  fill: none;
  vertical-align: middle;
}

.icon-xs { width: 0.75rem; height: 0.75rem; }
.icon-sm { width: 1rem; height: 1rem; }
.icon-md { width: 1.25rem; height: 1.25rem; }
.icon-lg { width: 1.5rem; height: 1.5rem; }
.icon-xl { width: 2rem; height: 2rem; }
.icon-2xl { width: 2.5rem; height: 2.5rem; }
```

#### Icon Grid System
- **Base Grid**: 24×24px
- **Stroke Width**: 2px (consistent across all icons)
- **Corner Radius**: 2px for rounded corners
- **Padding**: 2px from edge of artboard
- **Optical Size**: Icons should appear optically the same size

#### Color Usage
```css
/* Primary icon color */
.icon-primary { color: var(--color-primary); }

/* Secondary icon color */
.icon-secondary { color: var(--color-muted-text); }

/* Status icons */
.icon-success { color: var(--color-success); }
.icon-warning { color: var(--color-warning); }
.icon-error { color: var(--color-error); }
.icon-info { color: var(--color-info); }

/* Interactive states */
.icon-button {
  transition: color 0.2s ease;
}

.icon-button:hover {
  color: var(--color-primary);
}
```

### Recommended Icon Set

For consistency, we recommend using **Lucide React** as the primary icon library:

```bash
npm install lucide-react
```

#### Common Icons

```jsx
// Navigation
import { Home, Menu, Search, Settings, User } from 'lucide-react';

// Actions
import { Plus, Edit, Trash2, Download, Upload, Save } from 'lucide-react';

// Status
import { Check, X, AlertCircle, Info, AlertTriangle } from 'lucide-react';

// Content
import { File, Folder, Image, Video, Music } from 'lucide-react';

// Communication
import { Mail, Phone, MessageCircle, Bell } from 'lucide-react';
```

#### Icon Usage Examples

```jsx
// In buttons
<button className="btn-primary">
  <Plus className="icon-sm" />
  Add Item
</button>

// In navigation
<nav className="navbar">
  <Home className="icon-md" />
  <span>Dashboard</span>
</nav>

// Status indicators
<div className="alert alert-success">
  <Check className="icon-md icon-success" />
  <span>Success message</span>
</div>
```

### Custom Icon Creation

When creating custom icons that aren't available in the standard set:

#### SVG Template
```xml
<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  className="icon"
>
  <!-- Icon paths here -->
</svg>
```

#### Naming Convention
- Use kebab-case: `user-settings`, `file-upload`
- Be descriptive: `arrow-up-right` not `arrow1`
- Group related icons: `chevron-up`, `chevron-down`, `chevron-left`, `chevron-right`

---

## Illustrations & Imagery

### Illustration Style Guidelines

#### Visual Style
- **Warm Color Palette**: Use colors from the design system
- **Geometric Shapes**: Prefer geometric, organic shapes over complex illustrations
- **Minimal Detail**: Focus on essential elements, avoid unnecessary complexity
- **Consistent Perspective**: Use consistent viewpoints and angles
- **Human-Centered**: Include diverse, inclusive representations of people

#### Technical Specifications
- **Format**: SVG preferred for scalability, PNG for complex scenes
- **Color Mode**: RGB color space
- **Resolution**: Vector format or 2x resolution for raster images
- **File Size**: Optimize for web (< 500KB for illustrations)

#### Color Usage in Illustrations

```css
/* Primary illustration colors */
.illustration-primary { fill: var(--color-primary); }
.illustration-secondary { fill: var(--color-secondary); }
.illustration-accent { fill: var(--color-accent); }

/* Background colors */
.illustration-bg-light { fill: var(--color-background); }
.illustration-bg-muted { fill: var(--color-muted); }

/* Gradients */
.illustration-gradient-warm {
  fill: linear-gradient(135deg, var(--color-primary), var(--color-accent));
}

.illustration-gradient-subtle {
  fill: linear-gradient(135deg, var(--color-secondary), var(--color-muted));
}
```

### Photography Guidelines

#### Style Preferences
- **Natural Lighting**: Prefer warm, natural lighting that complements the color palette
- **Authentic Moments**: Capture genuine, unposed moments when possible
- **Diverse Representation**: Include people of different backgrounds, ages, and abilities
- **Consistent Mood**: Maintain warm, welcoming, and professional atmosphere

#### Technical Requirements
- **Aspect Ratios**: 16:9, 4:3, 1:1, 3:2 depending on usage
- **Resolution**: Minimum 1920×1080 for hero images
- **Format**: WebP preferred, JPEG fallback
- **Compression**: Optimize for web without quality loss
- **Color Profile**: sRGB color space

#### Image Treatment

```css
.image {
  border-radius: var(--radius-lg);
  max-width: 100%;
  height: auto;
}

.image-hero {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: var(--radius-2xl);
}

.image-avatar {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-full);
  object-fit: cover;
}

.image-card {
  aspect-ratio: 16/9;
  object-fit: cover;
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
}

/* Image filters for brand consistency */
.image-warm-filter {
  filter: sepia(10%) saturate(110%) brightness(105%) hue-rotate(-5deg);
}

.image-overlay {
  position: relative;
}

.image-overlay::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(250, 144, 110, 0.1),
    rgba(245, 188, 94, 0.1)
  );
  border-radius: inherit;
}
```

### Empty States & Placeholders

#### Empty State Illustrations
Create illustrations for:
- No search results
- Empty data tables
- Completed tasks
- Error states
- Onboarding steps

#### Placeholder Components

```css
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--space-12) var(--space-6);
}

.empty-state-icon {
  width: 4rem;
  height: 4rem;
  color: var(--color-muted-text);
  margin-bottom: var(--space-4);
}

.empty-state-title {
  font-family: var(--font-primary);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-foreground);
  margin-bottom: var(--space-2);
}

.empty-state-message {
  font-family: var(--font-primary);
  font-size: var(--font-size-base);
  color: var(--color-muted-text);
  margin-bottom: var(--space-6);
  max-width: 400px;
}

.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-muted) 25%,
    var(--color-secondary) 50%,
    var(--color-muted) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: var(--radius-md);
}

@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton-text {
  height: 1em;
  margin-bottom: var(--space-2);
}

.skeleton-text:last-child {
  width: 60%;
}

.skeleton-avatar {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-full);
}

.skeleton-button {
  height: 44px;
  width: 120px;
}
```

---

## Motion & Animation

### Animation Principles

#### Purposeful Motion
- **Functional**: Every animation serves a clear purpose
- **Delightful**: Adds joy without being distracting
- **Performant**: Smooth 60fps animations
- **Accessible**: Respects user preferences for reduced motion

#### Timing & Easing

```css
/* Duration tokens */
--duration-instant: 0ms;
--duration-fast: 150ms;
--duration-normal: 250ms;
--duration-slow: 350ms;
--duration-slower: 500ms;

/* Easing curves */
--ease-linear: linear;
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
--ease-smooth: cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

### Animation Categories

#### Microinteractions

```css
/* Button hover */
.btn {
  transition: all var(--duration-normal) var(--ease-out);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

/* Input focus */
.input {
  transition: all var(--duration-fast) var(--ease-out);
}

.input:focus {
  transform: scale(1.02);
}

/* Link hover */
.link {
  position: relative;
  transition: color var(--duration-fast) var(--ease-out);
}

.link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background-color: currentColor;
  transition: width var(--duration-normal) var(--ease-out);
}

.link:hover::after {
  width: 100%;
}
```

#### Page Transitions

```css
/* Fade transition */
.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  opacity: 1;
  transition: opacity var(--duration-normal) var(--ease-out);
}

.fade-exit {
  opacity: 1;
}

.fade-exit-active {
  opacity: 0;
  transition: opacity var(--duration-normal) var(--ease-in);
}

/* Slide transition */
.slide-enter {
  transform: translateX(100%);
}

.slide-enter-active {
  transform: translateX(0);
  transition: transform var(--duration-normal) var(--ease-out);
}

.slide-exit {
  transform: translateX(0);
}

.slide-exit-active {
  transform: translateX(-100%);
  transition: transform var(--duration-normal) var(--ease-in);
}

/* Scale transition */
.scale-enter {
  opacity: 0;
  transform: scale(0.9);
}

.scale-enter-active {
  opacity: 1;
  transform: scale(1);
  transition: all var(--duration-normal) var(--ease-out);
}
```

#### Loading Animations

```css
/* Pulse animation */
.pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}

/* Bounce animation */
.bounce {
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    transform: translate3d(0.0.0);
  }
  40%, 43% {
    animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
    transform: translate3d(0, -30px, 0);
  }
  70% {
    animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
    transform: translate3d(0, -15px, 0);
  }
  90% {
    transform: translate3d(0,-4px.0);
  }
}

/* Fade in up */
.fade-in-up {
  animation: fade-in-up var(--duration-slow) var(--ease-out) both;
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translate3d(0, 40px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
```

#### Interactive Feedback

```css
/* Click feedback */
.click-feedback {
  position: relative;
  overflow: hidden;
}

.click-feedback::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.click-feedback:active::before {
  width: 300px;
  height: 300px;
}

/* Progress indication */
.progress-pulse {
  animation: progress-pulse 2s ease-in-out infinite;
}

@keyframes progress-pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(250, 144, 110, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(250, 144, 110, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(250, 144, 110, 0);
  }
}
```

### Accessibility Considerations

```css
/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  .parallax {
    transform: none !important;
  }
}

/* Focus management for animations */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--color-primary);
  color: white;
  padding: 8px;
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: top var(--duration-fast) var(--ease-out);
}

.skip-link:focus {
  top: 6px;
}
```

---

## Voice & Tone

### Brand Voice Characteristics

#### Tone Attributes
- **Warm & Welcoming**: Like a friendly conversation with a knowledgeable friend
- **Clear & Direct**: Communicate simply without unnecessary jargon
- **Helpful & Supportive**: Always aim to be useful and encouraging
- **Professional & Trustworthy**: Competent and reliable, but never cold
- **Optimistic & Solution-Oriented**: Focus on possibilities and positive outcomes

### Writing Guidelines

#### Headlines & Titles
```
✅ Good Examples:
- "Welcome to your new workspace"
- "Let's get you set up"
- "Here's what's new this week"

❌ Avoid:
- "Maximize Your Productivity with Advanced Features"
- "Critical System Update Required"
- "404: Page Not Found"

Better Alternative:
- "Something went wrong. Let's get you back on track."
```

#### Button Text
```
✅ Action-Oriented:
- "Save changes"
- "Send message"
- "Get started"
- "Learn more"

❌ Generic:
- "Submit"
- "Click here"
- "OK"
- "Continue"
```

#### Form Labels & Help Text
```
✅ Clear & Helpful:
Label: "Email address"
Placeholder: "name@company.com"
Help: "We'll use this to send you important updates"

Error: "Please enter a valid email address"
Success: "Thanks! We've sent a confirmation to your email"

❌ Technical or Unclear:
Label: "Email field"
Placeholder: "Enter email"
Error: "Invalid input"
```

#### Notifications & Messages

##### Success Messages
```
✅ Positive & Specific:
- "Your changes have been saved successfully"
- "Welcome aboard! Your account is ready to go"
- "Message sent to the team"

❌ Generic:
- "Success"
- "Done"
- "Operation completed"
```

##### Error Messages
```
✅ Helpful & Solution-Focused:
- "We couldn't save your changes. Please check your connection and try again"
- "That password isn't quite right. Would you like to reset it?"
- "This email is already in use. Try signing in instead"

❌ Blaming or Technical:
- "User error"
- "500 Internal Server Error"
- "Invalid credentials"
```

##### Loading & Progress
```
✅ Informative & Reassuring:
- "Setting up your workspace..."
- "Uploading your files (2 of 5)"
- "Almost there! Just a few more seconds"

❌ Technical or Vague:
- "Processing..."
- "Please wait"
- "Loading..."
```

#### Empty States
```
✅ Encouraging & Actionable:
- "No messages yet. Start a conversation with your team"
- "Your dashboard will show activity once you create your first project"
- "No results found. Try adjusting your search terms"

❌ Negative or Unhelpful:
- "No data"
- "Empty"
- "Nothing to show"
```

### Content Guidelines

#### Capitalization
- **Sentence case**: Use for most UI text (headings, buttons, labels)
- **Title case**: Reserve for proper nouns and main navigation
- **All caps**: Avoid except for very short labels (2-3 characters)

#### Punctuation
- **Periods**: Skip in buttons, labels, and short phrases
- **Exclamation points**: Use sparingly for celebration or urgent action
- **Question marks**: Use in confirmation dialogs and help text

#### Numbers & Data
```
✅ Human-Friendly:
- "About 2 hours ago"
- "Nearly 1.000 users"
- "Less than 5 minutes"

❌ Raw Technical:
- "2.3 hours ago"
- "987 users"
- "4.7 minutes"
```

#### Inclusive Language
```
✅ Inclusive & Accessible:
- "Team members" instead of "guys"
- "You" instead of "users"
- "Choose" instead of "select"
- "Sign in" instead of "login"

❌ Exclusive or Technical:
- "Guys, users, admins"
- "Execute, terminate, kill"
- "Master/slave"
- "Blacklist/whitelist"
```

### Internationalization Considerations

#### Text Length Planning
- Plan for 30-50% text expansion in other languages
- Keep button text short and action-focused
- Avoid text in images when possible
- Use flexible layouts that accommodate longer text

#### Cultural Sensitivity
- Avoid idioms and cultural references
- Use universal icons and symbols
- Consider reading direction (RTL languages)
- Test color meanings across cultures

---

## Accessibility Guidelines

### WCAG 2.1 Compliance

Our design system aims for WCAG 2.1 AA compliance across all components and patterns. This ensures our products are usable by people with various disabilities.

#### Color & Contrast

##### Contrast Requirements
```css
/* Text contrast ratios */
--contrast-normal-text: 4.5:1;  /* Minimum for normal text */
--contrast-large-text: 3:1;     /* Minimum for large text (18pt+ or 14pt+ bold) */
--contrast-ui-elements: 3:1;    /* Minimum for UI components */

/* Our color combinations meet these requirements */
.text-primary {
  color: var(--color-foreground);          /* 11.7:1 ratio on light bg */
  background-color: var(--color-background);
}

.text-secondary {
  color: var(--color-muted-text);          /* 4.5:1 ratio on light bg */
  background-color: var(--color-background);
}
```

##### Color Independence
- Never use color alone to convey information
- Always pair color with text, icons, or patterns
- Provide alternative indicators for status and meaning

```css
/* Good: Status with color + icon + text */
.status-success {
  color: var(--color-success);
}

.status-success::before {
  content: '✓';
  margin-right: var(--space-1);
}

/* Error state with multiple indicators */
.input-error {
  border-color: var(--color-error);
  border-width: 2px;
  border-style: solid;
}

.error-message {
  color: var(--color-error);
  font-weight: var(--font-weight-semibold);
}

.error-icon {
  color: var(--color-error);
}
```

#### Typography & Readability

##### Font Size Guidelines
```css
/* Minimum sizes for accessibility */
.text-minimum {
  font-size: 16px; /* Never go below 16px for body text */
}

.text-large {
  font-size: 18px; /* Preferred minimum for better readability */
}

/* Line height for readability */
.text-readable {
  line-height: 1.5; /* Minimum for body text */
}

.text-headings {
  line-height: 1.3; /* Minimum for headings */
}
```

##### Text Spacing
```css
.accessible-text {
  /* WCAG 1.4.12 Text Spacing requirements */
  line-height: 1.5em;
  letter-spacing: 0.12em;
  word-spacing: 0.16em;
  margin-bottom: 2em; /* Paragraph spacing */
}
```

#### Focus Management

##### Focus Indicators
```css
/* Visible focus for all interactive elements */
.focusable:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(250, 144, 110, 0.4);
  border-radius: var(--radius-sm);
}

/* High contrast focus for better visibility */
@media (prefers-contrast: high) {
  .focusable:focus {
    box-shadow: 0 0 0 3px var(--color-foreground);
    outline: 2px solid var(--color-background);
    outline-offset: 2px;
  }
}

/* Focus within for complex components */
.card:focus-within {
  box-shadow: 0 0 0 3px rgba(250, 144, 110, 0.2);
}
```

##### Tab Order
```css
/* Skip links for keyboard navigation */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--color-primary);
  color: white;
  padding: var(--space-2) var(--space-4);
  text-decoration: none;
  border-radius: var(--radius-md);
  z-index: var(--z-skipLink);
  transition: top var(--duration-fast) var(--ease-out);
}

.skip-link:focus {
  top: 6px;
}

/* Logical tab order */
.tab-order-1 { tabindex: 1; }
.tab-order-2 { tabindex: 2; }
.tab-order-3 { tabindex: 3; }
```

#### Interactive Elements

##### Touch Targets
```css
/* Minimum 44×44px touch targets */
.touch-target {
  min-width: 44px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Adequate spacing between targets */
.touch-targets-group > * + * {
  margin-left: var(--space-2); /* Minimum 8px spacing */
}
```

##### Button States
```css
.btn {
  /* All states clearly defined */
  cursor: pointer;
  transition: all var(--duration-normal) var(--ease-out);
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.btn:active {
  transform: translateY(0);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.btn[aria-pressed="true"] {
  background-color: var(--color-primary);
  color: var(--color-background);
}
```

#### Semantic HTML

##### Proper Structure
```html
<!-- Use semantic HTML elements -->
<header role="banner">
  <nav role="navigation" aria-label="Main navigation">
    <ul>
      <li><a href="/" aria-current="page">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
</header>

<main role="main">
  <article>
    <header>
      <h1>Article Title</h1>
      <p>Published on <time datetime="2025-01-01">January 1, 2025</time></p>
    </header>
    <section>
      <h2>Section Title</h2>
      <p>Content...</p>
    </section>
  </article>
</main>

<aside role="complementary" aria-label="Related articles">
  <!-- Sidebar content -->
</aside>

<footer role="contentinfo">
  <!-- Footer content -->
</footer>
```

##### ARIA Labels & Descriptions
```html
<!-- Form labels -->
<label for="email">Email Address</label>
<input
  type="email"
  id="email"
  name="email"
  aria-describedby="email-help"
  aria-required="true"
  aria-invalid="false"
/>
<div id="email-help">We'll never share your email</div>

<!-- Button with icon -->
<button aria-label="Delete item">
  <TrashIcon aria-hidden="true" />
</button>

<!-- Status messages -->
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
>
  Changes saved successfully
</div>

<!-- Error messages -->
<div
  role="alert"
  aria-live="assertive"
>
  Please fix the errors below
</div>
```

#### Screen Reader Support

##### Content Structure
```css
/* Screen reader only content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Show on focus for keyboard users */
.sr-only:focus {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: inherit;
}
```

##### Alternative Text
```html
<!-- Informative images -->
<img
  src="chart.png"
  alt="Sales increased 25% from January to February"
/>

<!-- Decorative images -->
<img
  src="decoration.png"
  alt=""
  role="presentation"
/>

<!-- Complex images -->
<figure>
  <img
    src="complex-chart.png"
    alt="Quarterly sales data"
    aria-describedby="chart-description"
  />
  <figcaption id="chart-description">
    Detailed description of the chart data...
  </figcaption>
</figure>
```

#### Motion & Animation Accessibility

##### Reduced Motion Support
```css
/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  /* Keep essential animations but make them shorter */
  .loading-spinner {
    animation-duration: 0.5s !important;
  }

  /* Disable decorative animations */
  .floating-animation,
  .parallax-effect {
    animation: none !important;
    transform: none !important;
  }
}

/* Alternative to motion for important feedback */
@media (prefers-reduced-motion: reduce) {
  .success-animation {
    background-color: var(--color-success);
    color: white;
    font-weight: bold;
  }
}
```

#### Testing Guidelines

##### Automated Testing
```javascript
// Example accessibility tests
describe('Accessibility', () => {
  test('all interactive elements have focus indicators', () => {
    // Test focus management
  });

  test('color contrast meets WCAG AA standards', () => {
    // Test contrast ratios
  });

  test('all images have appropriate alt text', () => {
    // Test alternative text
  });

  test('form elements have proper labels', () => {
    // Test form accessibility
  });
});
```

##### Manual Testing Checklist
- [ ] Navigate entire interface using only keyboard
- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Verify color contrast in all themes
- [ ] Check text scaling up to 200%
- [ ] Test with high contrast mode enabled
- [ ] Verify animations with reduced motion preference
- [ ] Test form completion and error handling
- [ ] Validate proper heading hierarchy
- [ ] Check focus management in modals and dropdowns
- [ ] Test with browser zoom up to 400%

---

## Implementation Guidelines

### Development Workflow

#### Design Tokens Setup

##### CSS Custom Properties
```css
/* tokens.css - Central token definitions */
:root {
  /* Color tokens */
  --color-primary: #FA906E;
  --color-secondary: #FDE6DE;
  --color-accent: #F5BC5E;
  --color-background: #FAF4F2;
  --color-foreground: #384242;
  --color-muted: #F5F1EB;
  --color-muted-text: #95726A;
  --color-success: #A6D18C;
  --color-warning: #F4BC5F;
  --color-error: #E06053;
  --color-info: #6ECAD8;
  --color-border: #EADBCC;
  --color-selection: #FBD6B9;
  --color-link: #FA906E;

  /* Spacing tokens */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;

  /* Typography tokens */
  --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-secondary: 'Source Serif Pro', serif;
  --font-mono: 'Fira Code', monospace;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.625;

  /* Border radius tokens */
  --radius-sm: 0.125rem;
  --radius-md: 0.25rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-full: 9999px;

  /* Shadow tokens */
  --shadow-sm: 0 1px 2px 0 rgba(56, 66, 66, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(56, 66, 66, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(56, 66, 66, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(56, 66, 66, 0.1);

  /* Animation tokens */
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 350ms;
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

  /* Z-index tokens */
  --z-dropdown: 1000;
  --z-sticky: 1100;
  --z-modal: 1400;
  --z-tooltip: 1800;
}

/* Dark theme overrides */
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #2A2023;
    --color-foreground: #C6D0F5;
    --color-secondary: #403A40;
    --color-muted: #342D34;
    --color-muted-text: #B5A9AF;
    --color-warning: #E5C890;
    --color-error: #E78284;
    --color-info: #89DCEB;
    --color-border: #403A40;
    --color-selection: #626880;
    --color-link: #F594C1;

    /* Dark theme shadows */
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.4);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.5);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
  }
}
```

##### JavaScript/TypeScript Tokens
```typescript
// tokens.ts - For programmatic access
export const tokens = {
  colors: {
    primary: '#FA906E',
    secondary: '#FDE6DE',
    accent: '#F5BC5E',
    background: '#FAF4F2',
    foreground: '#384242',
    muted: '#F5F1EB',
    mutedText: '#95726A',
    success: '#A6D18C',
    warning: '#F4BC5F',
    error: '#E06053',
    info: '#6ECAD8',
    border: '#EADBCC',
    selection: '#FBD6B9',
    link: '#FA906E',
  },
  spacing: {
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    6: '1.5rem',
    8: '2rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
  },
  typography: {
    fontFamily: {
      primary: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      secondary: 'Source Serif Pro, serif',
      mono: 'Fira Code, monospace',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.625,
    },
  },
  borderRadius: {
    sm: '0.125rem',
    md: '0.25rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(56, 66, 66, 0.05)',
    md: '0 4px 6px -1px rgba(56, 66, 66, 0.1)',
    lg: '0 10px 15px -3px rgba(56, 66, 66, 0.1)',
    xl: '0 20px 25px -5px rgba(56, 66, 66, 0.1)',
  },
  animation: {
    duration: {
      fast: '150ms',
      normal: '250ms',
      slow: '350ms',
    },
    easing: {
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  zIndex: {
    dropdown: 1000,
    sticky: 1100,
    modal: 1400,
    tooltip: 1800,
  },
} as const;

// Type definitions for TypeScript
export type ColorToken = keyof typeof tokens.colors;
export type SpacingToken = keyof typeof tokens.spacing;
export type FontSizeToken = keyof typeof tokens.typography.fontSize;
export type FontWeightToken = keyof typeof tokens.typography.fontWeight;
```

##### JSON Format for Tools
```json
{
  "colors": {
    "primary": {
      "value": "#FA906E",
      "type": "color",
      "description": "Primary brand color for actions and highlights"
    },
    "secondary": {
      "value": "#FDE6DE",
      "type": "color",
      "description": "Secondary color for backgrounds and subtle UI elements"
    }
  },
  "spacing": {
    "4": {
      "value": "1rem",
      "type": "dimension",
      "description": "Base spacing unit"
    }
  },
  "typography": {
    "fontFamily": {
      "primary": {
        "value": "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
        "type": "fontFamily",
        "description": "Primary font for UI and content"
      }
    }
  }
}
```

#### Framework Implementations

##### React Components

```tsx
// Button.tsx - React implementation
import React from 'react';
import { cn } from '@/lib/utils';
import { tokens } from '@/tokens';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading = false, disabled, children, ...props }, ref) => {
    const baseStyles = `
      inline-flex items-center justify-center gap-2
      font-medium rounded-lg transition-all duration-200
      focus:outline-none focus:ring-3 focus:ring-primary/40
      disabled:opacity-60 disabled:cursor-not-allowed
      min-h-[44px] touch-manipulation
    `;

    const variants = {
      primary: `
        bg-primary text-background border-2 border-primary
        hover:bg-accent hover:border-accent hover:-translate-y-0.5 hover:shadow-md
        active:translate-y-0 active:shadow-sm
      `,
      secondary: `
        bg-secondary text-foreground border-2 border-border
        hover:bg-muted hover:border-primary hover:-translate-y-0.5 hover:shadow-md
        active:translate-y-0 active:shadow-sm
      `,
      tertiary: `
        bg-transparent text-primary border-2 border-transparent
        hover:bg-secondary hover:-translate-y-0.5
        active:translate-y-0
      `,
      danger: `
        bg-error text-background border-2 border-error
        hover:bg-red-600 hover:border-red-600 hover:-translate-y-0.5 hover:shadow-md
        active:translate-y-0 active:shadow-sm
      `,
    };

    const sizes = {
      xs: 'px-3 py-1 text-xs min-h-[32px]',
      sm: 'px-4 py-2 text-sm min-h-[36px]',
      md: 'px-6 py-3 text-base min-h-[44px]',
      lg: 'px-8 py-4 text-lg min-h-[52px]',
      xl: 'px-10 py-5 text-xl min-h-[60px]',
    };

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          loading && 'pointer-events-none',
          className
        )}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
```

```tsx
// Input.tsx - React implementation
import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, required, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const helperId = helperText ? `${inputId}-helper` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-foreground"
          >
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}

        <input
          id={inputId}
          className={cn(
            `w-full px-4 py-3 rounded-lg border-2 transition-all duration-200
             bg-background text-foreground placeholder:text-muted-text
             min-h-[44px] focus:outline-none focus:ring-3 focus:ring-primary/20
             hover:border-primary/50 disabled:bg-muted disabled:opacity-70 disabled:cursor-not-allowed`,
            error
              ? 'border-error focus:border-error focus:ring-error/20'
              : 'border-border focus:border-primary',
            className
          )}
          ref={ref}
          aria-required={required}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={cn(helperId, errorId)}
          {...props}
        />

        {helperText && !error && (
          <p id={helperId} className="text-sm text-muted-text">
            {helperText}
          </p>
        )}

        {error && (
          <p id={errorId} className="text-sm text-error font-medium" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
```

##### Vue Components

```vue
<!-- Button.vue - Vue implementation -->
<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    v-bind="$attrs"
    @click="handleClick"
  >
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-2 h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  loading: false,
  disabled: false,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const buttonClasses = computed(() => {
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    font-medium rounded-lg transition-all duration-200
    focus:outline-none focus:ring-3 focus:ring-primary/40
    disabled:opacity-60 disabled:cursor-not-allowed
    min-h-[44px] touch-manipulation
  `;

  const variantClasses = {
    primary: `
      bg-primary text-background border-2 border-primary
      hover:bg-accent hover:border-accent hover:-translate-y-0.5 hover:shadow-md
      active:translate-y-0 active:shadow-sm
    `,
    secondary: `
      bg-secondary text-foreground border-2 border-border
      hover:bg-muted hover:border-primary hover:-translate-y-0.5 hover:shadow-md
      active:translate-y-0 active:shadow-sm
    `,
    tertiary: `
      bg-transparent text-primary border-2 border-transparent
      hover:bg-secondary hover:-translate-y-0.5
      active:translate-y-0
    `,
    danger: `
      bg-error text-background border-2 border-error
      hover:bg-red-600 hover:border-red-600 hover:-translate-y-0.5 hover:shadow-md
      active:translate-y-0 active:shadow-sm
    `,
  };

  const sizeClasses = {
    xs: 'px-3 py-1 text-xs min-h-[32px]',
    sm: 'px-4 py-2 text-sm min-h-[36px]',
    md: 'px-6 py-3 text-base min-h-[44px]',
    lg: 'px-8 py-4 text-lg min-h-[52px]',
    xl: 'px-10 py-5 text-xl min-h-[60px]',
  };

  return [
    baseClasses,
    variantClasses[props.variant],
    sizeClasses[props.size],
    props.loading && 'pointer-events-none',
  ].join(' ');
});

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event);
  }
};
</script>
```

##### Tailwind CSS Configuration

```javascript
// tailwind.config.js
const { tokens } = require('./src/tokens');

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,vue,html}',
  ],
  theme: {
    extend: {
      colors: {
        // Map design tokens to Tailwind colors
        primary: tokens.colors.primary,
        secondary: tokens.colors.secondary,
        accent: tokens.colors.accent,
        background: tokens.colors.background,
        foreground: tokens.colors.foreground,
        muted: tokens.colors.muted,
        'muted-text': tokens.colors.mutedText,
        success: tokens.colors.success,
        warning: tokens.colors.warning,
        error: tokens.colors.error,
        info: tokens.colors.info,
        border: tokens.colors.border,
        selection: tokens.colors.selection,
        link: tokens.colors.link,
      },
      fontFamily: {
        primary: tokens.typography.fontFamily.primary.split(', '),
        secondary: tokens.typography.fontFamily.secondary.split(', '),
        mono: tokens.typography.fontFamily.mono.split(', '),
      },
      fontSize: tokens.typography.fontSize,
      fontWeight: tokens.typography.fontWeight,
      lineHeight: tokens.typography.lineHeight,
      spacing: tokens.spacing,
      borderRadius: tokens.borderRadius,
      boxShadow: tokens.shadows,
      transitionDuration: tokens.animation.duration,
      transitionTimingFunction: tokens.animation.easing,
      zIndex: tokens.zIndex,
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
  darkMode: 'class',
};
```

#### CSS Architecture

##### Utility-First Approach with Custom Components

```css
/* utilities.css - Custom utility classes */
@layer utilities {
  /* Focus utilities */
  .focus-ring {
    @apply focus:outline-none focus:ring-3 focus:ring-primary/40;
  }

  .focus-ring-error {
    @apply focus:outline-none focus:ring-3 focus:ring-error/40;
  }

  /* Touch target utilities */
  .touch-target {
    @apply min-w-[44px] min-h-[44px] inline-flex items-center justify-center;
  }

  /* Animation utilities */
  .animate-in {
    @apply animate-fade-in-up;
  }

  .animate-out {
    @apply animate-fade-out-down;
  }

  /* Text utilities */
  .text-balance {
    text-wrap: balance;
  }

  .text-pretty {
    text-wrap: pretty;
  }
}

/* Custom animations */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-out-down {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(1rem);
  }
}
```

##### Component Layer

```css
/* components.css - Reusable component styles */
@layer components {
  .btn {
    @apply inline-flex items-center justify-center gap-2
           font-medium rounded-lg transition-all duration-200
           focus-ring disabled:opacity-60 disabled:cursor-not-allowed
           min-h-[44px] touch-manipulation;
  }

  .btn-primary {
    @apply bg-primary text-background border-2 border-primary
           hover:bg-accent hover:border-accent hover:-translate-y-0.5 hover:shadow-md
           active:translate-y-0 active:shadow-sm;
  }

  .btn-secondary {
    @apply bg-secondary text-foreground border-2 border-border
           hover:bg-muted hover:border-primary hover:-translate-y-0.5 hover:shadow-md
           active:translate-y-0 active:shadow-sm;
  }

  .input {
    @apply w-full px-4 py-3 rounded-lg border-2 transition-all duration-200
           bg-background text-foreground placeholder:text-muted-text
           min-h-[44px] focus-ring border-border
           hover:border-primary/50 disabled:bg-muted disabled:opacity-70;
  }

  .input-error {
    @apply border-error focus-ring-error;
  }

  .card {
    @apply bg-background border border-border rounded-xl p-6 shadow-sm
           transition-all duration-300 hover:-translate-y-1 hover:shadow-md;
  }

  .alert {
    @apply flex items-start gap-3 p-4 rounded-lg border-l-4;
  }

  .alert-success {
    @apply bg-success/10 border-success text-foreground;
  }

  .alert-warning {
    @apply bg-warning/10 border-warning text-foreground;
  }

  .alert-error {
    @apply bg-error/10 border-error text-foreground;
  }

  .alert-info {
    @apply bg-info/10 border-info text-foreground;
  }
}
```

#### Testing Strategy

##### Visual Regression Testing

```javascript
// visual-tests.spec.js - Playwright visual testing
import { test, expect } from '@playwright/test';

test.describe('Component Visual Tests', () => {
  test('Button variants', async ({ page }) => {
    await page.goto('/components/button');

    // Test all button variants
    await expect(page.locator('[data-testid="button-showcase"]')).toHaveScreenshot('buttons.png');
  });

  test('Form components', async ({ page }) => {
    await page.goto('/components/forms');

    // Test form states
    await expect(page.locator('[data-testid="form-showcase"]')).toHaveScreenshot('forms.png');

    // Test error states
    await page.fill('input[name="email"]', 'invalid-email');
    await page.blur('input[name="email"]');
    await expect(page.locator('[data-testid="form-showcase"]')).toHaveScreenshot('forms-error.png');
  });

  test('Dark mode', async ({ page }) => {
    await page.goto('/components/showcase');
    await page.evaluate(() => document.documentElement.classList.add('dark'));

    await expect(page.locator('[data-testid="component-showcase"]')).toHaveScreenshot('dark-mode.png');
  });
});
```

##### Accessibility Testing

```javascript
// accessibility.spec.js - Automated a11y testing
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests', () => {
  test('Homepage accessibility', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Form accessibility', async ({ page }) => {
    await page.goto('/components/forms');

    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await expect(page.locator('input[name="email"]')).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.locator('input[name="password"]')).toBeFocused();

    // Test screen reader content
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('[data-testid="form-showcase"]')
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Color contrast', async ({ page }) => {
    await page.goto('/components/showcase');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .analyze();

    // Check specifically for color contrast violations
    const contrastViolations = accessibilityScanResults.violations.filter(
      violation => violation.id === 'color-contrast'
    );

    expect(contrastViolations).toEqual([]);
  });
});
```

##### Unit Testing for Components

```typescript
// Button.test.tsx - React Testing Library example
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button Component', () => {
  test('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  test('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Click me</Button>);

    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(
      <Button onClick={handleClick} disabled>
        Click me
      </Button>
    );

    await user.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('shows loading state', () => {
    render(<Button loading>Loading</Button>);

    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByText('Loading')).toBeInTheDocument();
    // Check for spinner presence
    expect(document.querySelector('.animate-spin')).toBeInTheDocument();
  });

  test('applies correct variant classes', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-primary');

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-secondary');
  });

  test('meets accessibility requirements', () => {
    render(<Button>Accessible button</Button>);
    const button = screen.getByRole('button');

    // Check minimum touch target size
    const styles = getComputedStyle(button);
    expect(parseInt(styles.minHeight)).toBeGreaterThanOrEqual(44);
  });
});
```

#### Build & Deployment

##### Build Configuration

```javascript
// vite.config.js - Build configuration for component library
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'WarmSunsetDesignSystem',
      formats: ['es', 'umd'],
      fileName: (format) => `warm-sunset-design-system.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    sourcemap: true,
    minify: 'terser',
  },
  css: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
});
```

##### Package Configuration

```json
{
  "name": "@your-org/warm-sunset-design-system",
  "version": "1.0.0",
  "description": "A warm and cozy design system with sunset colors",
  "main": "./dist/warm-sunset-design-system.umd.js",
  "module": "./dist/warm-sunset-design-system.es.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/warm-sunset-design-system.es.js",
      "require": "./dist/warm-sunset-design-system.umd.js"
    },
    "./css": "./dist/style.css"
  },
  "files": [
    "dist",
    "README.md"
  ],
  "scripts": {
    "build": "vite build",
    "build:watch": "vite build --watch",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:visual": "playwright test",
    "test:a11y": "playwright test --grep='accessibility'",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "lint": "eslint src --ext .ts,.tsx",
    "lint:fix": "eslint src --ext .ts,.tsx --fix",
    "type-check": "tsc --noEmit",
    "changeset": "changeset",
    "version-packages": "changeset version",
    "release": "npm run build && changeset publish"
  },
  "peerDependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0"
  },
  "devDependencies": {
    "@changesets/cli": "^2.26.0",
    "@playwright/test": "^1.40.0",
    "@storybook/react-vite": "^7.6.0",
    "@testing-library/jest-dom": "^6.1.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^14.5.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.56.0",
    "jest": "^29.7.0",
    "postcss": "^8.4.0",
    "storybook": "^7.6.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.0.0",
    "vite": "^5.0.0",
    "vite-plugin-dts": "^3.6.0"
  },
  "keywords": [
    "design-system",
    "react",
    "components",
    "ui",
    "warm-sunset",
    "accessibility",
    "typescript"
  ],
  "repository": {
    "type": "git",
    "url": "https://github.com/your-org/warm-sunset-design-system"
  },
  "license": "MIT"
}
```

#### Documentation Strategy

##### Storybook Configuration

```javascript
// .storybook/main.js
module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-design-tokens',
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/addon-viewport',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  features: {
    buildStoriesJson: true,
  },
  docs: {
    autodocs: 'tag',
  },
};
```

```javascript
// .storybook/preview.js
import '../src/styles/globals.css';
import { tokens } from '../src/tokens';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    theme: {
      colorPrimary: tokens.colors.primary,
      colorSecondary: tokens.colors.secondary,
    },
  },
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'light',
        value: tokens.colors.background,
      },
      {
        name: 'dark',
        value: '#2A2023',
      },
    ],
  },
  viewport: {
    viewports: {
      mobile: {
        name: 'Mobile',
        styles: {
          width: '375px',
          height: '667px',
        },
      },
      tablet: {
        name: 'Tablet',
        styles: {
          width: '768px',
          height: '1024px',
        },
      },
      desktop: {
        name: 'Desktop',
        styles: {
          width: '1200px',
          height: '800px',
        },
      },
    },
  },
};

export const globalTypes = {
  theme: {
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      title: 'Theme',
      icon: 'circlehollow',
      items: ['light', 'dark'],
      dynamicTitle: true,
    },
  },
};

const withThemeProvider = (Story, context) => {
  const theme = context.globals.theme || 'light';

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="bg-background text-foreground min-h-screen p-4">
        <Story />
      </div>
    </div>
  );
};

export const decorators = [withThemeProvider];
```

##### Component Stories

```typescript
// Button.stories.tsx - Storybook stories
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible button component with multiple variants and sizes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary', 'danger'],
      description: 'The visual style variant of the button',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'The size of the button',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Whether the button is in a loading state',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the button is disabled',
    },
    children: {
      control: { type: 'text' },
      description: 'The content of the button',
    },
  },
  args: {
    children: 'Button',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
        <Button variant="danger">Danger</Button>
      </div>
      <div className="flex gap-4">
        <Button variant="primary" loading>Loading</Button>
        <Button variant="secondary" disabled>Disabled</Button>
      </div>
    </div>
  ),
};
```

---

## Design Tokens

### Token Categories

#### Core Tokens

```json
{
  "color": {
    "base": {
      "transparent": { "value": "transparent" },
      "current": { "value": "currentColor" },
      "white": { "value": "#ffffff" },
      "black": { "value": "#000000" }
    },
    "gray": {
      "50": { "value": "#f9fafb" },
      "100": { "value": "#f3f4f6" },
      "200": { "value": "#e5e7eb" },
      "300": { "value": "#d1d5db" },
      "400": { "value": "#9ca3af" },
      "500": { "value": "#6b7280" },
      "600": { "value": "#4b5563" },
      "700": { "value": "#374151" },
      "800": { "value": "#1f2937" },
      "900": { "value": "#111827" }
    },
    "warm-sunset": {
      "primary": { "value": "#FA906E" },
      "secondary": { "value": "#FDE6DE" },
      "accent": { "value": "#F5BC5E" },
      "muted": { "value": "#F5F1EB" }
    }
  },
  "space": {
    "0": { "value": "0" },
    "1": { "value": "0.25rem" },
    "2": { "value": "0.5rem" },
    "3": { "value": "0.75rem" },
    "4": { "value": "1rem" },
    "5": { "value": "1.25rem" },
    "6": { "value": "1.5rem" },
    "8": { "value": "2rem" },
    "10": { "value": "2.5rem" },
    "12": { "value": "3rem" },
    "16": { "value": "4rem" },
    "20": { "value": "5rem" },
    "24": { "value": "6rem" },
    "32": { "value": "8rem" }
  }
}
```

#### Semantic Tokens

```json
{
  "color": {
    "text": {
      "primary": { "value": "{color.warm-sunset.foreground}" },
      "secondary": { "value": "{color.warm-sunset.muted-text}" },
      "disabled": { "value": "{color.gray.400}" },
      "inverse": { "value": "{color.warm-sunset.background}" }
    },
    "background": {
      "primary": { "value": "{color.warm-sunset.background}" },
      "secondary": { "value": "{color.warm-sunset.secondary}" },
      "muted": { "value": "{color.warm-sunset.muted}" }
    },
    "border": {
      "default": { "value": "{color.warm-sunset.border}" },
      "muted": { "value": "{color.gray.200}" },
      "strong": { "value": "{color.gray.300}" }
    },
    "action": {
      "primary": { "value": "{color.warm-sunset.primary}" },
      "secondary": { "value": "{color.warm-sunset.secondary}" },
      "tertiary": { "value": "transparent" }
    },
    "feedback": {
      "success": { "value": "{color.warm-sunset.success}" },
      "warning": { "value": "{color.warm-sunset.warning}" },
      "error": { "value": "{color.warm-sunset.error}" },
      "info": { "value": "{color.warm-sunset.info}" }
    }
  }
}
```

#### Component Tokens

```json
{
  "component": {
    "button": {
      "primary": {
        "background": { "value": "{color.action.primary}" },
        "text": { "value": "{color.text.inverse}" },
        "border": { "value": "{color.action.primary}" }
      },
      "secondary": {
        "background": { "value": "{color.background.secondary}" },
        "text": { "value": "{color.text.primary}" },
        "border": { "value": "{color.border.default}" }
      },
      "padding": {
        "x": { "value": "{space.6}" },
        "y": { "value": "{space.3}" }
      },
      "border-radius": { "value": "{border-radius.lg}" },
      "font-weight": { "value": "{font-weight.semibold}" }
    },
    "input": {
      "background": { "value": "{color.background.primary}" },
      "text": { "value": "{color.text.primary}" },
      "border": { "value": "{color.border.default}" },
      "border-focus": { "value": "{color.action.primary}" },
      "padding": {
        "x": { "value": "{space.4}" },
        "y": { "value": "{space.3}" }
      },
      "border-radius": { "value": "{border-radius.lg}" }
    },
    "card": {
      "background": { "value": "{color.background.primary}" },
      "border": { "value": "{color.border.default}" },
      "border-radius": { "value": "{border-radius.xl}" },
      "padding": { "value": "{space.6}" },
      "shadow": { "value": "{shadow.sm}" }
    }
  }
}
```

### Platform Exports

#### CSS Variables Export
```css
:root {
  /* Core tokens */
  --color-primary: #FA906E;
  --color-secondary: #FDE6DE;
  --color-accent: #F5BC5E;
  --space-4: 1rem;
  --space-6: 1.5rem;

  /* Semantic tokens */
  --color-text-primary: var(--color-foreground);
  --color-text-secondary: var(--color-muted-text);
  --color-background-primary: var(--color-background);
  --color-background-secondary: var(--color-secondary);

  /* Component tokens */
  --button-primary-background: var(--color-primary);
  --button-primary-text: var(--color-background);
  --button-padding-x: var(--space-6);
  --button-padding-y: var(--space-3);
}
```

#### JavaScript/TypeScript Export
```typescript
export const tokens = {
  color: {
    primary: '#FA906E',
    secondary: '#FDE6DE',
    accent: '#F5BC5E',
    text: {
      primary: 'var(--color-foreground)',
      secondary: 'var(--color-muted-text)',
    },
    background: {
      primary: 'var(--color-background)',
      secondary: 'var(--color-secondary)',
    },
  },
  space: {
    4: '1rem',
    6: '1.5rem',
  },
  component: {
    button: {
      primary: {
        background: 'var(--color-primary)',
        text: 'var(--color-background)',
        paddingX: 'var(--space-6)',
        paddingY: 'var(--space-3)',
      },
    },
  },
} as const;
```

#### iOS/Swift Export
```swift
// DesignTokens.swift
import UIKit

struct DesignTokens {
    struct Color {
        static let primary = UIColor(hex: "#FA906E")
        static let secondary = UIColor(hex: "#FDE6DE")
        static let accent = UIColor(hex: "#F5BC5E")

        struct Text {
            static let primary = UIColor(hex: "#384242")
            static let secondary = UIColor(hex: "#95726A")
        }

        struct Background {
            static let primary = UIColor(hex: "#FAF4F2")
            static let secondary = UIColor(hex: "#FDE6DE")
        }
    }

    struct Spacing {
        static let xs: CGFloat = 4
        static let sm: CGFloat = 8
        static let md: CGFloat = 16
        static let lg: CGFloat = 24
        static let xl: CGFloat = 32
    }

    struct Typography {
        static let fontFamily = "Inter"

        struct FontSize {
            static let small: CGFloat = 14
            static let medium: CGFloat = 16
            static let large: CGFloat = 18
            static let xlarge: CGFloat = 20
        }

        struct FontWeight {
            static let regular = UIFont.Weight.regular
            static let medium = UIFont.Weight.medium
            static let semibold = UIFont.Weight.semibold
            static let bold = UIFont.Weight.bold
        }
    }

    struct BorderRadius {
        static let small: CGFloat = 4
        static let medium: CGFloat = 8
        static let large: CGFloat = 12
        static let xlarge: CGFloat = 16
    }
}

extension UIColor {
    convenience init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (1, 1, 1, 0)
        }

        self.init(
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue: Double(b) / 255,
            alpha: Double(a) / 255
        )
    }
}
```

#### Android/Kotlin Export
```kotlin
// DesignTokens.kt
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

object DesignTokens {
    object Colors {
        val Primary = Color(0xFFFA906E)
        val Secondary = Color(0xFFFDE6DE)
        val Accent = Color(0xFFF5BC5E)

        object Text {
            val Primary = Color(0xFF384242)
            val Secondary = Color(0xFF95726A)
        }

        object Background {
            val Primary = Color(0xFFFAF4F2)
            val Secondary = Color(0xFFFDE6DE)
        }
    }

    object Spacing {
        val ExtraSmall = 4.dp
        val Small = 8.dp
        val Medium = 16.dp
        val Large = 24.dp
        val ExtraLarge = 32.dp
    }

    object Typography {
        const val FontFamily = "Inter"

        object FontSize {
            val Small = 14.sp
            val Medium = 16.sp
            val Large = 18.sp
            val ExtraLarge = 20.sp
        }
    }

    object BorderRadius {
        val Small = 4.dp
        val Medium = 8.dp
        val Large = 12.dp
        val ExtraLarge = 16.dp
    }
}
```

---

This comprehensive design system provides everything needed to create consistent, accessible, and delightful user experiences across all platforms and touchpoints. The warm sunset color palette creates an inviting atmosphere while maintaining professional standards and accessibility compliance.

The system is designed to be:
- **Scalable**: Works across all device sizes and platforms
- **Accessible**: Meets WCAG 2.1 AA standards
- **Maintainable**: Uses design tokens for easy updates
- **Flexible**: Supports customization while maintaining consistency
- **Developer-friendly**: Includes comprehensive documentation and testing strategies

Regular updates and community feedback will help evolve this system to meet changing needs while preserving its core warmth and usability principles.