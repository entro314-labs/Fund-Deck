# FundDeck

A comprehensive web application for creating professional investor presentations and business documentation. Built by entrepreneurs, for entrepreneurs.

Transform your startup's story into investor-ready presentations with FundDeck's complete documentation suite.

## What It Is

FundDeck provides a structured way to create, manage, and present all the essential documents startups need when raising capital or seeking investment. It transforms complex business planning into organized, professional presentations that investors expect to see.

## Key Features

- **Complete Investment Documentation Suite** - Everything from executive summaries to detailed financial models
- **Real-time Live Dashboard** - Dynamic metrics and performance tracking
- **Professional Presentation Templates** - Investor-ready layouts and designs  
- **Comprehensive Business Planning** - Strategic plans, market analysis, risk assessment
- **Multiple Export Formats** - PDF generation, presentation modes
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Authentication & Access Control** - Secure document sharing with investors

## Document Types Included

### Core Business Documents
- Strategic Business Plan
- Financial Model & Economics  
- Investor Presentation Package
- Market & Competitive Analysis

### Supporting Materials
- Executive Summary
- One-Page Company Overview
- Product/Technical Overview
- Live Metrics Dashboard

### Operational Documents  
- Risk Assessment & Mitigation
- Growth Strategy & Execution
- Milestones & Timeline Tracking
- Exit Strategy Analysis

## Tech Stack

- **Framework:** Next.js 15 (React 19)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4.0
- **UI Components:** Radix UI + shadcn/ui
- **Authentication:** Clerk
- **Data Management:** Zustand + TanStack Query
- **Charts & Visualization:** Recharts
- **PDF Export:** jsPDF
- **Code Quality:** Biome (linting/formatting)
- **Testing:** Vitest + Testing Library
- **Package Manager:** pnpm

## Getting Started

🚀 **[View Live Demo](https://fund-deck.vercel.app)** - See Fund Deck in action with our public demo!

### Demo Mode vs Production

**Demo Mode** (enabled by default for public showcasing):
- ✅ All pages publicly accessible 
- ✅ Admin features protected with "Fork on GitHub" message
- ✅ Perfect for exploring the template
- ✅ No authentication or Clerk keys required
- ✅ Builds and deploys without configuration

**Production Mode** (for your own investor deck):
- 🔒 Full authentication with Clerk
- 🔒 Admin panel with data management
- 🔒 Secure investor access controls  
- 🔒 Google Sheets integration
- 🔒 Requires Clerk publishable and secret keys

See [DEMO_MODE.md](./DEMO_MODE.md) for complete configuration details and implementation guide.

### Prerequisites

- Node.js 22.x or later
- pnpm 10.14.0 or later

### Installation

1. Clone the repository:
```bash
git clone https://github.com/entro314-labs/Fund-Deck.git
cd Fund-Deck
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# For demo mode (default): no changes needed
# For production: edit .env.local with your Clerk keys
```

4. Start the development server:
```bash
pnpm dev
```

Visit `http://localhost:3000` to see the application running.

### Environment Setup

**For Demo Mode (default):**
```env
# Demo mode - no authentication required
NEXT_PUBLIC_DEMO_MODE=true
```

**For Production Mode:**
```env
# Disable demo mode and enable authentication  
NEXT_PUBLIC_DEMO_MODE=false

# Clerk Authentication (required)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Optional: Google Sheets integration
GOOGLE_SHEETS_API_KEY=your_google_api_key
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id
```

**Quick Production Setup:**
1. [Create a Clerk account](https://clerk.com) and get your API keys
2. Set `NEXT_PUBLIC_DEMO_MODE=false` in `.env.local`  
3. Add your Clerk keys to `.env.local`
4. Configure admin emails in `src/components/admin-guard.tsx`

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── (auth)/            # Authentication pages  
│   ├── api/               # API routes
│   └── [business-docs]/   # Document pages
├── components/            # React components
│   └── ui/               # shadcn/ui components
├── data/                 # JSON data and configurations
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and configurations
└── types/                # TypeScript type definitions
```

## Usage

### Creating Your Investor Deck

1. **Start with the Dashboard** - Overview of all documents and quick stats
2. **Core Documents** - Complete the main business documents (Business Plan, Financial Model, Investor Package, Market Analysis)  
3. **Supporting Materials** - Add Executive Summary, One-Pager, and Product Overview
4. **Operational Docs** - Fill in Risk Assessment, Growth Strategy, Milestones, and Exit Strategy
5. **Live Dashboard** - Set up real-time metrics for ongoing investor updates

### Customizing Content

- Edit JSON files in `src/data/pages/` to update document content
- Modify layouts and styling in the corresponding page components
- Add new document types by creating new pages and data files

### Deployment

Build for production:
```bash
pnpm build
```

The app is optimized for deployment on Vercel, Netlify, or any platform supporting Next.js.

## Development Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm dev:turbopack    # Development with Turbopack

# Building
pnpm build            # Production build  
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run linter
pnpm format           # Format code
pnpm typecheck        # TypeScript checking
pnpm validate         # Full validation suite

# Testing  
pnpm test             # Unit tests
pnpm test:e2e         # End-to-end tests
```

## Contributing

This project is open source and contributions are welcome! Whether you're a startup founder who's found bugs, a developer who wants to add features, or someone with ideas for improvements.

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## License

MIT License - see [LICENSE](LICENSE) for details.

## From One Founder to Another

This platform was built out of the frustration of creating countless investor decks and business documents. Every startup needs these materials, but creating them from scratch is time-consuming and often results in inconsistent or incomplete documentation.

The goal is to help fellow entrepreneurs focus on building their businesses rather than wrestling with presentation software and document formatting.

If this helps your startup succeed, that's worth more than any GitHub star.

## Support

- Open an issue for bugs or feature requests
- Check existing issues before creating new ones
- For setup questions, refer to the documentation first

---

Built with ❤️ by startup founders, for startup founders.