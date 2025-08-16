# Contributing to FundDeck

<div align="center">

<svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" fill="#6366F1"/>
</svg>

**Welcome to the FundDeck community!**

Thank you for your interest in contributing to FundDeck. This platform was built by entrepreneurs for entrepreneurs, and we welcome contributions from developers, designers, and startup founders alike.

</div>

---

## 🚀 Ways to Contribute

<table>
<tr>
<td align="center" width="25%">

<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" fill="#EF4444"/>
</svg>

**Bug Reports**  
Found an issue? Help us fix it!

</td>
<td align="center" width="25%">

<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2.5-9L12 6 4.5 2 2 4.5 6 12l6 6 6-6 4-7.5z" fill="#10B981"/>
</svg>

**Features**  
Have a great idea? Let's discuss it!

</td>
<td align="center" width="25%">

<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" fill="#8B5CF6"/>
<path d="M14 2v6h6" fill="none" stroke="white" stroke-width="2"/>
</svg>

**Documentation**  
Help others understand the platform

</td>
<td align="center" width="25%">

<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" fill="#F59E0B"/>
</svg>

**Code Review**  
Share your expertise and insights

</td>
</tr>
</table>

## 🛠️ Development Setup

### Prerequisites

- **Node.js**: >= 22.0.0
- **pnpm**: >= 10.14.0
- **Git**: Latest version

### Quick Start

```bash
# 1. Fork and clone
git clone https://github.com/yourusername/fund-deck.git
cd fund-deck

# 2. Install dependencies
pnpm install

# 3. Set up environment
cp .env.example .env.local
# Edit .env.local with your configuration

# 4. Start development
pnpm dev

# 5. Run tests
pnpm test

# 6. Validate your code
pnpm validate
```

### Development Workflow

```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Make your changes and test them
pnpm dev
pnpm test
pnpm validate

# Commit with conventional commits
pnpm commit

# Push and create a PR
git push origin feature/your-feature-name
```

## 📋 Code Standards

### TypeScript & Code Style

- **TypeScript First**: All new code should be written in TypeScript
- **Biome**: We use Biome for linting and formatting (runs automatically)
- **Naming**: Use descriptive, self-documenting names
- **Comments**: Add JSDoc comments for complex functions and APIs

### Component Guidelines

```typescript
// ✅ Good: Descriptive component with proper typing
interface UserMetricsProps {
  userId: string;
  metrics: FinancialMetric[];
  onMetricUpdate?: (metric: FinancialMetric) => void;
}

export function UserMetrics({ userId, metrics, onMetricUpdate }: UserMetricsProps) {
  // Component implementation
}

// ❌ Avoid: Unclear props and naming
function Comp({ data, cb }: any) {
  // Implementation
}
```

### File Structure Conventions

```
src/
├── app/                    # Next.js App Router pages
├── components/            # Reusable React components
│   ├── ui/               # shadcn/ui base components
│   ├── charts/           # Chart components
│   └── forms/            # Form components
├── data/                 # JSON data files
│   ├── pages/            # Page-specific data
│   └── shared/           # Shared configuration
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configurations
├── stores/               # Zustand state management
└── types/                # TypeScript type definitions
```

## 📝 Pull Request Process

### Before You Submit

```bash
# Always run the full validation suite
pnpm validate:full

# Ensure all tests pass
pnpm test:ci

# Run end-to-end tests
pnpm test:e2e
```

### Commit Message Format

We use [Conventional Commits](https://conventionalcommits.org/) for clear, structured commit messages:

```bash
# Feature additions
feat: add investor deck export functionality
feat(admin): implement role-based access control

# Bug fixes
fix: resolve mobile navigation overflow issue
fix(auth): handle expired token gracefully

# Documentation
docs: update installation guide
docs(api): add JSDoc comments to data hooks

# Performance improvements
perf: optimize chart rendering with lazy loading

# Refactoring
refactor: extract chart utilities into hooks
```

### Pull Request Template

When creating a PR, please include:

1. **Summary**: Brief description of changes
2. **Motivation**: Why is this change needed?
3. **Testing**: How to test the changes
4. **Screenshots**: For UI changes
5. **Breaking Changes**: If any, list them
6. **Issues**: Link related issues with `Fixes #123`

## 🧪 Testing Guidelines

### Test Types

- **Unit Tests**: Test individual functions and components
- **Integration Tests**: Test component interactions
- **E2E Tests**: Test complete user workflows

### Writing Tests

```typescript
// Example component test
import { render, screen } from '@testing-library/react';
import { UserMetrics } from './user-metrics';

describe('UserMetrics', () => {
  it('displays metrics correctly', () => {
    const metrics = [
      { id: '1', title: 'Revenue', value: 1000000, prefix: '€' }
    ];
    
    render(<UserMetrics metrics={metrics} />);
    
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('€1,000,000')).toBeInTheDocument();
  });
});
```

### Test Commands

```bash
# Run all tests
pnpm test

# Run tests with coverage
pnpm test:ci

# Run tests in watch mode
pnpm test:watch

# Run E2E tests
pnpm test:e2e

# Run E2E tests with UI
pnpm test:e2e:ui
```

## 🎯 Contribution Ideas

### 🟢 Good First Issues

Perfect for newcomers to the project:

- Fix typos in documentation
- Add loading states to components
- Improve mobile responsiveness
- Add new chart types to the visualization library
- Create new document templates
- Add form validation messages

### 🟡 Intermediate Contributions

For developers with some experience:

- Implement new admin panel features
- Add data export formats (Excel, CSV)
- Create reusable form components
- Add internationalization support
- Improve error handling and user feedback
- Add accessibility features

### 🔴 Advanced Contributions

For experienced developers:

- Real-time collaboration features
- Advanced analytics and reporting
- External API integrations
- Performance optimizations
- Advanced authentication features
- AI-powered content suggestions

## 📚 Adding New Document Types

One of the most valuable contributions is adding new document types:

### Step-by-Step Guide

1. **Create Data Structure**
   ```typescript
   // src/types/data.ts
   export interface MyNewDocumentData {
     meta: PageMeta;
     sections: DocumentSection[];
     keyMetrics?: Metric[];
   }
   ```

2. **Add JSON Data File**
   ```json
   // src/data/pages/my-new-document.json
   {
     "meta": {
       "title": "My New Document",
       "subtitle": "Document description"
     },
     "sections": []
   }
   ```

3. **Create Page Component**
   ```typescript
   // src/app/my-new-document/page.tsx
   import { MyNewDocumentPage } from '@/components/pages/my-new-document';
   
   export default function Page() {
     return <MyNewDocumentPage />;
   }
   ```

4. **Update Configuration**
   ```typescript
   // Add to navigation and admin panel configurations
   ```

5. **Add Tests**
   ```typescript
   // src/components/pages/__tests__/my-new-document.test.tsx
   ```

## 🤝 Community Guidelines

### Code of Conduct

- **Be welcoming**: Help newcomers feel welcome and supported
- **Be respectful**: Treat everyone with respect and consideration
- **Be collaborative**: Work together to build something great
- **Be constructive**: Provide helpful feedback and suggestions
- **Be patient**: Remember that everyone is learning

### Communication

- **Issues**: Use GitHub issues for bug reports and feature requests
- **Discussions**: Use GitHub Discussions for questions and ideas
- **Pull Requests**: Keep discussions focused on the code changes

### Getting Help

- **Documentation**: Check the docs first
- **Search**: Look through existing issues and discussions
- **Ask**: Don't hesitate to ask questions in issues or discussions

## 🏆 Recognition

We value all contributions and recognize them in various ways:

- **Contributors**: Listed in README.md and release notes
- **Major Features**: Special mention in project announcements
- **Community Impact**: Highlighted in project updates
- **Mentorship**: Opportunity to mentor other contributors

## 📄 License

By contributing to FundDeck, you agree that your contributions will be licensed under the MIT License that covers the project. This ensures that the project remains open and accessible to everyone.

---

<div align="center">

<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#10B981"/>
</svg>

**Thank you for helping make FundDeck better for the startup community!**

Together, we're building tools that help entrepreneurs succeed.

[Report a Bug](https://github.com/yourusername/fund-deck/issues) • [Request a Feature](https://github.com/yourusername/fund-deck/issues) • [Join Discussions](https://github.com/yourusername/fund-deck/discussions)

</div>