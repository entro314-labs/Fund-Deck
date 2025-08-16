# Getting Started with FundDeck

<div align="center">

<svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" fill="#10B981"/>
</svg>

**Complete setup guide for FundDeck**

Everything you need to get your investor presentation platform up and running.

</div>

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software

- **Node.js**: Version 22.0.0 or higher
  ```bash
  # Check your version
  node --version
  
  # Download from https://nodejs.org/ if needed
  ```

- **pnpm**: Version 10.14.0 or higher
  ```bash
  # Install pnpm globally
  npm install -g pnpm
  
  # Check your version
  pnpm --version
  ```

- **Git**: Latest version
  ```bash
  # Check your version
  git --version
  
  # Download from https://git-scm.com/ if needed
  ```

### Optional Tools

- **Visual Studio Code**: Recommended IDE with extensions:
  - TypeScript support
  - Tailwind CSS IntelliSense
  - Biome (for linting/formatting)
  - Thunder Client (for API testing)

## 🚀 Installation

### 1. Clone the Repository

```bash
# Clone via HTTPS
git clone https://github.com/yourusername/fund-deck.git

# Or clone via SSH (if you have SSH keys set up)
git clone git@github.com:yourusername/fund-deck.git

# Navigate to the project directory
cd fund-deck
```

### 2. Install Dependencies

```bash
# Install all project dependencies
pnpm install

# This will install:
# - Next.js and React
# - TypeScript and related tools
# - UI components (Radix UI, shadcn/ui)
# - Authentication (Clerk)
# - Charts and visualization libraries
# - Development tools (Biome, Vitest, etc.)
```

### 3. Environment Configuration

Copy the example environment file and configure it:

```bash
# Copy the example file
cp .env.example .env.local

# Open the file in your editor
code .env.local  # VS Code
nano .env.local  # Terminal editor
```

#### Required Environment Variables

```bash
# Authentication (Clerk) - Required
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here

# Clerk URLs (Optional - defaults provided)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Company Configuration (Optional - defaults to MyRoomie)
NEXT_PUBLIC_COMPANY_NAME=YourCompanyName
NEXT_PUBLIC_COMPANY_DOMAIN=yourcompany.com
NEXT_PUBLIC_SUPPORT_EMAIL=support@yourcompany.com

# Admin Access (Required for admin panel)
ADMIN_EMAILS=admin@yourcompany.com,founder@yourcompany.com

# Analytics (Optional)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id
```

#### Setting Up Clerk Authentication

1. **Create a Clerk Account**
   - Visit [clerk.com](https://clerk.com) and sign up
   - Create a new application

2. **Configure Clerk Settings**
   - Go to your Clerk dashboard
   - Navigate to "API Keys" section
   - Copy the publishable key and secret key
   - Paste them into your `.env.local` file

3. **Set Up Sign-in/Sign-up Pages**
   - In Clerk dashboard, go to "User & Authentication" > "Email, Phone, Username"
   - Configure your preferred authentication methods
   - Set up OAuth providers if desired (Google, GitHub, etc.)

### 4. Start Development Server

```bash
# Start the development server
pnpm dev

# The application will be available at:
# http://localhost:3000
```

#### Alternative Development Commands

```bash
# Start with Turbopack (faster builds)
pnpm dev:turbopack

# Start with Bun runtime (if you have Bun installed)
pnpm dev:bun
```

## 🔧 Development Workflow

### Daily Development Commands

```bash
# Start development
pnpm dev

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Type checking
pnpm typecheck

# Lint and format code
pnpm lint
pnpm format

# Run all validation checks
pnpm validate
```

### Building for Production

```bash
# Build the application
pnpm build

# Start production server locally
pnpm start

# Run production build with Turbopack
pnpm build:turbopack
```

## 📁 Project Structure Overview

```
fund-deck/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication pages
│   │   ├── admin/             # Admin panel
│   │   ├── api/               # API routes
│   │   └── [pages]/           # Dynamic pages
│   ├── components/            # React components
│   │   ├── ui/               # Base UI components
│   │   ├── charts/           # Chart components
│   │   └── forms/            # Form components
│   ├── data/                 # JSON data files
│   │   ├── pages/            # Page data
│   │   └── shared/           # Shared config
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utilities and config
│   ├── stores/               # State management
│   ├── styles/               # Global styles
│   └── types/                # TypeScript types
├── docs/                     # Documentation
├── public/                   # Static assets
└── config files              # Various config files
```

## 🎯 First Steps After Installation

### 1. Explore the Application

1. **Visit the Homepage**: `http://localhost:3000`
2. **Try Authentication**: Sign up for an account
3. **Access Admin Panel**: If your email is in `ADMIN_EMAILS`, visit `/admin`
4. **Explore Pages**: Navigate through different document types

### 2. Customize Your Company Information

Edit the company configuration in `.env.local`:

```bash
NEXT_PUBLIC_COMPANY_NAME=YourStartupName
NEXT_PUBLIC_COMPANY_DOMAIN=yourstartup.com
NEXT_PUBLIC_SUPPORT_EMAIL=support@yourstartup.com
```

### 3. Update Content

The application uses JSON files for content management:

```bash
# Edit page content
src/data/pages/dashboard.json      # Dashboard metrics
src/data/pages/financial-model.json   # Financial data
src/data/pages/executive-summary.json # Executive summary
# ... and more
```

### 4. Test Core Features

- **Authentication**: Sign up/sign in process
- **Admin Panel**: Content editing (if you have admin access)
- **Data Visualization**: Charts and metrics display
- **Export Features**: PDF generation and data export
- **Responsive Design**: Test on mobile devices

## 🔍 Troubleshooting

### Common Issues

#### Node.js Version Issues
```bash
# Check your Node.js version
node --version

# If using nvm, switch to correct version
nvm use 22
# or
nvm install 22 && nvm use 22
```

#### pnpm Issues
```bash
# Clear pnpm cache
pnpm store prune

# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

#### Environment Variables Not Loading
```bash
# Ensure .env.local is in the root directory
ls -la .env.local

# Restart the development server
pnpm dev
```

#### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Clear all caches and reinstall
pnpm clean && pnpm install

# Run type checking
pnpm typecheck
```

#### Authentication Issues
1. Verify Clerk keys are correct in `.env.local`
2. Check Clerk dashboard for application settings
3. Ensure admin emails are correctly formatted
4. Clear browser cache and cookies

### Getting Help

If you encounter issues:

1. **Check the logs**: Development server console output
2. **Search existing issues**: [GitHub Issues](https://github.com/yourusername/fund-deck/issues)
3. **Create a new issue**: Include error messages and steps to reproduce
4. **Check documentation**: Review other docs in this folder

## 🚀 Next Steps

Now that you have FundDeck running locally:

1. **[Configuration Guide](./configuration.md)** - Advanced configuration options
2. **[API Reference](./api-reference.md)** - Understanding the API structure
3. **[Examples](./examples.md)** - Common customization examples
4. **[Contributing Guide](../CONTRIBUTING.md)** - How to contribute to the project

---

<div align="center">

**Ready to build your investor presentation?**

[Start Customizing](./configuration.md) • [View Examples](./examples.md) • [API Reference](./api-reference.md)

</div>