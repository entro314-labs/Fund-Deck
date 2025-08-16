# Contributing to Startup Slide Deck Platform

Thank you for considering contributing to this project! This platform was built by entrepreneurs for entrepreneurs, and we welcome contributions from the startup community.

## How to Contribute

### Issues
- **Bug Reports**: Found a bug? Open an issue with detailed reproduction steps
- **Feature Requests**: Have an idea? Describe the problem you're trying to solve  
- **Documentation**: Help improve documentation, setup guides, or code comments

### Pull Requests
All contributions are welcome, from typo fixes to major features.

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Create a new branch for your changes
4. Make your changes
5. Test your changes
6. Submit a pull request

### Development Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run the full validation suite before submitting
pnpm validate:full
```

## Code Guidelines

### Code Style
- Use TypeScript for all new code
- Follow existing code formatting (Biome handles this automatically)
- Use descriptive variable and function names
- Add JSDoc comments for complex functions

### Component Guidelines
- Keep components small and focused
- Use proper TypeScript typing
- Follow the existing component structure
- Place shared components in `src/components/`
- Use shadcn/ui components when possible

### Data Structure
- Document data lives in `src/data/pages/` as JSON files
- Keep data structure consistent with existing patterns
- Update TypeScript types when adding new fields

## Pull Request Process

1. **Create descriptive commit messages**
   ```bash
   feat: add risk assessment export feature
   fix: resolve mobile navigation issue
   docs: improve installation instructions
   ```

2. **Run validation before submitting**
   ```bash
   pnpm validate:full
   ```

3. **Write a clear PR description**
   - What does this change do?
   - Why is this change needed?
   - How should reviewers test it?

4. **Link relevant issues**
   - Reference any related issue numbers

## Testing

- Write tests for new functionality
- Update existing tests when changing behavior
- Ensure all tests pass before submitting

```bash
# Run tests
pnpm test

# Run with coverage
pnpm test:ci

# End-to-end tests  
pnpm test:e2e
```

## Documentation

When adding features:
- Update README.md if needed
- Add JSDoc comments to functions
- Update type definitions
- Consider adding examples

## Common Contribution Areas

### Easy First Contributions
- Fix typos or improve documentation
- Add new document templates
- Improve mobile responsiveness
- Add new chart types or visualizations

### Medium Difficulty
- Add new document types
- Improve data export functionality
- Add new UI components
- Enhance authentication features

### Advanced Contributions  
- Real-time collaboration features
- Advanced analytics dashboard
- Integration with external APIs
- Performance optimizations

## Document Templates

Adding new document types is a great way to contribute:

1. Create JSON data file in `src/data/pages/`
2. Add corresponding page component in `src/app/`
3. Update dashboard configuration
4. Add appropriate TypeScript types
5. Test thoroughly

## Questions or Ideas?

- Open an issue for discussion
- Check existing issues and PRs first
- Be respectful and constructive

## Code of Conduct

- Be welcoming to newcomers
- Be respectful in discussions
- Focus on what's best for the project and community
- Help others learn and grow

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Special thanks for major features

## License

By contributing, you agree that your contributions will be licensed under the same MIT License as the project.

---

Thank you for helping make this tool better for the startup community! 🚀