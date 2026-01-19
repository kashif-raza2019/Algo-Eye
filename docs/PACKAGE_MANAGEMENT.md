# Project Management Guide

## Project Metadata

```json
{
  "name": "kashif-raza-portfolio",
  "version": "1.0.0",
  "description": "Kashif Raza - Senior Software Engineer Portfolio with Algorithm Visualizer",
  "author": "Kashif Raza",
  "license": "MIT",
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
}
```

## Scripts Overview

### Development Scripts

#### `npm start`
- Starts development server on port 3000
- Hot reloads on file changes
- Opens browser automatically
- Shows compilation errors in browser overlay

#### `npm test`
- Runs Jest test runner
- Interactive watch mode
- Re-runs tests on file changes
- Shows coverage summary

### Production Scripts

#### `npm run build`
- Creates optimized production build
- Minifies and bundles code
- Outputs to `build/` directory
- Generates source maps
- Ready to deploy

### Code Quality Scripts

#### `npm run lint`
- Runs ESLint on source files
- Checks for code style issues
- Reports violations
- Does not fix automatically

#### `npm run lint:fix`
- Runs ESLint with auto-fix enabled
- Automatically fixes fixable issues
- Requires manual review for non-fixable issues

#### `npm run format`
- Formats all source files with Prettier
- Enforces consistent code style
- Modifies files in-place

#### `npm run format:check`
- Checks if files are formatted according to Prettier config
- Does not modify files
- Useful in CI/CD pipelines

### Testing Scripts

#### `npm test`
- Run all tests in watch mode
- Interactive menu for filtering tests

#### `npm run test:coverage`
- Runs all tests once
- Generates coverage report
- Creates HTML report in `coverage/` directory
- Exit code indicates pass/fail

## Dependencies

### Core Dependencies

#### React (19.2.3)
- UI library
- Component-based architecture
- Hooks for state management

#### React DOM (19.2.3)
- React rendering library for web
- DOM manipulation

#### React Router (7.12.0)
- Client-side routing
- Navigation between pages
- Route parameters and query strings

#### canvas-confetti (1.9.4)
- Confetti animation library
- Celebratory animations
- No dependencies

#### web-vitals (2.1.4)
- Performance metrics
- Core Web Vitals measurements
- Analytics reporting

### Development Dependencies

#### react-scripts (5.0.1)
- Create React App build tool
- Webpack configuration
- Development server
- Test runner

#### ESLint & Plugins
- Code quality checking
- React best practices
- Hooks rules validation

#### Prettier (3.2.5)
- Code formatter
- Consistent style enforcement
- Integrates with IDE

#### Testing Libraries
- **@testing-library/react**: React component testing
- **@testing-library/jest-dom**: Custom matchers
- **@testing-library/user-event**: User interaction simulation

## Version Management

### Semantic Versioning

```
MAJOR.MINOR.PATCH
1.2.3
|  |  |
|  |  +--- Patch: Bug fixes (backwards compatible)
|  +------ Minor: New features (backwards compatible)
+--------- Major: Breaking changes
```

### Upgrade Strategy

#### Patch Upgrades
```bash
npm update                # Updates to latest patch versions
npm install package@latest
```

#### Minor/Major Upgrades
```bash
npm outdated              # See what can be updated
npm update package        # Major updates need explicit version
npm install package@latest
```

#### Lock File Management
```bash
npm ci                    # Use exact versions from package-lock.json
npm install               # Update to latest within constraints
```

## Performance Optimization

### Bundle Size Analysis

```bash
npm run build
npm install --save-dev webpack-bundle-analyzer
```

### Tree Shaking

Unused imports are automatically removed during build.

### Code Splitting (via Create React App)

```javascript
// Automatic code splitting for routes
const ComparisonPage = React.lazy(() => import('./pages/ComparisonPage'));
```

### Caching

- Build artifacts are cached in `.next` or `build/`
- Browser caches static files with hash-based filenames
- Service workers can be added for offline support

## Security

### Dependency Audits

```bash
npm audit                 # Show vulnerabilities
npm audit fix            # Fix automatically
npm audit fix --force    # Force install even with breaking changes
```

### Keep Dependencies Updated

- Regular updates reduce security risks
- Subscribe to security advisories
- Use automated tools (Dependabot, Renovate)

## Deployment Configuration

### Environment Variables

```env
# .env.development (default)
REACT_APP_ENV=development
REACT_APP_DEBUG=true

# .env.production (optimized)
REACT_APP_ENV=production
REACT_APP_DEBUG=false
```

### Build Optimization

The production build includes:
- Minified JavaScript
- Optimized images
- Removed dev-only code
- Tree-shaken dependencies

## Troubleshooting

### Common Issues

#### npm install fails
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

#### Port 3000 in use
```bash
npm start -- --port 3001
# Or kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

#### Module not found
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
```

#### Build size too large
```bash
npm run build
npm install --save-dev webpack-bundle-analyzer
# Analyze and optimize
```

## Scripts Chaining

### Pre/Post Scripts

When you run `npm run build`, npm automatically runs:
1. `prebuild` (if exists)
2. `build`
3. `postbuild` (if exists)

### Useful Combinations

```bash
# Clean build
npm run lint && npm run build

# Full quality check
npm run lint && npm test && npm run build

# Format and commit
npm run format && npm run lint:fix && git add .
```

## Continuous Integration

### GitHub Actions

The project includes CI workflow that:
1. Installs dependencies
2. Runs linter
3. Runs tests
4. Builds application
5. Runs on multiple Node versions

Located in: `.github/workflows/ci-cd.yml`

## Monitoring & Analytics

### Web Vitals

Configured in `src/reportWebVitals.js`:
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)
- First Contentful Paint (FCP)
- Time to First Byte (TTFB)

## Best Practices

1. **Always run `npm audit`** before deploying
2. **Use `npm ci`** in CI/CD pipelines
3. **Keep `package-lock.json`** in version control
4. **Regular updates** for security patches
5. **Test before updating** major versions
6. **Use exact versions** for critical dependencies
7. **Review `package.json`** changes in PRs

## Resources

- [npm Documentation](https://docs.npmjs.com/)
- [Semantic Versioning](https://semver.org/)
- [Create React App Docs](https://create-react-app.dev/)
- [Node.js Best Practices](https://nodejs.org/en/docs/guides/)
