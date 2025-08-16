# FundDeck

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D22.0.0-brightgreen.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-Canary-black.svg)](https://nextjs.org/)

</div>

<div align="center">

![FundDeck - Professional investor presentation platform](./public/images/og.png)

**Professional investor presentation platform for startups and entrepreneurs**

A comprehensive, customizable platform for creating sophisticated investor pitch decks and financial presentations.

</div>

FundDeck revolutionizes investor presentations by providing a professional, data-driven platform. This tool helps startups and entrepreneurs create compelling pitch decks and provides investors with an interactive, engaging experience to evaluate investment opportunities.

## Features

<table>
<tr>
<td align="center" width="50%">

<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" fill="#6366F1"/>
</svg>

**Interactive Dashboard**  
Real-time metrics and KPIs with dynamic visualizations

</td>
<td align="center" width="50%">

<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" fill="#10B981"/>
</svg>

**Secure Admin Panel**  
Role-based access control with Clerk authentication

</td>
</tr>
<tr>
<td align="center">

<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" fill="#8B5CF6"/>
<path d="M14 2v6h6" fill="none" stroke="white" stroke-width="2"/>
</svg>

**Dynamic Content Management**  
Edit and manage all content through intuitive interfaces

</td>
<td align="center">

<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" fill="#F59E0B"/>
</svg>

**Professional Presentations**  
Export-ready pitch decks with customizable templates

</td>
</tr>
</table>

## Quick Start

<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" fill="#059669"/>
</svg>

### Prerequisites

- **Node.js**: >= 22.0.0
- **pnpm**: >= 10.14.0
- **Git**: Latest version

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/fund-deck.git
cd fund-deck

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Run development server
pnpm dev
```

### Basic Usage

```bash
# Development server
pnpm dev                     # Start development server on localhost:3000

# Building
pnpm build                   # Build for production
pnpm start                   # Start production server

# Testing
pnpm test                    # Run unit tests
pnpm test:e2e               # Run end-to-end tests

# Code quality
pnpm lint                    # Lint code with Biome
pnpm typecheck              # Type checking with TypeScript
pnpm validate               # Run all validation checks
```

That's it! Your FundDeck platform is ready to use.

## How It Works

1. **Authentication**: Secure login via Clerk with role-based access control
2. **Content Management**: Edit all page content through the admin panel
3. **Data Visualization**: Real-time charts and metrics powered by Recharts
4. **Export**: Generate professional PDF presentations and Excel reports
5. **Deployment**: Ready for production with Vercel or Docker

## Supported Technologies

<div align="center">

<table>
<tr>
<td align="center">

<svg width="32" height="32" viewBox="0 0 24 24" fill="#61DAFB">
<path d="M12 10.11c1.03 0 1.87.84 1.87 1.89s-.84 1.85-1.87 1.85-1.87-.82-1.87-1.85.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9s-1.17 0-1.71.03c-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03s1.17 0 1.71-.03c.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.37 1.95-1.47-.84-1.63-3.05-1.01-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1.01-5.63 1.46-.84 3.45.12 5.37 1.95 1.92-1.83 3.91-2.79 5.37-1.95"/>
</svg>

**Frontend**  
React 19, Next.js (Canary)  
TypeScript, Tailwind CSS

</td>
<td align="center">

<svg width="32" height="32" viewBox="0 0 24 24" fill="#339933">
<path d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l7.44 4.3c.46.26 1.04.26 1.5 0l7.44-4.3c.48-.28.78-.8.78-1.36V7.71c0-.56-.3-1.08-.78-1.36l-7.44-4.3c-.23-.13-.51-.2-.78-.2zm0 2.03c.13 0 .27.04.39.11l6.9 4v.81L12 12.6 4.71 8.8v-.81l6.9-4c.12-.07.26-.11.39-.11zM5.05 9.85l6.95 4.01v7.79c-.13 0-.27-.04-.39-.11l-6.9-4c-.23-.13-.39-.39-.39-.68v-6.68c0-.11.02-.22.05-.33zm13.9 0c.03.11.05.22.05.33v6.68c0 .29-.16.55-.39.68l-6.9 4c-.12.07-.26.11-.39.11v-7.79l6.95-4.01z"/>
</svg>

**Runtime**  
Node.js 22+  
Vercel, Docker

</td>
</tr>
<tr>
<td align="center">

<svg width="32" height="32" viewBox="0 0 24 24" fill="#3178C6">
<path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
</svg>

**Languages**  
TypeScript, JavaScript  
Modern ES2024+ features

</td>
<td align="center">

<svg width="32" height="32" viewBox="0 0 24 24" fill="#06B6D4">
<path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
</svg>

**Tools & Services**  
Clerk Auth, Radix UI  
Recharts, Zustand, TanStack Query

</td>
</tr>
</table>

</div>

## Core Commands

<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4 6h16v2H4V6zm0 4h4v2H4v-2zm6 0h10v2H10v-2zm-6 4h4v2H4v-2zm6 0h10v2H10v-2z" fill="#374151"/>
</svg>

```bash
# Development
pnpm dev                     # Start development server with hot reload
pnpm dev:turbopack          # Development with Turbopack (faster builds)
pnpm dev:bun                # Development with Bun runtime

# Building & Production
pnpm build                  # Build for production
pnpm build:turbopack        # Build with Turbopack
pnpm start                  # Start production server

# Code Quality
pnpm lint                   # Lint code with Biome
pnpm lint:fix               # Auto-fix linting issues
pnpm format                 # Format code with Biome
pnpm typecheck              # TypeScript type checking
pnpm validate               # Run all validation checks

# Testing
pnpm test                   # Run unit tests with Vitest
pnpm test:ui                # Run tests with UI
pnpm test:e2e               # Run end-to-end tests with Playwright
pnpm test:ci                # Run tests in CI mode with coverage

# Database & Services
pnpm db:setup               # Set up database
pnpm types:local            # Generate types from local database
pnpm auth:check             # Validate authentication setup

# Performance & Analysis
pnpm analyze                # Bundle analysis
pnpm perf:lighthouse        # Performance audit with Lighthouse
pnpm security:audit         # Security audit
```

## Configuration

Environment variables configuration in `.env.local`:

```bash
# Database Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Company Configuration
NEXT_PUBLIC_COMPANY_NAME=MyRoomie
NEXT_PUBLIC_COMPANY_DOMAIN=myroomie.com
ADMIN_EMAILS=admin@company.com,contact@company.com

# Analytics (Optional)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin panel pages
│   ├── api/               # API routes
│   └── (auth)/            # Authentication routes
├── components/            # Reusable React components
│   ├── ui/               # UI components (shadcn/ui)
│   └── charts/           # Chart components
├── data/                 # JSON data files
│   ├── pages/            # Page-specific data
│   └── shared/           # Shared data
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── stores/               # Zustand state management
├── styles/               # Global styles
└── types/                # TypeScript type definitions
```

## Examples

### Setting Up Authentication

```bash
# Install Clerk dependencies (already included)
pnpm add @clerk/nextjs

# Configure environment variables
echo 'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key' >> .env.local
echo 'CLERK_SECRET_KEY=your_secret' >> .env.local

# Add admin email
echo 'ADMIN_EMAILS=your-email@company.com' >> .env.local
```

### Adding New Page Content

```typescript
// src/data/pages/my-new-page.json
{
  "meta": {
    "title": "My New Page",
    "subtitle": "Page description",
    "date": "2024-01-01"
  },
  "keyMetrics": [
    {
      "id": "metric1",
      "title": "Revenue",
      "value": 1000000,
      "prefix": "€",
      "suffix": "M"
    }
  ]
}
```

### Customizing Charts

```typescript
// src/components/charts/custom-chart.tsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function CustomChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#6366F1" />
      </BarChart>
    </ResponsiveContainer>
  );
}
```

## Documentation

- **[Getting Started Guide](./docs/getting-started.md)** - Complete setup instructions
- **[API Reference](./docs/api-reference.md)** - All commands and options
- **[Configuration](./docs/configuration.md)** - Advanced configuration
- **[Examples](./docs/examples.md)** - Real-world usage examples
- **[Migration Guide](./MIGRATION_GUIDE.md)** - Upgrading between versions
- **[Clerk Setup](./CLERK_SETUP.md)** - Authentication configuration

## Contributing

<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" fill="#7C3AED"/>
</svg>

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

- [Report bugs](https://github.com/yourusername/fund-deck/issues)
- [Request features](https://github.com/yourusername/fund-deck/issues)
- [Improve documentation](./docs/)
- [Submit pull requests](https://github.com/yourusername/fund-deck/pulls)

### Development Workflow

```bash
# Fork and clone the repository
git clone https://github.com/yourusername/fund-deck.git
cd fund-deck

# Create a feature branch
git checkout -b feature/your-feature-name

# Install dependencies
pnpm install

# Make your changes and test
pnpm validate
pnpm test

# Commit using conventional commits
pnpm commit

# Push and create a pull request
git push origin feature/your-feature-name
```

## Roadmap

<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z" fill="#0891B2"/>
</svg>

- [ ] **Multi-language Support** - Internationalization for global users
- [ ] **Advanced Analytics** - Enhanced metrics and reporting features
- [ ] **API Integration** - Connect with external data sources
- [ ] **Mobile App** - React Native companion app
- [ ] **White-label Solution** - Customizable branding for agencies
- [ ] **AI-powered Insights** - Smart recommendations and analysis

## Requirements

<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 18c1.1 0 1.99-.9 1.99-2L22 5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2H0c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2h-4zM4 5h16v11H4V5zm8 14c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" fill="#6B7280"/>
</svg>

- **Node.js**: >= 22.0.0
- **pnpm**: >= 10.14.0
- **Operating System**: Windows, macOS, Linux
- **Modern Browser**: Chrome, Firefox, Safari, Edge

## License

<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" fill="#9CA3AF"/>
<path d="M14 2v6h6" fill="none" stroke="white" stroke-width="2"/>
</svg>

MIT License - see the [LICENSE](LICENSE) file for details.

## Support

<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#059669"/>
</svg>

- **Email**: <support@myroomie.com>
- **GitHub Issues**: [Report Issues](https://github.com/yourusername/fund-deck/issues)
- **Documentation**: [View Docs](./docs/)
- **Contributing**: [Contribution Guide](./CONTRIBUTING.md)

---

<div align="center">

**Made with ❤️ by the FundDeck Team**

[Website](https://myroomie.com) • [Documentation](./docs/) • [Issues](https://github.com/yourusername/fund-deck/issues) • [Contributing](./CONTRIBUTING.md)

</div>